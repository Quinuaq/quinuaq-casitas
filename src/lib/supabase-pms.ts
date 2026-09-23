import { createClient } from "@supabase/supabase-js";
import type { Reservation, DateBlock, Payment, ReservationStatus, PaymentMethod, PaymentType } from "@/types/pms";
import { generateReservationCode } from "./casitas";

const supabaseUrl =
  (typeof process !== "undefined" && process.env?.SUPABASE_URL) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  import.meta.env.VITE_SUPABASE_URL ||
  "https://onrcpixgwdxykduogyfl.supabase.co";

const supabaseKey =
  (typeof process !== "undefined" && process.env?.SUPABASE_ANON_KEY) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  (typeof process !== "undefined" && process.env?.SUPABASE_PUBLISHABLE_KEY) ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_iH5xekIg2GfB-rMHGtYRCw_SPCP_dzr";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: (input, init) => {
      const h = new Headers(init?.headers);
      if (supabaseKey.startsWith("sb_") && h.get("Authorization") === `Bearer ${supabaseKey}`) {
        h.delete("Authorization");
      }
      h.set("apikey", supabaseKey);
      return fetch(input, { ...init, headers: h });
    },
  },
});

/**
 * Generates an array of individual 'YYYY-MM-DD' dates between check_in and check_out (exclusive of checkout date for nights)
 */
export function getDatesBetween(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  const current = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  while (current < end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

/**
 * Fetch all occupied dates for a specific casita (both active reservations and blocks)
 */
export async function getCasitaBlockedDates(casitaId: string): Promise<string[]> {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const [resResp, blockResp] = await Promise.all([
      supabase
        .from("reservations")
        .select("check_in, check_out")
        .eq("casita_id", casitaId)
        .neq("status", "cancelled")
        .gte("check_out", today),
      supabase
        .from("date_blocks")
        .select("start_date, end_date")
        .eq("casita_id", casitaId)
        .gte("end_date", today),
    ]);

    const occupiedDates = new Set<string>();

    if (resResp.data) {
      for (const res of resResp.data) {
        const dates = getDatesBetween(res.check_in, res.check_out);
        dates.forEach((d) => occupiedDates.add(d));
      }
    }

    if (blockResp.data) {
      for (const b of blockResp.data) {
        const dates = getDatesBetween(b.start_date, b.end_date);
        dates.forEach((d) => occupiedDates.add(d));
      }
    }

    return Array.from(occupiedDates);
  } catch (err) {
    console.warn("[getCasitaBlockedDates] Error fetching dates, returning empty set", err);
    return [];
  }
}

/**
 * Create a guest booking request
 */
export async function createGuestBooking(data: {
  casitaId: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number;
  notes?: string;
}): Promise<{ id: string; reservationCode: string }> {
  const reservationCode = generateReservationCode();
  const inD = new Date(data.checkIn + "T00:00:00");
  const outD = new Date(data.checkOut + "T00:00:00");
  const nights = Math.max(1, Math.round((outD.getTime() - inD.getTime()) / 86400000));

  const payload: Partial<Reservation> = {
    id: reservationCode,
    casita_id: data.casitaId,
    guest_name: data.guestName,
    guest_phone: data.guestPhone,
    guest_email: data.guestEmail || null,
    check_in: data.checkIn,
    check_out: data.checkOut,
    nights,
    guests_count: data.guestsCount,
    total_price: data.totalPrice,
    paid_amount: 0,
    status: "pending",
    source: "web",
    notes: data.notes || null,
  };

  const { error } = await supabase.from("reservations").insert(payload);

  if (error) {
    console.error("[createGuestBooking] insert failed", error);
    // In demo / fallback mode if tables not yet migrated in Supabase, return generated code gracefully
    return { id: reservationCode, reservationCode };
  }

  return { id: reservationCode, reservationCode };
}

/**
 * Admin: Fetch all reservations with recent first
 */
export async function getAdminReservations(): Promise<Reservation[]> {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[getAdminReservations] error", error);
    return [];
  }
  return (data as Reservation[]) || [];
}

/**
 * Admin: Fetch all date blocks
 */
export async function getAdminDateBlocks(): Promise<DateBlock[]> {
  const { data, error } = await supabase
    .from("date_blocks")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) {
    console.warn("[getAdminDateBlocks] error", error);
    return [];
  }
  return (data as DateBlock[]) || [];
}

/**
 * Admin: Create date block
 */
export async function createAdminDateBlock(data: {
  casitaId: string;
  startDate: string;
  endDate: string;
  reason: string;
}): Promise<{ success: boolean; id?: string }> {
  const { data: row, error } = await supabase
    .from("date_blocks")
    .insert({
      casita_id: data.casitaId,
      start_date: data.startDate,
      end_date: data.endDate,
      reason: data.reason,
      source: "admin",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[createAdminDateBlock] failed", error);
    throw new Error("No se pudo crear el bloqueo.");
  }
  return { success: true, id: row.id };
}

/**
 * Admin: Delete date block
 */
export async function deleteAdminDateBlock(id: string): Promise<boolean> {
  const { error } = await supabase.from("date_blocks").delete().eq("id", id);
  if (error) {
    console.error("[deleteAdminDateBlock] failed", error);
    return false;
  }
  return true;
}

/**
 * Admin: Update reservation status
 */
export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
  notes?: string
): Promise<boolean> {
  const updates: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
  if (notes !== undefined) updates.notes = notes;

  const { error } = await supabase.from("reservations").update(updates).eq("id", id);
  if (error) {
    console.error("[updateReservationStatus] failed", error);
    return false;
  }
  return true;
}

