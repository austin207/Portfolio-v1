import { ArrowUpRight } from "lucide-react"
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

export default function ProjectCard({ title, description, tags, github, projectUrl }: ProjectCardProps) {
  return (
    <div className="group border border-border hover:border-foreground/20 transition-colors">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-foreground font-medium text-[15px] leading-tight">{title}</h3>
          {projectUrl && (
            <Link href={projectUrl} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="font-mono text-[10px] text-muted-foreground">{tag}</span>
          ))}
          {tags.length > 3 && <span className="font-mono text-[10px] text-muted-foreground">+{tags.length - 3}</span>}
        </div>
      </div>
    </div>
  )
}
