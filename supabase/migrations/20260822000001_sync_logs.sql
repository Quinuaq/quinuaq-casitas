
CREATE TABLE IF NOT EXISTS public.sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  casita_id TEXT NOT NULL REFERENCES public.casitas(id),
  source TEXT NOT NULL, -- 'airbnb_ical' | 'booking_ical'
  status TEXT NOT NULL, -- 'success' | 'error'
  events_count INTEGER DEFAULT 0,
  error_message TEXT,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
