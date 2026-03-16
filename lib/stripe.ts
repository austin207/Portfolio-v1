import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key || key === "sk_test_placeholder") {
      throw new Error(
        "STRIPE_SECRET_KEY is not configured. Add your Stripe secret key to .env.local"
      )
    }
    _stripe = new Stripe(key)
  }
  return _stripe
}
