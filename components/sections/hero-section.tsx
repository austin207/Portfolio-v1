import { MoveRight, Github, Linkedin, Mail, Instagram, ArrowDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"
import { Award } from "lucide-react"
import { GitBranch } from "lucide-react"
import aboutData from "@/content/data/about.json"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-6 pt-20 md:pt-0 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-cyan-500/[0.07] via-blue-500/[0.04] to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/[0.04] rounded-full blur-3xl" />

      <div className="container mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-16 max-w-6xl">
        <div className="w-full md:w-3/5 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs tracking-wider text-cyan-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for work
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              <span className="text-foreground">{personalInfo.name.split(" ")[0]}</span>
              <br />
              <span className="gradient-text">{personalInfo.name.split(" ").slice(1).join(" ")}</span>
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground tracking-tight">
              {personalInfo.title}
            </h2>
          </div>

          <p className="text-base text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed">
            {personalInfo.description}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {aboutData.specializations.map((name, index) => (
              <span
                key={index}
                className="px-3.5 py-1.5 text-xs font-medium rounded-full glass-card text-foreground/70 hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-300 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <Link href="/projects">
              <Button className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-full px-7 h-11 text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/30">
                View Projects <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-white/[0.1] text-foreground/80 hover:bg-white/[0.05] hover:text-foreground hover:border-white/[0.15] rounded-full px-7 h-11 text-sm backdrop-blur-sm"
              >
                Technical Blog
              </Button>
            </Link>
            <div className="hidden sm:flex gap-3">
              <Link href="/timeline">
                <Button
                  variant="outline"
                  className="border-white/[0.1] text-foreground/80 hover:bg-white/[0.05] hover:text-foreground hover:border-white/[0.15] rounded-full px-7 h-11 text-sm backdrop-blur-sm"
                >
                  Timeline
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-white/[0.1] text-foreground/80 hover:bg-white/[0.05] hover:text-foreground hover:border-white/[0.15] rounded-full px-7 h-11 text-sm backdrop-blur-sm"
                asChild
              >
                <Link href="/skills-path">
                  <GitBranch className="mr-2 h-4 w-4" />
                  Skills Path
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/[0.1] text-foreground/80 hover:bg-white/[0.05] hover:text-foreground hover:border-white/[0.15] rounded-full px-7 h-11 text-sm backdrop-blur-sm"
                asChild
              >
                <Link href="/certificates">
                  <Award className="mr-2 h-4 w-4" />
                  Certificates
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center md:justify-start gap-3 pt-4">
            {[
              { href: socialLinks.github, label: "GitHub", icon: <Github className="h-[18px] w-[18px]" /> },
              { href: socialLinks.linkedin, label: "LinkedIn", icon: <Linkedin className="h-[18px] w-[18px]" /> },
              {
                href: socialLinks.twitter,
                label: "X",
                icon: (
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 30 30" fill="currentColor">
                    <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
                  </svg>
                ),
              },
              { href: socialLinks.instagram, label: "Instagram", icon: <Instagram className="h-[18px] w-[18px]" /> },
              {
                href: socialLinks.medium,
                label: "Medium",
                icon: (
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                ),
              },
              { href: `mailto:${socialLinks.email}`, label: "Email", icon: <Mail className="h-[18px] w-[18px]" /> },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-300"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/5 flex justify-center mt-8 md:mt-0">
          <div className="relative">
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 blur-3xl scale-125" />
            {/* Decorative rings */}
            <div className="absolute -inset-4 rounded-full border border-cyan-500/10 border-dashed" />
            <div className="absolute -inset-8 rounded-full border border-violet-500/[0.06] border-dashed" />
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <img
                src={personalInfo.avatar || "/Profile.png"}
                alt={personalInfo.name}
                className="rounded-full w-full h-full object-cover border-2 border-white/[0.08] relative z-10 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02] hover:border-cyan-500/30"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-mono">Scroll</span>
        <ArrowDown className="w-4 h-4 text-cyan-500/40 animate-bounce" />
      </div>
    </section>
  )
}
