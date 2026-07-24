import { useCountUp } from "@/hooks/useScrollAnimation";

const AMENITIES = [
  {
    title: "Casitas Privadas",
    description: "Espacios independientes construidos con piedra y madera andina con vista panorámica.",
  },
  {
    title: "Desayuno Andino Incluido",
    description: "Preparaciones artesanales diarias con productos orgánicos cultivados en la región.",
  },
  {
    title: "Fogatas Privadas",
    description: "Áreas de fogata nocturna preparadas para cada casita bajo los cielos despejados.",
  },
  {
    title: "Chimenea & Calefacción",
    description: "Ambientes cálidos acondicionados para el confort durante las noches del altiplano.",
  },
  {
    title: "Conexión Wi-Fi",
    description: "Acceso a internet de alta velocidad en casitas y áreas comunes del lodge.",
  },
  {
    title: "Reserva de Alpacas",
    description: "Convivencia pacífica con alpacas en los prados del lodge.",
  },
  {
    title: "Gastronomía Vivencial",
    description: "Talleres culinarios y maridaje con destilados y frutos nativos peruanos.",
  },
  {
    title: "Spa Andino (Próximamente)",
    description: "Espacio concebido para terapias con hierbas medicinales y rituales de relajación.",
  },
];

function StatCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const countRef = useCountUp(target);
  return (
    <div className="text-center p-8 bg-[#12110F] border border-[#F4F0E8]/5">
      <div className="font-serif text-4xl sm:text-5xl text-[#C5A059] font-light">
        <span ref={countRef}>0</span>
        {suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-[#9E9488] mt-2">
        {label}
      </div>
    </div>
  );
}

export function AmenitiesSection() {
  return (
    <section className="py-28 md:py-40 bg-[#0B0A09]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        {/* Header */}
        <div className="max-w-2xl space-y-4 reveal">
          <span className="label-luxury">Comodidades del Lodge</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F4F0E8] font-light">
            Todo pensado para{" "}
            <em className="italic text-[#C5A059] font-serif">tu bienestar absoluto.</em>
          </h2>
        </div>

        {/* Animated Impact Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal d1">
          <StatCounter target={3500} label="Metros sobre el mar" />
          <StatCounter target={5} label="Casitas Exclusivas" />
          <StatCounter target={100} suffix="%" label="Desayuno Local" />
          <StatCounter target={150} suffix="+" label="Familias Apoyadas" />
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal d2">
          {AMENITIES.map((item, idx) => (
            <div
              key={item.title}
              className="bg-[#12110F] border border-[#F4F0E8]/5 p-6 hover:border-[#C5A059]/30 transition-all duration-300 space-y-3"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">
                0{idx + 1}
              </span>
              <h3 className="font-serif text-xl text-[#F4F0E8] font-light">
                {item.title}
              </h3>
              <p className="text-xs text-[#9E9488] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
