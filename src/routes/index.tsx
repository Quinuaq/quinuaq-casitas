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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuinuaQ Casitas — Refugio de campo frente al valle" },
      {
        name: "description",
        content:
          "Casitas privadas de QuinuaQ con vista al valle, desayuno andino, fogatas y experiencias de campo en Quinua, Ayacucho.",
      },
      { property: "og:title", content: "QuinuaQ Casitas — Dormir cerca del silencio" },
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
    <main className="bg-[#F7F4EF] text-[#1B1917] overflow-x-hidden">
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
    <section className="py-28 md:py-44 bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Branding watermark */}
          <div className="md:col-span-5 reveal-left">
            <span className="font-serif text-8xl md:text-9xl text-[#9C7A3C]/15 select-none block -mb-8">
              01
            </span>
            <div className="space-y-3">
              <span className="label-luxury">Bienvenidos a</span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1B1917] font-light">
                QuinuaQ Casitas
              </h2>
              <span className="label-terracotta text-[10px] block">
                By QuinuaQ · Ayacucho
              </span>
            </div>
          </div>

          {/* Right Column: Editorial narrative */}
          <div className="md:col-span-7 space-y-6 reveal-right">
            <p className="text-lg md:text-xl text-[#6B635A] font-light leading-relaxed">
              En el corazón histórico de Quinua, donde la majestuosidad de los Andes abraza la tranquilidad del campo peruano, nace{" "}
              <span className="text-[#9C7A3C] font-normal">QuinuaQ Casitas</span>.
            </p>

            <p className="text-sm text-[#6B635A] font-light leading-relaxed">
              Una propuesta boutique impulsada por QuinuaQ, diseñada para viajeros exigentes que buscan desconectar del ruido urbano, habitar la serenidad y reconectarse con lo esencial a través de la arquitectura andina y el servicio personalizado.
            </p>

            <blockquote className="border-l border-[#9C7A3C]/40 pl-6 py-1">
              <p className="font-serif text-xl sm:text-2xl italic text-[#1B1917] font-light">
                "Turismo con alma en tierra de historia y silencio."
              </p>
            </blockquote>

            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-[#1B1917]/10">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Categoría</span>
                <span className="text-xs text-[#1B1917] mt-1 block">Casitas boutique</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Ubicación</span>
                <span className="text-xs text-[#1B1917] mt-1 block">Quinua, Ayacucho</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Altitud</span>
                <span className="text-xs text-[#1B1917] mt-1 block">3,500 msnm</span>
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
    <section id="quinua" className="py-28 md:py-40 bg-[#EFEAE1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Photo */}
          <div className="lg:col-span-6 img-container aspect-[4/3] border border-[#1B1917]/8 shadow-sm reveal-left">
            <img src={quinuaImg} alt="Pampa de Quinua al atardecer" />
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6 reveal-right">
            <span className="label-luxury">Pueblo con Encanto</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1B1917] font-light">
              Quinua, tierra donde el pasado{" "}
              <em className="italic text-[#9C7A3C] font-serif">vive en el presente.</em>
            </h2>

            <p className="text-sm text-[#6B635A] font-light leading-relaxed">
              Reconocida por la legendaria Batalla de Ayacucho de 1824 que sello la independencia de Sudamérica, Quinua conserva sus calles empedradas, iglesias coloniales y una herencia alfarera declarada Patrimonio Cultural de la Nación.
            </p>

            <p className="text-sm text-[#6B635A] font-light leading-relaxed">
              Desde QuinuaQ, podrás explorar la Pampa de la Quinua, recorrer talleres artesanales de cerámica en barro y caminar entre bosques nativos de queuña protegidos.
            </p>

            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-[#1B1917]/10">
              <div>
                <span className="font-serif text-2xl text-[#9C7A3C]">1824</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mt-0.5">Batalla de Ayacucho</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#9C7A3C]">S. XVII</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mt-0.5">Tradición Alfarera</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#9C7A3C]">3,500 m</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mt-0.5">Sobre el nivel del mar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Social Purpose & NGO Section (Nocturnal Contrast) ── */
function PurposeSection() {
  return (
    <section id="proposito" className="py-28 md:py-40 bg-[#12110F] text-[#F7F4EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4 reveal">
          <span className="label-dark-gold">Turismo Sostenible & Responsable</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7F4EF] font-light">
            Viajar también es{" "}
            <em className="italic text-[#D5B374] font-serif">generar impacto positivo.</em>
          </h2>
          <p className="text-sm text-[#999084] font-light leading-relaxed">
            QuinuaQ Casitas comparte el propósito social del restaurante y trabaja junto al programa <span className="text-[#D5B374]">Mama Alice</span>, fortaleciendo la formación y la empleabilidad de familias locales en Ayacucho.
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
              className="bg-[#1B1917] border border-[#F7F4EF]/8 p-8 space-y-4 hover:border-[#D5B374]/30 transition-all duration-300 reveal"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <span className="font-serif text-4xl text-[#D5B374]/40">{pillar.num}</span>
              <h3 className="font-serif text-2xl text-[#F7F4EF] font-light">{pillar.title}</h3>
              <p className="text-xs text-[#999084] font-light leading-relaxed">{pillar.description}</p>
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
    <section id="contacto" className="py-28 md:py-40 bg-[#F7F4EF] border-t border-[#1B1917]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8 reveal-left">
            <div className="space-y-3">
              <span className="label-luxury">Concierge & Reservas</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1B1917] font-light">
                Planifica tu estadía en{" "}
                <em className="italic text-[#9C7A3C] font-serif">QuinuaQ.</em>
              </h2>
            </div>

            <p className="text-sm text-[#6B635A] font-light leading-relaxed">
              Ponte en contacto con nuestro equipo de atención personalizada para coordinar reservas de casitas, traslados privados desde el aeropuerto de Ayacucho y experiencias gastronómicas exclusivas.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#1B1917]/10">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Atención Inmediata</span>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-serif text-xl text-[#9C7A3C] hover:text-[#B59253] transition-colors"
                >
                  WhatsApp: +51 930 678 951
                </a>
              </div>

              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Ubicación</span>
                <p className="text-xs text-[#6B635A] font-light">
                  Quinua, Ayacucho — Perú
                </p>
                <p className="text-xs text-[#6B635A] font-light">Central: +51 930 678 951</p>
              </div>

              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Correo Electrónico</span>
                <p className="text-xs text-[#6B635A] font-light">reservas@quinuaq.com</p>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#1B1917]/8 p-8 md:p-12 shadow-sm reveal-right">
            <h3 className="font-serif text-2xl md:text-3xl text-[#1B1917] font-light mb-2">
              Solicitud de Reserva
            </h3>
            <p className="text-xs text-[#6B635A] font-light mb-8">
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
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#999084] mb-1.5">
                    Nombre completo
                  </label>
                  <input type="text" placeholder="Ej. Carlos Mendoza" required className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#999084] mb-1.5">
                    Teléfono / WhatsApp
                  </label>
                  <input type="tel" placeholder="+51 930 678 951" required className="input-luxury" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#999084] mb-1.5">
                    Check-in
                  </label>
                  <input type="date" required className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#999084] mb-1.5">
                    Check-out
                  </label>
                  <input type="date" required className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#999084] mb-1.5">
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
                <label className="block text-[9px] uppercase tracking-[0.3em] text-[#999084] mb-1.5">
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
                <label className="block text-[9px] uppercase tracking-[0.3em] text-[#999084] mb-1.5">
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
