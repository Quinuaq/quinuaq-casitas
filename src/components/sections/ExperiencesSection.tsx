import fogataImg from "@/assets/fogata.jpg";
import cocinaImg from "@/assets/cocina.jpg";
import quinuaImg from "@/assets/quinua.jpg";
import { Sparkles, Flame, UtensilsCrossed, Landmark } from "lucide-react";

export function ExperiencesSection() {
  const pillars = [
    {
      icon: Flame,
      title: "Noches de Fogata & Estrellas",
      subtitle: "Silencio y calor de altiplano",
      description:
        "Al caer la tarde, encendemos el fuego en tu casita. Disfruta de leña seleccionada, mantas abrigadoras y el espectáculo del cielo andino en absoluta calma a 3,500 metros de altitud.",
      image: fogataImg,
      perks: ["Fogata privada en cada casita", "Mantas térmicas y leña", "Cielos despejados para astronomía"],
    },
    {
      icon: UtensilsCrossed,
      title: "Cocina de Leña & Desayuno",
      subtitle: "Sabores de nuestra despensa",
      description:
        "Cada mañana te espera un desayuno andino artesanal con panes calientes, quesos de la zona y café de altura, además de acceso directo a la carta de autor del Restaurante QuinuaQ.",
      image: cocinaImg,
      perks: ["Desayuno andino incluido", "Insumos locales y papa nativa", "Conexión directa con el restaurante"],
    },
    {
      icon: Landmark,
      title: "Patrimonio & Propósito Social",
      subtitle: "Quinua 1824 y artesanía viva",
      description:
        "Explora la histórica Pampa de la Quinua y talleres de cerámica tradicional. A través de nuestra alianza con el programa Mama Alice, tu estancia apoya la educación y el empleo de familias locales.",
      image: quinuaImg,
      perks: ["Talleres de cerámica tradicional", "Cuna histórica de Sudamérica", "Alianza social con Mama Alice"],
    },
  ];

  return (
    <section id="experiencias" className="py-24 md:py-36 bg-[#0D1F16] text-[#FBF8F1] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-[10px] uppercase tracking-[0.25em] text-[#E2B94E] border border-white/10 rounded-full font-medium">
            <Sparkles className="w-3 h-3" />
            La Experiencia QuinuaQ
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FBF8F1] font-light">
            Tres razones para{" "}
            <em className="italic text-[#E2B94E] font-serif">habitar el refugio.</em>
          </h2>
          <p className="text-sm text-[#A2B3A8] font-light leading-relaxed">
            Más que una habitación, una estancia diseñada para reconectar con el fuego, la tierra y el descanso auténtico.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#10271C] border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#E2B94E]/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group"
              >
                <div>
                  <div className="img-container aspect-[16/10] relative">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="absolute top-4 left-4 w-9 h-9 bg-[#08140E]/85 backdrop-blur-md rounded-full flex items-center justify-center text-[#E2B94E] border border-[#E2B94E]/30">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#E07A5F] font-medium block">
                        {item.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-[#FBF8F1] mt-1 group-hover:text-[#E2B94E] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#A2B3A8] font-light leading-relaxed">
                      {item.description}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-white/10 text-xs text-[#FBF8F1]">
                      {item.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E2B94E]" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
