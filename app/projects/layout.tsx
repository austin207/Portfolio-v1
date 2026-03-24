import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Projects",
  description: "Portfolio of engineering projects spanning AI/ML, embedded systems, IoT, robotics, and automation by Antony Austin.",
  url: "https://antonyaustin.site/projects",
  keywords: ["engineering projects", "AI ML projects", "Arduino projects", "ESP32", "IoT projects", "robotics"],
})

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
