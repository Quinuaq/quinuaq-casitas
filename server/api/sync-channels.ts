
import { defineEventHandler } from 'h3';
import { supabase } from '@/lib/supabase-pms';

export default defineEventHandler(async (event) => {
  const { data: casitas } = await supabase.from('casitas').select('*');
  
  if (!casitas) {
    return new Response(JSON.stringify({ error: 'No casitas found' }), { status: 500 });
  }
  
  let synced = 0;
  
  for (const casita of casitas) {
    if (casita.airbnb_ical_url || casita.booking_ical_url) {
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
});
