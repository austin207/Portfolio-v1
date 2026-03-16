import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Briefcase, GraduationCap, Rocket } from "lucide-react"
import timelineData from "@/content/data/timeline.json"

const iconMap: Record<string, any> = { Rocket, Award, Briefcase, GraduationCap }

const typeColors: Record<string, string> = {
  organization: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  award: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  project: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  experience: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  education: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

export default function Timeline() {
  return (
    <div className="relative pb-20">
      {/* Vertical timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/20 via-white/[0.06] to-transparent rounded-full" />

      <div className="space-y-12">
        {timelineData.map((event, index) => {
          const IconComponent = iconMap[event.icon] || Briefcase;
          return (
            <div
              key={index}
              className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 group"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full glass-card group-hover:border-cyan-500/20 transition-all duration-300">
                <IconComponent className="h-8 w-8 relative z-10 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" />
              </div>

              {/* Content card */}
              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <Card className="relative glass-card-hover gradient-border overflow-hidden">
                  <CardContent className="pt-6 pb-6 px-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <Badge
                        variant="outline"
                        className="px-3 py-1.5 text-xs rounded-full bg-white/[0.03] text-foreground border border-white/[0.06] font-mono font-semibold"
                      >
                        {event.year}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`px-3 py-1.5 text-xs rounded-full capitalize font-mono font-medium border ${typeColors[event.type] || "bg-white/[0.03] text-muted-foreground border-white/[0.06]"}`}
                      >
                        {event.type}
                      </Badge>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight text-foreground tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                      {event.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
