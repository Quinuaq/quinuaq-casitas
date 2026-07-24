import { createFileRoute, Link, notFound, useNavigate, useServerFn } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getCasita, buildWhatsAppLink, WA_URL } from "@/lib/casitas";
import { createReservation } from "@/lib/reservations.functions";
import { SiteNav, SiteFooter } from "@/components/site-nav";

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
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="font-serif text-4xl">Casita no encontrada</h1>
      <Link to="/" className="mt-6 text-clay underline">Volver al lodge</Link>
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
  const navigate = useNavigate();
  const submit = useServerFn(createReservation);

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
      // Redirige a WhatsApp
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "No pudimos guardar la reserva.");
      setSaving(false);
    }
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteNav variant="solid" />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-clay">Valley Q</Link>
        <span className="mx-2">/</span>
        <Link to="/" hash="habitaciones" className="hover:text-clay">Casitas</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{casita.name}</span>
      </div>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-8 md:py-12 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/3] overflow-hidden bg-mist">
            <img
              src={casita.gallery[activeImg]}
              alt={casita.name}
              className="w-full h-full object-cover"
              width={1400}
              height={1050}
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {casita.gallery.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`aspect-[4/3] overflow-hidden border-2 transition ${
                  i === activeImg ? "border-clay" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={g} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="eyebrow">{casita.capacity}</span>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">{casita.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground italic font-serif">{casita.tagline}</p>

          <p className="mt-6 text-foreground/80 leading-relaxed font-light">{casita.description}</p>

          <div className="mt-10">
            <h3 className="eyebrow">Virtudes</h3>
            <ul className="mt-4 space-y-2">
              {casita.virtues.map((v) => (
                <li key={v} className="flex gap-3 text-sm">
                  <span className="text-clay mt-1">✦</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h3 className="eyebrow">Amenidades</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {casita.amenities.map((a) => (
                <span key={a} className="text-xs px-3 py-1 border border-border rounded-full text-muted-foreground">
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border border-border p-6 bg-card">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Lun–Vie</div>
              <div className="font-serif text-2xl mt-1">S/ {casita.prices.weekday}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Sáb–Dom</div>
              <div className="font-serif text-2xl mt-1">S/ {casita.prices.weekend}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Feriados</div>
              <div className="font-serif text-2xl mt-1 text-clay">S/ {casita.prices.holiday}</div>
            </div>
            {casita.extraNote && (
              <div className="col-span-3 text-xs text-muted-foreground pt-2 border-t border-border">
                {casita.extraNote}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="reservar" className="bg-mist/40 border-y border-border py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="text-center mb-10">
            <span className="eyebrow">Reserva tu estadía</span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Completa tus datos y confirma por WhatsApp</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Guardamos tu solicitud y te enviamos a WhatsApp con todos los detalles listos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-background border border-border p-6 md:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Check-in">
                <input type="date" required min={todayISO(0)} value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (e.target.value >= checkOut) {
                      const d = new Date(e.target.value + "T00:00:00");
                      d.setDate(d.getDate() + 1);
                      setCheckOut(d.toISOString().slice(0, 10));
                    }
                  }}
                  className={inputCls}
                />
              </Field>
              <Field label="Check-out">
                <input type="date" required min={checkIn} value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)} className={inputCls} />
              </Field>
            </div>

            <Field label={`Huéspedes (máx. ${casita.maxGuests})`}>
              <input type="number" min={1} max={casita.maxGuests} required value={guests}
                onChange={(e) => setGuests(Math.max(1, Math.min(casita.maxGuests, Number(e.target.value) || 1)))}
                className={inputCls}
              />
            </Field>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Nombre completo">
                <input type="text" required minLength={2} maxLength={120} value={name}
                  onChange={(e) => setName(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Teléfono / WhatsApp">
                <input type="tel" required minLength={6} value={phone}
                  onChange={(e) => setPhone(e.target.value)} placeholder="+51 …" className={inputCls} />
              </Field>
            </div>

            <Field label="Email (opcional)">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
            </Field>

            <Field label="Mensaje o solicitud especial (opcional)">
              <textarea rows={3} maxLength={1000} value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Traslados, dieta especial, fogata privada…"
                className={inputCls}
              />
            </Field>

            {/* Summary */}
            <div className="border border-border bg-mist/50 p-5 space-y-2 text-sm">
              <Row label="Casita" value={casita.name} />
              <Row label="Noches" value={String(nights)} />
              <Row label="Subtotal" value={`S/ ${subtotal}`} />
              {extraGuestFee > 0 && <Row label="Huéspedes extra" value={`S/ ${extraGuestFee}`} />}
              <div className="pt-2 border-t border-border flex justify-between font-serif text-xl">
                <span>Total estimado</span>
                <span className="text-clay">S/ {total}</span>
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Tarifas de feriados pueden aplicar según fechas — te lo confirmamos por WhatsApp.
              </p>
            </div>

            {error && (
              <div className="text-sm text-destructive border border-destructive/40 bg-destructive/5 p-3">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!canSubmit}
                className="flex-1 bg-clay text-ivory px-8 py-4 rounded-sm hover:bg-ember transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Enviando…" : "Reservar por WhatsApp →"}
              </button>
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="text-center border border-border px-6 py-4 rounded-sm hover:bg-mist transition"
              >
                Solo escribir
              </a>
            </div>

            <p className="text-[11px] text-muted-foreground text-center">
              Al enviar guardamos tu solicitud y te redirigimos a WhatsApp con los detalles precargados.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

const inputCls =
  "w-full px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
