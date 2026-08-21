import { useState } from "react";
import fogataImg from "@/assets/fogata.jpg";
import alpacasImg from "@/assets/alpacas.jpg";
import cocinaImg from "@/assets/cocina.jpg";
import quinuaImg from "@/assets/quinua.jpg";

const EXPERIENCES = [
  {
    id: "naturaleza",
    title: "Naturaleza",
    subtitle: "Vistas panorámicas al valle de Quinua",
    description:
      "Desde las terrazas de QuinuaQ, contemplarás el horizonte andino a 3.500 metros de altitud. Camina por senderos rodeados de árboles de queuña y observa las nieblas del amanecer.",
    image: quinuaImg,
    highlights: [
      "Terrazas privadas con vista al valle",
      "Bosque nativo de queuñas centenarias",
      "Cielos despejados para observación astronómica",
      "Amaneceres entre nieblas andinas",
    ],
  },
  {
    id: "gastronomia",
    title: "Gastronomía Andina",
    subtitle: "Cocina de origen con insumos locales",
    description:
      "Nuestros chefs rinden homenaje a la despensa ayacuchana. Disfruta de desayunos andinos incluidos cada mañana y talleres de cocina vivencial donde la papa nativa, los granos andinos y frutos locales son los protagonistas.",
    image: cocinaImg,
    highlights: [
      "Desayuno andino artesanal incluido",
      "Clases de cocina vivencial con insumos locales",
      "Coctelería de autor con hierbas y frutos nativos",
      "Pachamanca tradicional previa coordinación",
    ],
  },
  {
    id: "rituales",
    title: "Rituales & Fuego",
    subtitle: "Conexión ancestral bajo el cielo andino",
    description:
      "Las noches en el altiplano invitan a la reunión alrededor del fuego. Ofrecemos fogatas privadas para cada casita, rituales de agradecimiento a la Pachamama y espacios de contemplación en absoluta calma.",
    image: fogataImg,
    highlights: [
      "Fogatas privadas bajo las estrellas",
      "Ceremonia de pago a la tierra (Pachamama)",
      "Lecturas y relatos de la tradición local",
      "Espacios de silencio y meditación",
    ],
  },
  {
    id: "bienestar",
    title: "Bienestar & Alpacas",
    subtitle: "Arte, tejido y vida en armonía",
    description:
      "Comparte la energía apacible de nuestras alpacas residentes y descubre la tradición textil de Quinua con artesanas locales. Próximamente dispondremos de un santuario de rituales de bienestar andino.",
    image: alpacasImg,
    highlights: [
      "Convivencia con alpacas en el lodge",
      "Talleres de tejido andino tradicional",
      "Visita guiada a talleres cerámicos de Quinua",
      "Spa de bienestar andino (Próximamente)",
    ],
  },
];

export function ExperiencesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = EXPERIENCES[activeTab];

  return (
    <section id="experiencias" className="py-28 md:py-40 bg-[#EFEAE1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4 reveal">
          <span className="label-luxury">Experiencias Exclusivas</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1B1917] font-light">
            Habitar la calma{" "}
            <em className="italic text-[#9C7A3C] font-serif">en el altiplano.</em>
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 md:gap-8 border-b border-[#1B1917]/10 mb-12 reveal d1">
          {EXPERIENCES.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => setActiveTab(idx)}
              className={`pb-4 text-xs uppercase tracking-[0.3em] font-medium transition-all relative focus:outline-none ${
                activeTab === idx
                  ? "text-[#9C7A3C]"
                  : "text-[#6B635A] hover:text-[#1B1917]"
              }`}
            >
              0{idx + 1}. {exp.title}
              {activeTab === idx && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9C7A3C]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#FFFFFF] border border-[#1B1917]/8 p-6 md:p-12 shadow-sm reveal d2">
          {/* Photo */}
          <div className="lg:col-span-6 img-container aspect-[4/3] relative border border-[#1B1917]/5">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#F7F4EF]/90 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#8C5135] font-medium border border-[#1B1917]/5">
              Experiencia QuinuaQ
            </div>
          </div>

          {/* Text Description */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="label-terracotta text-[10px]">{current.subtitle}</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1B1917] mt-1 font-light">
                {current.title}
              </h3>
            </div>

            <p className="text-sm text-[#6B635A] font-light leading-relaxed">
              {current.description}
            </p>

            <ul className="space-y-3 pt-2">
              {current.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3 text-xs text-[#1B1917]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A3C]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
