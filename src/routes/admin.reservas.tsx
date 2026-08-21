import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { getAdminReservations } from "@/lib/supabase-pms";
import { casitas, getCasita } from "@/lib/casitas";
import type { Reservation, ReservationStatus } from "@/types/pms";
import { ReservationDetailModal } from "@/components/admin/ReservationDetailModal";
import { ManualBookingModal } from "@/components/admin/ManualBookingModal";
import {
  Receipt,
  Search,
  Plus,
  RefreshCw,
  Phone,
  Eye,
  Filter,
  CreditCard,
} from "lucide-react";

export const Route = createFileRoute("/admin/reservas")({
  head: () => ({
    meta: [{ title: "Gestión de Reservas & Pagos — QuinuaQ Casitas Admin" }],
  }),
  component: AdminReservasPage,
});

function AdminReservasPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [casitaFilter, setCasitaFilter] = useState<string>("all");

  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await getAdminReservations();
    setReservations(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      // Status filter
      if (statusFilter !== "all" && r.status !== statusFilter) return false;

      // Casita filter
      if (casitaFilter !== "all" && r.casita_id !== casitaFilter) return false;

      // Search query (code, guest name, phone)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesCode = r.id.toLowerCase().includes(q);
        const matchesName = r.guest_name.toLowerCase().includes(q);
        const matchesPhone = r.guest_phone.toLowerCase().includes(q);
        if (!matchesCode && !matchesName && !matchesPhone) return false;
      }

      return true;
    });
  }, [reservations, statusFilter, casitaFilter, searchQuery]);

  return (
    <div className="p-6 md:p-10 space-y-8 flex-1">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9C7A3C] font-medium mb-1">
            <Receipt className="w-4 h-4" />
            Control de Huéspedes y Pagos
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1B1917] font-light">
            Libro de Reservas
          </h1>
          <p className="text-xs text-[#6B635A] mt-1">
            Revisa estados de pago, adelantos, datos de contacto y detalles de cada estadía.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#1B1917]/10 hover:bg-[#F7F4EF] rounded text-xs text-[#1B1917] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Actualizar</span>
          </button>
          <button
            onClick={() => setBookingModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#10271C] hover:bg-[#9C7A3C] text-white text-xs font-sans uppercase tracking-wider rounded transition-colors shadow-sm font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            Nueva Reserva
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#1B1917]/10 p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#999084] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por código (QQ-...), nombre o teléfono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F7F4EF] border border-[#1B1917]/10 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>

          {/* Status filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F4EF] border border-[#1B1917]/10 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
            >
              <option value="all">Todos los Estados</option>
              <option value="pending">Pendientes de Pago</option>
              <option value="confirmed">Confirmadas</option>
              <option value="checked_in">En Estadía (Check-in)</option>
              <option value="checked_out">Finalizadas (Check-out)</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>

          {/* Casita filter */}
          <div>
            <select
              value={casitaFilter}
              onChange={(e) => setCasitaFilter(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F4EF] border border-[#1B1917]/10 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
            >
              <option value="all">Todas las Casitas</option>
              {casitas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-[#6B635A] pt-2 border-t border-[#1B1917]/5">
          <span>Mostrando <strong className="text-[#1B1917]">{filteredReservations.length}</strong> reservas</span>
          {(searchQuery || statusFilter !== "all" || casitaFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setCasitaFilter("all");
              }}
              className="text-[#9C7A3C] hover:underline text-xs"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white border border-[#1B1917]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#F7F4EF] border-b border-[#1B1917]/10 text-[10px] uppercase tracking-wider text-[#6B635A]">
                <th className="p-4">Código</th>
                <th className="p-4">Huésped</th>
                <th className="p-4">Casita</th>
                <th className="p-4">Fechas</th>
                <th className="p-4">Noches</th>
                <th className="p-4">Total</th>
                <th className="p-4">Abonado</th>
                <th className="p-4">Saldo</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1917]/5 text-xs">
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => {
                  const c = getCasita(res.casita_id);
                  const total = Number(res.total_price);
                  const paid = Number(res.paid_amount || 0);
                  const balance = Math.max(0, total - paid);

                  return (
                    <tr
                      key={res.id}
                      onClick={() => setSelectedReservation(res)}
                      className="hover:bg-[#F7F4EF]/60 cursor-pointer transition-colors"
                    >
                      <td className="p-4 font-mono font-medium text-[#9C7A3C]">{res.id}</td>
                      <td className="p-4">
                        <strong className="text-[#1B1917] block font-serif text-sm">
                          {res.guest_name}
                        </strong>
                        <span className="text-[11px] text-[#999084]">{res.guest_phone}</span>
                      </td>
                      <td className="p-4 text-[#1B1917] font-medium">{c?.name || res.casita_id}</td>
                      <td className="p-4 text-[#6B635A]">
                        {res.check_in} <br />
                        <span className="text-[10px] text-[#999084]">al {res.check_out}</span>
                      </td>
                      <td className="p-4 text-[#1B1917]">{res.nights} n</td>
                      <td className="p-4 font-serif text-sm text-[#1B1917] font-medium">
                        S/ {total}
                      </td>
                      <td className="p-4 font-serif text-sm text-emerald-700 font-medium">
                        S/ {paid}
                      </td>
                      <td className="p-4 font-serif text-sm text-[#8C5135] font-medium">
                        S/ {balance}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium ${
                            res.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : res.status === "checked_in"
                              ? "bg-blue-100 text-blue-800"
                              : res.status === "checked_out"
                              ? "bg-gray-100 text-gray-800"
                              : res.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {res.status === "confirmed"
                            ? "Confirmada"
                            : res.status === "checked_in"
                            ? "Check-in"
                            : res.status === "checked_out"
                            ? "Finalizada"
                            : res.status === "cancelled"
                            ? "Cancelada"
                            : "Pendiente"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReservation(res);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1B1917]/5 hover:bg-[#1B1917] hover:text-white rounded text-[11px] transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Detalles</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-xs text-[#999084] italic">
                    No se encontraron reservas con los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedReservation && (
        <ReservationDetailModal
          isOpen={Boolean(selectedReservation)}
          onClose={() => setSelectedReservation(null)}
          reservation={selectedReservation}
          onUpdated={loadData}
        />
      )}

      <ManualBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
}
