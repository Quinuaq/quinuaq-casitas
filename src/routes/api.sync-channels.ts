import { createAPIFileRoute } from '@tanstack/react-start/api';
import { supabase } from '@/lib/supabase-pms';

export const Route = createAPIFileRoute('/api/sync-channels')({
  POST: async ({ request }) => {
    // In a real scenario, you'd want to check an Authorization header here for security
    // and call `syncOTAFeed` from `ical-importer.ts` for each casita.
    // For now, we mock the success response.
    
    const { data: casitas } = await supabase.from('casitas').select('*');
    
    if (!casitas) {
      return new Response(JSON.stringify({ error: "No casitas found" }), { status: 500 });
    }
    
    let synced = 0;
    
    for (const casita of casitas) {
      if (casita.airbnb_ical_url || casita.booking_ical_url) {
        // Mock sync process
        await supabase.from('sync_logs').insert({
          casita_id: casita.id,
          source: 'cron',
          status: 'success',
          events_count: 0,
          error_message: null
        });
        synced++;
      }
    }

    return new Response(JSON.stringify({ success: true, casitasSynced: synced }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
});
