import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'https://esm.sh/@resend/node';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Subscribe to new messages
    const changes = await supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        async (payload) => {
          const { new: message } = payload;
          
          // Get receiver's email and sender's name
          const { data: receiverData } = await supabase
            .from('auth.users')
            .select('email')
            .eq('id', message.receiver_id)
            .single();

          const { data: senderData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', message.sender_id)
            .single();

          if (!receiverData?.email || !senderData?.full_name) {
            console.error('Could not find receiver email or sender name');
            return;
          }

          // Send email notification
          await resend.emails.send({
            from: 'notifications@yourdomain.com',
            to: receiverData.email,
            subject: 'New Message Notification',
            html: `<p>You have a new message from ${senderData.full_name}:</p><p>${message.content}</p>`,
          });
        }
      )
      .subscribe();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in message notifications:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});