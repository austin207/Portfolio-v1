import { MapPin, Calendar } from "lucide-react"

interface EducationCardProps {
  degree: string
  institution: string
  period: string
  location: string
  description?: string
}

export default function EducationCard({ degree, institution, period, location, description }: EducationCardProps) {
  return (
    <div className="glass-card-hover p-5 gradient-border">
      <h4 className="text-base font-medium text-foreground">{degree}</h4>
      <h5 className="text-sm font-medium mt-1 text-cyan-400/70">{institution}</h5>

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

      {description && <p className="mt-3 text-muted-foreground text-sm">{description}</p>}
    </div>
  )
}
