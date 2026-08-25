import { generateSEO, SITE_URL } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Checkout",
  description: "Checkout for freelance services by Antony Austin.",
  url: `${SITE_URL}/checkout`,
  noIndex: true,
})

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children
}
