import Stripe from 'https://esm.sh/stripe@12.8.0?target=deno'

console.log('Edge Function: create-checkout initialized')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  console.log('Received request:', req.method)
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request')
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Log environment check
    const envVars = Object.keys(Deno.env.toObject())
    console.log('Available environment variables:', envVars)
    
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    console.log('Stripe key exists:', !!stripeKey)
    
    if (!stripeKey) {
      throw new Error('Missing Stripe secret key in environment variables')
    }

    // Initialize Stripe with proper configuration
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })
    console.log('Stripe instance created successfully')

    const { user_id } = await req.json()
    console.log('Processing checkout for user:', user_id)

    const priceId = Deno.env.get('STRIPE_PRICE_ID')
    console.log('Price ID exists:', !!priceId)
    
    if (!priceId) {
      throw new Error('Missing Stripe price ID in environment variables')
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
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    })
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})