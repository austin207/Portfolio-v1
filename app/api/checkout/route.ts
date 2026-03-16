import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { getServiceById } from "@/lib/data/services"

export async function POST(req: NextRequest) {
  try {
    const { serviceId, tierName, customerEmail } = await req.json()

    if (!serviceId || !tierName) {
      return NextResponse.json(
        { error: "Missing serviceId or tierName" },
        { status: 400 }
      )
    }

    const service = getServiceById(serviceId)
    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      )
    }

    const tier = service.tiers.find((t) => t.name === tierName)
    if (!tier) {
      return NextResponse.json(
        { error: "Tier not found" },
        { status: 404 }
      )
    }

    const origin = req.headers.get("origin") || "http://localhost:3000"

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${service.title} — ${tier.label}`,
              description: tier.description,
              metadata: {
                serviceId,
                tierName,
                delivery: tier.delivery,
                revisions: tier.revisions,
              },
            },
            unit_amount: tier.price * 100, // cents
          },
          quantity: 1,
        },
      ],
      ...(customerEmail && { customer_email: customerEmail }),
      metadata: {
        serviceId,
        tierName,
        serviceName: service.title,
        tierLabel: tier.label,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel?service=${serviceId}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
