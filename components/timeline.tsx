"use client"

import timelineData from "@/content/data/timeline.json"
import { useReveal } from "@/hooks/use-reveal"

// Group events by year, sorted descending (newest first)
function groupByYear(events: typeof timelineData) {
  const groups: Record<string, typeof timelineData> = {}
  for (const event of events) {
    if (!groups[event.year]) groups[event.year] = []
    groups[event.year].push(event)
  }
  return Object.entries(groups).sort((a, b) => {
    const yearA = parseInt(a[0]) || 0
    const yearB = parseInt(b[0]) || 0
    return yearB - yearA
  })
}

function YearGroup({ year, events, index }: { year: string; events: typeof timelineData; index: number }) {
  const { ref, visible } = useReveal(0.05)

  return (
    <div ref={ref} className="grid grid-cols-[80px_1px_1fr] md:grid-cols-[120px_1px_1fr] gap-0">
      {/* Year label — sticky on the left */}
      <div className={`pt-1 reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: `${index * 0.05}s` }}>
        <span className="text-2xl md:text-3xl font-bold text-foreground tracking-tight sticky top-20">
          {year}
        </span>
      </div>

      {/* Vertical line */}
      <div className="relative">
        <div className={`absolute inset-0 bg-border transition-all duration-1000 origin-top ${visible ? "scale-y-100" : "scale-y-0"}`} style={{ transitionDelay: `${index * 0.05 + 0.1}s` }} />
      </div>

      {/* Events */}
      <div className="pb-12 last:pb-0">
        {events.map((event, i) => (
          <div
            key={i}
            className={`group relative pl-8 py-5 first:pt-1 border-b border-border last:border-0 reveal ${visible ? "visible" : ""}`}
            style={{ transitionDelay: `${index * 0.05 + i * 0.08 + 0.15}s` }}
          >
            {/* Dot on the line */}
            <div className="absolute left-[-4px] top-[26px] first:top-[10px] w-[7px] h-[7px] bg-border group-hover:bg-foreground transition-colors rounded-full" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground font-medium text-[15px] group-hover:opacity-70 transition-opacity">
                  {event.title}
                </h3>
                <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
                  {event.description}
                </p>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest shrink-0 pt-1">
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Timeline() {
  const yearGroups = groupByYear(timelineData)

  return (
    <div className="space-y-0">
      {yearGroups.map(([year, events], index) => (
        <YearGroup key={year} year={year} events={events} index={index} />
      ))}
    </div>
  )
}
