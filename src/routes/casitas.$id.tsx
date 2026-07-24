import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { getCasita, casitas, buildWhatsAppLink, WA_URL } from "@/lib/casitas";
import { createReservation } from "@/lib/reservations.functions";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { useScrollReveal } from "@/hooks/useScrollAnimation";

export const Route = createFileRoute("/casitas/$id")({
  loader: ({ params }) => {
    const casita = getCasita(params.id);
    if (!casita) throw notFound();
    return { casita };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.casita;
    const title = c ? `${c.name} — Valley Q Lodge` : "Casita — Valley Q Lodge";
    const description = c
      ? `${c.tagline}. Reserva ${c.name} en Valley Q Lodge, Quinua. Capacidad: ${c.capacity}.`
      : "Reserva tu casita en Valley Q Lodge, Quinua.";
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
  component: CasitaDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0B0A09] flex flex-col items-center justify-center text-center p-8">
      <div className="font-serif text-6xl text-[#C5A059]/30 mb-6">404</div>
      <h1 className="font-serif text-4xl text-[#F4F0E8]">Casita no encontrada</h1>
      <Link to="/" className="mt-8 btn-luxury-outline">
        ← Volver al Lodge
      </Link>
    </div>
  ),
});

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function isWeekend(dateISO: string) {
  const d = new Date(dateISO + "T00:00:00");
  const day = d.getDay();
  return day === 0 || day === 6;
}

