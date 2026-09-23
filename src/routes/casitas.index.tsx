import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { casitas, WA_URL } from "@/lib/casitas";
import { CasitaCard } from "@/components/casitas/CasitaCard";
import { CasitasFilterBar } from "@/components/casitas/CasitasFilterBar";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { z } from "zod";

const casitasSearchSchema = z.object({
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.coerce.number().int().min(1).max(6).catch(2).optional(),
  category: z.enum(["all", "couples", "family", "groups"]).catch("all").optional(),
});

export const Route = createFileRoute("/casitas/")({
  validateSearch: (search) => casitasSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Las casitas — Encuentra tu estancia en QuinuaQ" },
      {
        name: "description",
        content:
          "Compara casitas y habitaciones de QuinuaQ en Quinua, Ayacucho. Consulta capacidades, tarifas y fechas para tu próxima estancia en el campo.",
      },
    ],
  }),
  component: CasitasCatalogPage,
});

function CasitasCatalogPage() {
  const searchParams = Route.useSearch();

  const [filters, setFilters] = useState({
    category: searchParams.category || "all",
    checkIn: searchParams.checkIn || "",
    checkOut: searchParams.checkOut || "",
    guests: searchParams.guests || 2,
    maxPrice: 700,
    selectedAmenities: [] as string[],
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.category || "all",
      checkIn: searchParams.checkIn || "",
      checkOut: searchParams.checkOut || "",
      guests: searchParams.guests || 2,
    }));
    setCurrentPage(1);
  }, [searchParams.category, searchParams.checkIn, searchParams.checkOut, searchParams.guests]);

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
      if (filters.category === "family" && (casita.maxGuests < 3 || casita.maxGuests > 4))
        return false;
      if (filters.category === "groups" && casita.maxGuests < 5) return false;

      // Guests count filter
      if (casita.maxGuests < filters.guests) return false;

      // Max price filter
      if (casita.prices.weekday > filters.maxPrice) return false;

      // Amenities filter
      if (filters.selectedAmenities.length > 0) {
        const hasAll = filters.selectedAmenities.every((req) =>
          casita.amenities.some((a) => a.toLowerCase().includes(req.toLowerCase())),
        );
        if (!hasAll) return false;
      }

      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredCasitas.length / itemsPerPage);
  const paginatedCasitas = filteredCasitas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="qq-public">
      <SiteNav variant="solid" />

      <main id="contenido" tabIndex={-1} className="qq-catalog">
        <div className="qq-wrap">
          {/* Header Banner */}
          <div className="qq-catalog-heading">
            <div>
              <p className="qq-eyebrow">Casitas y habitaciones · Quinua, Ayacucho</p>
              <h1>
                Encuentra tu
                <br />
                <em>forma de quedarte.</em>
              </h1>
            </div>
            <p>
              Una escapada para dos, unos días en familia o tiempo entre amigos. Compara nuestras
              opciones y consulta tus fechas dentro de cada casita.
            </p>
          </div>

          {/* Value Badges */}

          {/* Interactive Filter Bar */}
          <div className="qq-catalog-filter">
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
          <div className="qq-results" aria-live="polite">
            <p>
              <strong>{filteredCasitas.length}</strong>{" "}
              {filteredCasitas.length === 1 ? "opción que coincide" : "opciones que coinciden"} con
              tus preferencias
            </p>
            <p>Tarifas base por noche · Sujetas a fecha</p>
          </div>

          {/* Casitas Grid */}
          {paginatedCasitas.length > 0 ? (
            <div className="qq-catalog-grid">
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
            <div className="qq-empty">
              <h2>No encontramos una estancia con esas preferencias.</h2>
              <p>Prueba otro número de huéspedes o amplía tu presupuesto.</p>
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
                className="qq-button"
              >
                Restablecer preferencias
              </button>
            </div>
          )}

          <aside className="qq-catalog-help">
            <p>¿No sabes cuál elegir? Conversemos sobre tu visita.</p>
            <a href={WA_URL} className="qq-text-link" target="_blank" rel="noreferrer">
              Te ayudamos por WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </aside>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center text-xs transition-colors rounded ${
                    currentPage === pageNum
                      ? "bg-[#E2B94E] text-[#08140E] font-bold shadow-md"
                      : "bg-[#10271C] border border-white/10 text-[#A2B3A8] hover:bg-white/10 hover:text-white"
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
