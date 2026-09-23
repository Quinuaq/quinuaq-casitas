import { useState } from "react";
import { casitas } from "@/lib/casitas";
import { createWalkinBooking } from "@/lib/supabase-pms";
import { DoorOpen } from "lucide-react";

export function WalkinBookingForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const todayStr = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    casitaId: casitas[0].id,
    checkIn: todayStr,
    checkOut: "",
    guestsCount: 2,
    totalPrice: 0,
    arrivalTime: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.checkOut || form.checkOut <= form.checkIn) {
        throw new Error("La fecha de salida debe ser posterior a la de llegada.");
      }

      await createWalkinBooking({
        casitaId: form.casitaId,
        guestName: form.guestName,
        guestPhone: form.guestPhone,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guestsCount: form.guestsCount,
        totalPrice: Number(form.totalPrice),
        arrivalTime: form.arrivalTime,
      });

      onSuccess();
    } catch (err: any) {
      setError(err.message || "Error al registrar walk-in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-[#1B1917]/10 pb-4">
        <DoorOpen className="w-5 h-5 text-[#9C7A3C]" />
        <h2 className="font-serif text-2xl text-[#1B1917]">Registrar Walk-in</h2>
      </div>
      <p className="text-xs text-[#6B635A]">
        Ingresa los datos del huésped que llegó al local. La reserva se marcará como "En Estadía" inmediatamente.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#999084] mb-1">Huésped</label>
            <input
              type="text"
              required
              value={form.guestName}
              onChange={(e) => setForm({ ...form, guestName: e.target.value })}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#999084] mb-1">Teléfono</label>
            <input
              type="tel"
              required
              value={form.guestPhone}
              onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#999084] mb-1">Casita Asignada</label>
            <select
              required
              value={form.casitaId}
              onChange={(e) => setForm({ ...form, casitaId: e.target.value })}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs focus:outline-none focus:border-[#9C7A3C]"
            >
              {casitas.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#999084] mb-1">Cantidad de Personas</label>
            <input
              type="number"
              min={1}
              required
              value={form.guestsCount}
              onChange={(e) => setForm({ ...form, guestsCount: Number(e.target.value) })}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#999084] mb-1">Check-in</label>
            <input
              type="date"
              required
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#999084] mb-1">Check-out</label>
            <input
              type="date"
              required
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#999084] mb-1">Hora Llegada</label>
            <input
              type="time"
              value={form.arrivalTime}
              onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#999084] mb-1">Precio Total Acordado (S/)</label>
          <input
            type="number"
            required
            min={0}
            step={0.01}
            value={form.totalPrice || ""}
            onChange={(e) => setForm({ ...form, totalPrice: Number(e.target.value) })}
            className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs focus:outline-none focus:border-[#9C7A3C]"
          />
        </div>

        {error && <div className="text-xs text-red-600 bg-red-50 p-3 rounded">{error}</div>}

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#10271C] hover:bg-[#9C7A3C] text-white text-xs uppercase tracking-wider rounded font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Confirmar Estancia"}
          </button>
        </div>
      </form>
    </div>
  );
}
