import { Link } from "@tanstack/react-router";
import { getCasita } from "@/lib/casitas";
import { ArrowRight, Users, Sparkles, Flame, BedDouble } from "lucide-react";

export function RoomsSection() {
  const betsy = getCasita("betsy");
  const kallen4 = getCasita("kallen-4p");
  const duplex = getCasita("duplex");

  const highlights = [
    {
      casita: betsy,
      category: "Escapadas de Pareja",
      tagline: "Intimidad, chimenea y vistas panorámicas",
      capacity: "1 a 2 huéspedes",
      startingPrice: 280,
      image: betsy?.cover || "",
    },
    {
      casita: kallen4,
      category: "Suites Familiares",
      tagline: "Espacios amplios con terraza y fogata privada",
      capacity: "Hasta 4 huéspedes",
      startingPrice: 380,
      image: kallen4?.cover || "",
    },
    {
      casita: duplex,
      category: "Dúplex & Grupos",
      tagline: "Dos niveles de confort frente a los Andes",
      capacity: "Hasta 6 huéspedes",
      startingPrice: 480,
      image: duplex?.cover || "",
    },
  ];

  return (
    <section id="habitaciones" className="py-28 md:py-36 bg-[#08140E] text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-3 reveal">
            <span className="label-luxury">Colección Exclusiva</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FBF8F1] font-light">
              Nuestras Casitas{" "}
              <em className="italic text-[#E2B94E] font-serif">en el valle.</em>
            </h2>
          </div>
          <div className="max-w-md space-y-3 reveal d2">
            <p className="text-sm text-[#A2B3A8] font-light leading-relaxed">
              Cada refugio ha sido construido con piedra y madera de queuña, diseñado para ofrecer privacidad absoluta y despertar con la luz del amanecer andino.
            </p>
            <Link
              to="/casitas"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E2B94E] hover:text-[#F3D78A] transition-colors font-bold"
            >
              <span>Ver catálogo completo con 5 casitas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Curated Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={item.category}
              className="group bg-[#10271C] border border-white/10 flex flex-col justify-between hover:border-[#E2B94E]/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-500 rounded-lg overflow-hidden reveal"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div>
                {/* Photo */}
                <div className="img-container aspect-[16/10] relative">
                  <img
                    src={item.image}
                    alt={item.category}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#08140E]/85 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#E2B94E] font-medium border border-[#E2B94E]/30 rounded">
                    {item.capacity}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#E07A5F] font-medium block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#FBF8F1] group-hover:text-[#E2B94E] transition-colors">
                    {item.casita?.name}
                  </h3>
                  <p className="text-xs text-[#A2B3A8] font-light leading-relaxed">
                    {item.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="p-6 md:p-8 pt-4 border-t border-white/10 flex items-center justify-between bg-[#08140E]/40">
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-[#687B70]">Desde</span>
                  <span className="font-serif text-2xl text-[#E2B94E] font-medium">S/ {item.startingPrice} <small className="text-xs text-[#A2B3A8] font-sans">/ noche</small></span>
                </div>
                <Link
                  to="/casitas/$id"
                  params={{ id: item.casita?.id || "betsy" }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E2B94E] hover:bg-[#F3D78A] text-[#08140E] text-xs uppercase tracking-wider font-bold rounded transition-colors"
                >
                  <span>Reservar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Banner to Catalog */}
        <div className="bg-[#10271C]/70 border border-white/10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 rounded-lg">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-2xl text-[#FBF8F1]">
              ¿Buscas fechas específicas o filtros por capacidad?
            </h4>
            <p className="text-xs text-[#A2B3A8]">
              Revisa la disponibilidad en vivo y cotiza de inmediato en nuestro catálogo interactivo.
            </p>
          </div>
          <Link
            to="/casitas"
            className="btn-luxury-solid px-8 py-3.5 text-xs font-bold shrink-0 rounded"
          >
            Abrir Catálogo con Filtros →
          </Link>
        </div>
      </div>
    </section>
  );
}
