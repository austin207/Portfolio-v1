import { Github, Linkedin, Mail, Instagram, ArrowDown } from "lucide-react"
import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"
import aboutData from "@/content/data/about.json"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-14 relative">
      <div className="max-w-[1100px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="font-mono text-[13px] text-muted-foreground mb-6 tracking-wide fade-in">
              Available for work
            </p>

            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-foreground mb-6 fade-in" style={{ animationDelay: "0.1s" }}>
              {personalInfo.name}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8 fade-in" style={{ animationDelay: "0.15s" }}>
              {personalInfo.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10 fade-in" style={{ animationDelay: "0.2s" }}>
              {aboutData.specializations.map((name, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] text-muted-foreground border border-border px-3 py-1 hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-4 fade-in" style={{ animationDelay: "0.25s" }}>
              <Link
                href="/projects"
                className="text-sm px-6 py-2.5 bg-foreground text-background font-medium hover:opacity-80 transition-opacity"
              >
                View Projects
              </Link>
              <Link
                href="/freelance"
                className="text-sm px-6 py-2.5 border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
              >
                Hire Me
              </Link>
              <Link
                href="/blog"
                className="text-sm px-6 py-2.5 border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
              >
                Blog
              </Link>
            </div>

            {/* Secondary links */}
            <div className="flex flex-wrap gap-4 fade-in" style={{ animationDelay: "0.3s" }}>
              {[
                { href: "/timeline", label: "Timeline" },
                { href: "/skills-path", label: "Skills Path" },
                { href: "/certificates", label: "Certificates" },
              ].map((link, i) => (
                <Link key={i} href={link.href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors link-underline">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-14 fade-in" style={{ animationDelay: "0.35s" }}>
              {[
                { href: socialLinks.github, label: "GitHub", icon: Github },
                { href: socialLinks.linkedin, label: "LinkedIn", icon: Linkedin },
                {
                  href: socialLinks.twitter,
                  label: "X",
                  icon: () => (
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 30 30" fill="currentColor">
                      <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
                    </svg>
                  ),
                },
                { href: socialLinks.instagram, label: "Instagram", icon: Instagram },
                {
                  href: socialLinks.medium,
                  label: "Medium",
                  icon: () => (
                    <svg className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                  ),
                },
                { href: `mailto:${socialLinks.email}`, label: "Email", icon: Mail },
              ].map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <s.icon className="h-[16px] w-[16px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Profile image */}
          <div className="fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto md:mx-0">
              <img
                src={personalInfo.avatar || "/Profile.png"}
                alt={personalInfo.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-border"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
        <ArrowDown className="w-4 h-4 text-muted-foreground/30 animate-bounce" />
      </div>
    </section>
  )
}
