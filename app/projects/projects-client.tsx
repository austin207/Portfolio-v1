"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Code, ExternalLink } from "lucide-react"
import ProjectSearch from "@/components/project-search"
import { useState } from "react"
import Image from "next/image"
import { useReveal } from "@/hooks/use-reveal"

export interface ProjectListItem {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  status: string
  duration: string
  category: string
}

// Data now arrives as a prop from the server component. It previously lived
// here as a hardcoded array that had diverged from content/projects/*.json —
// it used placeholder.svg for every image and omitted the 32-Bit Tiny GPU
// entirely, so the page contradicted its own ItemList schema.
const ProjectsPage = ({ projects }: { projects: ProjectListItem[] }) => {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const gridReveal = useReveal()

  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12">
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest fade-in" style={{ animationDelay: "0.1s" }}>Portfolio</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-foreground tracking-tight fade-in" style={{ animationDelay: "0.2s" }}>
              Projects
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed fade-in" style={{ animationDelay: "0.3s" }}>
              Explore my complete portfolio of projects spanning AI/ML, embedded systems, IoT, automation, and more.
              Each project showcases innovation, technical expertise, and problem-solving capabilities.
            </p>
          </div>

          {/* Search and Filter Component */}
          <ProjectSearch projects={projects} onFilteredProjects={setFilteredProjects} />

          {/* Projects Grid */}
          <div ref={gridReveal.ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <Card
                key={project.id}
                className={`border border-border rounded-none bg-background overflow-hidden reveal ${gridReveal.visible ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden border-b border-border">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardContent className="p-6">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-bold mb-3 text-foreground leading-tight tracking-tight">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Calendar className="h-3 w-3" />
                    <span>{project.duration}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}{tagIndex < Math.min(project.tags.length, 3) - 1 && " /"}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="font-mono text-[10px] text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Button
                    className="w-full border border-border text-foreground hover:bg-foreground hover:text-background rounded-none transition-colors bg-background"
                    variant="outline"
                    asChild
                  >
                    <Link href={`/projects/${project.id}`}>
                      <span className="flex items-center justify-center gap-2">
                        View Details
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 fade-in">
              <Code className="h-12 w-12 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-3 tracking-tight">
                No projects found matching your criteria
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to discover more projects.
              </p>
              <Button
                variant="outline"
                onClick={() => setFilteredProjects(projects)}
                className="border border-border text-foreground hover:bg-foreground hover:text-background rounded-none"
              >
                Show All Projects
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default ProjectsPage
