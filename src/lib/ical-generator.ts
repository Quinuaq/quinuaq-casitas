import type { Reservation, DateBlock } from "@/types/pms";
import { getCasita } from "./casitas";

function formatDateToICal(dateStr: string): string {
  // dateStr is 'YYYY-MM-DD' -> returns 'YYYYMMDD'
  return dateStr.replace(/-/g, "");
}

function formatNowToICal(): string {
  const now = new Date();
  return now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function generateICalFeed(
  casitaId: string,
  reservations: Reservation[],
  dateBlocks: DateBlock[]
): string {
  const casita = getCasita(casitaId);
  const casitaName = casita?.name || casitaId;
  const dtStamp = formatNowToICal();

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//QuinuaQ Casitas//Hospitality OS//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:QuinuaQ Casitas - ${casitaName}`,
    "X-WR-TIMEZONE:America/Lima",
  ];

  // Add confirmed and checked_in reservations
  const activeReservations = reservations.filter(
    (r) => r.casita_id === casitaId && (r.status === "confirmed" || r.status === "checked_in")
  );

  for (const res of activeReservations) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:QQ-RES-${res.id}@casitas.quinuaq.com`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART;VALUE=DATE:${formatDateToICal(res.check_in)}`,
      `DTEND;VALUE=DATE:${formatDateToICal(res.check_out)}`,
      `SUMMARY:Reservado - QuinuaQ (${res.id})`,
      `DESCRIPTION:Reserva confirmada en QuinuaQ Casitas. Huésped: ${res.guest_name}`,
      "STATUS:CONFIRMED",
      "END:VEVENT"
    );
  }

  // Add date blocks
  const activeBlocks = dateBlocks.filter((b) => b.casita_id === casitaId);
  for (const block of activeBlocks) {
    // Next day for iCal end date
    const endD = new Date(block.end_date + "T00:00:00");
    endD.setDate(endD.getDate() + 1);
    const endICal = endD.toISOString().slice(0, 10).replace(/-/g, "");

    lines.push(
      "BEGIN:VEVENT",
      `UID:QQ-BLOCK-${block.id}@casitas.quinuaq.com`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART;VALUE=DATE:${formatDateToICal(block.start_date)}`,
      `DTEND;VALUE=DATE:${endICal}`,
      `SUMMARY:Bloqueado (${block.reason})`,
      `DESCRIPTION:Bloqueo de calendario en QuinuaQ Casitas`,
      "STATUS:CONFIRMED",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");

  return lines.join("\r\n");
}
