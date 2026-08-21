import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import heroValley from "@/assets/hero-valley.jpg";
import { Calendar, Users, ArrowRight, Sparkles } from "lucide-react";

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function HeroSection() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(todayISO(1));
  const [checkOut, setCheckOut] = useState(todayISO(3));
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/casitas" as any,
      search: {
        checkIn,
        checkOut,
        guests,
        category: "all",
      },
    });
  };

  return (
    <section id="top" className="relative min-h-[750px] lg:min-h-[860px] overflow-hidden flex flex-col justify-between pt-28 pb-12">
      {/* Background Image & Atmospheric Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroValley}
          alt="Casitas de QuinuaQ frente al valle de Quinua"
          className="w-full h-full object-cover object-center anim-drift scale-105"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08140E]/95 via-[#08140E]/65 to-[#08140E]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08140E] via-transparent to-[#08140E]/60" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 my-auto">
        <div className="max-w-[800px] space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-[#E2B94E] border border-white/15 rounded-full font-medium">
            <Sparkles className="w-3 h-3 text-[#E2B94E]" />
            Refugio de Alta Montaña · 3,500 msnm · Quinua, Ayacucho
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight text-[#FBF8F1] font-light">
            Dormir cerca<br />
            <em className="italic text-[#E2B94E] font-serif font-light">del silencio.</em>
          </h1>

          <p className="max-w-xl text-base md:text-lg leading-relaxed text-[#A2B3A8] font-light">
            Casitas privadas de piedra y madera frente al valle histórico. Noches de fogata, chimenea encendida y desayunos andinos con producto local.
          </p>
        </div>

        {/* Floating Quick Availability Search Bar */}
        <div className="mt-10 max-w-4xl bg-[#10271C]/90 backdrop-blur-xl border border-white/15 p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-lg">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-[#687B70] mb-1 font-medium flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#E2B94E]" />
                Llegada
              </label>
              <input
                type="date"
                required
                value={checkIn}
                min={todayISO(0)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#08140E] border border-white/10 px-3 py-2.5 text-xs text-[#FBF8F1] font-sans focus:outline-none focus:border-[#E2B94E] rounded"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-[#687B70] mb-1 font-medium flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#E2B94E]" />
                Salida
              </label>
              <input
                type="date"
                required
                value={checkOut}
                min={checkIn || todayISO(1)}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#08140E] border border-white/10 px-3 py-2.5 text-xs text-[#FBF8F1] font-sans focus:outline-none focus:border-[#E2B94E]"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.2em] text-[#687B70] mb-1 font-medium flex items-center gap-1.5">
                <Users className="w-3 h-3 text-[#E2B94E]" />
                Huéspedes
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#08140E] border border-white/10 px-3 py-2.5 text-xs text-[#FBF8F1] font-sans focus:outline-none focus:border-[#E2B94E] rounded"
              >
                <option value={1}>1 Persona</option>
                <option value={2}>2 Personas</option>
                <option value={3}>3 Personas</option>
                <option value={4}>4 Personas</option>
                <option value={5}>5 Personas</option>
                <option value={6}>6 Personas</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#E2B94E] hover:bg-[#F3D78A] text-[#08140E] text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md rounded"
            >
              <span>Ver Disponibilidad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Prestige Stats Bar */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-8">
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#E2B94E]">Alojamiento</span>
            <strong className="block mt-0.5 font-serif text-xl text-white font-light">5 Casitas Boutique</strong>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#E2B94E]">Cada Mañana</span>
            <strong className="block mt-0.5 font-serif text-xl text-white font-light">Desayuno de Altura</strong>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#E2B94E]">Altitud</span>
            <strong className="block mt-0.5 font-serif text-xl text-white font-light">3,500 msnm</strong>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#E2B94E]">Ubicación</span>
            <strong className="block mt-0.5 font-serif text-xl text-white font-light">Quinua, Ayacucho</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