function CasitaDetail() {
  const { casita } = Route.useLoaderData();
  const submit = useServerFn(createReservation);
  useScrollReveal();

  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState(todayISO(1));
  const [checkOut, setCheckOut] = useState(todayISO(2));
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { nights, subtotal, extraGuestFee, total } = useMemo(() => {
    const inD = new Date(checkIn + "T00:00:00");
    const outD = new Date(checkOut + "T00:00:00");
    const diff = Math.max(0, Math.round((outD.getTime() - inD.getTime()) / 86400000));
    let sub = 0;
    for (let i = 0; i < diff; i++) {
      const d = new Date(inD);
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      sub += isWeekend(iso) ? casita.prices.weekend : casita.prices.weekday;
    }
    const extra =
      casita.id === "duplex" && guests > 2 ? (guests - 2) * 50 * diff : 0;
    return { nights: diff, subtotal: sub, extraGuestFee: extra, total: sub + extra };
  }, [checkIn, checkOut, guests, casita]);

  const canSubmit =
    name.trim().length >= 2 &&
    phone.trim().length >= 6 &&
    nights >= 1 &&
    guests >= 1 &&
    guests <= casita.maxGuests &&
    !saving;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    setError(null);
    try {
      await submit({
        data: {
          casita_id: casita.id,
          casita_name: casita.name,
          guest_name: name.trim(),
          guest_phone: phone.trim(),
          guest_email: email.trim() || undefined,
          check_in: checkIn,
          check_out: checkOut,
          guests,
          message: message.trim() || undefined,
          estimated_total: total,
        },
      });
      const url = buildWhatsAppLink({
        casitaName: casita.name,
        checkIn,
        checkOut,
        nights,
        guests,
        guestName: name.trim(),
        guestPhone: phone.trim(),
        guestEmail: email.trim() || undefined,
        estimatedTotal: total,
        message: message.trim() || undefined,
      });
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "No pudimos guardar la reserva.");
      setSaving(false);
    }
  };

  return (
    <main className="bg-[#0B0A09] text-[#F4F0E8] min-h-screen">
      <SiteNav variant="solid" />

      {/* Hero Showcase Gallery */}
      <div className="relative h-[65vh] min-h-[480px] overflow-hidden pt-20">
        <img
          src={casita.gallery[activeImg]}
          alt={casita.name}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0B0A09]" />

        {/* Breadcrumb Navigation */}
        <div className="absolute top-28 left-6 md:left-12 flex items-center gap-2 text-xs text-[#9E9488]">
          <Link to="/" className="hover:text-[#C5A059] transition-colors">Valley Q</Link>
          <span>/</span>
          <Link to="/" hash="habitaciones" className="hover:text-[#C5A059] transition-colors">Alojamiento</Link>
          <span>/</span>
          <span className="text-[#F4F0E8] font-medium">{casita.name}</span>
        </div>

        {/* Gallery Thumbnails Overlay */}
        <div className="absolute bottom-8 left-6 md:left-12 flex gap-3">
          {casita.gallery.map((imgUrl: string, idx: number) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImg(idx)}
              className={`w-16 h-12 overflow-hidden border transition-all duration-300 ${
                idx === activeImg ? "border-[#C5A059] scale-105" : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Detail Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Description & Specifications */}
          <div className="lg:col-span-7 space-y-12">
            {/* Room Title Header */}
            <div className="space-y-2 reveal">
              <span className="label-luxury">{casita.capacity}</span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F4F0E8] font-light">
                {casita.name}
              </h1>
              <p className="font-serif text-xl italic text-[#C5A059]">
                {casita.tagline}
              </p>
            </div>

            <p className="text-base text-[#9E9488] font-light leading-relaxed reveal d1">
              {casita.description}
            </p>

            {/* Rates Table */}
            <div className="space-y-4 reveal d2">
              <span className="label-luxury text-[10px]">Tarifario por Noche</span>
              <div className="grid grid-cols-3 gap-px bg-[#F4F0E8]/10 border border-[#F4F0E8]/10">
                {[
                  { label: "Lun – Vie", price: casita.prices.weekday },
                  { label: "Sáb – Dom", price: casita.prices.weekend },
                  { label: "Feriados", price: casita.prices.holiday },
                ].map((item) => (
                  <div key={item.label} className="p-6 bg-[#12110F] text-center space-y-1">
                    <span className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C]">
                      {item.label}
                    </span>
                    <span className="font-serif text-2xl text-[#C5A059]">
                      S/ {item.price}
                    </span>
                  </div>
                ))}
              </div>
              {casita.extraNote && (
                <p className="text-xs text-[#9E9488] italic">* {casita.extraNote}</p>
              )}
            </div>

            {/* Included Services / Virtues */}
            <div className="space-y-4 reveal d3">
              <span className="label-luxury text-[10px]">Servicios Incluidos</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {casita.virtues.map((virtue: string) => (
                  <div key={virtue} className="flex items-center gap-3 text-xs text-[#F4F0E8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>{virtue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Badges */}
            <div className="space-y-4 reveal d4">
              <span className="label-luxury text-[10px]">Amenidades del Espacio</span>
              <div className="flex flex-wrap gap-2">
                {casita.amenities.map((amenity: string) => (
                  <span
                    key={amenity}
                    className="text-xs px-3.5 py-1.5 bg-[#12110F] border border-[#F4F0E8]/10 text-[#9E9488]"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Booking Widget */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#12110F] border border-[#F4F0E8]/10 p-8 space-y-6">
              <div className="border-b border-[#F4F0E8]/10 pb-6">
                <span className="label-luxury text-[10px]">Reserva Inmediata</span>
                <h2 className="font-serif text-2xl text-[#F4F0E8] mt-1">{casita.name}</h2>
                <p className="text-xs text-[#9E9488] mt-1">Desayuno andino incluido</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C] mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      required
                      min={todayISO(0)}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C] mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      required
                      min={checkIn}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="input-luxury"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C] mb-1">
                    Huéspedes (máx. {casita.maxGuests})
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={casita.maxGuests}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="input-luxury"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C] mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="input-luxury"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C] mb-1">
                    WhatsApp / Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+51 900 000 000"
                    className="input-luxury"
                  />
                </div>

                {/* Total Summary Box */}
                <div className="bg-[#0B0A09] p-4 border border-[#F4F0E8]/5 space-y-2 text-xs">
                  <div className="flex justify-between text-[#9E9488]">
                    <span>Duración</span>
                    <span>{nights} {nights === 1 ? "noche" : "noches"}</span>
                  </div>
                  <div className="flex justify-between text-[#9E9488]">
                    <span>Subtotal</span>
                    <span>S/ {subtotal}</span>
                  </div>
                  {extraGuestFee > 0 && (
                    <div className="flex justify-between text-[#9E9488]">
                      <span>Huéspedes extra</span>
                      <span>S/ {extraGuestFee}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#F4F0E8]/10 flex justify-between items-baseline">
                    <span className="font-medium text-[#F4F0E8]">Estimado Total</span>
                    <span className="font-serif text-2xl text-[#C5A059]">S/ {total}</span>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-400 border border-red-400/20 bg-red-400/5 p-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-luxury-solid w-full text-center disabled:opacity-40"
                >
                  {saving ? "Procesando..." : "Confirmar por WhatsApp →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
