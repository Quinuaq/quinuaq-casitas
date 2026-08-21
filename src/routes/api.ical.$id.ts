import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getAdminReservations, getAdminDateBlocks } from "@/lib/supabase-pms";
import { generateICalFeed } from "@/lib/ical-generator";

export const Route = createAPIFileRoute("/api/ical/$id")({
  GET: async ({ params }) => {
    const casitaId = params.id.replace(/\.ics$/, "");
    const [reservations, blocks] = await Promise.all([
      getAdminReservations(),
      getAdminDateBlocks(),
    ]);
    const icalContent = generateICalFeed(casitaId, reservations, blocks);
    return new Response(icalContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `inline; filename="${casitaId}.ics"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  },
});
