```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SLACK_CLIENT_ID = Deno.env.get('SLACK_CLIENT_ID')
const SLACK_CLIENT_SECRET = Deno.env.get('SLACK_CLIENT_SECRET')
const SLACK_SIGNING_SECRET = Deno.env.get('SLACK_SIGNING_SECRET')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

// Verify Slack request signature
const verifySlackRequest = async (request: Request) => {
  const timestamp = request.headers.get('x-slack-request-timestamp');
  const signature = request.headers.get('x-slack-signature');
  
  if (!timestamp || !signature) {
    return false;
  }

  // Verify timestamp is within 5 minutes
  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;
  if (parseInt(timestamp) < fiveMinutesAgo) {
    return false;
  }

  // Clone the request to get the body
  const clonedRequest = request.clone();
  const body = await clonedRequest.text();
  
  const baseString = `v0:${timestamp}:${body}`;
  const hmac = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SLACK_SIGNING_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature_bytes = await crypto.subtle.sign(
    "HMAC",
    hmac,
    new TextEncoder().encode(baseString)
  );
  
  const computed_signature = `v0=${[...new Uint8Array(signature_bytes)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')}`;
  
  return computed_signature === signature;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
    const url = new URL(req.url)
    const action = url.searchParams.get('action')

    if (!action) {
      throw new Error('No action specified')
    }

    // Handle Slack commands
    if (action === 'slack-command') {
      if (!await verifySlackRequest(req)) {
        return new Response('Invalid request signature', { status: 401 });
      }

      const formData = await req.formData();
      const command = formData.get('command');
      const text = formData.get('text');
      const user_id = formData.get('user_id');
      const response_url = formData.get('response_url');

      switch (command) {
        case '/maven-status':
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user_id)
            .single();

          return new Response(JSON.stringify({
            response_type: 'ephemeral',
            text: `Your Maven status:\nType: ${profile?.user_type}\nSkillset: ${profile?.maven_skillset || 'Not set'}`
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });

        case '/maven-tasks':
          const { data: tasks } = await supabase
            .from('tasks')
            .select('*')
            .eq('assigned_to', user_id)
            .eq('status', 'pending');

          const taskList = tasks?.map(task => `• ${task.title}`).join('\n') || 'No pending tasks';
          
          return new Response(JSON.stringify({
            response_type: 'ephemeral',
            text: `Your pending tasks:\n${taskList}`
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });

        default:
          return new Response(JSON.stringify({
            response_type: 'ephemeral',
            text: 'Unknown command'
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
      }
    }

    switch (action) {
      case 'oauth': {
        const { code } = await req.json()
        
        // Exchange code for access token
        const response = await fetch('https://slack.com/api/oauth.v2.access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: SLACK_CLIENT_ID!,
            client_secret: SLACK_CLIENT_SECRET!,
            code,
          }),
        })

        const data = await response.json()

        if (!data.ok) {
          throw new Error(data.error)
        }

        // Store the integration details
        const { error: dbError } = await supabase
          .from('slack_integrations')
          .upsert({
            user_id: req.headers.get('x-user-id'),
            workspace_id: data.team.id,
            access_token: data.access_token,
            bot_user_id: data.bot_user_id,
            channel_id: data.incoming_webhook.channel_id,
          })

        if (dbError) throw dbError

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      case 'send-message': {
        const { message, channel_id } = await req.json()
        const { data: integration } = await supabase
          .from('slack_integrations')
          .select('access_token')
          .eq('user_id', req.headers.get('x-user-id'))
          .single()

        if (!integration) {
          throw new Error('No Slack integration found')
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
        })

        const data = await response.json()
        if (!data.ok) throw new Error(data.error)

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
```