import { useState } from "react";
import type { Reservation, PaymentMethod, PaymentType } from "@/types/pms";
import { recordReservationPayment } from "@/lib/supabase-pms";
import { X, CreditCard, CheckCircle2 } from "lucide-react";

interface PaymentRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reservation: Reservation;
}

export function PaymentRecordModal({
  isOpen,
  onClose,
  onSuccess,
  reservation,
}: PaymentRecordModalProps) {
  const balanceDue = Math.max(0, Number(reservation.total_price) - Number(reservation.paid_amount || 0));
  const suggestedAmount = balanceDue > 0 ? balanceDue : 0;

  const [amount, setAmount] = useState<number>(suggestedAmount);
  const [paymentType, setPaymentType] = useState<PaymentType>(
    Number(reservation.paid_amount) > 0 ? "saldo_checkin" : "adelanto_50"
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("yape");
  const [transactionRef, setTransactionRef] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError("Ingresa un monto válido mayor a 0.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await recordReservationPayment({
        reservationId: reservation.id,
        amount: Number(amount),
        paymentType,
        paymentMethod,
        transactionRef: transactionRef.trim() || undefined,
        receivedBy: "Administración",
        notes: notes.trim() || undefined,
      });

      setLoading(false);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Error al registrar el pago.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#1B1917]/10 w-full max-w-md shadow-2xl p-6 md:p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#999084] hover:text-[#1B1917] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#9C7A3C]/15 text-[#9C7A3C] flex items-center justify-center rounded">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-[#1B1917]">Registrar Pago / Abono</h3>
            <p className="text-xs text-[#6B635A]">
              Reserva: <strong className="text-[#1B1917]">{reservation.id}</strong> — {reservation.guest_name}
            </p>
          </div>
        </div>

        {/* Balance context */}
        <div className="bg-[#F7F4EF] p-4 border border-[#1B1917]/10 flex justify-between text-xs">
          <div>
            <span className="text-[#999084]">Total Reserva:</span>
            <div className="font-medium text-[#1B1917]">S/ {reservation.total_price}</div>
          </div>
          <div>
            <span className="text-[#999084]">Pagado:</span>
            <div className="font-medium text-emerald-700">S/ {reservation.paid_amount || 0}</div>
          </div>
          <div>
            <span className="text-[#999084]">Saldo Pendiente:</span>
            <div className="font-medium text-[#8C5135]">S/ {balanceDue}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] uppercase tracking-wider text-[#999084] mb-1">
              Monto a Registrar (S/)
            </label>
            <input
              type="number"
              required
              min={1}
              step={5}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-sm text-[#1B1917] font-medium focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-[#999084] mb-1">
                Concepto
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
              >
                <option value="adelanto_50">Adelanto (50%)</option>
                <option value="saldo_checkin">Saldo al Check-in</option>
                <option value="pago_total">Pago Total (100%)</option>
                <option value="consumo_extra">Consumo Extra</option>
                <option value="reembolso">Reembolso</option>
              </select>
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
                <option value="tarjeta">Tarjeta Débito/Crédito</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[9px] uppercase tracking-wider text-[#999084] mb-1">
              N° de Operación / Comprobante
            </label>
            <input
              type="text"
              placeholder="Ej. OP-4819273"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              className="w-full bg-[#F7F4EF] border border-[#1B1917]/10 px-3 py-2 text-xs text-[#1B1917] focus:outline-none focus:border-[#9C7A3C]"
            />
          </div>

          <div>
            <label className="block text-[9px] uppercase tracking-wider text-[#999084] mb-1">
              Notas adicionales
            </label>
            <input
              type="text"
              placeholder="Ej. Recibido por WhatsApp voucher..."
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
              {loading ? "Registrando..." : "Guardar Pago"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
