# QuinuaQ Casitas Luxury PMS & Booking Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform QuinuaQ Casitas into an ultra-luxury hospitality booking engine and complete Property Management System (PMS) with real-time calendar availability, administrative management panel, payment audit ledger, and bidirectional iCal synchronization with Airbnb & Booking.com.

**Architecture:** TanStack Start full-stack application backed by Supabase PostgreSQL (Database, Auth, and Storage). Public guest routes provide dynamic catalog browsing, live availability calendars, and quote generation. Protected `/admin` routes provide master Gantt calendar management, one-click date blocking, reservation workflows, payment auditing, and OTA iCal synchronization endpoints.

**Tech Stack:** TanStack Start, React 19, Vite, Tailwind CSS v4, TypeScript, Supabase JS (@supabase/supabase-js), Lucide Icons, date-fns.

---

## Global Constraints
- **Official Phone:** All contact, reservation requests, and WhatsApp links must use `+51 946 393 256` (`51946393256`).
- **Domain Base:** Restaurant is `https://www.quinuaq.com`, Casitas is `https://casitas.quinuaq.com`.
- **Styling Palette:** Andean luxury palette (Lino `#F7F4EF`, Piedra Carbón `#1B1917`, Oro Viejo `#9C7A3C`, Terracota `#8C5135`).

---

## Proposed Tasks

### Task 1: Supabase Database Schema & Type Definitions
**Files:**
- Create: `supabase/migrations/20260821_pms_schema.sql`
- Create: `src/types/pms.ts`
- Modify: `src/lib/casitas.ts`

- [ ] **Step 1: Write the SQL schema migration for casitas, reservations, payments, date_blocks, and audit_logs**
- [ ] **Step 2: Create TypeScript interfaces for all PMS entities and database rows**
- [ ] **Step 3: Export helper functions for pricing calculations and date ranges**
- [ ] **Step 4: Commit schema and types**

```bash
git add supabase/migrations src/types/pms.ts src/lib/casitas.ts
git commit -m "feat(pms): define database schema, types and pricing rules"
```

---

### Task 2: Supabase Server Functions & Availability Logic
**Files:**
- Create: `src/lib/supabase-pms.ts`
- Modify: `src/lib/reservations.functions.ts`

- [ ] **Step 1: Implement Supabase client helper with SSR/client support**
- [ ] **Step 2: Implement `getCasitaAvailability(casitaId, startDate, endDate)` to check for reserved dates & blocks**
- [ ] **Step 3: Implement `createGuestReservation(data)` generating readable code `QQ-XXXX` and inserting `pending` record**
- [ ] **Step 4: Commit server functions**

```bash
git add src/lib/supabase-pms.ts src/lib/reservations.functions.ts
git commit -m "feat(pms): add availability queries and guest reservation server functions"
```

---

### Task 3: Luxury Guest Experience — Dedicated Catalog (`/casitas`)
**Files:**
- Create: `src/routes/casitas.index.tsx`
- Create: `src/components/casitas/CasitasFilterBar.tsx`
- Create: `src/components/casitas/CasitaCard.tsx`
- Modify: `src/components/site-nav.tsx`

- [ ] **Step 1: Build filter bar component with date picker, guest counter, capacity tabs, and price slider**
- [ ] **Step 2: Build luxury CasitaCard with image carousel, amenity pills, pricing breakdown, and availability badge**
- [ ] **Step 3: Implement `/casitas` route with interactive filtering, sorting, and pagination**
- [ ] **Step 4: Update site navigation menu to link directly to `/casitas`**
- [ ] **Step 5: Commit catalog implementation**

```bash
git add src/routes/casitas.index.tsx src/components/casitas src/components/site-nav.tsx
git commit -m "feat(web): implement luxury casitas catalog with filters and pagination"
```

---

### Task 4: Immersive Casita Detail (`/casitas/$id`) with Live Calendar & Booking Engine
**Files:**
- Modify: `src/routes/casitas.$id.tsx`
- Create: `src/components/casitas/AvailabilityCalendar.tsx`

- [ ] **Step 1: Create interactive calendar displaying booked/blocked dates as disabled**
- [ ] **Step 2: Integrate live quote breakdown (weekdays, weekend nights, holidays, extra guests, 50% deposit)**
- [ ] **Step 3: Connect reservation submission to insert `pending` record into Supabase and open WhatsApp with pre-formatted quote and reservation code**
- [ ] **Step 4: Commit casita detail enhancements**

