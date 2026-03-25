"use client"

import Link from "next/link"
import ContactForm from "@/components/contact-form"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"
import { useReveal } from "@/hooks/use-reveal"

export default function ContactSection() {
  const { ref, visible } = useReveal()

  const links: { label: string; value: string; href?: string }[] = [
    { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { label: "Location", value: "Kochi, Kerala, India" },
    { label: "GitHub", value: "github.com/austin207", href: socialLinks.github },
    { label: "LinkedIn", value: "LinkedIn Profile", href: personalInfo.linkedin },
    { label: "Fiverr", value: "Fiverr Profile", href: socialLinks.fiverr },
  ]

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8">Contact</h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Interested in working together? Drop me a message or reach out via any of the links below.
            </p>
            <div className="space-y-4">
              {links.map((link, i) => (
                <div key={i} className={`flex items-center justify-between py-3 border-b border-border group reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.08 + 0.15}s` }}>
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">{link.label}</span>
                  {link.href ? (
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.value}
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground">{link.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
