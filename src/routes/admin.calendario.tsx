import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAdminReservations, getAdminDateBlocks } from "@/lib/supabase-pms";
import type { Reservation, DateBlock } from "@/types/pms";
import { MasterCalendarGrid } from "@/components/admin/MasterCalendarGrid";
import { BlockDatesModal } from "@/components/admin/BlockDatesModal";
import { ManualBookingModal } from "@/components/admin/ManualBookingModal";
import { ReservationDetailModal } from "@/components/admin/ReservationDetailModal";
import { CalendarDays, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin/calendario")({
  head: () => ({
    meta: [{ title: "Calendario Maestro & Bloqueos — QuinuaQ Casitas" }],
  }),
  component: AdminCalendarioPage,
});

function AdminCalendarioPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [dateBlocks, setDateBlocks] = useState<DateBlock[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const [selectedCasitaId, setSelectedCasitaId] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  const loadData = async () => {
    setLoading(true);
    const [res, blocks] = await Promise.all([
      getAdminReservations(),
      getAdminDateBlocks(),
    ]);
    setReservations(res);
    setDateBlocks(blocks);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenBlockModal = (casitaId?: string, date?: string) => {
    setSelectedCasitaId(casitaId);
    setSelectedDate(date);
    setBlockModalOpen(true);
  };

  const handleOpenBookingModal = (casitaId?: string, date?: string) => {
    setSelectedCasitaId(casitaId);
    setSelectedDate(date);
    setBookingModalOpen(true);
  };

  return (
    <div className="p-6 md:p-10 space-y-8 flex-1">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9C7A3C] font-medium mb-1">
            <CalendarDays className="w-4 h-4" />
            Ocupación y Disponibilidad
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1B1917] font-light">
            Calendario Maestro
          </h1>
          <p className="text-xs text-[#6B635A] mt-1">
            Visualiza todas las casitas, gestiona bloqueos y atiende reservas manuales en tiempo real.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#1B1917]/10 hover:bg-[#F7F4EF] rounded text-xs text-[#1B1917] transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Gantt Calendar View */}
      <MasterCalendarGrid
        reservations={reservations}
        dateBlocks={dateBlocks}
        onRefresh={loadData}
        onOpenBlockModal={handleOpenBlockModal}
        onOpenBookingModal={handleOpenBookingModal}
        onSelectReservation={(res) => setSelectedReservation(res)}
      />

      {/* Modals */}
      <BlockDatesModal
        isOpen={blockModalOpen}
        onClose={() => setBlockModalOpen(false)}
        onSuccess={loadData}
        initialCasitaId={selectedCasitaId}
        initialDate={selectedDate}
      />

      <ManualBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onSuccess={loadData}
        initialCasitaId={selectedCasitaId}
        initialDate={selectedDate}
      />

      {selectedReservation && (
        <ReservationDetailModal
          isOpen={Boolean(selectedReservation)}
          onClose={() => setSelectedReservation(null)}
          reservation={selectedReservation}
          onUpdated={loadData}
        />
      )}
    </div>
  );
}
