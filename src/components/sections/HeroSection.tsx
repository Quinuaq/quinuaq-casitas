import { Link } from "@tanstack/react-router";
import { WA_URL } from "@/lib/casitas";
import heroValley from "@/assets/hero-valley.jpg";

export function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-12">
      {/* Background Image with Ambient Drift */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroValley}
          alt="Valley Q Lodge entre las montañas de Quinua, Ayacucho"
          className="w-full h-full object-cover object-center anim-drift scale-105"
          fetchPriority="high"
        />
        {/* Layered Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12110F] via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto py-12">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow Metadata Badge */}
          <div className="reveal">
            <span className="label-dark-gold">
              Altipacha Select · Quinua, Ayacucho · 3,500 msnm
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[#F7F4EF] font-light reveal d1">
            Un refugio andino{" "}
            <em className="italic text-[#D5B374] font-serif">donde el silencio</em>{" "}
            se convierte en descanso.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#E6E0D4] font-light leading-relaxed max-w-xl reveal d2">
            Entre montañas y neblina, nace un espacio concebido para desconectar del ruido exterior y habitar la serenidad del altiplano.
          </p>

          {/* Call to Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4 reveal d3">
            <Link
              to="/"
              hash="habitaciones"
              className="py-4 px-8 bg-[#D5B374] text-[#12110F] font-medium text-[10px] uppercase tracking-[0.35em] hover:bg-[#EBD2A2] transition-all duration-300"
            >
              Elegir Casita
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="py-4 px-8 border border-[#F7F4EF]/40 text-[#F7F4EF] font-medium text-[10px] uppercase tracking-[0.35em] hover:border-[#D5B374] hover:text-[#D5B374] transition-all duration-300"
            >
              Reservar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Credentials & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full border-t border-[#F7F4EF]/15 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Key Credentials Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12">
            <div>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Altitud</span>
              <span className="font-serif text-lg text-[#F7F4EF]">3,500 msnm</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Alojamiento</span>
              <span className="font-serif text-lg text-[#F7F4EF]">5 Casitas & Suites</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Gastronomía</span>
              <span className="font-serif text-lg text-[#F7F4EF]">Desayuno Incluido</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#999084]">Experiencias</span>
              <span className="font-serif text-lg text-[#D5B374]">Rituales Andinos</span>
            </div>
          </div>

          {/* Scroll Prompt */}
          <div className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#E6E0D4]">
            <span>Descubrir</span>
            <div className="w-px h-8 bg-[#F7F4EF]/20 relative overflow-hidden">
              <div className="w-full h-full bg-[#D5B374] anim-scroll-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
