import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState, useEffect } from "react";
import { getCasita, buildWhatsAppLink, calculateQuote, WA_URL } from "@/lib/casitas";
import { createReservation } from "@/lib/reservations.functions";
import { getCasitaBlockedDates } from "@/lib/supabase-pms";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { AvailabilityCalendar } from "@/components/casitas/AvailabilityCalendar";
import roomImage from "@/assets/room.jpg";
import { todayISO, nextDateISO } from "@/lib/stay-dates";

export const Route = createFileRoute("/casitas/$id")({
  validateSearch: (search: Record<string, unknown>) => ({
    checkIn:
      typeof search.checkIn === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search.checkIn)
        ? search.checkIn
        : "",
    checkOut:
      typeof search.checkOut === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search.checkOut)
        ? search.checkOut
        : "",
    guests: Number.isFinite(Number(search.guests)) ? Number(search.guests) : 2,
  }),
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
    <div className="min-h-screen bg-[#08140E] flex flex-col items-center justify-center text-center p-8 text-[#FBF8F1]">
      <div className="font-serif text-6xl text-[#E2B94E]/30 mb-6">404</div>
      <h1 className="font-serif text-4xl text-[#FBF8F1]">Casita no encontrada</h1>
      <Link
        to="/casitas"
        className="mt-8 px-6 py-3 bg-[#E2B94E] text-[#08140E] text-xs uppercase tracking-wider font-semibold"
      >
        ← Volver al Catálogo de Casitas
      </Link>
    </div>
  ),
});

