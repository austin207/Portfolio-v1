import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
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
    <div className="group glass-card-hover overflow-hidden gradient-border">
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        {projectUrl && (
          <Link href={projectUrl} className="absolute top-3 right-3 w-8 h-8 rounded-full glass-card flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-cyan-400">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold mb-2 text-foreground line-clamp-1 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-0.5 text-[11px] rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2.5 py-0.5 text-[11px] rounded-full bg-white/[0.03] text-muted-foreground border border-white/[0.06] font-mono">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div className="space-y-2">
          {projectUrl && (
            <Link href={projectUrl} className="block">
              <Button className="w-full bg-white/[0.05] text-foreground hover:bg-cyan-500/10 hover:text-cyan-400 text-xs rounded-lg h-9 font-medium border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300">
                View Details
              </Button>
            </Link>
          )}

          <div className="flex gap-4">
            {github && (
              <Link
                href={github}
                className="text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-3.5 w-3.5" />
                <span className="text-xs">Code</span>
              </Link>
            )}

            {demo && (
              <Link
                href={demo}
                className="text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-1.5 ml-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-xs">Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
