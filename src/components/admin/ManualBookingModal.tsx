import { useState, useMemo } from "react";
import { casitas, calculateQuote, getCasita } from "@/lib/casitas";
import { supabase } from "@/lib/supabase-pms";
import { X, CalendarPlus, UserCheck, CreditCard } from "lucide-react";
import type { PaymentMethod } from "@/types/pms";

interface ManualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCasitaId?: string;
  initialDate?: string;
}

export function ManualBookingModal({
  isOpen,
  onClose,
  onSuccess,
  initialCasitaId,
  initialDate,
}: ManualBookingModalProps) {
  const [casitaId, setCasitaId] = useState(initialCasitaId || casitas[0].id);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkIn, setCheckIn] = useState(initialDate || new Date().toISOString().slice(0, 10));
  const [checkOut, setCheckOut] = useState(() => {
    const d = initialDate ? new Date(initialDate + "T00:00:00") : new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [guestsCount, setGuestsCount] = useState(2);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("yape");
  const [transactionRef, setTransactionRef] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCasita = useMemo(() => getCasita(casitaId) || casitas[0], [casitaId]);

  const quote = useMemo(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      return { nights: 0, total: 0, suggestedDeposit: 0 };
    }
    return calculateQuote(selectedCasita, checkIn, checkOut, guestsCount);
  }, [selectedCasita, checkIn, checkOut, guestsCount]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkOut <= checkIn) {
      setError("La fecha de check-out debe ser posterior al check-in.");
      return;
    }
    setLoading(true);
    setError(null);

    const random = Math.floor(1000 + Math.random() * 9000);
    const reservationCode = `QQ-${new Date().getFullYear()}-${random}`;
    const paid = Number(depositAmount) || 0;
    const status = paid >= quote.total ? "confirmed" : paid > 0 ? "confirmed" : "pending";

    try {
      // 1. Insert reservation
      const { error: resErr } = await supabase.from("reservations").insert({
        id: reservationCode,
        casita_id: casitaId,
        guest_name: guestName.trim(),
        guest_phone: guestPhone.trim(),
        guest_email: guestEmail.trim() || null,
        check_in: checkIn,
        check_out: checkOut,
        nights: quote.nights,
        guests_count: guestsCount,
        total_price: quote.total,
        paid_amount: paid,
        status,
        source: "admin_manual",
        notes: notes.trim() || null,
      });

      if (resErr) {
        console.error("Res insert error", resErr);
      }

      // 2. If deposit entered, insert payment
      if (paid > 0) {
        await supabase.from("payments").insert({
          reservation_id: reservationCode,
          amount: paid,
          payment_type: paid >= quote.total ? "pago_total" : "adelanto_50",
          payment_method: paymentMethod,
          transaction_ref: transactionRef.trim() || null,
          received_by: "Administración",
          notes: "Adelanto inicial al crear reserva manual",
        });
      }

      setLoading(false);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Error al crear la reserva.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#1B1917]/10 w-full max-w-xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#999084] hover:text-[#1B1917] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-800 text-[#9C7A3C] flex items-center justify-center rounded">
            <CalendarPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-[#1B1917]">Nueva Reserva Manual</h3>
            <p className="text-xs text-[#6B635A]">
              Registra reservas recibidas por teléfono, WhatsApp o presencial.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
              Casita
            </label>
            <select
              value={casitaId}
              onChange={(e) => setCasitaId(e.target.value)}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
            >
              {casitas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.capacity}) — Desde S/ {c.prices.weekday}/noche
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                Nombre del Huésped
              </label>
              <input
                type="text"
                required
                placeholder="Nombre y Apellido"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                Teléfono / WhatsApp
              </label>
              <input
                type="tel"
                required
                placeholder="+51 900 000 000"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                Check-in
              </label>
              <input
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                Check-out
              </label>
              <input
                type="date"
                required
                min={checkIn}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
                Huéspedes
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
              >
                {Array.from({ length: selectedCasita.maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} pers.
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing Preview */}
          <div className="bg-[#F7F4EF] p-4 border border-[#1B1917]/10 flex justify-between items-center text-xs">
            <div>
              <span className="text-[#6B635A]">Cálculo ({quote.nights} noches)</span>
              <div className="font-serif text-xl text-[#9C7A3C] font-medium mt-0.5">
                Total: S/ {quote.total}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[#6B635A]">Adelanto 50% sugerido</span>
              <div className="font-medium text-[#1B1917]">S/ {quote.suggestedDeposit}</div>
            </div>
          </div>

          {/* Deposit & Payment Details */}
          <div className="pt-2 border-t border-[#1B1917]/10 space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#999084] font-medium block">
              Registro de Pago / Anticipo (Opcional)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-[#999084] mb-1">
                  Monto Abonado (S/)
                </label>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-[#999084] mb-1">
                  Método de Pago
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
                >
                  <option value="yape">Yape</option>
                  <option value="plin">Plin</option>
                  <option value="transferencia_bcp">Transf. BCP</option>
                  <option value="transferencia_bbva">Transf. BBVA</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-[#999084] mb-1">
                  N° Operación / Voucher
                </label>
                <input
                  type="text"
                  placeholder="Ej. OP-198273"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-[#999084] mb-1">
              Notas internas
            </label>
            <input
              type="text"
              placeholder="Ej. Llega tarde 8pm, requiere traslado..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              {loading ? "Registrando..." : "Guardar Reserva"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
