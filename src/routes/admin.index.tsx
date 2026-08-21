import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { getAdminReservations, getAdminDateBlocks } from "@/lib/supabase-pms";
import { casitas, getCasita } from "@/lib/casitas";
import type { Reservation } from "@/types/pms";
import { ReservationDetailModal } from "@/components/admin/ReservationDetailModal";
import {
  LayoutDashboard,
  CalendarCheck,
  DoorOpen,
  LogOut,
  DollarSign,
  Clock,
  CheckCircle,
  Phone,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Receipt,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Resumen Diario — QuinuaQ Casitas Admin" }],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getAdminReservations();
    setReservations(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);

  // Computed Metrics
  const checkInsToday = useMemo(
    () => reservations.filter((r) => r.check_in === todayStr && r.status !== "cancelled"),
    [reservations, todayStr]
  );

  const checkOutsToday = useMemo(
    () => reservations.filter((r) => r.check_out === todayStr && r.status !== "cancelled"),
    [reservations, todayStr]
  );

  const stayingToday = useMemo(
    () =>
      reservations.filter(
        (r) =>
          r.check_in <= todayStr &&
          r.check_out > todayStr &&
          (r.status === "confirmed" || r.status === "checked_in")
      ),
    [reservations, todayStr]
  );

  const pendingConfirmation = useMemo(
    () => reservations.filter((r) => r.status === "pending"),
    [reservations]
  );

  const totalRevenueThisMonth = useMemo(() => {
    const currentMonthPrefix = todayStr.slice(0, 7);
    return reservations
      .filter((r) => r.status !== "cancelled" && r.created_at?.startsWith(currentMonthPrefix))
      .reduce((sum, r) => sum + Number(r.paid_amount || 0), 0);
  }, [reservations, todayStr]);

  const occupancyRate = Math.round((stayingToday.length / casitas.length) * 100);

  return (
    <div className="p-6 md:p-10 space-y-8 flex-1">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9C7A3C] font-medium mb-1">
            <LayoutDashboard className="w-4 h-4" />
            Resumen Operativo
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1B1917] font-light">
            Buenos días, Administración
          </h1>
          <p className="text-xs text-[#6B635A] mt-1">
            Fecha: <strong className="text-[#1B1917]">{todayStr}</strong> · Quinua, Ayacucho
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/admin/calendario"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#10271C] hover:bg-[#9C7A3C] text-white text-xs uppercase tracking-wider rounded transition-colors shadow-sm font-medium"
          >
            <CalendarDays className="w-4 h-4" />
            Ver Calendario Maestro
          </Link>
          <Link
            to="/admin/reservas"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#1B1917]/10 hover:bg-[#F7F4EF] text-[#1B1917] text-xs uppercase tracking-wider rounded transition-colors font-medium"
          >
            <Receipt className="w-4 h-4" />
            Todas las Reservas
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Occupancy Rate */}
        <div className="bg-white border border-[#1B1917]/10 p-6 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-[#999084]">
            <span className="text-[10px] uppercase tracking-[0.2em]">Ocupación Hoy</span>
            <CalendarCheck className="w-5 h-5 text-[#9C7A3C]" />
          </div>
          <div className="font-serif text-4xl text-[#1B1917] font-medium">
            {occupancyRate}%
          </div>
          <p className="text-xs text-[#6B635A]">
            {stayingToday.length} de {casitas.length} casitas ocupadas
          </p>
        </div>

        {/* Check-ins Today */}
        <div className="bg-white border border-[#1B1917]/10 p-6 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-[#999084]">
            <span className="text-[10px] uppercase tracking-[0.2em]">Llegadas Hoy</span>
            <DoorOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="font-serif text-4xl text-[#1B1917] font-medium">
            {checkInsToday.length}
          </div>
          <p className="text-xs text-[#6B635A]">Huéspedes que ingresan hoy</p>
        </div>

        {/* Check-outs Today */}
        <div className="bg-white border border-[#1B1917]/10 p-6 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-[#999084]">
            <span className="text-[10px] uppercase tracking-[0.2em]">Salidas Hoy</span>
            <LogOut className="w-5 h-5 text-[#8C5135]" />
          </div>
          <div className="font-serif text-4xl text-[#1B1917] font-medium">
            {checkOutsToday.length}
          </div>
          <p className="text-xs text-[#6B635A]">Habitaciones para limpieza/rotación</p>
        </div>

        {/* Revenue This Month */}
        <div className="bg-white border border-[#1B1917]/10 p-6 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-[#999084]">
            <span className="text-[10px] uppercase tracking-[0.2em]">Recaudado (Mes)</span>
            <DollarSign className="w-5 h-5 text-[#9C7A3C]" />
          </div>
          <div className="font-serif text-4xl text-[#9C7A3C] font-medium">
            S/ {totalRevenueThisMonth}
          </div>
          <p className="text-xs text-[#6B635A]">Total cobrado en anticipos y saldos</p>
        </div>
      </div>

      {/* Pending Reservations Alert */}
      {pendingConfirmation.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif text-xl text-amber-950">
              {pendingConfirmation.length} Reserva(s) Pendientes de Confirmar
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingConfirmation.map((res) => {
              const c = getCasita(res.casita_id);
              return (
                <div
                  key={res.id}
                  onClick={() => setSelectedReservation(res)}
                  className="bg-white border border-amber-300 p-4 rounded cursor-pointer hover:border-amber-500 transition-colors space-y-2 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-[#9C7A3C]">{res.id}</span>
                    <span className="text-[10px] uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      Pendiente
                    </span>
                  </div>
                  <h4 className="font-serif text-lg text-[#1B1917]">{res.guest_name}</h4>
                  <div className="text-xs text-[#6B635A] space-y-1">
                    <p>Casita: <strong>{c?.name || res.casita_id}</strong></p>
                    <p>Fechas: {res.check_in} al {res.check_out}</p>
                    <p>Total: <strong>S/ {res.total_price}</strong></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Two Columns: Arrivals vs Departures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Arrivals Today */}
        <div className="bg-white border border-[#1B1917]/10 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#1B1917]/10 pb-4">
            <div className="flex items-center gap-2">
              <DoorOpen className="w-5 h-5 text-emerald-600" />
              <h3 className="font-serif text-xl text-[#1B1917]">Llegadas Programadas para Hoy</h3>
            </div>
            <span className="text-xs text-[#999084]">{checkInsToday.length} huéspedes</span>
          </div>

          {checkInsToday.length > 0 ? (
            <div className="space-y-3">
              {checkInsToday.map((res) => {
                const c = getCasita(res.casita_id);
                return (
                  <div
                    key={res.id}
                    onClick={() => setSelectedReservation(res)}
                    className="p-4 bg-[#F7F4EF] border border-[#1B1917]/5 rounded hover:border-[#9C7A3C]/50 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-serif text-base text-[#1B1917] font-medium">
                        {res.guest_name}
                      </h4>
                      <span className="text-xs text-[#6B635A] block">
                        {c?.name} · {res.nights} noche(s) · {res.guests_count} personas
                      </span>
                      <span className="text-[11px] text-[#999084]">Tel: {res.guest_phone}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-medium text-[#9C7A3C]">
                        {res.status === "checked_in" ? "✓ En Estadía" : "Esperando Llegada"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#999084] italic py-4 text-center">
              No hay check-ins programados para el día de hoy.
            </p>
          )}
        </div>

        {/* Departures Today */}
        <div className="bg-white border border-[#1B1917]/10 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#1B1917]/10 pb-4">
            <div className="flex items-center gap-2">
              <LogOut className="w-5 h-5 text-[#8C5135]" />
              <h3 className="font-serif text-xl text-[#1B1917]">Salidas Programadas para Hoy</h3>
            </div>
            <span className="text-xs text-[#999084]">{checkOutsToday.length} casitas</span>
          </div>

          {checkOutsToday.length > 0 ? (
            <div className="space-y-3">
              {checkOutsToday.map((res) => {
                const c = getCasita(res.casita_id);
                return (
                  <div
                    key={res.id}
                    onClick={() => setSelectedReservation(res)}
                    className="p-4 bg-[#F7F4EF] border border-[#1B1917]/5 rounded hover:border-[#9C7A3C]/50 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-serif text-base text-[#1B1917] font-medium">
                        {res.guest_name}
                      </h4>
                      <span className="text-xs text-[#6B635A] block">
                        {c?.name} · Salida hoy
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-[#8C5135]">
                        {res.status === "checked_out" ? "✓ Check-out Hecho" : "Pendiente de Salida"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#999084] italic py-4 text-center">
              No hay check-outs programados para el día de hoy.
            </p>
          )}
        </div>
      </div>

      {/* Reservation Details Modal */}
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
