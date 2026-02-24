import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET() {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { 
          name: 'Unity Arabic Calligraphy Starter Kit',
          description: 'Verified Amiri-Bold SDF asset with 0 missing characters + optimized C# logic.'
        },
        unit_amount: 1900,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://deenquest-kit-sales.vercel.app/success',
    cancel_url: 'https://deenquest-kit-sales.vercel.app/',
  });
  return NextResponse.redirect(session.url, 303);
}
