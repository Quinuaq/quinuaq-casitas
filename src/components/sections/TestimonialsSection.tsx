import { useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Valley Q superó todas nuestras expectativas. Las vistas del valle al amanecer son simplemente mágicas. La calidez del equipo y el desayuno andino hicieron de nuestra estancia un recuerdo inolvidable.",
    author: "María C. & Rodrigo V.",
    location: "Lima, Perú",
    stay: "Casita Betsy",
  },
  {
    quote:
      "Un lugar fuera del tiempo. Las noches de fogata bajo las estrellas y el silencio del altiplano nos devolvieron la paz que necesitábamos.",
    author: "Ana Laura M.",
    location: "Buenos Aires, Argentina",
    stay: "Casita Kallen",
  },
  {
    quote:
      "La experiencia de cocina vivencial fue mi favorita. Aprender la preparación de potajes andinos con insumos nativos fue fascinante. Lodge impecable y acogedor.",
    author: "Familia Herrera",
    location: "Cusco, Perú",
    stay: "Habitación Dúplex",
  },
  {
    quote:
      "Quinua es un destino imprescindible. Valley Q combina sostenibilidad, integración con la comunidad y una atención humana excepcional.",
    author: "Thomas B.",
    location: "París, Francia",
    stay: "Casita Kallen 2p",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const active = TESTIMONIALS[current];

  return (
    <section className="py-28 md:py-40 bg-[#EFEAE1] border-y border-[#1B1917]/8">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="space-y-4 reveal">
          <span className="label-luxury">Experiencias de Huéspedes</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1B1917] font-light">
            Palabras de quienes{" "}
            <em className="italic text-[#9C7A3C] font-serif">habitaron el refugio.</em>
          </h2>
        </div>

        {/* Testimonial Quote */}
        <div className="mt-12 min-h-[220px] flex flex-col justify-between reveal d2">
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1B1917] font-light italic leading-relaxed">
            "{active.quote}"
          </blockquote>

          <div className="mt-8 space-y-1">
            <span className="block font-medium text-sm text-[#1B1917]">{active.author}</span>
            <span className="block text-xs uppercase tracking-[0.25em] text-[#6B635A]">
              {active.location} · <span className="text-[#8C5135]">{active.stay}</span>
            </span>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-10 flex justify-center items-center gap-4">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1 transition-all duration-300 ${
                current === idx ? "w-8 bg-[#9C7A3C]" : "w-2 bg-[#1B1917]/20 hover:bg-[#1B1917]/40"
              }`}
              aria-label={`Ver testimonio ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
