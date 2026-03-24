import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Skills Map",
  description: "Interactive skill map of Antony Austin's engineering expertise — robotics, AI/ML, electronics, embedded systems, and software development.",
  url: "https://antonyaustin.site/skills-path",
  keywords: ["skills map", "robotics skills", "electronics expertise", "AI ML skills", "ROS 2"],
})

export default function SkillsPathLayout({ children }: { children: React.ReactNode }) {
  return children
}
