-- Migration: QuinuaQ Casitas Property Management System (PMS) Schema
-- Created: 2026-08-21

-- 1. Casitas properties table
CREATE TABLE IF NOT EXISTS public.casitas (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  capacity TEXT NOT NULL,
  max_guests INTEGER NOT NULL DEFAULT 2,
  price_weekday NUMERIC(10, 2) NOT NULL,
  price_weekend NUMERIC(10, 2) NOT NULL,
  price_holiday NUMERIC(10, 2) NOT NULL,
  extra_guest_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  airbnb_ical_url TEXT,
  booking_ical_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Reservations table
CREATE TABLE IF NOT EXISTS public.reservations (
  id TEXT PRIMARY KEY, -- e.g. 'QQ-2026-8491'
  casita_id TEXT NOT NULL REFERENCES public.casitas(id) ON DELETE RESTRICT,
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 1,
  total_price NUMERIC(10, 2) NOT NULL,
  paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
  source TEXT NOT NULL DEFAULT 'web' CHECK (source IN ('web', 'whatsapp_direct', 'admin_manual', 'airbnb', 'booking')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Date blocks table (maintenance, private events, OTA calendar blocks)
CREATE TABLE IF NOT EXISTS public.date_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  casita_id TEXT NOT NULL REFERENCES public.casitas(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL DEFAULT 'Bloqueo manual',
  source TEXT NOT NULL DEFAULT 'admin' CHECK (source IN ('admin', 'airbnb_ical', 'booking_ical')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Payments ledger table (accounting & audit)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id TEXT NOT NULL REFERENCES public.reservations(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  payment_type TEXT NOT NULL DEFAULT 'adelanto_50' CHECK (payment_type IN ('adelanto_50', 'saldo_checkin', 'pago_total', 'consumo_extra', 'reembolso')),
  payment_method TEXT NOT NULL DEFAULT 'yape' CHECK (payment_method IN ('yape', 'plin', 'transferencia_bcp', 'transferencia_bbva', 'efectivo', 'tarjeta', 'otro')),
  transaction_ref TEXT,
  received_by TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Audit logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('reservation', 'payment', 'block', 'casita')),
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  changed_by TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_reservations_casita_dates ON public.reservations (casita_id, check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations (status);
CREATE INDEX IF NOT EXISTS idx_date_blocks_casita_dates ON public.date_blocks (casita_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_payments_reservation ON public.payments (reservation_id);

-- Enable RLS
ALTER TABLE public.casitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.date_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read policies for casitas and availability
CREATE POLICY "Public can view active casitas" ON public.casitas FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view reservations for calendar dates" ON public.reservations FOR SELECT USING (status != 'cancelled');
CREATE POLICY "Public can insert pending reservations" ON public.reservations FOR INSERT WITH CHECK (status = 'pending');
CREATE POLICY "Public can view date blocks" ON public.date_blocks FOR SELECT USING (true);

-- Authenticated Admin full access policies
CREATE POLICY "Admin full access casitas" ON public.casitas FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access reservations" ON public.reservations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access date_blocks" ON public.date_blocks FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access payments" ON public.payments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access audit_logs" ON public.audit_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed initial Casitas metadata
INSERT INTO public.casitas (id, name, tagline, capacity, max_guests, price_weekday, price_weekend, price_holiday, extra_guest_fee)
VALUES
  ('betsy', 'Casita Betsy', 'Refugio íntimo con vista al valle', '1 a 2 personas', 2, 375.00, 390.00, 420.00, 0.00),
  ('kallen-4', 'Casita Kallen · 4 personas', 'Casita familiar entre queuñas', 'hasta 4 personas', 4, 570.00, 600.00, 650.00, 0.00),
  ('kallen-2', 'Casita Kallen · 2 personas', 'La misma casa Kallen en modalidad pareja', '1 a 2 personas', 2, 400.00, 430.00, 520.00, 0.00),
  ('matrimonial', 'Habitación Matrimonial', 'Confort andino para dos', '2 personas', 2, 270.00, 300.00, 320.00, 0.00),
  ('duplex', 'Habitación Dúplex · 2 personas', 'Dos niveles, mucha luz', '2 personas · S/50 por persona extra', 6, 300.00, 330.00, 360.00, 50.00)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  capacity = EXCLUDED.capacity,
  max_guests = EXCLUDED.max_guests,
  price_weekday = EXCLUDED.price_weekday,
  price_weekend = EXCLUDED.price_weekend,
  price_holiday = EXCLUDED.price_holiday,
  extra_guest_fee = EXCLUDED.extra_guest_fee;
