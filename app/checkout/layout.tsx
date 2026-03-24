import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Checkout",
  description: "Checkout for freelance services by Antony Austin.",
  noIndex: true,
})

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children
}
