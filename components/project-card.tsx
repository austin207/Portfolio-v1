import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  github?: string
  demo?: string
  projectUrl?: string
}

export default function ProjectCard({ title, description, image, tags, github, demo, projectUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-gray-800/50 border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-2 text-cyan-400">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          {projectUrl && (
            <Link href={projectUrl}>
              <Button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-medium">
                View Details
              </Button>
            </Link>
          )}

          <div className="flex gap-3">
            {github && (
              <Link
                href={github}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">Code</span>
              </Link>
            )}

            {demo && (
              <Link
                href={demo}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 ml-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-sm">Live Demo</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
