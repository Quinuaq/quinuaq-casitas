import { Link } from "@tanstack/react-router";
import { casitas } from "@/lib/casitas";

export function RoomsSection() {
  return (
    <section id="habitaciones" className="py-28 md:py-40 bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-7 space-y-4 reveal">
            <span className="label-luxury">Alojamiento Boutique</span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1B1917] font-light">
              Casitas privadas{" "}
              <em className="italic text-[#9C7A3C] font-serif">con alma andina.</em>
            </h2>
          </div>
          <div className="md:col-span-5 reveal d2">
            <p className="text-sm text-[#6B635A] font-light leading-relaxed">
              Cada casita ha sido diseñada individualmente con acabados naturales, vistas panorámicas al valle de Quinua y calefacción para las noches del altiplano.
            </p>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casitas.map((casita, idx) => (
            <div
              key={casita.id}
              className="group bg-[#FFFFFF] border border-[#1B1917]/8 flex flex-col justify-between hover:border-[#9C7A3C]/40 hover:shadow-xl transition-all duration-500 reveal"
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              <div>
                {/* Image Showcase */}
                <div className="img-container aspect-[4/3] relative">
                  <img
                    src={casita.cover}
                    alt={casita.name}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#F7F4EF]/90 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#8C5135] font-medium border border-[#1B1917]/5">
                    {casita.capacity}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#1B1917] group-hover:text-[#9C7A3C] transition-colors duration-300">
                      {casita.name}
                    </h3>
                    <p className="text-xs italic text-[#8C5135] font-serif mt-1">
                      {casita.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#6B635A] font-light leading-relaxed line-clamp-3">
                    {casita.description}
                  </p>

                  {/* Amenities Preview */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {casita.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[10px] px-2.5 py-1 bg-[#F7F4EF] border border-[#1B1917]/5 text-[#6B635A]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Link */}
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-[#1B1917]/5 flex items-baseline justify-between">
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.25em] text-[#999084]">Tarifa desde</span>
                  <div className="font-serif text-2xl text-[#9C7A3C] mt-0.5">
                    S/ {casita.prices.weekday}
                    <span className="text-[10px] text-[#6B635A] font-sans ml-1">/ noche</span>
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
