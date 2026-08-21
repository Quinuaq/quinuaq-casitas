import { useState } from "react";
import { casitas } from "@/lib/casitas";
import { createAdminDateBlock } from "@/lib/supabase-pms";
import { X, Lock, ShieldAlert } from "lucide-react";

interface BlockDatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCasitaId?: string;
  initialDate?: string;
}

export function BlockDatesModal({
  isOpen,
  onClose,
  onSuccess,
  initialCasitaId,
  initialDate,
}: BlockDatesModalProps) {
  const [casitaId, setCasitaId] = useState(initialCasitaId || casitas[0].id);
  const [startDate, setStartDate] = useState(initialDate || new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(initialDate || new Date().toISOString().slice(0, 10));
  const [reason, setReason] = useState("Mantenimiento general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (endDate < startDate) {
      setError("La fecha de fin debe ser igual o posterior a la fecha de inicio.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createAdminDateBlock({
        casitaId,
        startDate,
        endDate,
        reason: reason.trim() || "Bloqueo manual",
      });
      setLoading(false);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Error al registrar el bloqueo.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#1B1917]/10 w-full max-w-lg shadow-2xl p-6 md:p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#999084] hover:text-[#1B1917] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-800 text-[#9C7A3C] flex items-center justify-center rounded">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-[#1B1917]">Bloquear Fechas</h3>
            <p className="text-xs text-[#6B635A]">
              Inhabilita la casita para que no pueda ser reservada en la web.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
              Casita / Habitación
            </label>
            <select
              value={casitaId}
              onChange={(e) => setCasitaId(e.target.value)}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
            >
              {casitas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.capacity})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                Desde (Inicio)
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                Hasta (Fin)
              </label>
              <input
                type="date"
                required
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
              Motivo del Bloqueo
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Mantenimiento, Fumigación, Uso de propietarios..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-[#1B1917]/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#1B1917]/20 text-xs uppercase tracking-wider text-[#6B635A] hover:bg-[#F7F4EF]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#10271C] hover:bg-[#9C7A3C] text-white text-xs uppercase tracking-wider font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Bloqueando..." : "Confirmar Bloqueo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
