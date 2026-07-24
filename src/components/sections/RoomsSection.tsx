import { Link } from "@tanstack/react-router";
import { casitas } from "@/lib/casitas";

export function RoomsSection() {
  return (
    <section id="habitaciones" className="py-28 md:py-40 bg-[#0B0A09]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-7 space-y-4 reveal">
            <span className="label-luxury">Alojamiento Boutique</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F4F0E8] font-light">
              Casitas privadas{" "}
              <em className="italic text-[#C5A059] font-serif">con alma andina.</em>
            </h2>
          </div>
          <div className="md:col-span-5 reveal d2">
            <p className="text-sm text-[#9E9488] font-light leading-relaxed">
              Cada casita ha sido diseñada individualmente con acabados naturales, vistas panorámicas al valle de Quinua y calefacción para las noches del altiplano.
            </p>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casitas.map((casita, idx) => (
            <div
              key={casita.id}
              className="group bg-[#12110F] border border-[#F4F0E8]/10 flex flex-col justify-between hover:border-[#C5A059]/40 transition-all duration-500 reveal"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div>
                {/* Image Showcase */}
                <div className="img-container aspect-[4/3] relative">
                  <img
                    src={casita.cover}
                    alt={casita.name}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 glass-panel px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#C5A059]">
                    {casita.capacity}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#F4F0E8] group-hover:text-[#C5A059] transition-colors duration-300">
                      {casita.name}
                    </h3>
                    <p className="text-xs italic text-[#C5A059]/80 font-serif mt-1">
                      {casita.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#9E9488] font-light leading-relaxed line-clamp-3">
                    {casita.description}
                  </p>

                  {/* Amenities Preview */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {casita.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[10px] px-2.5 py-1 bg-[#181614] border border-[#F4F0E8]/5 text-[#9E9488]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Link */}
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-[#F4F0E8]/5 flex items-baseline justify-between">
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.25em] text-[#5E554C]">Tarifa desde</span>
                  <div className="font-serif text-2xl text-[#C5A059] mt-0.5">
                    S/ {casita.prices.weekday}
                    <span className="text-[10px] text-[#9E9488] font-sans ml-1">/ noche</span>
                  </div>
                </div>

                <Link
                  to="/casitas/$id"
                  params={{ id: casita.id }}
                  className="link-luxury text-[10px]"
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
