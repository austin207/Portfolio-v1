import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Freelance Services",
  description: "Hire Antony Austin — freelance AI chatbot development, Arduino/ESP32 firmware, ROS 2 applications, n8n automation, PCB design, and web development. Order via Stripe or Fiverr.",
  url: "https://antonyaustin.site/freelance",
  keywords: ["freelance engineer", "hire Arduino developer", "ESP32 freelancer", "ROS 2 developer", "n8n automation", "AI chatbot developer", "PCB design freelance", "Fiverr"],
})

export default function FreelanceLayout({ children }: { children: React.ReactNode }) {
  return children
}
