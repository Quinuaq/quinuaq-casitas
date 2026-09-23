import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { todayISO } from "@/lib/stay-dates";

interface AvailabilityCalendarProps {
  blockedDates: string[]; // ISO string 'YYYY-MM-DD'
  checkIn: string;
  checkOut: string;
  onSelectRange: (checkIn: string, checkOut: string) => void;
}

export function AvailabilityCalendar({
  blockedDates,
  checkIn,
  checkOut,
  onSelectRange,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = checkIn ? new Date(checkIn + "T00:00:00") : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const [selectingStep, setSelectingStep] = useState<"checkIn" | "checkOut">("checkIn");
  const blockedSet = useMemo(() => new Set(blockedDates), [blockedDates]);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-based

  const todayStr = todayISO();

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateClick = (dateStr: string) => {
    if (blockedSet.has(dateStr) || dateStr < todayStr) return;

    if (selectingStep === "checkIn" || !checkIn || (checkIn && dateStr <= checkIn)) {
      // Pick checkIn
      onSelectRange(dateStr, "");
      setSelectingStep("checkOut");
    } else {
      // Pick checkOut
      // Verify no blocked dates in between
      const hasBlocked = blockedDates.some((date) => date >= checkIn && date < dateStr);

      if (hasBlocked) {
        onSelectRange(dateStr, "");
        setSelectingStep("checkOut");
      } else {
        onSelectRange(checkIn, dateStr);
        setSelectingStep("checkIn");
      }
    }
  };

  return (
    <div className="qq-calendar-inner">
      <div className="qq-calendar-top">
        <h3 aria-live="polite">
          {monthNames[month]} {year}
        </h3>
        <div>
          <button type="button" onClick={prevMonth} aria-label="Mes anterior">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={nextMonth} aria-label="Siguiente mes">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <p className="qq-calendar-instruction" aria-live="polite">
        {selectingStep === "checkIn"
          ? "Selecciona el día de llegada."
          : "Ahora selecciona el día de salida."}
      </p>
      <div className="qq-calendar-weekdays">
        {dayNames.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="qq-calendar-days">
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <span key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const unavailable = blockedSet.has(date) || date < todayStr;
          const selected = checkIn === date || checkOut === date;
          const inRange = Boolean(checkIn && checkOut && date > checkIn && date < checkOut);
          return (
            <button
              key={date}
              type="button"
              disabled={unavailable}
              aria-label={`${day} de ${monthNames[month]} de ${year}${unavailable ? ", no disponible" : ""}`}
              aria-pressed={selected}
              className={`${selected ? "is-selected" : ""} ${inRange ? "is-in-range" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="qq-calendar-legend">
        <span>
          <i className="selected" />
          Tu selección
        </span>
        <span>
          <i className="unavailable" />
          No disponible
        </span>
      </div>
    </div>
  );
}
