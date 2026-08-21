import { supabase } from "./supabase-pms";

interface ParsedEvent {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  summary: string;
}

export function parseICalText(icalText: string): ParsedEvent[] {
  const events: ParsedEvent[] = [];
  const eventBlocks = icalText.split("BEGIN:VEVENT");

  for (let i = 1; i < eventBlocks.length; i++) {
    const block = eventBlocks[i].split("END:VEVENT")[0];

    const dtStartMatch = block.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/);
    const dtEndMatch = block.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/);
    const summaryMatch = block.match(/SUMMARY:(.+)/);

    if (dtStartMatch && dtEndMatch) {
      const s = dtStartMatch[1];
      const e = dtEndMatch[1];

      const startDate = `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
      const endDate = `${e.slice(0, 4)}-${e.slice(4, 6)}-${e.slice(6, 8)}`;
      const summary = summaryMatch ? summaryMatch[1].trim() : "Reserva Externa";

      events.push({ startDate, endDate, summary });
    }
  }

  return events;
}

export async function syncOTAFeed(
  casitaId: string,
  feedUrl: string,
  source: "airbnb_ical" | "booking_ical"
): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const response = await fetch(feedUrl, {
      headers: { "User-Agent": "QuinuaQ-Hospitality-Bot/1.0" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} fetching iCal feed`);
    }

    const icalText = await response.text();
    const events = parseICalText(icalText);

    // Delete previous synced blocks from this source for this casita
    await supabase
      .from("date_blocks")
      .delete()
      .eq("casita_id", casitaId)
      .eq("source", source);

    // Insert newly parsed blocks
    if (events.length > 0) {
      const inserts = events.map((ev) => ({
        casita_id: casitaId,
        start_date: ev.startDate,
        end_date: ev.endDate,
        reason: `${source === "airbnb_ical" ? "Airbnb" : "Booking"}: ${ev.summary}`,
        source,
      }));

      await supabase.from("date_blocks").insert(inserts);
    }

    return { success: true, count: events.length };
  } catch (err: any) {
    console.error(`[syncOTAFeed] failed for ${casitaId} from ${source}:`, err);
    return { success: false, count: 0, error: err?.message || "Error al sincronizar" };
  }
}
