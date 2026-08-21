import { useState, useMemo } from "react";
import { casitas } from "@/lib/casitas";
import type { Reservation, DateBlock } from "@/types/pms";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Plus,
  Trash2,
  CalendarDays,
  User,
} from "lucide-react";
import { deleteAdminDateBlock } from "@/lib/supabase-pms";

interface MasterCalendarGridProps {
  reservations: Reservation[];
  dateBlocks: DateBlock[];
  onRefresh: () => void;
  onOpenBlockModal: (casitaId?: string, date?: string) => void;
  onOpenBookingModal: (casitaId?: string, date?: string) => void;
  onSelectReservation: (reservation: Reservation) => void;
}

export function MasterCalendarGrid({
  reservations,
  dateBlocks,
  onRefresh,
  onOpenBlockModal,
  onOpenBookingModal,
  onSelectReservation,
}: MasterCalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const dayLetters = ["D", "L", "M", "M", "J", "V", "S"];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const todayStr = new Date().toISOString().slice(0, 10);

  const handleDeleteBlock = async (e: React.MouseEvent, blockId: string) => {
    e.stopPropagation();
    if (confirm("¿Deseas desbloquear estas fechas?")) {
      await deleteAdminDateBlock(blockId);
      onRefresh();
    }
  };

  return (
    <div className="bg-white border border-[#1B1917]/10 shadow-sm overflow-hidden select-none">
      {/* Calendar Top Toolbar */}
      <div className="p-6 border-b border-[#1B1917]/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevMonth}
              className="p-2 border border-[#1B1917]/10 hover:bg-[#F7F4EF] rounded transition-colors"
              aria-label="Mes anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 border border-[#1B1917]/10 hover:bg-[#F7F4EF] rounded transition-colors"
              aria-label="Siguiente mes"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={goToday}
              className="px-3 py-2 text-xs border border-[#1B1917]/10 hover:bg-[#F7F4EF] rounded font-medium transition-colors"
            >
              Hoy
            </button>
          </div>

          <h3 className="font-serif text-2xl text-[#1B1917]">
            {monthNames[month]} <span className="text-[#9C7A3C]">{year}</span>
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenBlockModal()}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#1B1917]/20 hover:bg-[#F7F4EF] text-xs font-sans uppercase tracking-wider rounded transition-colors text-[#1B1917]"
          >
            <Lock className="w-3.5 h-3.5 text-[#9C7A3C]" />
            Bloquear Fechas
          </button>
          <button
            onClick={() => onOpenBookingModal()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#10271C] hover:bg-[#9C7A3C] text-white text-xs font-sans uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Nueva Reserva
          </button>
        </div>
      </div>

      {/* Gantt Grid Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left min-w-[1000px]">
          <thead>
            <tr className="bg-[#F7F4EF] border-b border-[#1B1917]/10 text-[11px] text-[#6B635A]">
              <th className="p-4 w-48 sticky left-0 bg-[#F7F4EF] z-20 font-serif text-xs text-[#1B1917] border-r border-[#1B1917]/10">
                Casita / Habitación
              </th>
              {daysArray.map((dayNum) => {
                const dateObj = new Date(year, month, dayNum);
                const dayLetter = dayLetters[dateObj.getDay()];
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                const isToday = dateStr === todayStr;
                const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

                return (
                  <th
                    key={dayNum}
                    className={`p-1.5 text-center min-w-[34px] border-r border-[#1B1917]/5 ${
                      isToday ? "bg-[#9C7A3C]/15 font-bold text-[#1B1917]" : isWeekend ? "bg-[#EFE9DC]/60" : ""
                    }`}
                  >
                    <span className="block text-[9px] text-[#999084]">{dayLetter}</span>
                    <span className="text-xs">{dayNum}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {casitas.map((casita) => {
              return (
                <tr key={casita.id} className="border-b border-[#1B1917]/10 hover:bg-[#FCFAF6]/50">
                  {/* Sticky Casita Header Column */}
                  <td className="p-4 sticky left-0 bg-white z-10 border-r border-[#1B1917]/10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                    <div className="font-serif text-sm text-[#1B1917] font-medium">{casita.name}</div>
                    <span className="text-[10px] text-[#999084] block">{casita.capacity}</span>
                  </td>

                  {/* Day Cells */}
                  {daysArray.map((dayNum) => {
                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                    const isToday = dateStr === todayStr;

                    // Check if there is an active reservation on this date
                    const res = reservations.find(
                      (r) =>
                        r.casita_id === casita.id &&
                        r.status !== "cancelled" &&
                        dateStr >= r.check_in &&
                        dateStr < r.check_out
                    );

                    // Check if there is a manual block on this date
                    const block = dateBlocks.find(
                      (b) =>
                        b.casita_id === casita.id &&
                        dateStr >= b.start_date &&
                        dateStr <= b.end_date
                    );

                    let cellBg = isToday ? "bg-[#9C7A3C]/10" : "";

                    return (
                      <td
                        key={dayNum}
                        onClick={() => {
                          if (res) onSelectReservation(res);
                          else onOpenBookingModal(casita.id, dateStr);
                        }}
                        className={`h-16 p-0.5 border-r border-[#1B1917]/5 text-center cursor-pointer transition-colors relative ${cellBg} hover:bg-[#9C7A3C]/5`}
                      >
                        {res ? (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectReservation(res);
                            }}
                            className={`w-full h-full rounded p-1 flex flex-col justify-center text-white text-[9px] shadow-sm leading-tight transition-transform hover:scale-105 ${
                              res.source === "airbnb"
                                ? "bg-sky-600"
                                : res.source === "booking"
                                ? "bg-indigo-600"
                                : res.status === "confirmed"
                                ? "bg-emerald-700"
                                : "bg-amber-600"
                            }`}
                          >
                            <span className="font-semibold truncate">{res.guest_name}</span>
                            <span className="opacity-80 text-[8px] truncate">
                              {res.status === "confirmed" ? "Confirmada" : "Pendiente"}
                            </span>
                          </div>
                        ) : block ? (
                          <div
                            onClick={(e) => handleDeleteBlock(e, block.id)}
                            className="w-full h-full rounded bg-slate-700 text-slate-200 text-[9px] p-1 flex flex-col justify-center items-center group/block hover:bg-red-800 transition-colors shadow-sm"
                            title="Haz clic para desbloquear fecha"
                          >
                            <Lock className="w-3 h-3 text-[#9C7A3C] group-hover/block:hidden" />
                            <Trash2 className="w-3 h-3 hidden group-hover/block:block text-white" />
                            <span className="text-[8px] truncate max-w-full">
                              {block.source.includes("airbnb")
                                ? "Airbnb"
                                : block.source.includes("booking")
                                ? "Booking"
                                : "Bloqueado"}
                            </span>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend Footer */}
      <div className="p-4 bg-[#F7F4EF] border-t border-[#1B1917]/10 flex flex-wrap items-center justify-between text-xs text-[#6B635A] gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-emerald-700 rounded" />
            <span>Confirmada</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-amber-600 rounded" />
            <span>Pendiente de Pago</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-slate-700 rounded" />
            <span>Bloqueo Interno</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-sky-600 rounded" />
            <span>Airbnb</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-indigo-600 rounded" />
            <span>Booking.com</span>
          </div>
        </div>

        <span className="text-[11px] text-[#999084]">
          * Haz clic en una celda vacía para crear reserva manual o bloquear.
        </span>
      </div>
    </div>
  );
}
