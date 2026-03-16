import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import ProjectCard from "@/components/project-card"
import featuredProjects from "@/content/data/featured-projects.json"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-28 px-4 md:px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="flex items-center gap-4 mb-14">
          <span className="section-number">03</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/projects">
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-full px-8 h-11 font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/30">
              View All Projects <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
