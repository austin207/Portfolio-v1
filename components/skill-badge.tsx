interface SkillBadgeProps {
  name: string
  level: "Expert" | "Proficient" | "Competent" | "Beginner"
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const getLevelColor = () => {
    switch (level) {
      case "Expert":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
      case "Proficient":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20"
      case "Competent":
        return "text-violet-400 bg-violet-500/10 border-violet-500/20"
      case "Beginner":
        return "text-muted-foreground bg-white/[0.03] border-white/[0.06]"
      default:
        return "text-muted-foreground bg-white/[0.03] border-white/[0.06]"
    }
  }

  const getProgressColor = () => {
    switch (level) {
      case "Expert":
        return "bg-gradient-to-r from-cyan-500 to-cyan-400"
      case "Proficient":
        return "bg-gradient-to-r from-blue-500 to-blue-400"
      case "Competent":
        return "bg-gradient-to-r from-violet-500 to-violet-400"
      case "Beginner":
        return "bg-white/20"
      default:
        return "bg-white/20"
    }
  }

  const getProgressWidth = () => {
    switch (level) {
      case "Expert":
        return "w-full"
      case "Proficient":
        return "w-3/4"
      case "Competent":
        return "w-1/2"
      case "Beginner":
        return "w-1/4"
      default:
        return "w-0"
    }
  }

  return (
    <div className="glass-card-hover p-4 gradient-border">
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-sm text-foreground">{name}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${getLevelColor()}`}>
          {level}
        </span>
      </div>
      <div className="w-full bg-white/[0.04] rounded-full h-1">
        <div
          className={`h-1 rounded-full ${getProgressColor()} ${getProgressWidth()} transition-all duration-500`}
        ></div>
      </div>
    </div>
  )
}
