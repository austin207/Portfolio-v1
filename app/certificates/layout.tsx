import { generateSEO, certificatesGraph, SITE_URL } from "@/lib/seo"
import certificatesData from "@/content/data/certificates.json"
import JsonLd from "@/components/json-ld"

export const metadata = generateSEO({
  title: "Certifications",
  description: "Professional certifications held by Antony Austin, including Nordic Semiconductor nRF Connect SDK Fundamentals, IBM Flutter & Dart, and Srishti Robotics.",
  url: `${SITE_URL}/certificates`,
  keywords: ["certifications", "nRF Connect SDK", "robotics certification", "embedded systems"],
})

// Emitted from the layout because app/certificates/page.tsx is a client
// component. EducationalOccupationalCredential is a strong credential signal
// for answer engines asked "what are his qualifications?".
export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={certificatesGraph(certificatesData)} />
      {children}
    </>
  )
}
