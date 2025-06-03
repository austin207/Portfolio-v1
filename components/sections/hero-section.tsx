import { MoveRight, Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { personalInfo } from "@/lib/data/sections"

export default function HeroSection() {
  const specializations = [
    { name: "Robotics", color: "bg-cyan-950/30 text-cyan-400 border-cyan-800" },
    { name: "AI/ML", color: "bg-purple-950/30 text-purple-400 border-purple-800" },
    { name: "Automation", color: "bg-emerald-950/30 text-emerald-400 border-emerald-800" },
    { name: "Embedded Systems", color: "bg-amber-950/30 text-amber-400 border-amber-800" },
    { name: "VLSI", color: "bg-rose-950/30 text-rose-400 border-rose-800" },
  ]

  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-4 md:px-6">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-2/3 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            {personalInfo.name}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-300">{personalInfo.title}</h2>
          <p className="text-lg text-gray-400 max-w-2xl">{personalInfo.description}</p>
          <div className="flex flex-wrap gap-3">
            {specializations.map((spec, index) => (
              <Badge key={index} variant="outline" className={`${spec.color} px-3 py-1`}>
                {spec.name}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/projects">
              <Button className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600">
                View Projects <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="border-purple-700 text-purple-400 hover:bg-purple-950/30">
                Technical Blog
              </Button>
            </Link>
            <Link href="/timeline">
              <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30">
                View Timeline
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-950/30">
              Download Resume <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-4 pt-2">
            <Link href={personalInfo.github} className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </Link>
            <Link href={personalInfo.linkedin} className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-xl opacity-20"></div>
            <img
              src={personalInfo.avatar || "/placeholder.svg"}
              alt={personalInfo.name}
              className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-gray-800 relative z-10"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
