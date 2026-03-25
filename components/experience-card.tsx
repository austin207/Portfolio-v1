interface ExperienceCardProps {
  title: string
  company: string
  period: string
  location: string
  description: string[]
}

export default function ExperienceCard({ title, company, period, location, description }: ExperienceCardProps) {
  return (
    <div className="py-5 border-b border-border last:border-0">
      <div className="flex items-start justify-between gap-4 mb-1">
        <h4 className="text-foreground font-medium text-[15px]">{title}</h4>
        <span className="font-mono text-[11px] text-muted-foreground shrink-0">{period}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{company} · {location}</p>
      <ul className="space-y-1.5">
        {description.map((item, i) => (
          <li key={i} className="text-[13px] text-muted-foreground leading-relaxed pl-3 border-l border-border">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
