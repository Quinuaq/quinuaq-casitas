import { createFileRoute, Link } from "@tanstack/react-router";
import { WA_URL } from "@/lib/casitas";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import quinuaImg from "@/assets/quinua.jpg";
import heroValley from "@/assets/hero-valley.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valley Q Lodge — Refugio Boutique Andino de Lujo en Quinua | Altipacha" },
      {
        name: "description",
        content:
          "Valley Q Lodge, experiencia boutique de lujo by Altipacha Hotels en Quinua, Ayacucho. Casitas privadas con vista al valle, fogatas nocturnas, cocina vivencial y turismo con propósito a 3,500 msnm.",
      },
      { property: "og:title", content: "Valley Q Lodge — Refugio Andino de Lujo en Quinua" },
      {
        property: "og:description",
        content: "Entre montañas y neblina, un refugio boutique donde el silencio se convierte en descanso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useScrollReveal();

  return (
    <main className="bg-[#0B0A09] text-[#F4F0E8] overflow-x-hidden">
      <SiteNav variant="overlay" />
      <HeroSection />
      <BrandSection />
      <ExperiencesSection />
      <RoomsSection />
      <GallerySection />
      <QuinuaSection />
      <TestimonialsSection />
      <AmenitiesSection />
      <PurposeSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}

/* ── 1. Brand Intro Section ── */
function BrandSection() {
  return (
    <section className="py-28 md:py-44 bg-[#0B0A09]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Branding watermark */}
          <div className="md:col-span-5 reveal-left">
            <span className="font-serif text-8xl md:text-9xl text-[#C5A059]/10 select-none block -mb-8">
              01
            </span>
            <div className="space-y-3">
              <span className="label-luxury">Bienvenidos a</span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4F0E8] font-light">
                Valley Q Lodge
              </h2>
              <span className="label-taupe text-[10px] block">
                An Altipacha Estate · Quinua
              </span>
            </div>
          </div>

          {/* Right Column: Editorial narrative */}
          <div className="md:col-span-7 space-y-6 reveal-right">
            <p className="text-lg md:text-xl text-[#9E9488] font-light leading-relaxed">
              En el corazón histórico de Quinua, donde la majestuosidad de los Andes abraza la tranquilidad del campo peruano, nace{" "}
              <span className="text-[#C5A059] font-normal">Valley Q Lodge</span>.
            </p>

            <p className="text-sm text-[#9E9488] font-light leading-relaxed">
              Una propuesta boutique gestada por Altipacha Hotels, diseñada para viajeros exigentes que buscan desconectar del ruido urbano, habitar la serenidad y reconectarse con lo esencial a través de la arquitectura andina y el servicio personalizado.
            </p>

            <blockquote className="border-l border-[#C5A059]/40 pl-6 py-1">
              <p className="font-serif text-xl sm:text-2xl italic text-[#F4F0E8] font-light">
                "Turismo con alma en tierra de historia y silencio."
              </p>
            </blockquote>

            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-[#F4F0E8]/10">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Categoría</span>
                <span className="text-xs text-[#F4F0E8] mt-1 block">Boutique Lodge</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Ubicación</span>
                <span className="text-xs text-[#F4F0E8] mt-1 block">Quinua, Ayacucho</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Altitud</span>
                <span className="text-xs text-[#F4F0E8] mt-1 block">3,500 msnm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Quinua Destination Section ── */
function QuinuaSection() {
  return (
    <section id="quinua" className="py-28 md:py-40 bg-[#12110F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Photo */}
          <div className="lg:col-span-6 img-container aspect-[4/3] border border-[#F4F0E8]/10 reveal-left">
            <img src={quinuaImg} alt="Pampa de Quinua al atardecer" />
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6 reveal-right">
            <span className="label-luxury">Pueblo con Encanto</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#F4F0E8] font-light">
              Quinua, tierra donde el pasado{" "}
              <em className="italic text-[#C5A059] font-serif">vive en el presente.</em>
            </h2>

            <p className="text-sm text-[#9E9488] font-light leading-relaxed">
              Reconocida por la legendaria Batalla de Ayacucho de 1824 que sello la independencia de Sudamérica, Quinua conserva sus calles empedradas, iglesias coloniales y una herencia alfarera declarada Patrimonio Cultural de la Nación.
            </p>

            <p className="text-sm text-[#9E9488] font-light leading-relaxed">
              Desde Valley Q, podrás explorar la Pampa de la Quinua, recorrer talleres artesanales de cerámica en barro y caminar entre bosques nativos de queuña protegidos.
            </p>

            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-[#F4F0E8]/10">
              <div>
                <span className="font-serif text-2xl text-[#C5A059]">1824</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C] mt-0.5">Batalla de Ayacucho</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#C5A059]">S. XVII</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C] mt-0.5">Tradición Alfarera</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#C5A059]">3,500 m</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C] mt-0.5">Sobre el nivel del mar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Social Purpose & NGO Section ── */
function PurposeSection() {
  return (
    <section id="proposito" className="py-28 md:py-40 bg-[#0B0A09] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4 reveal">
          <span className="label-luxury">Turismo Sostenible & Responsable</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F4F0E8] font-light">
            Viajar también es{" "}
            <em className="italic text-[#C5A059] font-serif">generar impacto positivo.</em>
          </h2>
          <p className="text-sm text-[#9E9488] font-light leading-relaxed">
            Valley Q es parte de Altipacha Hotels y trabaja en alianza directa con la ONG <span className="text-[#C5A059]">Quinua Q</span> y el programa social <span className="text-[#C5A059]">Mamá Alis</span>, capacitando e impulsando la empleabilidad de familias locales en Ayacucho.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Formación & Oficios",
              description: "Capacitación continua en hospitalidad y artesanía para jóvenes y comuneros de Quinua.",
            },
            {
              num: "02",
              title: "Empleo Digno",
              description: "Generación de empleo local directo en el lodge y la cadena de suministro gastronómica.",
            },
            {
              num: "03",
              title: "Preservación Cultural",
              description: "Protección activa del patrimonio textil, la cerámica tradicional y la reforestación de queuñas.",
            },
          ].map((pillar, idx) => (
            <div
              key={pillar.num}
              className="bg-[#12110F] border border-[#F4F0E8]/5 p-8 space-y-4 hover:border-[#C5A059]/30 transition-all duration-300 reveal"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <span className="font-serif text-4xl text-[#C5A059]/40">{pillar.num}</span>
              <h3 className="font-serif text-2xl text-[#F4F0E8] font-light">{pillar.title}</h3>
              <p className="text-xs text-[#9E9488] font-light leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Concierge & Reservation Form Section ── */
function ContactSection() {
  return (
    <section id="contacto" className="py-28 md:py-40 bg-[#12110F] border-t border-[#F4F0E8]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8 reveal-left">
            <div className="space-y-3">
              <span className="label-luxury">Concierge & Reservas</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#F4F0E8] font-light">
                Planifica tu estadía en{" "}
                <em className="italic text-[#C5A059] font-serif">Valley Q.</em>
              </h2>
            </div>

            <p className="text-sm text-[#9E9488] font-light leading-relaxed">
              Ponte en contacto con nuestro equipo de atención personalizada para coordinar reservas de casitas, traslados privados desde el aeropuerto de Ayacucho y experiencias gastronómicas exclusivas.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#F4F0E8]/10">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Atención Inmediata</span>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-serif text-xl text-[#C5A059] hover:text-[#DBC086] transition-colors"
                >
                  WhatsApp: +51 921 500 056
                </a>
              </div>

              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Oficina Central</span>
                <p className="text-xs text-[#9E9488] font-light">
                  Jirón 28 de Julio N° 527, Huamanga, Ayacucho
                </p>
                <p className="text-xs text-[#9E9488] font-light">Teléfono: (066) 280 891</p>
              </div>

              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Correo Electrónico</span>
                <p className="text-xs text-[#9E9488] font-light">reservas@altipachahotel.com</p>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0B0A09] border border-[#F4F0E8]/10 p-8 md:p-12 reveal-right">
            <h3 className="font-serif text-2xl md:text-3xl text-[#F4F0E8] font-light mb-2">
              Solicitud de Reserva
            </h3>
            <p className="text-xs text-[#9E9488] font-light mb-8">
              Completa los datos de tu viaje y te responderemos a la brevedad con la disponibilidad confirmada.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(WA_URL, "_blank");
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C] mb-1.5">
                    Nombre completo
                  </label>
                  <input type="text" placeholder="Ej. Carlos Mendoza" required className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C] mb-1.5">
                    Teléfono / WhatsApp
                  </label>
                  <input type="tel" placeholder="+51 900 000 000" required className="input-luxury" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C] mb-1.5">
                    Check-in
                  </label>
                  <input type="date" required className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C] mb-1.5">
                    Check-out
                  </label>
                  <input type="date" required className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C] mb-1.5">
                    Huéspedes
                  </label>
                  <select className="input-luxury">
                    <option>1 Huésped</option>
                    <option defaultValue="2">2 Huéspedes</option>
                    <option>3 Huéspedes</option>
                    <option>4+ Huéspedes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C] mb-1.5">
                  Casita / Habitación Preferida
                </label>
                <select className="input-luxury">
                  <option value="">Seleccionar opción...</option>
                  <option>Casita Betsy (1-2 personas)</option>
                  <option>Casita Kallen (4 personas)</option>
                  <option>Casita Kallen (2 personas)</option>
                  <option>Habitación Matrimonial (2 personas)</option>
                  <option>Habitación Dúplex (hasta 4 personas)</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C] mb-1.5">
                  Comentarios o solicitudes especiales
                </label>
                <textarea
                  rows={3}
                  placeholder="Ej. Traslado desde el aeropuerto de Ayacucho, alergias alimentarias, fogata privada..."
                  className="input-luxury resize-none"
                />
              </div>

              <button type="submit" className="btn-luxury-solid w-full text-center">
                Enviar Consulta por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
