import { generateSEO, simplePageGraph, SITE_URL } from "@/lib/seo"
import JsonLd from "@/components/json-ld"

const DESCRIPTION =
  "Interactive skill map of Antony Austin's engineering expertise — robotics, AI/ML, electronics, embedded systems, and software development."

export const metadata = generateSEO({
  title: "Skills Map",
  description: DESCRIPTION,
  url: `${SITE_URL}/skills-path`,
  keywords: ["skills map", "robotics skills", "embedded systems", "ROS 2"],
})

export default function SkillsPathLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={simplePageGraph("/skills-path", "Skills Map — Antony Austin", DESCRIPTION, "Skills Map")}
      />
      {children}
    </>
  )
}
