export type ReservationStatus = "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled";
export type ReservationSource = "web" | "whatsapp_direct" | "admin_manual" | "airbnb" | "booking" | "walkin";
export type PaymentType = "adelanto_50" | "saldo_checkin" | "pago_total" | "consumo_extra" | "reembolso";
export type PaymentMethod = "yape" | "plin" | "transferencia_bcp" | "transferencia_bbva" | "efectivo" | "tarjeta" | "otro";

export interface CasitaProperty {
  id: string;
  name: string;
  tagline: string;
  capacity: string;
  max_guests: number;
  price_weekday: number;
  price_weekend: number;
  price_holiday: number;
  extra_guest_fee: number;
  airbnb_ical_url?: string | null;
  booking_ical_url?: string | null;
  is_active: boolean;
}

export interface Reservation {
  id: string; // e.g. "QQ-2026-8491"
  casita_id: string;
  guest_name: string;
  guest_phone: string;
  guest_email?: string | null;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  arrival_time?: string | null; // HH:mm
  nights: number;
  guests_count: number;
  total_price: number;
  paid_amount: number;
  status: ReservationStatus;
  source: ReservationSource;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DateBlock {
  id: string;
  casita_id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  reason: string;
  source: "admin" | "airbnb_ical" | "booking_ical";
  created_at: string;
}

export interface Payment {
  id: string;
  reservation_id: string;
  amount: number;
  payment_type: PaymentType;
  payment_method: PaymentMethod;
  transaction_ref?: string | null;
  received_by?: string | null;
  notes?: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  entity_type: "reservation" | "payment" | "block" | "casita";
  entity_id: string;
  action: string;
  changed_by?: string | null;
  details?: Record<string, unknown> | null;
  created_at: string;
}

export interface QuoteCalculation {
  nights: number;
  weekdayNights: number;
  weekendNights: number;
  basePrice: number;
  extraGuestFee: number;
  total: number;
  suggestedDeposit: number;
  balanceDue: number;
}