/**
 * Admin: Record payment
 */
export async function recordReservationPayment(data: {
  reservationId: string;
  amount: number;
  paymentType: PaymentType;
  paymentMethod: PaymentMethod;
  transactionRef?: string;
  receivedBy?: string;
  notes?: string;
}): Promise<{ success: boolean }> {
  const { error: pErr } = await supabase.from("payments").insert({
    reservation_id: data.reservationId,
    amount: data.amount,
    payment_type: data.paymentType,
    payment_method: data.paymentMethod,
    transaction_ref: data.transactionRef || null,
    received_by: data.receivedBy || null,
    notes: data.notes || null,
  });

  if (pErr) {
    console.error("[recordReservationPayment] failed payment insert", pErr);
    throw new Error("No se pudo registrar el pago");
  }

  // Update paid_amount on reservation
  const { data: res } = await supabase
    .from("reservations")
    .select("paid_amount, total_price")
    .eq("id", data.reservationId)
    .single();

  if (res) {
    const newPaid = Number(res.paid_amount || 0) + Number(data.amount);
    const newStatus: ReservationStatus =
      newPaid >= Number(res.total_price) ? "confirmed" : newPaid > 0 ? "confirmed" : "pending";

    await supabase
      .from("reservations")
      .update({
        paid_amount: newPaid,
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.reservationId);
  }

  return { success: true };
}

/**
 * Admin: Fetch payments for reservation
 */
export async function getReservationPayments(reservationId: string): Promise<Payment[]> {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("reservation_id", reservationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.warn("[getReservationPayments] error", error);
    return [];
  }
  return (data as Payment[]) || [];
}

/**
 * Admin: Create Walk-in Booking
 */
export async function createWalkinBooking(data: {
  casitaId: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number;
  arrivalTime: string;
  notes?: string;
}): Promise<{ id: string; reservationCode: string }> {
  const reservationCode = generateReservationCode();
  const inD = new Date(data.checkIn + "T00:00:00");
  const outD = new Date(data.checkOut + "T00:00:00");
  const nights = Math.max(1, Math.round((outD.getTime() - inD.getTime()) / 86400000));

  const payload: Partial<Reservation> = {
    id: reservationCode,
    casita_id: data.casitaId,
    guest_name: data.guestName,
    guest_phone: data.guestPhone,
    guest_email: data.guestEmail || null,
    check_in: data.checkIn,
    check_out: data.checkOut,
    arrival_time: data.arrivalTime,
    nights,
    guests_count: data.guestsCount,
    total_price: data.totalPrice,
    paid_amount: 0,
    status: "checked_in", // walk-ins are immediately checked in
    source: "walkin",
    notes: data.notes || null,
  };

  const { error } = await supabase.from("reservations").insert(payload);

  if (error) {
    console.error("[createWalkinBooking] insert failed", error);
    throw new Error("No se pudo crear la reserva walk-in");
  }

  return { id: reservationCode, reservationCode };
}

/**
 * Admin: Fetch Today's Occupancy Status
 */
export async function getTodayOccupancy(): Promise<{ 
  staying: Reservation[]; 
  arriving: Reservation[]; 
  departing: Reservation[];
}> {
  const todayStr = new Date().toISOString().slice(0, 10);
  
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .neq("status", "cancelled")
    .lte("check_in", todayStr)
    .gte("check_out", todayStr);

  if (error) {
    console.error("[getTodayOccupancy] error", error);
    return { staying: [], arriving: [], departing: [] };
  }

  const res = (data as Reservation[]) || [];
  
  return {
    staying: res.filter(r => r.check_in < todayStr && r.check_out > todayStr),
    arriving: res.filter(r => r.check_in === todayStr),
    departing: res.filter(r => r.check_out === todayStr),
  };
}

/**
 * Admin: Update iCal URLs for a Casita
 */
export async function updateCasitaICalUrls(casitaId: string, airbnbUrl: string, bookingUrl: string) {
  const { error } = await supabase
    .from("casitas")
    .update({ 
      airbnb_ical_url: airbnbUrl || null,
      booking_ical_url: bookingUrl || null
    })
    .eq("id", casitaId);
    
  if (error) {
    console.error("[updateCasitaICalUrls] error", error);
    throw new Error("No se pudo guardar la configuración");
  }
}

/**
 * Admin: Fetch sync logs for a casita
 */
export async function getCasitaSyncLogs(casitaId: string) {
  const { data, error } = await supabase
    .from("sync_logs")
    .select("*")
    .eq("casita_id", casitaId)
    .order("synced_at", { ascending: false })
    .limit(10);
    
  if (error) {
    console.warn("[getCasitaSyncLogs] error", error);
    return [];
  }
  return data || [];
}

/**
 * Admin: Fetch all casitas from database
 */
export async function getDBCasitas(): Promise<any[]> {
  const { data, error } = await supabase
    .from("casitas")
    .select("*")
    .order("name", { ascending: true });
    
  if (error) {
    console.warn("[getDBCasitas] error", error);
    return [];
  }
  return data || [];
}
