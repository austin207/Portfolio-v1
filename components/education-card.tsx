interface EducationCardProps {
  degree: string
  institution: string
  period: string
  location: string
  description?: string
}

export default function EducationCard({ degree, institution, period, location, description }: EducationCardProps) {
  return (
    <div className="py-5 border-b border-border last:border-0">
      <h4 className="text-foreground font-medium text-[15px]">{degree}</h4>
      <p className="text-sm text-muted-foreground mt-1">{institution}</p>
      <div className="flex items-center gap-3 mt-2 font-mono text-[11px] text-muted-foreground">
        <span>{period}</span>
        <span>·</span>
        <span>{location}</span>
      </div>
      {description && <p className="text-[13px] text-muted-foreground mt-3 pl-3 border-l border-border">{description}</p>}
    </div>
  )
}
