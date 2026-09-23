import { createAPIFileRoute } from '@tanstack/react-start/api';
import { getAdminReservations, getAdminDateBlocks } from "@/lib/supabase-pms";
import { generateICalFeed } from "@/lib/ical-generator";

export const Route = createAPIFileRoute('/api/ical/$casitaId')({
  GET: async ({ params }) => {
    const { casitaId } = params;
    const [reservations, blocks] = await Promise.all([
      getAdminReservations(),
      getAdminDateBlocks(),
    ]);
    
    const icalFeed = generateICalFeed(casitaId, reservations, blocks);
    
    return new Response(icalFeed, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 'public, max-age=900', // 15 min cache
      },
    });
  },
});
