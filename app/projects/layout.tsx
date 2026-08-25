import { generateSEO, SITE_URL } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Projects",
  description: "Portfolio of engineering projects spanning GPU design, AI/ML, embedded systems, IoT, robotics, and automation by Antony Austin.",
  url: `${SITE_URL}/projects`,
  keywords: ["engineering projects", "AI ML projects", "ESP32", "IoT projects", "robotics"],
})

// Deliberately no JSON-LD here: this layout also wraps /projects/[slug], and
// emitting the listing graph would give every detail page a CollectionPage
// node describing the index plus a duplicate BreadcrumbList. The listing
// schema lives in app/projects/page.tsx instead.
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
