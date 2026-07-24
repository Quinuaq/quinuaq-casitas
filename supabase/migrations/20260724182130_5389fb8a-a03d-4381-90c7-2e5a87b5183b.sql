
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  casita_id TEXT NOT NULL,
  casita_name TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  message TEXT,
  estimated_total NUMERIC,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.reservations TO anon;
GRANT INSERT ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a reservation request"
  ON public.reservations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(guest_name) BETWEEN 2 AND 120
    AND length(guest_phone) BETWEEN 6 AND 40
    AND check_out > check_in
    AND guests BETWEEN 1 AND 20
  );
