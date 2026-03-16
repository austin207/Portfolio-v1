import { Calendar, MapPin, Mail, Github, Linkedin, Instagram, Briefcase, Code, Cpu } from "lucide-react"
import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"
import aboutData from "@/content/data/about.json"

const statIconMap: Record<string, any> = { Code, Briefcase, Cpu }

export default function AboutSection() {
  const { interests, stats, profileParagraphs } = aboutData

  return (
    <section id="about" className="py-28 px-4 md:px-6 relative">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="flex items-center gap-4 mb-14">
          <span className="section-number">01</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            About Me
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stats - spans full width on mobile, first col on desktop */}
          <div className="glass-card-hover p-6 gradient-border">
            <h3 className="text-xs font-mono mb-6 text-cyan-400 uppercase tracking-wider">Stats</h3>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, i) => {
                const StatIcon = statIconMap[stat.icon] || Code
                return (
                  <div key={i} className="text-center">
                    <StatIcon className="h-5 w-5 text-cyan-400/60 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Profile - spans 2 cols */}
          <div className="glass-card-hover p-6 md:col-span-2 gradient-border">
            <h3 className="text-xs font-mono mb-5 text-cyan-400 uppercase tracking-wider">Profile</h3>
            {profileParagraphs.map((paragraph, i) => (
              <p key={i} className={`text-muted-foreground leading-relaxed${i > 0 ? " mt-4" : ""}`}>
                {paragraph}
              </p>
            ))}
            <div className="mt-6">
              <h4 className="text-xs font-mono mb-3 text-muted-foreground uppercase tracking-wider">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <span key={index} className="px-3 py-1.5 text-xs rounded-full glass-card text-foreground/70 hover:text-cyan-400 transition-colors duration-300">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact info - spans full width */}
          <div className="glass-card-hover p-6 md:col-span-3 gradient-border">
            <h3 className="text-xs font-mono mb-5 text-cyan-400 uppercase tracking-wider">Connect</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-cyan-400/60 shrink-0" />
                <span className="text-muted-foreground">{personalInfo.birthDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-cyan-400/60 shrink-0" />
                <span className="text-muted-foreground">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-cyan-400/60 shrink-0" />
                <span className="text-muted-foreground">{socialLinks.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Github className="h-4 w-4 text-cyan-400/60 shrink-0" />
                <Link href={socialLinks.github} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  GitHub Profile
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Linkedin className="h-4 w-4 text-cyan-400/60 shrink-0" />
                <Link href={socialLinks.linkedin} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  LinkedIn Profile
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="h-4 w-4 text-cyan-400/60 shrink-0" viewBox="0 0 30 30" fill="currentColor">
                  <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
                </svg>
                <Link href={socialLinks.twitter} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  X Profile
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Instagram className="h-4 w-4 text-cyan-400/60 shrink-0" />
                <Link href={socialLinks.instagram} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Instagram Profile
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="h-4 w-4 text-cyan-400/60 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
                <Link href={socialLinks.medium} className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Medium Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
