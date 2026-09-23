import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getTodayOccupancy } from "@/lib/supabase-pms";
import { getCasita } from "@/lib/casitas";
import type { Reservation } from "@/types/pms";
import { WalkinBookingForm } from "@/components/admin/WalkinBookingForm";
import { WeeklyGrid } from "@/components/admin/WeeklyGrid";
import { DoorOpen, Bed, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin/recepcion")({
  component: AdminRecepcionPage,
});

function AdminRecepcionPage() {
  const [occupancy, setOccupancy] = useState<{ staying: Reservation[], arriving: Reservation[], departing: Reservation[] }>({ staying: [], arriving: [], departing: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"hoy" | "walkin" | "agenda">("hoy");

  const loadData = async () => {
    setLoading(true);
    const data = await getTodayOccupancy();
    setOccupancy(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 md:p-10 flex-1 flex flex-col min-h-0 bg-[#F7F4EF]">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1B1917] font-light">
            Recepción Local
          </h1>
          <p className="text-xs text-[#6B635A] mt-1">
            Gestión rápida para atención en mostrador
          </p>
        </div>
        <div className="flex bg-[#EFECE5] p-1 rounded-md">
          <button
            onClick={() => setActiveTab("hoy")}
            className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors ${activeTab === "hoy" ? "bg-white shadow-sm text-[#1B1917]" : "text-[#6B635A] hover:text-[#1B1917]"}`}
          >
            Panel de Hoy
          </button>
          <button
            onClick={() => setActiveTab("walkin")}
            className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors ${activeTab === "walkin" ? "bg-white shadow-sm text-[#1B1917]" : "text-[#6B635A] hover:text-[#1B1917]"}`}
          >
            Nuevo Walk-in
          </button>
          <button
            onClick={() => setActiveTab("agenda")}
            className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors ${activeTab === "agenda" ? "bg-white shadow-sm text-[#1B1917]" : "text-[#6B635A] hover:text-[#1B1917]"}`}
          >
            Agenda Semanal
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white border border-[#1B1917]/10 rounded shadow-sm relative">
        {loading && activeTab === "hoy" && <div className="p-6">Cargando ocupación...</div>}
        {!loading && activeTab === "hoy" && (
           <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                 <div className="flex items-center gap-2 border-b border-[#1B1917]/10 pb-2">
                    <Bed className="w-5 h-5 text-[#9C7A3C]" />
                    <h3 className="font-serif text-xl">Ocupadas Hoy ({occupancy.staying.length})</h3>
                 </div>
                 {occupancy.staying.map(res => (
                   <div key={res.id} className="p-3 bg-[#F7F4EF] rounded border border-[#1B1917]/5">
                      <p className="font-medium text-sm text-[#1B1917]">{res.guest_name}</p>
                      <p className="text-xs text-[#6B635A]">{getCasita(res.casita_id)?.name}</p>
                   </div>
                 ))}
                 {occupancy.staying.length === 0 && <p className="text-xs text-[#6B635A] italic">Ninguna casita ocupada.</p>}
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-2 border-b border-[#1B1917]/10 pb-2">
                    <DoorOpen className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-serif text-xl">Check-ins ({occupancy.arriving.length})</h3>
                 </div>
                 {occupancy.arriving.map(res => (
                   <div key={res.id} className="p-3 bg-emerald-50 rounded border border-emerald-100">
                      <p className="font-medium text-sm text-emerald-900">{res.guest_name}</p>
                      <p className="text-xs text-emerald-700">{getCasita(res.casita_id)?.name} {res.arrival_time ? `· ~${res.arrival_time}` : ''}</p>
                   </div>
                 ))}
                 {occupancy.arriving.length === 0 && <p className="text-xs text-[#6B635A] italic">No hay check-ins hoy.</p>}
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-2 border-b border-[#1B1917]/10 pb-2">
                    <LogOut className="w-5 h-5 text-[#8C5135]" />
                    <h3 className="font-serif text-xl">Check-outs ({occupancy.departing.length})</h3>
                 </div>
                 {occupancy.departing.map(res => (
                   <div key={res.id} className="p-3 bg-orange-50 rounded border border-orange-100">
                      <p className="font-medium text-sm text-orange-900">{res.guest_name}</p>
                      <p className="text-xs text-orange-700">{getCasita(res.casita_id)?.name}</p>
                   </div>
                 ))}
                 {occupancy.departing.length === 0 && <p className="text-xs text-[#6B635A] italic">No hay check-outs hoy.</p>}
              </div>
           </div>
        )}
        
        {activeTab === "walkin" && (
          <div className="p-6 max-w-2xl mx-auto">
            <WalkinBookingForm onSuccess={() => {
              loadData();
              setActiveTab("hoy");
            }} />
          </div>
        )}

        {activeTab === "agenda" && (
          <div className="absolute inset-0">
            <WeeklyGrid />
          </div>
        )}
      </div>
    </div>
  );
}
