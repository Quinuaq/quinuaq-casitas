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
import { HeartHandshake, Compass, Sparkles, Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuinuaQ Casitas — Refugio de Alta Montaña frente al Valle" },
      {
        name: "description",
        content:
          "Casitas privadas boutique en Quinua, Ayacucho. Vistas panorámicas al valle, fogatas bajo las estrellas, gastronomía andina y confort de lujo a 3.500 msnm.",
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
    <main className="bg-[#08140E] text-[#FBF8F1] overflow-x-hidden font-sans">
      <SiteNav variant="overlay" />
      <HeroSection />
      <BrandSection />
      <RoomsSection />
      <ExperiencesSection />
      <GallerySection />
      <QuinuaSection />
      <AmenitiesSection />
      <TestimonialsSection />
      <PurposeSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}

/* ── 1. Brand Intro Section ── */
function BrandSection() {
  return (
    <section className="py-28 md:py-44 bg-[#08140E] text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Branding watermark */}
          <div className="md:col-span-5 reveal-left">
            <span className="font-serif text-8xl md:text-9xl text-[#E2B94E]/10 select-none block -mb-8">
              01
            </span>
            <div className="space-y-3">
              <span className="label-luxury">Bienvenidos a</span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FBF8F1] font-light">
                QuinuaQ Casitas
              </h2>
              <span className="label-terracotta text-[10px] block">
                Refugio de Campo · Ayacucho
              </span>
            </div>
          </div>

          {/* Right Column: Editorial narrative */}
          <div className="md:col-span-7 space-y-6 reveal-right">
            <p className="text-lg md:text-xl text-[#A2B3A8] font-light leading-relaxed">
              En el corazón histórico de Quinua, donde la majestuosidad de los Andes abraza la tranquilidad del campo peruano, nace{" "}
              <span className="text-[#E2B94E] font-normal">QuinuaQ Casitas</span>.
            </p>

            <p className="text-sm text-[#A2B3A8] font-light leading-relaxed">
              Una propuesta boutique diseñada para viajeros que buscan desconectar del ruido urbano, habitar la serenidad y reconectarse con lo esencial a través de la arquitectura en piedra, la calidez de la madera y el servicio personalizado.
            </p>

            <blockquote className="border-l-2 border-[#E2B94E] pl-6 py-2 bg-white/[0.02]">
              <p className="font-serif text-xl sm:text-2xl italic text-[#FBF8F1] font-light">
                "Turismo con alma en tierra de historia, fuego y silencio."
              </p>
            </blockquote>

            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-white/10">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70]">Categoría</span>
                <span className="text-xs text-[#FBF8F1] mt-1 block font-medium">Casitas boutique</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70]">Ubicación</span>
                <span className="text-xs text-[#FBF8F1] mt-1 block font-medium">Quinua, Ayacucho</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70]">Altitud</span>
                <span className="text-xs text-[#FBF8F1] mt-1 block font-medium">3,500 msnm</span>
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
    <section id="quinua" className="py-28 md:py-40 bg-[#10271C] text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Photo */}
          <div className="lg:col-span-6 img-container aspect-[4/3] border border-white/10 shadow-2xl reveal-left">
            <img src={quinuaImg} alt="Pampa de Quinua al atardecer" />
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6 reveal-right">
            <span className="label-luxury">Pueblo con Encanto</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#FBF8F1] font-light">
              Quinua, tierra donde el pasado{" "}
              <em className="italic text-[#E2B94E] font-serif">vive en el presente.</em>
            </h2>

            <p className="text-sm text-[#A2B3A8] font-light leading-relaxed">
              Reconocida por la legendaria Batalla de Ayacucho de 1824 que selló la independencia de Sudamérica, Quinua conserva sus calles empedradas, iglesias coloniales y una herencia alfarera declarada Patrimonio Cultural de la Nación.
            </p>

            <p className="text-sm text-[#A2B3A8] font-light leading-relaxed">
              Desde QuinuaQ, podrás explorar la Pampa de la Quinua, recorrer talleres artesanales de cerámica en barro y caminar entre bosques nativos de queuña protegidos.
            </p>

            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-white/10">
              <div>
                <span className="font-serif text-3xl text-[#E2B94E] font-medium">1824</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#687B70] mt-0.5">Batalla de Ayacucho</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#E2B94E] font-medium">S. XVII</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#687B70] mt-0.5">Tradición Alfarera</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#E2B94E] font-medium">3,500 m</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#687B70] mt-0.5">Sobre el nivel del mar</span>
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
    <section id="proposito" className="py-28 md:py-40 bg-[#08140E] text-[#FBF8F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4 reveal">
          <span className="label-dark-gold">Turismo Sostenible & Responsable</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FBF8F1] font-light">
            Viajar también es{" "}
            <em className="italic text-[#E2B94E] font-serif">generar impacto positivo.</em>
          </h2>
          <p className="text-sm text-[#A2B3A8] font-light leading-relaxed">
            QuinuaQ Casitas comparte el propósito social del restaurante y trabaja junto al programa <span className="text-[#E2B94E] font-medium">Mama Alice</span>, fortaleciendo la formación y la empleabilidad de familias locales en Ayacucho.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Formación & Oficios",
              description: "Capacitación continua en hospitalidad, gastronomía y artesanía para jóvenes de Quinua.",
            },
            {
              num: "02",
              title: "Empleo Digno",
              description: "Generación de empleo local directo en el lodge y en la cadena de suministro agroecológica.",
            },
            {
              num: "03",
              title: "Preservación Cultural",
              description: "Protección activa del patrimonio textil, la cerámica tradicional y reforestación de queuñas.",
            },
          ].map((pillar, idx) => (
            <div
              key={pillar.num}
              className="bg-[#10271C] border border-white/10 p-8 space-y-4 hover:border-[#E2B94E]/40 transition-all duration-300 reveal group"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className="font-serif text-4xl text-[#E2B94E]/40 group-hover:text-[#E2B94E] transition-colors">{pillar.num}</span>
              <h3 className="font-serif text-2xl text-[#FBF8F1] font-light">{pillar.title}</h3>
              <p className="text-xs text-[#A2B3A8] font-light leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Concierge & Direct Booking Section ── */
function ContactSection() {
  return (
    <section id="contacto" className="py-28 md:py-40 bg-[#0D1F16] border-t border-white/10 text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8 reveal-left">
            <div className="space-y-3">
              <span className="label-luxury">Concierge & Reservas</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#FBF8F1] font-light">
                Planifica tu estadía en{" "}
                <em className="italic text-[#E2B94E] font-serif">QuinuaQ.</em>
              </h2>
            </div>

            <p className="text-sm text-[#A2B3A8] font-light leading-relaxed">
              Ponte en contacto con nuestro equipo de atención personalizada para coordinar reservas de casitas, traslados privados desde el aeropuerto de Ayacucho y experiencias gastronómicas exclusivas.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-[#A2B3A8]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E2B94E] shrink-0 mt-1" />
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70]">Atención Telefónica & WhatsApp</span>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="font-serif text-xl text-[#E2B94E] hover:text-[#F3D78A] transition-colors"
                  >
                    +51 946 393 256
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E2B94E] shrink-0 mt-1" />
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70]">Ubicación</span>
                  <p className="text-xs text-[#FBF8F1]">Quinua, Ayacucho — Perú (a 40 min de Huamanga)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#E2B94E] shrink-0 mt-1" />
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70]">Correo Electrónico</span>
                  <p className="text-xs text-[#FBF8F1]">reservas@quinuaq.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-[#10271C] border border-white/10 p-8 md:p-12 shadow-2xl reveal-right">
            <h3 className="font-serif text-2xl md:text-3xl text-[#FBF8F1] font-light mb-2">
              Consulta de Disponibilidad
            </h3>
            <p className="text-xs text-[#A2B3A8] font-light mb-8">
              O explora directamente nuestro{" "}
              <Link to="/casitas" className="text-[#E2B94E] underline hover:text-[#F3D78A]">
                catálogo con fechas en tiempo real
              </Link>.
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
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70] mb-1.5">
                    Nombre completo
                  </label>
                  <input type="text" placeholder="Ej. Carlos Mendoza" required className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70] mb-1.5">
                    Teléfono / WhatsApp
                  </label>
                  <input type="tel" placeholder="+51 946 393 256" required className="input-luxury" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70] mb-1.5">
                    Check-in
                  </label>
                  <input type="date" required className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70] mb-1.5">
                    Check-out
                  </label>
                  <input type="date" required className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70] mb-1.5">
                    Huéspedes
                  </label>
                  <select className="input-luxury bg-[#10271C] text-[#FBF8F1]">
                    <option value="1">1 Huésped</option>
                    <option value="2">2 Huéspedes</option>
                    <option value="3">3 Huéspedes</option>
                    <option value="4">4+ Huéspedes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70] mb-1.5">
                  Casita / Habitación Preferida
                </label>
                <select className="input-luxury bg-[#10271C] text-[#FBF8F1]">
                  <option value="">Cualquier opción disponible</option>
                  <option>Casita Betsy (1-2 personas)</option>
                  <option>Casita Kallen (4 personas)</option>
                  <option>Casita Kallen (2 personas)</option>
                  <option>Habitación Matrimonial (2 personas)</option>
                  <option>Habitación Dúplex (hasta 4 personas)</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.3em] text-[#687B70] mb-1.5">
                  Comentarios o solicitudes especiales
                </label>
                <textarea
                  rows={3}
                  placeholder="Ej. Traslado desde el aeropuerto de Ayacucho, alergias alimentarias, fogata privada..."
                  className="input-luxury resize-none"
                />
              </div>

              <button type="submit" className="btn-luxury-solid w-full text-center">
                Enviar Consulta Inmediata por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
