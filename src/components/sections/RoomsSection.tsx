import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { casitas } from "@/lib/casitas";
import { CasitaCard } from "@/components/casitas/CasitaCard";
import { Sparkles } from "lucide-react";

export function RoomsSection() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "couples" | "family" | "groups">("all");

  const filtered = useMemo(() => {
    if (selectedCategory === "couples") return casitas.filter((c) => c.maxGuests <= 2);
    if (selectedCategory === "family") return casitas.filter((c) => c.maxGuests >= 3 && c.maxGuests <= 4);
    if (selectedCategory === "groups") return casitas.filter((c) => c.maxGuests >= 5);
    return casitas;
  }, [selectedCategory]);

  return (
    <section id="casitas" className="py-24 md:py-36 bg-[#08140E] text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Header & Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-[10px] uppercase tracking-[0.25em] text-[#E2B94E] border border-white/10 rounded-full font-medium">
              <Sparkles className="w-3 h-3" />
              Colección de Alojamiento
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FBF8F1] font-light">
              Nuestras 5 Casitas{" "}
              <em className="italic text-[#E2B94E] font-serif">en el valle.</em>
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Todas (5)" },
              { id: "couples", label: "Parejas (1-2p)" },
              { id: "family", label: "Familiares (3-4p)" },
              { id: "groups", label: "Grupos / Dúplex" },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 rounded ${
                    isActive
                      ? "bg-[#E2B94E] text-[#08140E] font-bold shadow-md"
                      : "bg-[#10271C] text-[#A2B3A8] border border-white/10 hover:border-[#E2B94E] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5 Casitas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((casita) => (
            <CasitaCard key={casita.id} casita={casita} />
          ))}
        </div>
      </div>
    </section>
  );
}
