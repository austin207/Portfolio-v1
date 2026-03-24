import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Certifications",
  description: "Professional certifications in AI automation, ROS 2, PCB design, prompt engineering, and more by Antony Austin.",
  url: "https://antonyaustin.site/certificates",
  keywords: ["certifications", "Udemy certificates", "ROS 2 certification", "PCB design course", "AI automation"],
})

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return children
}
