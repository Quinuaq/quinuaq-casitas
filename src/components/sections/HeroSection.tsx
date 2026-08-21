import { Link } from "@tanstack/react-router";
import { WA_URL } from "@/lib/casitas";
import heroValley from "@/assets/hero-valley.jpg";

export function HeroSection() {
  return (
    <section id="top" className="relative min-h-[720px] h-[100svh] max-h-[920px] overflow-hidden flex items-end">
      <div className="absolute inset-0">
        <img src={heroValley} alt="Casitas de QuinuaQ frente al valle de Quinua" className="w-full h-full object-cover object-center anim-drift scale-105" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10271C]/90 via-[#10271C]/48 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10271C]/80 via-transparent to-[#10271C]/35" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 pb-10 md:pb-12">
        <div className="max-w-[760px] pb-12 md:pb-16">
          <p className="label-dark-gold mb-6">Casitas de campo · Quinua, Ayacucho · 3.500 m</p>
          <h1 className="font-serif text-[52px] sm:text-6xl lg:text-[88px] leading-[.88] tracking-[-.04em] text-[#FBF8F1] font-normal">
            Dormir cerca<br />
            <em className="italic text-[#E2B94E] font-normal">del silencio.</em>
          </h1>
          <p className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-white/78 font-normal">
            Casitas privadas frente al valle, desayunos con producto local y noches de fogata para volver a escuchar el campo.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/" hash="habitaciones" className="casitas-book casitas-book-light min-w-[196px]">Conocer las casitas <span>↗</span></Link>
            <a href={WA_URL} target="_blank" rel="noreferrer" className="casitas-book casitas-book-dark min-w-[196px]">Consultar fechas <span>↗</span></a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
          <div><small className="block text-[11px] uppercase tracking-[.15em] text-[#E2B94E]">Alojamiento</small><strong className="block mt-1 font-serif text-xl text-white font-normal">5 casitas & suites</strong></div>
          <div><small className="block text-[11px] uppercase tracking-[.15em] text-[#E2B94E]">Cada mañana</small><strong className="block mt-1 font-serif text-xl text-white font-normal">Desayuno incluido</strong></div>
          <div><small className="block text-[11px] uppercase tracking-[.15em] text-[#E2B94E]">Experiencia</small><strong className="block mt-1 font-serif text-xl text-white font-normal">Campo y fogata</strong></div>
          <div><small className="block text-[11px] uppercase tracking-[.15em] text-[#E2B94E]">Ubicación</small><strong className="block mt-1 font-serif text-xl text-white font-normal">Quinua, Ayacucho</strong></div>
        </div>
      </div>
    </section>
  );
}
