import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { verifySlackRequest } from "./utils/verify.ts";
import { handleSlackCommands } from "./handlers/commands.ts";
import { handleOAuth } from "./handlers/oauth.ts";
import { WebSocket, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SLACK_APP_TOKEN = Deno.env.get('SLACK_APP_TOKEN');
const SLACK_SIGNING_SECRET = Deno.env.get('SLACK_SIGNING_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Initialize WebSocket server for Socket Mode
const wss = new WebSocketServer(8080);

wss.on("connection", (ws: WebSocket) => {
  console.log("New Socket Mode connection");

  ws.on("message", async (message: string) => {
    const data = JSON.parse(message);
    
    // Handle Socket Mode events
    if (data.type === 'url_verification') {
      ws.send(JSON.stringify({ challenge: data.challenge }));
    }
    
    // Handle other event types
    if (data.type === 'event_callback') {
      // Process the event callback here
      console.log('Received event callback:', data.event);
      // Add logic to handle specific events
    }
  });
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    if (!action) {
      throw new Error('No action specified');
    }

    // Handle Slack commands
    if (action === 'slack-command') {
      if (!await verifySlackRequest(req, SLACK_SIGNING_SECRET!)) {
        return new Response('Invalid request signature', { status: 401 });
      }

      const formData = await req.formData();
      return handleSlackCommands(formData, supabase);
    }

    switch (action) {
      case 'oauth': {
        const { code } = await req.json();
        const data = await handleOAuth(code, SLACK_APP_TOKEN!, SLACK_SIGNING_SECRET!);
        
        if (!data.ok) {
          throw new Error(data.error);
        }

        const { error: dbError } = await supabase
          .from('slack_integrations')
          .upsert({
            user_id: req.headers.get('x-user-id'),
            workspace_id: data.team.id,
            access_token: data.access_token,
            bot_user_id: data.bot_user_id,
            channel_id: data.incoming_webhook.channel_id,
          });

        if (dbError) throw dbError;

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'send-message': {
        const { message, channel_id } = await req.json();
        const { data: integration } = await supabase
          .from('slack_integrations')
          .select('access_token')
          .eq('user_id', req.headers.get('x-user-id'))
          .single();

        if (!integration) {
          throw new Error('No Slack integration found');
        }

        const response = await fetch('https://slack.com/api/chat.postMessage', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${integration.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            channel: channel_id,
            text: message,
          }),
        });

        const data = await response.json();
        if (!data.ok) throw new Error(data.error);

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
