"use client"

import { Calendar, MapPin, Mail } from "lucide-react"
import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"
import aboutData from "@/content/data/about.json"
import { useReveal } from "@/hooks/use-reveal"

export default function AboutSection() {
  const { interests, stats, profileParagraphs } = aboutData
  const { ref, visible } = useReveal()

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8">About</h2>

            <div className="flex gap-8 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className={`reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.1 + 0.2}s` }}>
                  <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
                  <p className="font-mono text-[11px] text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-[13px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>{personalInfo.birthDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <Link href={`mailto:${socialLinks.email}`} className="hover:text-foreground transition-colors">
                  {socialLinks.email}
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border space-y-2">
              {[
                { label: "GitHub", href: socialLinks.github },
                { label: "LinkedIn", href: socialLinks.linkedin },
                { label: "Medium", href: socialLinks.medium },
                { label: "HuggingFace", href: socialLinks.huggingface },
                { label: "X / Twitter", href: socialLinks.twitter },
                { label: "Instagram", href: socialLinks.instagram },
                { label: "Fiverr", href: socialLinks.fiverr },
                { label: "VirtusCo", href: socialLinks.virtusco },
                { label: "Noviq", href: socialLinks.noviq },
              ].map((link, i) => (
                <div key={i} className="flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground">{link.label}</span>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-mono text-[11px]">
                    ↗
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className={`reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
            {profileParagraphs.map((p, i) => (
              <p key={i} className={`text-muted-foreground leading-[1.8] ${i > 0 ? "mt-5" : ""}`}>
                {p}
              </p>
            ))}

            <div className="mt-10">
              <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-4">Interests</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <span key={i} className="text-xs text-muted-foreground border border-border px-3 py-1 hover:text-foreground hover:border-foreground/30 transition-colors">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
