import { MapPin, Calendar } from "lucide-react"

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  location: string
  description: string[]
}

export default function ExperienceCard({ title, company, period, location, description }: ExperienceCardProps) {
  return (
    <div className="glass-card-hover p-5 gradient-border">
      <h4 className="text-base font-medium text-foreground">{title}</h4>
      <h5 className="text-sm font-medium mt-1 text-cyan-400/70">{company}</h5>

      <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground font-mono">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-cyan-400/40" />
          <span>{period}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-cyan-400/40" />
          <span>{location}</span>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {description.map((item, index) => (
          <li key={index} className="text-muted-foreground text-sm leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:rounded-full before:bg-cyan-500/40">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
