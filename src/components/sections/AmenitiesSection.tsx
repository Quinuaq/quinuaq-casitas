import { useCountUp } from "@/hooks/useScrollAnimation";

const AMENITIES = [
  {
    title: "Casitas Privadas",
    description: "Espacios independientes construidos con piedra y madera andina con vista panorámica al valle.",
  },
  {
    title: "Desayuno Andino Incluido",
    description: "Preparaciones artesanales diarias con productos orgánicos cultivados en la región de Quinua.",
  },
  {
    title: "Fogatas Privadas",
    description: "Áreas de fogata nocturna preparadas para cada casita bajo los cielos despejados del altiplano.",
  },
  {
    title: "Chimenea & Calefacción",
    description: "Ambientes cálidos acondicionados para el máximo confort durante las noches andinas.",
  },
  {
    title: "Conexión Wi-Fi de Alta Velocidad",
    description: "Acceso a internet en todas las casitas y áreas de terraza para estar conectado si lo requieres.",
  },
  {
    title: "Reserva & Convivencia con Alpacas",
    description: "Convivencia pacífica con alpacas residentes en los prados del lodge.",
  },
  {
    title: "Restaurante & Gastronomía QuinuaQ",
    description: "Carta de autor con insumos locales, cocina de leña y coctelería artesanal.",
  },
  {
    title: "Estacionamiento Privado Gratuito",
    description: "Espacio seguro y vigilado las 24 horas para la tranquilidad de tu vehículo.",
  },
];

function StatCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const countRef = useCountUp(target);
  return (
    <div className="text-center p-8 bg-[#10271C] border border-white/10 shadow-md">
      <div className="font-serif text-4xl sm:text-5xl text-[#E2B94E] font-light">
        <span ref={countRef}>0</span>
        {suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-[#A2B3A8] mt-2 font-medium">
        {label}
      </div>
    </div>
  );
}

export function AmenitiesSection() {
  return (
    <section className="py-28 md:py-40 bg-[#08140E] text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        {/* Header */}
        <div className="max-w-2xl space-y-4 reveal">
          <span className="label-luxury">Comodidades incluidas</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FBF8F1] font-light">
            Todo pensado para{" "}
            <em className="italic text-[#E2B94E] font-serif">tu descanso absoluto.</em>
          </h2>
        </div>

        {/* Animated Impact Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal d1">
          <StatCounter target={3500} label="Metros sobre el mar" />
          <StatCounter target={5} label="Casitas Exclusivas" />
          <StatCounter target={100} suffix="%" label="Desayuno Andino" />
          <StatCounter target={150} suffix="+" label="Familias Apoyadas" />
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal d2">
          {AMENITIES.map((item, idx) => (
            <div
              key={item.title}
              className="bg-[#10271C] border border-white/10 p-6 hover:border-[#E2B94E]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-3 group"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2B94E] font-medium block group-hover:text-[#F3D78A]">
                0{idx + 1}
              </span>
              <h3 className="font-serif text-xl text-[#FBF8F1] font-light group-hover:text-[#E2B94E] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#A2B3A8] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
