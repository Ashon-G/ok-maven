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
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

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