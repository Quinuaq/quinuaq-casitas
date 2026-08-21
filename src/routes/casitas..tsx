import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState, useEffect } from "react";
import { getCasita, buildWhatsAppLink, calculateQuote, WA_URL } from "@/lib/casitas";
import { createReservation } from "@/lib/reservations.functions";
import { getCasitaBlockedDates } from "@/lib/supabase-pms";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { AvailabilityCalendar } from "@/components/casitas/AvailabilityCalendar";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Coffee,
  Users,
  BedDouble,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/casitas/$id")({
  loader: ({ params }) => {
    const casita = getCasita(params.id);
    if (!casita) throw notFound();
    return { casita };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.casita;
    const title = c ? `${c.name} — QuinuaQ Casitas` : "Casita — QuinuaQ";
    const description = c
      ? `${c.tagline}. Reserva ${c.name} en QuinuaQ Casitas. Capacidad: ${c.capacity}.`
      : "Reserva tu casita en QuinuaQ, Quinua.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CasitaDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#F7F4EF] flex flex-col items-center justify-center text-center p-8">
      <div className="font-serif text-6xl text-[#9C7A3C]/30 mb-6">404</div>
      <h1 className="font-serif text-4xl text-[#1B1917]">Casita no encontrada</h1>
      <Link to="/casitas" className="mt-8 px-6 py-3 bg-[#1B1917] text-white text-xs uppercase tracking-wider">
        ← Volver al Catálogo de Casitas
      </Link>
    </div>
  ),
});

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function CasitaDetailPage() {
  const { casita } = Route.useLoaderData();
  const submitReservation = useServerFn(createReservation);
  useScrollReveal();

  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState(todayISO(1));
  const [checkOut, setCheckOut] = useState(todayISO(3));
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState<{
    code: string;
    waUrl: string;
  } | null>(null);

  // Fetch real-time blocked dates from Supabase for this casita
  useEffect(() => {
    let isMounted = true;
    getCasitaBlockedDates(casita.id).then((dates) => {
      if (isMounted) setBlockedDates(dates);
    });
    return () => {
      isMounted = false;
    };
  }, [casita.id]);

  // Quote calculation
  const quote = useMemo(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      return {
        nights: 0,
        weekdayNights: 0,
        weekendNights: 0,
        basePrice: 0,
        extraGuestFee: 0,
        total: 0,
        suggestedDeposit: 0,
        balanceDue: 0,
      };
    }
    return calculateQuote(casita, checkIn, checkOut, guests);
  }, [casita, checkIn, checkOut, guests]);

  const canSubmit =
    name.trim().length >= 2 &&
    phone.trim().length >= 6 &&
    quote.nights >= 1 &&
    guests >= 1 &&
    guests <= casita.maxGuests &&
    !saving;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    setError(null);

    try {
      const res = await submitReservation({
        data: {
          casita_id: casita.id,
          casita_name: casita.name,
          guest_name: name.trim(),
          guest_phone: phone.trim(),
          guest_email: email.trim() || undefined,
          check_in: checkIn,
          check_out: checkOut,
          guests,
          message: notes.trim() || undefined,
          estimated_total: quote.total,
        },
      });

      const reservationCode = res.reservationCode || res.id;
      const waUrl = buildWhatsAppLink({
        reservationCode,
        casitaName: casita.name,
        checkIn,
        checkOut,
        nights: quote.nights,
        guests,
        guestName: name.trim(),
        guestPhone: phone.trim(),
        guestEmail: email.trim() || undefined,
        estimatedTotal: quote.total,
        suggestedDeposit: quote.suggestedDeposit,
        message: notes.trim() || undefined,
      });

      setBookingSuccess({ code: reservationCode, waUrl });
      setSaving(false);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "No pudimos registrar tu solicitud. Intenta nuevamente.");
      setSaving(false);
    }
  };

  return (
    <main className="bg-[#F7F4EF] text-[#1B1917] min-h-screen font-sans">
      <SiteNav variant="solid" />

      {/* Hero Gallery Banner */}
      <div className="relative h-[65vh] min-h-[480px] overflow-hidden pt-20">
        <img
          src={casita.gallery[activeImg]}
          alt={casita.name}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#F7F4EF]" />

        {/* Breadcrumb */}
        <div className="absolute top-28 left-6 md:left-12 flex items-center gap-2 text-xs text-[#E6E0D4] z-10">
          <Link to="/" className="hover:text-[#D5B374] transition-colors">QuinuaQ Casitas</Link>
          <span>/</span>
          <Link to="/casitas" className="hover:text-[#D5B374] transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-[#F7F4EF] font-medium">{casita.name}</span>
        </div>

        {/* Gallery Thumbnails */}
        <div className="absolute bottom-8 left-6 md:left-12 flex gap-3 z-10">
          {casita.gallery.map((imgUrl: string, idx: number) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImg(idx)}
              className={`w-16 h-12 overflow-hidden border transition-all duration-300 ${
                idx === activeImg ? "border-[#9C7A3C] scale-105 shadow-md" : "border-white/30 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Casita Details & Live Calendar */}
          <div className="lg:col-span-7 space-y-12">
            {/* Title & Tagline */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1B1917]/5 text-[10px] uppercase tracking-[0.25em] text-[#9C7A3C] font-medium">
                <Users className="w-3 h-3" />
                {casita.capacity}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1B1917] font-light">
                {casita.name}
              </h1>
              <p className="font-serif text-xl italic text-[#9C7A3C]">
                {casita.tagline}
              </p>
            </div>

            <p className="text-sm md:text-base text-[#6B635A] font-light leading-relaxed">
              {casita.description}
            </p>

            {/* Rates Table */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#999084] font-medium block">
                Tarifario por Noche (PEN S/)
              </span>
              <div className="grid grid-cols-3 gap-px bg-[#1B1917]/10 border border-[#1B1917]/10">
                <div className="p-5 bg-white text-center">
                  <span className="block text-[9px] uppercase tracking-wider text-[#999084]">Lunes a Jueves</span>
                  <span className="font-serif text-2xl text-[#9C7A3C] font-medium">S/ {casita.prices.weekday}</span>
                </div>
                <div className="p-5 bg-white text-center">
                  <span className="block text-[9px] uppercase tracking-wider text-[#999084]">Viernes y Sábado</span>
                  <span className="font-serif text-2xl text-[#9C7A3C] font-medium">S/ {casita.prices.weekend}</span>
                </div>
                <div className="p-5 bg-white text-center">
                  <span className="block text-[9px] uppercase tracking-wider text-[#999084]">Feriados</span>
                  <span className="font-serif text-2xl text-[#9C7A3C] font-medium">S/ {casita.prices.holiday}</span>
                </div>
              </div>
              {casita.extraNote && (
                <p className="text-xs text-[#8C5135] italic">* {casita.extraNote}</p>
              )}
            </div>

            {/* Interactive Availability Calendar */}
            <div className="space-y-4 pt-4 border-t border-[#1B1917]/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#999084] font-medium block">
                  Calendario de Disponibilidad en Vivo
                </span>
                <p className="text-xs text-[#6B635A] mt-0.5">
                  Selecciona tus fechas directamente en el calendario interactivo.
                </p>
              </div>
              <AvailabilityCalendar
                blockedDates={blockedDates}
                checkIn={checkIn}
                checkOut={checkOut}
                onSelectRange={(inDate, outDate) => {
                  setCheckIn(inDate);
                  setCheckOut(outDate);
                }}
              />
            </div>

            {/* Included Services */}
            <div className="space-y-4 pt-4 border-t border-[#1B1917]/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#999084] font-medium block">
                Servicios & Virtudes Incluidas
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {casita.virtues.map((virtue: string) => (
                  <div key={virtue} className="flex items-center gap-3 text-xs text-[#1B1917]">
                    <Sparkles className="w-3 h-3 text-[#9C7A3C] shrink-0" />
                    <span>{virtue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Badges */}
            <div className="space-y-4 pt-4 border-t border-[#1B1917]/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#999084] font-medium block">
                Amenidades
              </span>
              <div className="flex flex-wrap gap-2">
                {casita.amenities.map((amenity: string) => (
                  <span
                    key={amenity}
                    className="text-xs px-3.5 py-1.5 bg-[#FFFFFF] border border-[#1B1917]/10 text-[#6B635A]"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#FFFFFF] border border-[#1B1917]/10 p-8 shadow-lg space-y-6">
              
              {bookingSuccess ? (
                /* Success State Modal Content */
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 bg-[#9C7A3C]/10 text-[#9C7A3C] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#9C7A3C] font-medium block">
                      ¡Solicitud Registrada!
                    </span>
                    <h3 className="font-serif text-3xl text-[#1B1917]">
                      Código: {bookingSuccess.code}
                    </h3>
                    <p className="text-xs text-[#6B635A] max-w-sm mx-auto leading-relaxed">
                      Tu reserva ha sido registrada en nuestro sistema con estado <strong>Pendiente de Confirmación</strong>.
                    </p>
                  </div>

                  <div className="bg-[#F7F4EF] p-5 border border-[#1B1917]/10 text-left space-y-2 text-xs text-[#6B635A]">
                    <p><strong>Casita:</strong> {casita.name}</p>
                    <p><strong>Fechas:</strong> {checkIn} al {checkOut} ({quote.nights} noches)</p>
                    <p><strong>Total Estadía:</strong> S/ {quote.total}</p>
                    <p><strong>Adelanto 50% requerido:</strong> S/ {quote.suggestedDeposit}</p>
                  </div>

                  <a
                    href={bookingSuccess.waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    Enviar Voucher por WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={() => setBookingSuccess(null)}
                    className="text-xs text-[#999084] underline block mx-auto hover:text-[#1B1917]"
                  >
                    Hacer otra solicitud
                  </button>
                </div>
              ) : (
                /* Booking Form */
                <>
                  <div className="border-b border-[#1B1917]/10 pb-5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#9C7A3C] font-medium">
                        Cotización Inmediata
                      </span>
                      <span className="text-xs text-[#6B635A]">
                        Desde S/ {casita.prices.weekday} / noche
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl text-[#1B1917] mt-1">{casita.name}</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                          Llegada
                        </label>
                        <input
                          type="date"
                          required
                          value={checkIn}
                          min={todayISO(0)}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] font-sans focus:outline-none focus:border-[#9C7A3C]"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                          Salida
                        </label>
                        <input
                          type="date"
                          required
                          value={checkOut}
                          min={checkIn || todayISO(1)}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] font-sans focus:outline-none focus:border-[#9C7A3C]"
                        />
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                        Huéspedes (Capacidad máx: {casita.maxGuests})
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] font-sans focus:outline-none focus:border-[#9C7A3C]"
                      >
                        {Array.from({ length: casita.maxGuests }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Huésped" : "Huéspedes"}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Guest Information */}
                    <div>
                      <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Lucía Alarcón"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] font-sans focus:outline-none focus:border-[#9C7A3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                        WhatsApp / Teléfono
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+51 946 393 256"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] font-sans focus:outline-none focus:border-[#9C7A3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                        Correo Electrónico (opcional)
                      </label>
                      <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] font-sans focus:outline-none focus:border-[#9C7A3C]"
                      />
                    </div>

                    {/* Live Financial Breakdown Box */}
                    {quote.nights > 0 && (
                      <div className="bg-[#F7F4EF] p-4 border border-[#1B1917]/10 space-y-2 text-xs">
                        <div className="flex justify-between text-[#6B635A]">
                          <span>Estadía</span>
                          <span>{quote.nights} noche{quote.nights !== 1 ? "s" : ""}</span>
                        </div>
                        {quote.weekdayNights > 0 && (
                          <div className="flex justify-between text-[#6B635A]">
                            <span>{quote.weekdayNights} noche(s) entre semana</span>
                            <span>S/ {quote.weekdayNights * casita.prices.weekday}</span>
                          </div>
                        )}
                        {quote.weekendNights > 0 && (
                          <div className="flex justify-between text-[#6B635A]">
                            <span>{quote.weekendNights} noche(s) fin de semana</span>
                            <span>S/ {quote.weekendNights * casita.prices.weekend}</span>
                          </div>
                        )}
                        {quote.extraGuestFee > 0 && (
                          <div className="flex justify-between text-[#6B635A]">
                            <span>Huéspedes adicionales</span>
                            <span>S/ {quote.extraGuestFee}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-[#1B1917]/10 flex justify-between items-baseline">
                          <span className="font-medium text-[#1B1917]">Total Estadía</span>
                          <span className="font-serif text-2xl text-[#9C7A3C]">S/ {quote.total}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-[#8C5135] pt-1">
                          <span>Adelanto sugerido (50%):</span>
                          <strong>S/ {quote.suggestedDeposit}</strong>
                        </div>
                      </div>
                    )}

                    {error && (
                      <p className="text-xs text-red-600 border border-red-600/20 bg-red-600/5 p-3">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full py-3.5 bg-[#1B1917] hover:bg-[#9C7A3C] text-white text-xs uppercase tracking-wider transition-colors duration-300 disabled:opacity-40 font-medium"
                    >
                      {saving ? "Generando solicitud..." : "Solicitar Reserva por WhatsApp →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
