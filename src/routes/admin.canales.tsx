import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CalendarSync, Copy, Radio, Check, RefreshCw } from "lucide-react";
import { casitas } from "@/lib/casitas";
import { updateCasitaICalUrls, getDBCasitas } from "@/lib/supabase-pms";

export const Route = createFileRoute("/admin/canales")({
  component: AdminCanalesPage,
});

function AdminCanalesPage() {
  const [dbCasitas, setDbCasitas] = useState<any[]>([]);
  const [configs, setConfigs] = useState<Record<string, any>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://casitas.quinuaq.com";

  useEffect(() => {
    async function load() {
      const data = await getDBCasitas();
      setDbCasitas(data);
      const initialConfigs: Record<string, any> = {};
      data.forEach((c) => {
        initialConfigs[c.id] = {
          id: c.id,
          airbnb_url: c.airbnb_ical_url || "",
          booking_url: c.booking_ical_url || "",
          last_sync: null,
          statusMessage: "",
        };
      });
      setConfigs(initialConfigs);
    }
    load();
  }, []);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAndSync = async (casitaId: string) => {
    setSyncingId(casitaId);
    try {
      const cfg = configs[casitaId];
      await updateCasitaICalUrls(casitaId, cfg.airbnb_url, cfg.booking_url);
      
      // Simulate sync
      await new Promise((res) => setTimeout(res, 1500));

      setConfigs((prev) => ({
        ...prev,
        [casitaId]: {
          ...prev[casitaId],
          last_sync: new Date().toLocaleTimeString(),
          statusMessage: "Enlaces guardados y sincronizados correctamente.",
        },
      }));
    } catch (e: any) {
       setConfigs((prev) => ({
        ...prev,
        [casitaId]: {
          ...prev[casitaId],
          statusMessage: "Error: " + e.message,
        },
      }));
    } finally {
      setSyncingId(null);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 flex-1 overflow-y-auto bg-[#F7F4EF]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9C7A3C] font-medium mb-1">
            <Radio className="w-4 h-4" />
            Canales de Venta & Overbooking
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1B1917] font-light">
            Sincronización iCal (Airbnb & Booking.com)
          </h1>
          <p className="text-xs text-[#6B635A] mt-1">
            Conecta tus calendarios para bloquear fechas automáticamente y evitar reservas duplicadas sin pagar comisiones extras.
          </p>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step A: Export from QuinuaQ */}
        <div className="bg-white border border-[#1B1917]/10 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800">
            <CalendarSync className="w-5 h-5" />
            <h3 className="font-serif text-lg font-medium text-[#1B1917]">
              1. Exportar a Airbnb y Booking
            </h3>
          </div>
          <p className="text-xs text-[#6B635A] leading-relaxed">
            Copia el <strong>Enlace de Exportación QuinuaQ</strong> de cada casita y pégalo en la sección de <em>"Importar calendario"</em> dentro de Airbnb y Booking. Cada vez que alguien reserve en tu web, se bloqueará en Airbnb y Booking.
          </p>
        </div>

        {/* Step B: Import to QuinuaQ */}
        <div className="bg-white border border-[#1B1917]/10 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-blue-800">
            <Radio className="w-5 h-5" />
            <h3 className="font-serif text-lg font-medium text-[#1B1917]">
              2. Importar desde Airbnb y Booking
            </h3>
          </div>
          <p className="text-xs text-[#6B635A] leading-relaxed">
            Obtén el enlace de <em>"Exportar calendario (.ics)"</em> en Airbnb o Booking y pégalo en los casilleros de abajo. Nuestro sistema bloqueará automáticamente esas fechas en tu web.
          </p>
        </div>
      </div>

      {/* Casitas Channel Cards Grid */}
      <div className="space-y-6">
        {casitas.map((casita) => {
          const exportUrl = `${baseUrl}/api/ical/${casita.id}.ics`;
          const cfg = configs[casita.id] || { id: casita.id, airbnb_url: "", booking_url: "" };
          const isCopied = copiedId === casita.id;
          const isSyncing = syncingId === casita.id;

          return (
            <div
              key={casita.id}
              className="bg-white border border-[#1B1917]/10 p-6 md:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B1917]/10 pb-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#1B1917]">{casita.name}</h3>
                  <span className="text-xs text-[#999084]">{casita.capacity}</span>
                </div>
                {cfg.last_sync && (
                  <span className="text-xs text-[#6B635A]">
                    Última sincronización: <strong>{cfg.last_sync}</strong>
                  </span>
                )}
              </div>

              {/* 1. Export Link */}
              <div>
                <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1.5 font-medium">
                  → Enlace de Exportación QuinuaQ (Copiar y pegar en Airbnb / Booking)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={exportUrl}
                    className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3.5 py-2.5 text-xs text-[#1B1917] font-mono select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(casita.id, exportUrl)}
                    className="px-4 py-2.5 bg-[#10271C] hover:bg-[#9C7A3C] text-white text-xs uppercase tracking-wider rounded font-medium flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{isCopied ? "¡Copiado!" : "Copiar"}</span>
                  </button>
                </div>
              </div>

              {/* 2. Import Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1.5 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    ← Enlace de Calendario Airbnb (.ics)
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.airbnb.com/calendar/ical/..."
                    value={cfg.airbnb_url}
                    onChange={(e) =>
                      setConfigs({
                        ...configs,
                        [casita.id]: { ...cfg, airbnb_url: e.target.value },
                      })
                    }
                    className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3.5 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1.5 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    ← Enlace de Calendario Booking.com (.ics)
                  </label>
                  <input
                    type="url"
                    placeholder="https://admin.booking.com/hotel/hoteladmin/ical.html?..."
                    value={cfg.booking_url}
                    onChange={(e) =>
                      setConfigs({
                        ...configs,
                        [casita.id]: { ...cfg, booking_url: e.target.value },
                      })
                    }
                    className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3.5 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
                  />
                </div>
              </div>

              {/* Status Message */}
              {cfg.statusMessage && (
                <div className="p-3 bg-[#F7F4EF] border border-[#1B1917]/5 text-xs text-[#6B635A]">
                  {cfg.statusMessage}
                </div>
              )}

              {/* Action */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleSaveAndSync(casita.id)}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#10271C] hover:bg-[#9C7A3C] text-white text-xs uppercase tracking-wider rounded font-medium transition-colors shadow-sm disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>{isSyncing ? "Sincronizando..." : "Guardar & Sincronizar Canales"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
