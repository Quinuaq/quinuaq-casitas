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
import { Phone, Mail, MapPin, MessageSquare, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

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
      <ConciergeSection />
      <SiteFooter />
    </main>
  );
}

/* ── 1. Brand Intro Section ── */
function BrandSection() {
  return (
    <section className="py-28 md:py-40 bg-[#08140E] text-[#FBF8F1]">
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
          <div className="lg:col-span-6 img-container aspect-[4/3] border border-white/10 shadow-2xl reveal-left rounded-lg">
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
              className="bg-[#10271C] border border-white/10 p-8 space-y-4 hover:border-[#E2B94E]/40 transition-all duration-300 reveal group rounded-lg"
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

/* ── 4. Streamlined Concierge & VIP Contact Section ── */
function ConciergeSection() {
  return (
    <section id="contacto" className="py-24 md:py-36 bg-[#0D1F16] border-t border-white/10 text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-[#10271C] border border-white/10 p-8 md:p-14 shadow-2xl rounded-xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <span className="label-luxury">Atención Personalizada & Concierge</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FBF8F1] font-light">
                ¿Planeas un viaje especial a Quinua?
              </h2>
              <p className="text-sm text-[#A2B3A8] font-light leading-relaxed max-w-xl">
                Nuestro equipo está disponible para ayudarte a coordinar traslados privados desde el aeropuerto de Huamanga, reservas grupales, experiencias gastronómicas a medida o consultas especiales.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-6 text-xs text-[#A2B3A8]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E2B94E]" />
                  <span>Mejor tarifa garantizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E2B94E]" />
                  <span>Atención directa por WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Right Quick Action Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="p-5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-between shadow-lg group"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <div className="text-left">
                    <span className="block font-bold">Chatear con Concierge</span>
                    <span className="text-[11px] opacity-90 lowercase font-mono">+51 946 393 256</span>
                  </div>
                </div>
                <span className="text-lg group-hover:translate-x-1 transition-transform">↗</span>
              </a>

              <Link
                to="/casitas"
                className="p-5 bg-[#E2B94E] hover:bg-[#F3D78A] text-[#08140E] font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-between shadow-lg group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-[#08140E]" />
                  <div className="text-left">
                    <span className="block">Explorar Catálogo & Cotizar</span>
                    <span className="text-[11px] opacity-80 normal-case font-sans">Disponibilidad en vivo en las 5 casitas</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
