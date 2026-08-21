import { Link } from "@tanstack/react-router";
import { casitas } from "@/lib/casitas";
import { ArrowRight, Sparkles, Users } from "lucide-react";

export function RoomsSection() {
  return (
    <section id="habitaciones" className="py-28 md:py-40 bg-[#08140E] text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-7 space-y-4 reveal">
            <span className="label-luxury">Alojamiento Boutique</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FBF8F1] font-light">
              Casitas privadas{" "}
              <em className="italic text-[#E2B94E] font-serif">con alma andina.</em>
            </h2>
          </div>
          <div className="md:col-span-5 flex flex-col items-start md:items-end justify-between gap-4 reveal d2">
            <p className="text-sm text-[#A2B3A8] font-light leading-relaxed">
              Cada casita ha sido diseñada individualmente con acabados naturales, vistas panorámicas al valle de Quinua y calefacción para las noches del altiplano.
            </p>
            <Link
              to="/casitas"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E2B94E] hover:text-[#F3D78A] transition-colors font-medium"
            >
              <span>Ver catálogo completo con filtros</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casitas.map((casita, idx) => (
            <div
              key={casita.id}
              className="group bg-[#10271C] border border-white/10 flex flex-col justify-between hover:border-[#E2B94E]/50 hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)] transition-all duration-500 reveal"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div>
                {/* Image Showcase */}
                <div className="img-container aspect-[4/3] relative">
                  <img
                    src={casita.cover}
                    alt={casita.name}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#08140E]/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-[#E2B94E] font-medium border border-[#E2B94E]/20 flex items-center gap-1.5">
                    <Users className="w-3 h-3" />
                    <span>{casita.capacity}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#FBF8F1] group-hover:text-[#E2B94E] transition-colors duration-300">
                      {casita.name}
                    </h3>
                    <p className="text-xs italic text-[#E07A5F] font-serif mt-1">
                      {casita.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#A2B3A8] font-light leading-relaxed line-clamp-3">
                    {casita.description}
                  </p>

                  {/* Amenities Preview */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {casita.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 text-[#C2CCC6]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Link */}
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.25em] text-[#687B70]">Tarifa desde</span>
                  <div className="font-serif text-2xl text-[#E2B94E] mt-0.5 font-medium">
                    S/ {casita.prices.weekday}
                    <span className="text-[10px] text-[#A2B3A8] font-sans ml-1">/ noche</span>
                  </div>
                </div>

                <Link
                  to="/casitas/$id"
                  params={{ id: casita.id }}
                  className="link-luxury text-[10px] text-[#FBF8F1] hover:text-[#E2B94E]"
                >
                  Detalles
                  <span className="line" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
