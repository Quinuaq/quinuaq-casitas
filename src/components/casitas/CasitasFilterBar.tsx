interface FilterState {
  category: "all" | "couples" | "family" | "groups";
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
    { id: "all", label: "Todas" },
    { id: "couples", label: "Para dos" },
    { id: "family", label: "En familia" },
    { id: "groups", label: "Entre amigos" },
  ] as const;
  return (
    <div className="qq-filters">
      <div className="qq-category-tabs" role="group" aria-label="Tipo de estancia">
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            aria-pressed={filters.category === category.id}
            onClick={() => onChange({ ...filters, category: category.id })}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="qq-filter-fields">
        <label>
          Huéspedes
          <select
            value={filters.guests}
            onChange={(event) => onChange({ ...filters, guests: Number(event.target.value) })}
          >
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <option key={number} value={number}>
                {number} {number === 1 ? "persona" : "personas"}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tarifa base hasta S/ {filters.maxPrice}
          <input
            type="range"
            min={270}
            max={700}
            step={10}
            value={filters.maxPrice}
            onChange={(event) => onChange({ ...filters, maxPrice: Number(event.target.value) })}
          />
        </label>
      </div>
      <details className="qq-extra-filters">
        <summary>
          Más preferencias <span aria-hidden="true">+</span>
        </summary>
        <div className="qq-amenity-options">
          {availableAmenities.map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                checked={filters.selectedAmenities.includes(amenity)}
                onChange={() =>
                  onChange({
                    ...filters,
                    selectedAmenities: filters.selectedAmenities.includes(amenity)
                      ? filters.selectedAmenities.filter((value) => value !== amenity)
                      : [...filters.selectedAmenities, amenity],
                  })
                }
              />
              {amenity}
            </label>
          ))}
        </div>
      </details>
    </div>
  );
}
