# QuinuaQ Casitas — Luxury Booking Engine & Property Management System (PMS)

## 1. Executive Summary & Objectives
Transform **QuinuaQ Casitas** into an ultra-luxury hospitality web experience and comprehensive Property Management System (PMS). The solution combines:
1. An immersive, high-conversion guest booking portal with dynamic filtering, pagination, real-time availability calendar, dynamic pricing calculations, and pre-formatted WhatsApp booking requests.
2. A centralized Administrative Dashboard (`/admin`) for room blocking, status management, payment registration with audit logs, and operational daily overviews.
3. Automated bidirectional iCal synchronization (`.ics`) for connecting with Airbnb and Booking.com without recurring channel manager fees.

---

## 2. Architecture & Tech Stack
- **Framework**: TanStack Start / Vite / React 19 / TypeScript
- **Styling**: Tailwind CSS v4 (Andean luxury palette: Lino `#F7F4EF`, Piedra Carbón `#1B1917`, Oro Viejo `#9C7A3C`, Terracota `#8C5135`)
- **Database & Auth**: Supabase PostgreSQL + Row Level Security (RLS) + Supabase Auth
- **Hosting & Deployment**: Vercel (`https://casitas.quinuaq.com`)
- **Standard Protocol**: RFC 5545 iCalendar (`.ics`) for OTA calendar feeds

---

## 3. Database Schema (Supabase PostgreSQL)

### 3.1 `casitas` Table
Stores property metadata, pricing tiers, and OTA calendar endpoints.
- `id` (TEXT, PK): Identifier (e.g., `'betsy'`, `'kallen-4'`, `'kallen-2'`, `'matrimonial'`, `'duplex'`).
- `name` (TEXT): Display name.
- `tagline` (TEXT): Subtitle / essence.
- `capacity` (TEXT): Description of capacity.
- `max_guests` (INT): Maximum allowed occupancy.
- `price_weekday` (NUMERIC): Mon-Thu price per night in PEN.
- `price_weekend` (NUMERIC): Fri-Sun price per night in PEN.
- `price_holiday` (NUMERIC): Holiday pricing in PEN.
- `extra_guest_fee` (NUMERIC): Additional fee per person/night (e.g. S/ 50 for Duplex >2 guests).
- `airbnb_ical_url` (TEXT, NULLABLE): Inbound calendar URL from Airbnb.
- `booking_ical_url` (TEXT, NULLABLE): Inbound calendar URL from Booking.com.
- `is_active` (BOOLEAN): Property status.
- `created_at` (TIMESTAMPTZ): Created timestamp.

### 3.2 `reservations` Table
Main guest reservation records.
- `id` (TEXT, PK): Human-readable unique code (e.g., `'QQ-2026-8491'`).
- `casita_id` (TEXT, FK -> `casitas.id`): Selected casita.
- `guest_name` (TEXT): Full name of primary guest.
- `guest_phone` (TEXT): Contact telephone / WhatsApp.
- `guest_email` (TEXT, NULLABLE): Contact email.
- `check_in` (DATE): Arrival date.
- `check_out` (DATE): Departure date.
- `nights` (INT): Calculated nights count.
- `guests_count` (INT): Number of staying guests.
- `total_price` (NUMERIC): Calculated total reservation cost.
- `paid_amount` (NUMERIC, DEFAULT 0): Cumulative payments registered.
- `status` (TEXT): `'pending'` | `'confirmed'` | `'checked_in'` | `'checked_out'` | `'cancelled'`.
- `source` (TEXT): `'web'` | `'whatsapp_direct'` | `'admin_manual'` | `'airbnb'` | `'booking'`.
- `notes` (TEXT, NULLABLE): Special requests or internal remarks.
- `created_at` (TIMESTAMPTZ): Reservation timestamp.
- `updated_at` (TIMESTAMPTZ): Last update timestamp.

### 3.3 `payments` Table (Financial Audit & Ledger)
Tracks every payment transaction for audit compliance.
- `id` (UUID, PK): Unique payment ID.
- `reservation_id` (TEXT, FK -> `reservations.id`): Associated reservation.
- `amount` (NUMERIC): Transaction amount in PEN.
- `payment_type` (TEXT): `'adelanto_50'` | `'saldo_checkin'` | `'pago_total'` | `'consumo_extra'` | `'reembolso'`.
- `payment_method` (TEXT): `'yape'` | `'plin'` | `'transferencia_bcp'` | `'transferencia_bbva'` | `'efectivo'` | `'tarjeta'` | `'otro'`.
- `transaction_ref` (TEXT, NULLABLE): Bank transaction number or voucher reference.
- `received_by` (TEXT, NULLABLE): Administrator email or user ID who recorded the payment.
- `created_at` (TIMESTAMPTZ): Payment timestamp.