function CasitaDetailPage() {
  const { casita } = Route.useLoaderData();
  const submitReservation = useServerFn(createReservation);
  const initialSearch = Route.useSearch();

  const [activeImg, setActiveImg] = useState(0);
  const [checkIn, setCheckIn] = useState(initialSearch.checkIn || todayISO(1));
  const [checkOut, setCheckOut] = useState(initialSearch.checkOut || todayISO(3));
  const [guests, setGuests] = useState(
    Math.max(1, Math.min(casita.maxGuests, initialSearch.guests)),
  );
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

  const dateWarning =
    checkIn < todayISO()
      ? "Elige una llegada a partir de hoy."
      : blockedDates.some((date) => date >= checkIn && date < checkOut)
        ? "Estas fechas incluyen una noche no disponible. Prueba con otra estancia o consúltanos por WhatsApp."
        : null;

  const canSubmit =
    name.trim().length >= 2 &&
    phone.trim().length >= 6 &&
    quote.nights >= 1 &&
    guests >= 1 &&
    guests <= casita.maxGuests &&
    !dateWarning &&
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
      setError(
        err instanceof Error
          ? err.message
          : "No pudimos registrar tu solicitud. Intenta nuevamente.",
      );
      setSaving(false);
    }
  };

  const photos = [
    {
      src: roomImage,
      alt: "Ambientación referencial de un dormitorio; no corresponde a una casita específica",
      caption:
        "Imagen de ambientación referencial. Solicita fotografías de la casita antes de reservar.",
    },
    {
      src: "/images/atardecer-quinuaq.png",
      alt: "Atardecer sobre el valle desde QuinuaQ",
      caption: "El entorno de QuinuaQ · fotografía del paisaje.",
    },
  ];
  return (
    <div className="qq-public">
      <SiteNav variant="solid" />
      <main id="contenido" tabIndex={-1} className="qq-detail">
        <div className="qq-wrap">
          <nav className="qq-breadcrumb" aria-label="Ubicación de la página">
            <Link to="/">Casitas QuinuaQ</Link>
            <span aria-hidden="true">/</span>
            <Link to="/casitas">Las casitas</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{casita.name}</span>
          </nav>
          <div className="qq-detail-heading">
            <div>
              <p className="qq-eyebrow">{casita.capacity}</p>
              <h1>{casita.name}</h1>
              <p>{casita.tagline}</p>
            </div>
            <a href="#solicitud" className="qq-button">
              Consultar mi estancia <span aria-hidden="true">↗</span>
            </a>
          </div>
          <figure className="qq-detail-gallery">
            <img src={photos[activeImg].src} alt={photos[activeImg].alt} fetchPriority="high" />
            <div className="qq-gallery-controls">
              {photos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  aria-pressed={index === activeImg}
                  onClick={() => setActiveImg(index)}
                >
                  {index === 0 ? "Ambientación referencial" : "El entorno de QuinuaQ"}
                </button>
              ))}
            </div>
            <figcaption>{photos[activeImg].caption}</figcaption>
          </figure>
          <div className="qq-detail-layout">
            <div className="qq-detail-description">
              <section>
                <p className="qq-eyebrow">Tu estancia</p>
                <h2>Una pausa en el campo.</h2>
                <p>{casita.description}</p>
              </section>
              <section>
                <h2>Tarifas por noche</h2>
                <p className="qq-detail-note">
                  Precios en soles. Consulta la tarifa final para tus fechas antes de confirmar.
                </p>
                <dl className="qq-rates">
                  <div>
                    <dt>Domingo a jueves</dt>
                    <dd>S/ {casita.prices.weekday}</dd>
                  </div>
                  <div>
                    <dt>Viernes y sábado</dt>
                    <dd>S/ {casita.prices.weekend}</dd>
                  </div>
                  <div>
                    <dt>Feriados</dt>
                    <dd>S/ {casita.prices.holiday}</dd>
                  </div>
                </dl>
                {casita.extraNote && <p className="qq-detail-note">{casita.extraNote}</p>}
              </section>
              <section>
                <h2>Elige tus fechas</h2>
                <p className="qq-detail-note">
                  Selecciona tu llegada y después tu salida. El equipo confirmará la disponibilidad
                  de tu estancia.
                </p>
                <div className="qq-calendar">
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
              </section>
              <section>
                <h2>El espacio</h2>
                <ul className="qq-virtues">
                  {casita.virtues.map((virtue) => (
                    <li key={virtue}>{virtue}</li>
                  ))}
                </ul>
                <h3>Incluido en tu estancia</h3>
                <ul className="qq-amenities">
                  {casita.amenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
              </section>
              <aside className="qq-detail-assistance">
                <p>¿Tienes una consulta sobre accesibilidad, tu grupo o las fechas?</p>
                <a href={WA_URL} target="_blank" rel="noreferrer" className="qq-text-link">
                  Conversemos antes de reservar <span aria-hidden="true">↗</span>
                </a>
              </aside>
            </div>
            <aside id="solicitud" className="qq-booking-panel" aria-label="Solicitud de estancia">
              {bookingSuccess ? (
                <div className="qq-booking-success" role="status">
                  <p className="qq-eyebrow">Solicitud recibida</p>
                  <h2>Ahora, coordinemos tu visita.</h2>
                  <p>
                    Tu solicitud <strong>{bookingSuccess.code}</strong> está pendiente de
                    confirmación. Escríbenos para verificar las fechas y los detalles del pago.
                  </p>
                  <dl className="qq-quote">
                    <div>
                      <dt>Casita</dt>
                      <dd>{casita.name}</dd>
                    </div>
                    <div>
                      <dt>Fechas</dt>
                      <dd>
                        {checkIn} al {checkOut}
                      </dd>
                    </div>
                    <div>
                      <dt>Total estimado</dt>
                      <dd>S/ {quote.total}</dd>
                    </div>
                    <div>
                      <dt>Adelanto sugerido</dt>
                      <dd>S/ {quote.suggestedDeposit}</dd>
                    </div>
                  </dl>
                  <a
                    href={bookingSuccess.waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="qq-button"
                  >
                    Continuar por WhatsApp <span aria-hidden="true">↗</span>
                  </a>
                  <button
                    type="button"
                    className="qq-text-link"
                    onClick={() => setBookingSuccess(null)}
                  >
                    Hacer otra solicitud
                  </button>
                </div>
              ) : (
                <>
                  <p className="qq-eyebrow">Reserva directa</p>
                  <h2>Planea tu estancia.</h2>
                  <p className="qq-detail-note">
                    Desde <strong>S/ {casita.prices.weekday}</strong> por noche.
                  </p>
                  <form onSubmit={handleSubmit} className="qq-booking-form">
                    <div className="qq-date-fields">
                      <label htmlFor="arrival">
                        Llegada
                        <input
                          id="arrival"
                          type="date"
                          required
                          value={checkIn}
                          min={todayISO(0)}
                          onChange={(event) => {
                            const value = event.target.value;
                            setCheckIn(value);
                            if (value && checkOut <= value) setCheckOut(nextDateISO(value));
                          }}
                        />
                      </label>
                      <label htmlFor="departure">
                        Salida
                        <input
                          id="departure"
                          type="date"
                          required
                          value={checkOut}
                          min={checkIn ? nextDateISO(checkIn) : todayISO(1)}
                          onChange={(event) => setCheckOut(event.target.value)}
                        />
                      </label>
                    </div>
                    {dateWarning && (
                      <p role="status" className="qq-form-warning">
                        {dateWarning}
                      </p>
                    )}
                    <label htmlFor="guests">
                      Huéspedes
                      <select
                        id="guests"
                        value={guests}
                        onChange={(event) => setGuests(Number(event.target.value))}
                      >
                        {Array.from({ length: casita.maxGuests }, (_, i) => i + 1).map((number) => (
                          <option key={number} value={number}>
                            {number} {number === 1 ? "persona" : "personas"}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="guest-name">
                      Nombre completo
                      <input
                        id="guest-name"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="¿A nombre de quién?"
                      />
                    </label>
                    <label htmlFor="guest-phone">
                      WhatsApp o teléfono
                      <input
                        id="guest-phone"
                        type="tel"
                        required
                        minLength={6}
                        autoComplete="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="+51"
                      />
                    </label>
                    <label htmlFor="guest-email">
                      Correo electrónico <span>(opcional)</span>
                      <input
                        id="guest-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="correo@ejemplo.com"
                      />
                    </label>
                    <details className="qq-booking-notes">
                      <summary>¿Quieres contarnos algo más?</summary>
                      <label htmlFor="guest-notes">
                        Tu mensaje
                        <textarea
                          id="guest-notes"
                          rows={3}
                          value={notes}
                          onChange={(event) => setNotes(event.target.value)}
                        />
                      </label>
                    </details>
                    {quote.nights > 0 ? (
                      <div className="qq-quote-summary">
                        <dl className="qq-quote">
                          <div>
                            <dt>Estancia</dt>
                            <dd>
                              {quote.nights} {quote.nights === 1 ? "noche" : "noches"}
                            </dd>
                          </div>
                          {quote.weekdayNights > 0 && (
                            <div>
                              <dt>{quote.weekdayNights} noche(s) entre semana</dt>
                              <dd>S/ {quote.weekdayNights * casita.prices.weekday}</dd>
                            </div>
                          )}
                          {quote.weekendNights > 0 && (
                            <div>
                              <dt>{quote.weekendNights} noche(s) de fin de semana</dt>
                              <dd>S/ {quote.weekendNights * casita.prices.weekend}</dd>
                            </div>
                          )}
                          {quote.extraGuestFee > 0 && (
                            <div>
                              <dt>Personas adicionales</dt>
                              <dd>S/ {quote.extraGuestFee}</dd>
                            </div>
                          )}
                          <div className="qq-quote-total">
                            <dt>Total estimado</dt>
                            <dd>S/ {quote.total}</dd>
                          </div>
                          <div>
                            <dt>Adelanto sugerido (50%)</dt>
                            <dd>S/ {quote.suggestedDeposit}</dd>
                          </div>
                        </dl>
                        <p>
                          La estimación no aplica tarifas de feriados automáticamente. Confirmaremos
                          el importe final contigo.
                        </p>
                      </div>
                    ) : (
                      <p className="qq-form-warning">
                        Elige una fecha de salida posterior a tu llegada.
                      </p>
                    )}
                    {error && (
                      <p role="alert" className="qq-form-warning">
                        {error}
                      </p>
                    )}
                    <button type="submit" disabled={!canSubmit} className="qq-button">
                      {saving ? "Enviando solicitud…" : "Solicitar mi estancia"}
                      <span aria-hidden="true">↗</span>
                    </button>
                    <p className="qq-form-disclaimer">
                      Esta solicitud no confirma una reserva ni realiza un cobro. Nuestro equipo
                      coordinará los siguientes pasos contigo.
                    </p>
                  </form>
                </>
              )}
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