```bash
git add src/routes/casitas.$id.tsx src/components/casitas/AvailabilityCalendar.tsx
git commit -m "feat(web): add live calendar and instant booking quotation engine"
```

---

### Task 5: Admin Authentication & Protected Layout (`/admin`)
**Files:**
- Create: `src/routes/admin.tsx`
- Create: `src/routes/admin.login.tsx`
- Create: `src/components/admin/AdminSidebar.tsx`
- Create: `src/lib/auth.ts`

- [ ] **Step 1: Implement Supabase Auth login form with error handling and secure session persistence**
- [ ] **Step 2: Create protected Admin layout with sidebar navigation, user profile, and sign-out button**
- [ ] **Step 3: Commit admin auth and layout**

```bash
git add src/routes/admin.tsx src/routes/admin.login.tsx src/components/admin src/lib/auth.ts
git commit -m "feat(admin): create admin authentication and layout"
```

---

### Task 6: Master Gantt Calendar & Date Blocking (`/admin/calendario`)
**Files:**
- Create: `src/routes/admin.calendario.tsx`
- Create: `src/components/admin/MasterCalendarGrid.tsx`
- Create: `src/components/admin/BlockDatesModal.tsx`
- Create: `src/components/admin/ManualBookingModal.tsx`

- [ ] **Step 1: Build monthly Gantt matrix (Casitas on Y-axis, dates on X-axis) with color-coded reservation blocks**
- [ ] **Step 2: Build BlockDatesModal to block one or more casitas for maintenance or private events**
- [ ] **Step 3: Build ManualBookingModal to register direct phone or walk-in reservations**
- [ ] **Step 4: Commit master calendar and blocking tools**

```bash
git add src/routes/admin.calendario.tsx src/components/admin/MasterCalendarGrid.tsx src/components/admin/BlockDatesModal.tsx src/components/admin/ManualBookingModal.tsx
git commit -m "feat(admin): implement master Gantt calendar and one-click date blocking"
```

---

### Task 7: Reservation Management & Payment Audit Ledger (`/admin/reservas` & `/admin/index.tsx`)
**Files:**
- Create: `src/routes/admin.index.tsx`
- Create: `src/routes/admin.reservas.tsx`
- Create: `src/components/admin/ReservationDetailModal.tsx`
- Create: `src/components/admin/PaymentRecordModal.tsx`

- [ ] **Step 1: Build Daily Overview Dashboard with occupancy rate, today's check-ins, check-outs, and revenue summary**
- [ ] **Step 2: Build searchable and filterable reservations table (by code, guest, status, dates)**
- [ ] **Step 3: Build ReservationDetailModal with status transitions (`Confirmar`, `Check-in`, `Check-out`, `Cancelar`) and WhatsApp direct button**
- [ ] **Step 4: Build PaymentRecordModal to log deposit and balance payments (Yape, Plin, Transferencia, etc.) with bank transaction references**
- [ ] **Step 5: Commit reservation management and audit ledger**

```bash
git add src/routes/admin.index.tsx src/routes/admin.reservas.tsx src/components/admin/ReservationDetailModal.tsx src/components/admin/PaymentRecordModal.tsx
git commit -m "feat(admin): implement reservations table, status management and payment ledger"
```

---

### Task 8: Bidirectional iCal Synchronization (`/api/ical` & `/admin/canales`)
**Files:**
- Create: `src/routes/api/ical.$id.ts`
- Create: `src/lib/ical-generator.ts`
- Create: `src/lib/ical-importer.ts`
- Create: `src/routes/admin.canales.tsx`

- [ ] **Step 1: Implement standard RFC 5545 iCal generator for outbound feeds (`/api/ical/:casitaId.ics`)**
- [ ] **Step 2: Implement iCal parser to fetch and import Airbnb and Booking `.ics` feeds into `date_blocks`**
- [ ] **Step 3: Build `/admin/canales` UI with copyable feed links and OTA import URL configuration with manual sync trigger**
- [ ] **Step 4: Commit iCal synchronization system**

```bash
git add src/routes/api/ical.$id.ts src/lib/ical-generator.ts src/lib/ical-importer.ts src/routes/admin.canales.tsx
git commit -m "feat(ical): implement bidirectional Airbnb and Booking iCal synchronization"
```

---

### Task 9: System Verification & Production Build
- [ ] **Step 1: Run TypeScript compiler and Vite build check (`npm run build`)**
- [ ] **Step 2: Verify all public luxury routes, admin workflows, and iCal endpoints**
- [ ] **Step 3: Commit and push complete PMS system to GitHub**

```bash
git push origin main
```
