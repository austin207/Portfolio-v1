import { MoveRight, Github, Linkedin, Mail, Instagram } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"
import MobileNav from "@/components/mobile-nav"
import { Award } from "lucide-react"

export default function HeroSection() {
  const specializations = [
    { name: "Robotics", color: "bg-cyan-950/30 text-cyan-400 border-cyan-800" },
    { name: "AI/ML", color: "bg-purple-950/30 text-purple-400 border-purple-800" },
    { name: "Automation", color: "bg-emerald-950/30 text-emerald-400 border-emerald-800" },
    { name: "Embedded Systems", color: "bg-amber-950/30 text-amber-400 border-amber-800" },
    { name: "VLSI", color: "bg-rose-950/30 text-rose-400 border-rose-800" },
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-6 pt-16 md:pt-0">
      <MobileNav />

      <div className="container mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-2/3 space-y-4 md:space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            {personalInfo.name}
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300">{personalInfo.title}</h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto md:mx-0">{personalInfo.description}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
            {specializations.map((spec, index) => (
              <Badge key={index} variant="outline" className={`${spec.color} px-2 md:px-3 py-1 text-xs md:text-sm`}>
                {spec.name}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
            <Link href="/projects">
              <Button className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-sm md:text-base">
                View Projects <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30 text-sm md:text-base"
              >
                Technical Blog
              </Button>
            </Link>
            <Link href="/timeline" className="hidden sm:block">
              <Button
                variant="outline"
                className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30 text-sm md:text-base"
              >
                View Timeline
              </Button>
            </Link>
          </div>
          <Button
          variant="outline"
          size="lg"
          className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30 text-sm md:text-base"
          asChild
          >
            <Link href="/certificates">
            <Award className="mr-2 h-4 w-4" />
              Certificates
            </Link>
        </Button>
          <div className="flex justify-center md:justify-start gap-4 pt-2">
            <Link href={socialLinks.github} className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5 md:h-6 md:w-6" />
            </Link>
            <Link href={socialLinks.linkedin} className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            </Link>
            <Link href={socialLinks.twitter} className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 30 30" fill="currentColor">
                <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
              </svg>
            </Link>
            <Link href={socialLinks.instagram} className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5 md:h-6 md:w-6" />
            </Link>
            <Link href={socialLinks.medium} className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
            </Link>
            <Link href={`mailto:${socialLinks.email}`} className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5 md:h-6 md:w-6" />
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-xl opacity-20"></div>
            <img
              src={personalInfo.avatar || "/Profile.png"}
              alt={personalInfo.name}
              className="rounded-full w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover border-4 border-gray-800 relative z-10"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
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
