import { useState, useEffect } from "react";
import type { Reservation, Payment } from "@/types/pms";
import { getCasita } from "@/lib/casitas";
import {
  updateReservationStatus,
  getReservationPayments,
} from "@/lib/supabase-pms";
import { PaymentRecordModal } from "./PaymentRecordModal";
import {
  X,
  Phone,
  Mail,
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  Clock,
  DoorOpen,
  LogOut,
  XCircle,
  Plus,
  Receipt,
  FileText,
} from "lucide-react";

interface ReservationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation;
  onUpdated: () => void;
}

export function ReservationDetailModal({
  isOpen,
  onClose,
  reservation,
  onUpdated,
}: ReservationDetailModalProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const casita = getCasita(reservation.casita_id);

  const loadPayments = async () => {
    const data = await getReservationPayments(reservation.id);
    setPayments(data);
  };

  useEffect(() => {
    if (isOpen) {
      loadPayments();
    }
  }, [isOpen, reservation.id]);

  if (!isOpen) return null;

  const total = Number(reservation.total_price);
  const paid = Number(reservation.paid_amount || 0);
  const balance = Math.max(0, total - paid);

  const handleStatusChange = async (newStatus: any) => {
    if (
      newStatus === "cancelled" &&
      !confirm("¿Estás seguro de cancelar esta reserva y liberar las fechas en el calendario?")
    ) {
      return;
    }

    setLoading(true);
    await updateReservationStatus(reservation.id, newStatus);
    setLoading(false);
    onUpdated();
    onClose();
  };

  const cleanPhone = reservation.guest_phone.replace(/\D/g, "");
  const waChatUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola ${reservation.guest_name}, te escribimos de QuinuaQ Casitas sobre tu reserva ${reservation.id}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#1B1917]/10 w-full max-w-2xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#999084] hover:text-[#1B1917] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1B1917]/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#9C7A3C]">
                {reservation.id}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium ${
                  reservation.status === "confirmed"
                    ? "bg-emerald-100 text-emerald-800"
                    : reservation.status === "checked_in"
                    ? "bg-blue-100 text-blue-800"
                    : reservation.status === "checked_out"
                    ? "bg-gray-100 text-gray-800"
                    : reservation.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {reservation.status === "confirmed"
                  ? "Confirmada"
                  : reservation.status === "checked_in"
                  ? "En Estadía (Check-in)"
                  : reservation.status === "checked_out"
                  ? "Finalizada"
                  : reservation.status === "cancelled"
                  ? "Cancelada"
                  : "Pendiente de Pago"}
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1B1917] mt-1">
              {reservation.guest_name}
            </h2>
            <p className="text-xs text-[#6B635A]">
              Casita: <strong className="text-[#1B1917]">{casita?.name || reservation.casita_id}</strong>
            </p>
          </div>

          <a
            href={waChatUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-medium uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            Chat WhatsApp
          </a>
        </div>

        {/* Guest & Dates Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#F7F4EF] p-4 border border-[#1B1917]/5 space-y-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#999084] font-medium block">
              Datos del Huésped
            </span>
            <div className="flex items-center gap-2 text-[#1B1917]">
              <Phone className="w-3.5 h-3.5 text-[#9C7A3C]" />
              <span>{reservation.guest_phone}</span>
            </div>
            {reservation.guest_email && (
              <div className="flex items-center gap-2 text-[#1B1917]">
                <Mail className="w-3.5 h-3.5 text-[#9C7A3C]" />
                <span>{reservation.guest_email}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[#1B1917]">
              <Users className="w-3.5 h-3.5 text-[#9C7A3C]" />
              <span>{reservation.guests_count} huéspedes</span>
            </div>
          </div>

          <div className="bg-[#F7F4EF] p-4 border border-[#1B1917]/5 space-y-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#999084] font-medium block">
              Itinerario de Estadía
            </span>
            <div className="flex items-center gap-2 text-[#1B1917]">
              <Calendar className="w-3.5 h-3.5 text-[#9C7A3C]" />
              <span>
                <strong>{reservation.check_in}</strong> al <strong>{reservation.check_out}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#6B635A]">
              <Clock className="w-3.5 h-3.5 text-[#9C7A3C]" />
              <span>Duración: {reservation.nights} noche(s)</span>
            </div>
            <div className="text-[10px] text-[#999084]">
              Origen: <span className="uppercase">{reservation.source}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary & Payments Ledger */}
        <div className="bg-white border border-[#1B1917]/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#9C7A3C]" />
              <h4 className="font-serif text-lg text-[#1B1917]">Estado Financiero & Pagos</h4>
            </div>
            <button
              onClick={() => setPaymentModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#10271C] hover:bg-[#9C7A3C] text-white text-[11px] uppercase tracking-wider rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
              Registrar Abono
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-[#F7F4EF] border border-[#1B1917]/5 text-center">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#999084] block">Total</span>
              <div className="font-serif text-xl text-[#1B1917] font-medium">S/ {total}</div>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#999084] block">Abonado</span>
              <div className="font-serif text-xl text-emerald-700 font-medium">S/ {paid}</div>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#999084] block">Saldo</span>
              <div className="font-serif text-xl text-[#8C5135] font-medium">S/ {balance}</div>
            </div>
          </div>

          {/* Payments list */}
          {payments.length > 0 ? (
            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase tracking-wider text-[#999084] font-medium block">
                Historial de Abonos Registrados:
              </span>
              <div className="space-y-1.5">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-[#F7F4EF]/60 border border-[#1B1917]/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-medium text-[#1B1917] uppercase">{p.payment_method}</span>
                      <span className="text-[#6B635A] ml-2">({p.payment_type})</span>
                      {p.transaction_ref && (
                        <span className="text-[11px] text-[#999084] block">
                          Ref: {p.transaction_ref}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-serif font-medium text-emerald-700 text-sm">
                        + S/ {p.amount}
                      </span>
                      <span className="text-[10px] text-[#999084] block">
                        {new Date(p.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#999084] italic pt-1">
              No hay pagos individuales registrados aún en el libro contable.
            </p>
          )}
        </div>

        {/* Notes if present */}
        {reservation.notes && (
          <div className="p-4 bg-[#F7F4EF] border border-[#1B1917]/5 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[#999084] font-medium block mb-1">
              Notas / Peticiones Especiales:
            </span>
            <p className="text-[#6B635A]">{reservation.notes}</p>
          </div>
        )}

        {/* Action Buttons Workflow */}
        <div className="pt-4 border-t border-[#1B1917]/10 flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2">
            {reservation.status === "pending" && (
              <button
                type="button"
                onClick={() => handleStatusChange("confirmed")}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-wider rounded font-medium transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Confirmar Reserva
              </button>
            )}

            {reservation.status === "confirmed" && (
              <button
                type="button"
                onClick={() => handleStatusChange("checked_in")}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs uppercase tracking-wider rounded font-medium transition-colors"
              >
                <DoorOpen className="w-3.5 h-3.5" />
                Hacer Check-in
              </button>
            )}

            {reservation.status === "checked_in" && (
              <button
                type="button"
                onClick={() => handleStatusChange("checked_out")}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-800 hover:bg-black text-white text-xs uppercase tracking-wider rounded font-medium transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Completar Check-out
              </button>
            )}
          </div>

          {reservation.status !== "cancelled" && (
            <button
              type="button"
              onClick={() => handleStatusChange("cancelled")}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-300 text-red-700 hover:bg-red-50 text-xs uppercase tracking-wider rounded transition-colors"
            >
              <XCircle className="w-3.5 h-3.5" />
              Cancelar y Liberar
            </button>
          )}
        </div>

        {/* Nested Payment Modal */}
        <PaymentRecordModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          onSuccess={() => {
            loadPayments();
            onUpdated();
          }}
          reservation={reservation}
        />
      </div>
    </div>
  );
}
