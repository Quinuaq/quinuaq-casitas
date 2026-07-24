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
        {/* Layered Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/40 to-[#0B0A09]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A09]/70 via-transparent to-[#0B0A09]/40" />
      </div>

      {/* Main Hero Body Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto py-12">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow Metadata */}
          <div className="reveal">
            <span className="label-luxury">
              Altipacha Select · Quinua, Ayacucho · 3,500 msnm
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[#F4F0E8] font-light reveal d1">
            Un refugio andino{" "}
            <em className="italic text-[#C5A059] font-serif">donde el silencio</em>{" "}
            se convierte en descanso.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#9E9488] font-light leading-relaxed max-w-xl reveal d2">
            Entre montañas y neblina, nace un espacio concebido para desconectar del ruido exterior y habitar la serenidad del altiplano.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4 reveal d3">
            <Link to="/" hash="habitaciones" className="btn-luxury-solid">
              Elegir Casita
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-luxury-outline"
            >
              Reservar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Key Credentials & Scroll Prompt */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full border-t border-[#F4F0E8]/10 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12">
            <div>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Altitud</span>
              <span className="font-serif text-lg text-[#F4F0E8]">3,500 msnm</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Alojamiento</span>
              <span className="font-serif text-lg text-[#F4F0E8]">5 Casitas & Suites</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Gastronomía</span>
              <span className="font-serif text-lg text-[#F4F0E8]">Desayuno Incluido</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#5E554C]">Experiencias</span>
              <span className="font-serif text-lg text-[#C5A059]">Rituales Andinos</span>
            </div>
          </div>

          {/* Scroll Prompt */}
          <div className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#9E9488]">
            <span>Descubrir</span>
            <div className="w-px h-8 bg-[#F4F0E8]/20 relative overflow-hidden">
              <div className="w-full h-full bg-[#C5A059] anim-scroll-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
