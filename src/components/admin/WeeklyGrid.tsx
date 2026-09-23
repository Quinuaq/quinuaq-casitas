import { useState, useEffect } from "react";
import { getAdminReservations, getAdminDateBlocks } from "@/lib/supabase-pms";
import { casitas } from "@/lib/casitas";
import type { Reservation, DateBlock } from "@/types/pms";
import { CalendarDays } from "lucide-react";

export function WeeklyGrid() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [blocks, setBlocks] = useState<DateBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [r, b] = await Promise.all([getAdminReservations(), getAdminDateBlocks()]);
      setReservations(r);
      setBlocks(b);
      setLoading(false);
    };
    load();
  }, []);

  // Generate 7 days
  const days = [];
  const start = new Date(startDate + "T00:00:00");
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().slice(0, 10));
  }

  const shiftDays = (offset: number) => {
    const d = new Date(startDate + "T00:00:00");
    d.setDate(d.getDate() + offset);
    setStartDate(d.toISOString().slice(0, 10));
  };

  const getStatusForCell = (casitaId: string, dateStr: string) => {
    const res = reservations.find(r => r.casita_id === casitaId && r.check_in <= dateStr && r.check_out > dateStr && r.status !== "cancelled");
    if (res) return { type: 'reservation', data: res };
    const block = blocks.find(b => b.casita_id === casitaId && b.start_date <= dateStr && b.end_date >= dateStr);
    if (block) return { type: 'block', data: block };
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[#1B1917]/10 flex items-center justify-between shrink-0 bg-[#F7F4EF]">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-[#9C7A3C]" />
          <h2 className="font-serif text-xl">Agenda Semanal</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => shiftDays(-7)} className="px-3 py-1 bg-white border border-[#1B1917]/10 text-xs rounded hover:bg-gray-50">Anterior</button>
          <span className="text-xs font-medium w-24 text-center">{startDate}</span>
          <button onClick={() => shiftDays(7)} className="px-3 py-1 bg-white border border-[#1B1917]/10 text-xs rounded hover:bg-gray-50">Siguiente</button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="text-xs text-center text-[#6B635A]">Cargando agenda...</div>
        ) : (
          <div className="min-w-[800px]">
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="text-[10px] uppercase font-bold text-[#999084] p-2">Casita</div>
              {days.map(d => (
                <div key={d} className="text-[10px] uppercase font-bold text-[#999084] p-2 text-center border-l border-[#1B1917]/10">
                  {new Date(d + "T00:00:00").toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })}
                </div>
              ))}
            </div>
            
            {casitas.map(c => (
              <div key={c.id} className="grid grid-cols-8 gap-1 mb-1 items-stretch">
                <div className="text-xs font-medium p-2 bg-[#F7F4EF] rounded border border-[#1B1917]/5 flex items-center">{c.name}</div>
                {days.map(d => {
                  const status = getStatusForCell(c.id, d);
                  return (
                    <div key={`${c.id}-${d}`} className={`text-[10px] p-2 rounded border border-[#1B1917]/5 flex flex-col justify-center items-center text-center
                      ${!status ? 'bg-white hover:bg-gray-50 cursor-pointer' : ''}
                      ${status?.type === 'reservation' ? 'bg-[#9C7A3C]/10 text-[#9C7A3C] font-bold border-[#9C7A3C]/20' : ''}
                      ${status?.type === 'block' ? 'bg-gray-200 text-gray-600' : ''}
                    `}>
                      {status?.type === 'reservation' && (
                        <span className="truncate w-full block">{(status.data as Reservation).guest_name}</span>
                      )}
                      {status?.type === 'block' && <span>Bloqueo</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
