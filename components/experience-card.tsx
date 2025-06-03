import { Card, CardContent } from "@/components/ui/card"
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
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="pt-6">
        <h4 className="text-xl font-medium text-cyan-400">{title}</h4>
        <h5 className="text-lg font-medium mt-1">{company}</h5>

        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{period}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {description.map((item, index) => (
            <li key={index} className="text-gray-300 text-sm">
              • {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
