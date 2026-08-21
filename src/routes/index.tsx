import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { HeroSection } from "@/components/sections/HeroSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WA_URL } from "@/lib/casitas";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { Phone, ArrowRight, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuinuaQ Casitas — Refugio de Alta Montaña frente al Valle" },
      {
        name: "description",
        content:
          "Casitas privadas de campo en Quinua, Ayacucho. Vistas panorámicas al valle, fogatas privadas bajo las estrellas, desayuno andino y desconexión a 3.500 msnm.",
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
      <RoomsSection />
      <ExperiencesSection />
      <GallerySection />
      <TestimonialsSection />
      <ConciergeSection />
      <SiteFooter />
    </main>
  );
}

/* ── VIP Concierge & Direct Inquiries Section ── */
function ConciergeSection() {
  return (
    <section id="contacto" className="py-24 md:py-36 bg-[#08140E] text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-[#10271C] border border-white/10 p-8 md:p-14 shadow-2xl rounded-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-[10px] uppercase tracking-[0.25em] text-[#E2B94E] border border-white/10 rounded-full font-medium">
                <Sparkles className="w-3 h-3 text-[#E2B94E]" />
                Atención Personalizada
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FBF8F1] font-light">
                ¿Planeas un viaje especial a Quinua?
              </h2>
              <p className="text-sm text-[#A2B3A8] font-light leading-relaxed max-w-xl">
                Nuestro concierge está disponible para coordinar traslados privados desde el aeropuerto de Huamanga, reservas grupales o atenciones exclusivas para tu estadía.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-6 text-xs text-[#A2B3A8]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E2B94E]" />
                  <span>Tarifa oficial sin comisiones de terceros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E2B94E]" />
                  <span>Respuesta rápida por WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Right Quick Action Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="p-5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-between shadow-lg group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  <div className="text-left">
                    <span className="block font-bold">Chatear con Concierge</span>
                    <span className="text-[11px] opacity-90 lowercase font-mono">+51 946 393 256</span>
                  </div>
                </div>
                <span className="text-lg group-hover:translate-x-1 transition-transform font-serif">↗</span>
              </a>

              <a
                href="#casitas"
                className="p-5 bg-[#E2B94E] hover:bg-[#F3D78A] text-[#08140E] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-between shadow-lg group"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#08140E]" />
                  <div className="text-left">
                    <span className="block">Elegir Casita & Cotizar</span>
                    <span className="text-[11px] opacity-80 normal-case font-sans">Ver disponibilidad y fotos en vivo</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
