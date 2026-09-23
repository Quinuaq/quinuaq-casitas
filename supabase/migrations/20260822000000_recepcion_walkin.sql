
-- Migration: Add walkin support
-- 1. Add arrival_time to reservations
ALTER TABLE public.reservations ADD COLUMN IF NOT EXISTS arrival_time TEXT;

-- 2. Drop and recreate check constraint for source to include walkin
ALTER TABLE public.reservations DROP CONSTRAINT IF EXISTS reservations_source_check;
ALTER TABLE public.reservations ADD CONSTRAINT reservations_source_check CHECK (source IN ('web', 'whatsapp_direct', 'admin_manual', 'airbnb', 'booking', 'walkin'));
