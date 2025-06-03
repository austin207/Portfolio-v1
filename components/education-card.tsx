import { Card, CardContent } from "@/components/ui/card"
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
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="pt-6">
        <h4 className="text-xl font-medium text-cyan-400">{degree}</h4>
        <h5 className="text-lg font-medium mt-1">{institution}</h5>

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

        {description && <p className="mt-4 text-gray-300 text-sm">{description}</p>}
      </CardContent>
    </Card>
  )
}
