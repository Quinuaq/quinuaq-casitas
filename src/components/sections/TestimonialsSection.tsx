import { useState } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "QuinuaQ superó todas nuestras expectativas. Las vistas del valle al amanecer son simplemente mágicas. La calidez del equipo y el desayuno andino hicieron de nuestra estancia un recuerdo inolvidable.",
    author: "María C. & Rodrigo V.",
    location: "Lima, Perú",
    stay: "Casita Betsy",
  },
  {
    quote:
      "Un lugar fuera del tiempo. Las noches de fogata bajo las estrellas y el silencio del altiplano nos devolvieron la paz que necesitábamos. Altamente recomendado.",
    author: "Ana Laura M.",
    location: "Buenos Aires, Argentina",
    stay: "Casita Kallen",
  },
  {
    quote:
      "La comida de leña y la tranquilidad del entorno fueron espectaculares. Un refugio impecable, acogedor y con un nivel de detalle único en Ayacucho.",
    author: "Familia Herrera",
    location: "Cusco, Perú",
    stay: "Habitación Dúplex Familiar",
  },
  {
    quote:
      "Quinua es un destino imprescindible. QuinuaQ combina autenticidad cultural, integración con el paisaje andino y una hospitalidad humana de primer nivel.",
    author: "Thomas B.",
    location: "París, Francia",
    stay: "Casita Matrimonial",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const active = TESTIMONIALS[current];

  return (
    <section className="py-28 md:py-40 bg-[#08140E] border-y border-white/10 text-[#FBF8F1]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="space-y-4 reveal">
          <div className="flex justify-center gap-1 text-[#E2B94E] mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="label-luxury">Experiencias de Huéspedes</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FBF8F1] font-light">
            Palabras de quienes{" "}
            <em className="italic text-[#E2B94E] font-serif">habitaron el refugio.</em>
          </h2>
        </div>

        {/* Testimonial Quote */}
        <div className="mt-12 min-h-[200px] flex flex-col justify-between reveal d2">
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FBF8F1] font-light italic leading-relaxed">
            "{active.quote}"
          </blockquote>

          <div className="mt-8 space-y-1">
            <span className="block font-medium text-sm text-[#E2B94E]">{active.author}</span>
            <span className="block text-xs uppercase tracking-[0.25em] text-[#A2B3A8]">
              {active.location} · <span className="text-[#E07A5F]">{active.stay}</span>
            </span>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-10 flex justify-center items-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                current === idx ? "w-8 bg-[#E2B94E]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Ver testimonio ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
