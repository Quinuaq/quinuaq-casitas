import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { casitas, type Casita } from "@/lib/casitas";
import { CasitaCard } from "@/components/casitas/CasitaCard";
import { CasitasFilterBar } from "@/components/casitas/CasitasFilterBar";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Sparkles, MapPin, ShieldCheck, Coffee } from "lucide-react";

export const Route = createFileRoute("/casitas/")({
  head: () => ({
    meta: [
      { title: "Casitas y Habitaciones Boutique — QuinuaQ" },
      {
        name: "description",
        content: "Explora nuestra colección de casitas de campo y habitaciones boutique frente al valle de Quinua, Ayacucho.",
      },
    ],
  }),
  component: CasitasCatalogPage,
});

function CasitasCatalogPage() {
  const [filters, setFilters] = useState({
    category: "all",
    checkIn: "",
    checkOut: "",
    guests: 2,
    maxPrice: 700,
    selectedAmenities: [] as string[],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allAmenities = useMemo(() => {
    const set = new Set<string>();
    casitas.forEach((c) => c.amenities.forEach((a) => set.add(a)));
    return Array.from(set).slice(0, 8);
  }, []);

  const filteredCasitas = useMemo(() => {
    return casitas.filter((casita) => {
      // Category filter
      if (filters.category === "couples" && casita.maxGuests > 2) return false;
      if (filters.category === "family" && (casita.maxGuests < 3 || casita.maxGuests > 4)) return false;
      if (filters.category === "groups" && casita.maxGuests < 5) return false;

      // Guests count filter
      if (casita.maxGuests < filters.guests) return false;

      // Max price filter
      if (casita.prices.weekday > filters.maxPrice) return false;

      // Amenities filter
      if (filters.selectedAmenities.length > 0) {
        const hasAll = filters.selectedAmenities.every((req) =>
          casita.amenities.some((a) => a.toLowerCase().includes(req.toLowerCase()))
        );
        if (!hasAll) return false;
      }

      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredCasitas.length / itemsPerPage);
  const paginatedCasitas = filteredCasitas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1B1917] flex flex-col font-sans">
      <SiteNav variant="solid" />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Banner */}
          <div className="mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1B1917]/5 text-[10px] uppercase tracking-[0.3em] text-[#9C7A3C]">
              <Sparkles className="w-3 h-3" />
              Colección de Alojamiento
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1B1917]">
              Nuestras Casitas{" "}
              <em className="italic font-serif text-[#9C7A3C]">frente al valle.</em>
            </h1>
            <p className="max-w-2xl text-sm text-[#6B635A] font-light leading-relaxed">
              Descubre refugios privados construidos con arquitectura tradicional, madera de queuña, vistas despejadas y todas las comodidades para una estadía inolvidable en Quinua.
            </p>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 pb-8 border-b border-[#1B1917]/10">
            <div className="flex items-center gap-3">
              <Coffee className="w-5 h-5 text-[#9C7A3C] shrink-0" />
              <span className="text-xs text-[#6B635A]">Desayuno andino incluido</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#9C7A3C] shrink-0" />
              <span className="text-xs text-[#6B635A]">Quinua · 3,300 msnm</span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#9C7A3C] shrink-0" />
              <span className="text-xs text-[#6B635A]">Vistas panorámicas</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#9C7A3C] shrink-0" />
              <span className="text-xs text-[#6B635A]">Reserva directa garantizada</span>
            </div>
          </div>

          {/* Interactive Filter Bar */}
          <div className="mb-12">
            <CasitasFilterBar
              filters={filters}
              onChange={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
              availableAmenities={allAmenities}
            />
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-xs uppercase tracking-wider text-[#6B635A]">
              Mostrando <strong className="text-[#1B1917]">{filteredCasitas.length}</strong> opciones disponibles
            </span>
          </div>

          {/* Casitas Grid */}
          {paginatedCasitas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedCasitas.map((casita) => (
                <CasitaCard
                  key={casita.id}
                  casita={casita}
                  checkIn={filters.checkIn}
                  checkOut={filters.checkOut}
                  guests={filters.guests}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#1B1917]/10 p-16 text-center space-y-4">
              <p className="font-serif text-2xl text-[#1B1917]">No encontramos casitas con esos criterios</p>
              <p className="text-xs text-[#6B635A]">Prueba modificando los filtros de precio o número de huéspedes.</p>
              <button
                onClick={() =>
                  setFilters({
                    category: "all",
                    checkIn: "",
                    checkOut: "",
                    guests: 2,
                    maxPrice: 700,
                    selectedAmenities: [],
                  })
                }
                className="px-6 py-2.5 bg-[#1B1917] text-white text-xs uppercase tracking-wider"
              >
                Limpiar Filtros
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center text-xs transition-colors ${
                    currentPage === pageNum
                      ? "bg-[#1B1917] text-white font-medium"
                      : "bg-white border border-[#1B1917]/10 text-[#6B635A] hover:bg-[#1B1917]/10"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
