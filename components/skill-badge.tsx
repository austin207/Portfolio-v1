import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SkillBadgeProps {
  name: string
  level: "Expert" | "Proficient" | "Competent" | "Beginner"
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const getLevelColor = () => {
    switch (level) {
      case "Expert":
        return "bg-emerald-950/30 text-emerald-400 border-emerald-800"
      case "Proficient":
        return "bg-cyan-950/30 text-cyan-400 border-cyan-800"
      case "Competent":
        return "bg-purple-950/30 text-purple-400 border-purple-800"
      case "Beginner":
        return "bg-amber-950/30 text-amber-400 border-amber-800"
      default:
        return "bg-gray-800 text-gray-300 border-gray-700"
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
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{name}</span>
          <Badge variant="outline" className={getLevelColor()}>
            {level}
          </Badge>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div
            className={`bg-gradient-to-r from-cyan-500 to-purple-600 h-1.5 rounded-full ${getProgressWidth()}`}
          ></div>
        </div>
      </CardContent>
    </Card>
  )
}
