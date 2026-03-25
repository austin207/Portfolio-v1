"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import featuredProjects from "@/content/data/featured-projects.json"
import { useReveal } from "@/hooks/use-reveal"

export default function ProjectsSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />

        <div className={`flex items-end justify-between mb-10 reveal ${visible ? "visible" : ""}`}>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Projects</h2>
          <Link href="/projects" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline">
            View all
          </Link>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {featuredProjects.map((project, i) => (
            <Link
              key={i}
              href={project.projectUrl || "#"}
              className={`group flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4 hover:px-4 hover-line transition-all duration-300 reveal ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.06 + 0.15}s` }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground font-medium group-hover:opacity-70 transition-opacity">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{project.description}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex gap-2">
                  {project.tags.slice(0, 2).map((tag, j) => (
                    <span key={j} className="font-mono text-[10px] text-muted-foreground">{tag}</span>
                  ))}
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        <div className={`mt-10 reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.5s" }}>
          <Link
            href="/projects"
            className="text-sm px-6 py-2.5 border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-200 inline-block"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
