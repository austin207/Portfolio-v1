import { Github, Linkedin, Mail, Instagram } from "lucide-react"
import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"

export default function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6 border-t border-white/[0.04]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-foreground hover:text-cyan-400 transition-colors">
            {personalInfo.name.split(" ")[0]}
            <span className="text-cyan-400">.</span>
          </Link>
          <div className="flex gap-3">
            {[
              { href: socialLinks.github, label: "GitHub", icon: <Github className="h-4 w-4" /> },
              { href: socialLinks.linkedin, label: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
              {
                href: socialLinks.twitter,
                label: "X",
                icon: (
                  <svg className="h-4 w-4" viewBox="0 0 30 30" fill="currentColor">
                    <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
                  </svg>
                ),
              },
              { href: socialLinks.instagram, label: "Instagram", icon: <Instagram className="h-4 w-4" /> },
              {
                href: socialLinks.medium,
                label: "Medium",
                icon: (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                ),
              },
              { href: `mailto:${socialLinks.email}`, label: "Email", icon: <Mail className="h-4 w-4" /> },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-300"
              >
                {social.icon}
              </Link>
            ))}
          </div>
          <p className="text-muted-foreground/40 text-xs font-mono">
            &copy; {new Date().getFullYear()} {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
