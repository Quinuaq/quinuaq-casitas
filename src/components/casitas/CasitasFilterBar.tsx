import { Calendar as CalendarIcon, Users, SlidersHorizontal, Sparkles } from "lucide-react";

interface FilterState {
  category: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  maxPrice: number;
  selectedAmenities: string[];
}

interface CasitasFilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  availableAmenities: string[];
}

export function CasitasFilterBar({ filters, onChange, availableAmenities }: CasitasFilterBarProps) {
  const categories = [
    { id: "all", label: "Todas las opciones" },
    { id: "couples", label: "Parejas (1-2 pers)" },
    { id: "family", label: "Familias (3-4 pers)" },
    { id: "groups", label: "Grupos / Dúplex (5-6 pers)" },
  ];

  const handleCategoryClick = (catId: string) => {
    onChange({ ...filters, category: catId });
  };

  const handleAmenityToggle = (amenity: string) => {
    const next = filters.selectedAmenities.includes(amenity)
      ? filters.selectedAmenities.filter((a) => a !== amenity)
      : [...filters.selectedAmenities, amenity];
    onChange({ ...filters, selectedAmenities: next });
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#1B1917]/10 p-6 md:p-8 shadow-sm space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#1B1917]/10 pb-6">
        {categories.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-[#1B1917] text-[#FBF8F1] font-medium shadow-sm"
                  : "bg-[#F7F4EF] text-[#6B635A] hover:bg-[#1B1917]/10"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Check-In */}
        <div>
          <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1.5 flex items-center gap-1.5">
            <CalendarIcon className="w-3 h-3 text-[#9C7A3C]" />
            Llegada (Check-in)
          </label>
          <input
            type="date"
            value={filters.checkIn}
            onChange={(e) => onChange({ ...filters, checkIn: e.target.value })}
            className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3.5 py-2.5 text-xs text-[#1B1917] font-sans focus:outline-none focus:border-[#9C7A3C]"
          />
        </div>

        {/* Check-Out */}
        <div>
          <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1.5 flex items-center gap-1.5">
            <CalendarIcon className="w-3 h-3 text-[#9C7A3C]" />
            Salida (Check-out)
          </label>
          <input
            type="date"
            value={filters.checkOut}
            onChange={(e) => onChange({ ...filters, checkOut: e.target.value })}
            className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3.5 py-2.5 text-xs text-[#1B1917] font-sans focus:outline-none focus:border-[#9C7A3C]"
          />
        </div>

        {/* Guests Selector */}
        <div>
          <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1.5 flex items-center gap-1.5">
            <Users className="w-3 h-3 text-[#9C7A3C]" />
            N° de Huéspedes
          </label>
          <select
            value={filters.guests}
            onChange={(e) => onChange({ ...filters, guests: Number(e.target.value) })}
            className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3.5 py-2.5 text-xs text-[#1B1917] font-sans focus:outline-none focus:border-[#9C7A3C]"
          >
            <option value={1}>1 Huésped</option>
            <option value={2}>2 Huéspedes</option>
            <option value={3}>3 Huéspedes</option>
            <option value={4}>4 Huéspedes</option>
            <option value={5}>5 Huéspedes</option>
            <option value={6}>6 Huéspedes</option>
          </select>
        </div>

        {/* Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3 text-[#9C7A3C]" />
              Precio máx. noche
            </label>
            <span className="text-xs font-serif font-medium text-[#9C7A3C]">
              Hasta S/ {filters.maxPrice}
            </span>
          </div>
          <input
            type="range"
            min={270}
            max={700}
            step={10}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-[#9C7A3C] h-2 bg-[#F7F4EF] rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Amenity Filter Tags */}
      {availableAmenities.length > 0 && (
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-[#999084] mr-2">
            Amenidades clave:
          </span>
          {availableAmenities.map((amenity) => {
            const isSelected = filters.selectedAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                onClick={() => handleAmenityToggle(amenity)}
                className={`inline-flex items-center gap-1 text-[11px] px-3 py-1 rounded-full border transition-colors ${
                  isSelected
                    ? "bg-[#9C7A3C] text-white border-[#9C7A3C]"
                    : "bg-[#F7F4EF] text-[#6B635A] border-[#1B1917]/10 hover:border-[#9C7A3C]"
                }`}
              >
                <Sparkles className="w-2.5 h-2.5" />
                {amenity}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
