import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
            .from('profiles')
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

          // Send email notification using Resend's API directly
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Maven <notifications@maven.dev>',
              to: receiverData.email,
              subject: `New message from ${senderData.full_name}`,
              html: `
                <div>
                  <h2>You have a new message from ${senderData.full_name}</h2>
                  <p style="margin: 16px 0; padding: 12px; background-color: #f3f4f6; border-radius: 6px;">
                    ${message.content}
                  </p>
                  <p>
                    <a href="https://maven.dev/dashboard/chat" style="color: #0ea5e9;">
                      Click here to view and reply to the message
                    </a>
                  </p>
                </div>
              `,
            }),
          });

          if (!emailResponse.ok) {
            console.error('Failed to send email:', await emailResponse.text());
          }
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