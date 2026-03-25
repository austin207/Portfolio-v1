interface SkillBadgeProps {
  name: string
  level: "Expert" | "Proficient" | "Competent" | "Beginner"
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const opacity = level === "Expert" ? "text-foreground" : level === "Proficient" ? "text-foreground/70" : "text-foreground/50"

  return (
    <div className="bg-background p-4 flex items-center justify-between hover:bg-accent/50 transition-colors border border-border">
      <span className={`text-sm ${opacity}`}>{name}</span>
      <span className="font-mono text-[10px] text-muted-foreground">{level}</span>
    </div>
  )
}
