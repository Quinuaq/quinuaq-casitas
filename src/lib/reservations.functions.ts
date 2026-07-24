import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

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
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data: row, error } = await supabase
      .from("reservations")
      .insert({
        casita_id: data.casita_id,
        casita_name: data.casita_name,
        guest_name: data.guest_name,
        guest_phone: data.guest_phone,
        guest_email: data.guest_email || null,
        check_in: data.check_in,
        check_out: data.check_out,
        guests: data.guests,
        message: data.message || null,
        estimated_total: data.estimated_total ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[reservations] insert failed", error);
      throw new Error("No pudimos guardar la reserva. Intenta de nuevo.");
    }
    return { id: row.id };
  });
