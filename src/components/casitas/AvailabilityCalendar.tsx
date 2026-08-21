import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-based

  const todayStr = new Date().toISOString().slice(0, 10);

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
      const inD = new Date(checkIn + "T00:00:00");
      const outD = new Date(dateStr + "T00:00:00");
      let hasBlocked = false;

      const cursor = new Date(inD);
      while (cursor < outD) {
        if (blockedSet.has(cursor.toISOString().slice(0, 10))) {
          hasBlocked = true;
          break;
        }
        cursor.setDate(cursor.getDate() + 1);
      }

      if (hasBlocked) {
        // Reset and make this the new checkIn
        onSelectRange(dateStr, "");
        setSelectingStep("checkOut");
      } else {
        onSelectRange(checkIn, dateStr);
        setSelectingStep("checkIn");
      }
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#1B1917]/10 p-6 md:p-8 select-none">
      {/* Month Header & Controls */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1B1917]/10">
        <h4 className="font-serif text-lg text-[#1B1917] font-medium">
          {monthNames[month]} {year}
        </h4>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center border border-[#1B1917]/10 hover:bg-[#F7F4EF] transition-colors"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center border border-[#1B1917]/10 hover:bg-[#F7F4EF] transition-colors"
            aria-label="Siguiente mes"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-[#999084] font-medium mb-3">
        {dayNames.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty slots for first week */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="h-10" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
          const isBlocked = blockedSet.has(dateStr);
          const isPast = dateStr < todayStr;
          const isCheckIn = checkIn === dateStr;
          const isCheckOut = checkOut === dateStr;
          const isInRange = checkIn && checkOut && dateStr > checkIn && dateStr < checkOut;

          const isDisabled = isBlocked || isPast;

          let bgClass = "bg-transparent text-[#1B1917] hover:bg-[#F7F4EF]";
          if (isDisabled) {
            bgClass = "bg-[#F0ECE1]/50 text-[#B0A79C] line-through cursor-not-allowed";
          } else if (isCheckIn || isCheckOut) {
            bgClass = "bg-[#9C7A3C] text-white font-medium shadow-sm";
          } else if (isInRange) {
            bgClass = "bg-[#9C7A3C]/15 text-[#1B1917] font-medium";
          }

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isDisabled}
              onClick={() => handleDateClick(dateStr)}
              className={`h-10 flex flex-col items-center justify-center text-xs transition-colors relative ${bgClass}`}
            >
              <span>{dayNum}</span>
              {isBlocked && (
                <span className="text-[8px] leading-none text-[#BB5A3E] font-sans no-underline block">
                  Ocupado
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-[#1B1917]/10 flex flex-wrap items-center justify-between text-[11px] text-[#6B635A] gap-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#9C7A3C]" />
          <span>Fechas seleccionadas</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#F0ECE1] line-through text-[#B0A79C] flex items-center justify-center text-[8px]" />
          <span>No disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 border border-[#1B1917]/20" />
          <span>Disponible</span>
        </div>
      </div>
    </div>
  );
}
