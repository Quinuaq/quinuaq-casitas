import { useState } from "react";
import fogataImg from "@/assets/fogata.jpg";
import alpacasImg from "@/assets/alpacas.jpg";
import cocinaImg from "@/assets/cocina.jpg";
import quinuaImg from "@/assets/quinua.jpg";
import { Sparkles } from "lucide-react";

const EXPERIENCES = [
  {
    id: "naturaleza",
    title: "Naturaleza & Cielos",
    subtitle: "Vistas panorámicas al valle de Quinua",
    description:
      "Desde las terrazas de QuinuaQ, contemplarás el horizonte andino a 3.500 metros de altitud. Camina por senderos rodeados de árboles de queuña y observa las nieblas del amanecer sobre el valle histórico.",
    image: quinuaImg,
    highlights: [
      "Terrazas privadas con vista panorámica",
      "Bosque nativo de queuñas centenarias",
      "Cielos despejados para observación astronómica",
      "Amaneceres entre nieblas andinas",
    ],
  },
  {
    id: "gastronomia",
    title: "Gastronomía Andina",
    subtitle: "Cocina de origen con el restaurante QuinuaQ",
    description:
      "Nuestros chefs rinden homenaje a la despensa ayacuchana. Disfruta de desayunos andinos incluidos cada mañana con panes artesanales, quesos locales y café de altura, además de acceso preferente a la carta de autor del restaurante.",
    image: cocinaImg,
    highlights: [
      "Desayuno andino artesanal incluido",
      "Papas nativas y granos andinos de cosecha local",
      "Coctelería de autor con hierbas aromáticas del huerto",
      "Pachamanca tradicional previa coordinación",
    ],
  },
  {
    id: "rituales",
    title: "Rituales & Fogatas",
    subtitle: "Noches estrelladas alrededor del fuego",
    description:
      "Las noches en el altiplano invitan a la reunión alrededor del fuego. Ofrecemos fogatas privadas para cada casita, mantas de alpaca y espacios de contemplación en absoluta calma bajo el cielo estrellado.",
    image: fogataImg,
    highlights: [
      "Fogatas privadas bajo las estrellas",
      "Mantas abrigadoras y leña seleccionada",
      "Historias y mitología de la tradición ayacuchana",
      "Silencio absoluto para un descanso reparador",
    ],
  },
  {
    id: "bienestar",
    title: "Cultura & Alpacas",
    subtitle: "Arte textil y vida en armonía",
    description:
      "Comparte la energía apacible de nuestras alpacas residentes en el lodge y descubre la tradición alfarera y textil de Quinua con maestros artesanos locales declarados Patrimonio de la Nación.",
    image: alpacasImg,
    highlights: [
      "Convivencia apacible con alpacas en el lodge",
      "Paseos a talleres de cerámica tradicional en Quinua",
      "Muestra de textiles en fibra de alpaca",
      "Entorno libre de contaminación y estrés urbano",
    ],
  },
];

export function ExperiencesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = EXPERIENCES[activeTab];

  return (
    <section id="experiencias" className="py-28 md:py-40 bg-[#0D1F16] text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4 reveal">
          <span className="label-luxury">Experiencias Exclusivas</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FBF8F1] font-light">
            Habitar la calma{" "}
            <em className="italic text-[#E2B94E] font-serif">en el altiplano.</em>
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 md:gap-8 border-b border-white/10 mb-12 reveal d1">
          {EXPERIENCES.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => setActiveTab(idx)}
              className={`pb-4 text-xs uppercase tracking-[0.25em] font-medium transition-all relative focus:outline-none ${
                activeTab === idx
                  ? "text-[#E2B94E]"
                  : "text-[#A2B3A8] hover:text-[#FBF8F1]"
              }`}
            >
              0{idx + 1}. {exp.title}
              {activeTab === idx && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E2B94E] shadow-[0_0_10px_#E2B94E]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#10271C] border border-white/10 p-6 md:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.5)] reveal d2">
          {/* Photo */}
          <div className="lg:col-span-6 img-container aspect-[4/3] relative border border-white/10">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#08140E]/85 backdrop-blur-md px-3.5 py-1.5 text-[9px] uppercase tracking-[0.25em] text-[#E2B94E] font-medium border border-[#E2B94E]/20">
              Experiencia QuinuaQ
            </div>
          </div>

          {/* Text Description */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="label-terracotta text-[10px]">{current.subtitle}</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FBF8F1] mt-1 font-light">
                {current.title}
              </h3>
            </div>

            <p className="text-sm text-[#A2B3A8] font-light leading-relaxed">
              {current.description}
            </p>

            <ul className="space-y-3 pt-2">
              {current.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3 text-xs text-[#FBF8F1]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E2B94E] shrink-0" />
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