### 3.4 `date_blocks` Table
Blocks dates for maintenance, private events, or OTA imported blocks.
- `id` (UUID, PK): Unique block ID.
- `casita_id` (TEXT, FK -> `casitas.id`): Target casita.
- `start_date` (DATE): Block start date.
- `end_date` (DATE): Block end date.
- `reason` (TEXT): Reason (e.g., `'Mantenimiento'`, `'Uso Propietarios'`, `'Airbnb Sync'`, `'Booking Sync'`).
- `created_at` (TIMESTAMPTZ): Timestamp.

### 3.5 `audit_logs` Table
Audit trail for critical operations.
- `id` (UUID, PK): Unique log ID.
- `entity_type` (TEXT): `'reservation'` | `'payment'` | `'block'`.
- `entity_id` (TEXT): Identifier of target entity.
- `action` (TEXT): Action performed (e.g. `'created'`, `'confirmed'`, `'payment_registered'`, `'cancelled'`).
- `changed_by` (TEXT): Email or user who triggered the action.
- `details` (JSONB): Previous and current state payloads.
- `created_at` (TIMESTAMPTZ): Timestamp.

---

## 4. Public Luxury Guest Experience

### 4.1 Navigation & Brand Header
- Fixed luxury header with backdrop blur, brand logo, responsive mobile drawer.
- Navigation links: Casitas, Experiencias, Galería, Quinua, Restaurante ↗, and Quick Reservation button.
- Contact link directly targeting WhatsApp `+51 946 393 256`.

### 4.2 Dedicated Casitas Catalog (`/casitas`)
- Interactive Search Bar: Check-in/Check-out dates + Guest count counter.
- Filter controls: Capacity (Parejas, Familiar, Grupos), Price Range slider, Amenities (Chimenea, Terraza, Vista Valle).
- Pagination & sorting: Grid layout with luxury cards, photo carousel per card, availability status badge.

### 4.3 Immersive Casita Detail (`/casitas/$id`)
- Fullscreen photo gallery & architectural highlights.
- Live interactive calendar: unavailable dates (from `reservations` + `date_blocks`) are visually disabled in gray.
- Real-time quotation calculator breaking down weekday, weekend, holiday, and extra guest surcharges.
- Booking Request Form generating unique reservation code (`QQ-XXXX`), inserting record into database with status `pending`, and opening WhatsApp pre-filled with complete itinerary and suggested 50% deposit instructions.

---

## 5. Administrative Property Management Dashboard (`/admin`)

### 5.1 Authentication & Security
- Supabase Auth integration (email/password).
- Route guard redirecting unauthenticated users to `/admin/login`.

### 5.2 Daily Overview Dashboard
- KPI summary cards: Current Occupancy %, Check-ins scheduled for today, Check-outs scheduled for today, Total revenue collected this month.

### 5.3 Interactive Master Calendar (Gantt Matrix)
- Room grid: Y-axis (Casitas), X-axis (Days of current/upcoming months).
- Color-coded reservations: Confirmed (Green), Pending (Orange), Blocked/Maintenance (Gray), Airbnb (Blue), Booking (Red).
- One-click actions: Click & drag to block dates or register manual phone/WhatsApp reservations.

### 5.4 Reservation & Financial Management
- Searchable, filterable reservations table.
- Reservation Drawer/Modal: guest details, WhatsApp chat trigger, status transition buttons (`Confirmar`, `Check-in`, `Check-out`, `Cancelar`).
- Payment recording form: registers installment, calculates remaining balance, appends to `payments` audit ledger.

### 5.5 Channel Sync Settings (Airbnb & Booking iCal)
- Provides copyable export iCal feed URL for each casita: `https://casitas.quinuaq.com/api/ical/$casitaId.ics`.
- Input fields to store Airbnb and Booking import feed URLs.
- Manual "Sincronizar Ahora" trigger with last synchronized timestamp status.

---

## 6. iCal Synchronization Engine (`/api/ical`)
- **Export Endpoint**: Generates valid RFC 5545 `.ics` payload containing all confirmed reservations and active blocks for the specified casita.
- **Import Sync Function**: Fetches remote `.ics` feeds from configured OTA URLs, parses `DTSTART` / `DTEND` VEVENT items, and upserts corresponding `date_blocks` entries in Supabase.

---

## 7. Verification & Quality Assurance
- Automated linting & TypeScript type checking (`npm run build`).
- End-to-end testing of calendar blocking logic (ensuring reserved dates become unselectable in public booking form).
- Verification of price computation against weekday/weekend rules and extra person surcharges.
- Verification of payment ledger calculations (Total = Paid + Balance Due).
- Verification of iCal export format validity.
