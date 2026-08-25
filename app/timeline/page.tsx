import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Timeline from "@/components/timeline"
import { generateSEO, timelineGraph, SITE_URL } from "@/lib/seo"
import JsonLd from "@/components/json-ld"
import timelineData from "@/content/data/timeline.json"

export const metadata = generateSEO({
  title: "Timeline",
  description: "Chronological journey of Antony Austin — academic achievements, professional experiences, projects, and milestones in technology.",
  url: `${SITE_URL}/timeline`,
  keywords: ["Antony Austin timeline", "engineering journey", "career milestones"],
})

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={timelineGraph(timelineData)} />
      <div className="max-w-[900px] mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-16">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        <div className="mb-16">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3">Journey</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Timeline</h1>
          <p className="text-muted-foreground max-w-lg leading-relaxed">
            A chronological view of my path through engineering, startups, and research.
          </p>
        </div>

        <Timeline />
      </div>
    </main>
  )
}
