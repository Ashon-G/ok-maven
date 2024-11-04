import Stripe from 'https://esm.sh/stripe@12.8.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Handle CORS preflight requests
async function handleOptions() {
  return new Response(null, {
    headers: corsHeaders
  })
}

const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeKey) {
  console.error('Missing Stripe secret key in environment variables')
  throw new Error('Missing Stripe secret key')
}

const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return handleOptions()
  }

  try {
    const { user_id } = await req.json()
    console.log('Processing checkout for user:', user_id)

    const priceId = Deno.env.get('STRIPE_PRICE_ID')
    if (!priceId) {
      console.error('Missing Stripe price ID in environment variables')
      throw new Error('Missing Stripe price ID')
    }

    console.log('Creating checkout session with price ID:', priceId)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/upgrade`,
      client_reference_id: user_id,
    })

    console.log('Checkout session created successfully:', session.id)
    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in create-checkout function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})