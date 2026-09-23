
import { defineEventHandler } from 'h3';
import { getAdminReservations, getAdminDateBlocks } from '@/lib/supabase-pms';
import { generateICalFeed } from '@/lib/ical-generator';

export default defineEventHandler(async (event) => {
  let casitaId = event.context.params?.casitaId;
  
  if (!casitaId) {
    return new Response('Missing casitaId', { status: 400 });
  }

  // Strip .ics extension if requested
  casitaId = casitaId.replace(/\.ics$/, '');

  const [reservations, blocks] = await Promise.all([
    getAdminReservations(),
    getAdminDateBlocks(),
  ]);
  
  const icalFeed = generateICalFeed(casitaId, reservations, blocks);
  
  return new Response(icalFeed, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Cache-Control': 'public, max-age=900',
    },
  });
});
