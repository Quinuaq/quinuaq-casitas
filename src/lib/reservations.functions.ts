import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createGuestBooking } from "./supabase-pms";

const reservationSchema = z.object({
  casita_id: z.string().min(1).max(60),
  casita_name: z.string().min(1).max(120),
  guest_name: z.string().min(2).max(120),
  guest_phone: z.string().min(6).max(40),
  guest_email: z.string().email().max(160).optional().or(z.literal("")),
  check_in: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  check_out: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.number().int().min(1).max(20),
  message: z.string().max(1000).optional().or(z.literal("")),
  estimated_total: z.number().nonnegative().optional(),
});

export const createReservation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => reservationSchema.parse(data))
  .handler(async ({ data }) => {
    const result = await createGuestBooking({
      casitaId: data.casita_id,
      guestName: data.guest_name,
      guestPhone: data.guest_phone,
      guestEmail: data.guest_email || undefined,
      checkIn: data.check_in,
      checkOut: data.check_out,
      guestsCount: data.guests,
      totalPrice: data.estimated_total ?? 0,
      notes: data.message || undefined,
    });
    return { id: result.id, reservationCode: result.reservationCode };
  });

