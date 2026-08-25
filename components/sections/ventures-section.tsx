"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import venturesData from "@/content/data/ventures.json"
import { useReveal } from "@/hooks/use-reveal"

/**
 * Companies Antony founded — framed as ventures, not portfolio projects.
 * These are separate legal/commercial entities with their own live sites, and
 * they resolve to their own Organization nodes in the schema graph
 * (ID.virtusco / ID.noviq), each with `founder` pointing back at the Person.
 */
export default function VenturesSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="ventures" className="py-24 px-6" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />

        <div className={`mb-12 reveal ${visible ? "visible" : ""}`}>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">
            Ventures
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground mb-4">
            What companies has Antony Austin founded?
          </h2>
          <p className="text-muted-foreground leading-[1.8] max-w-2xl">
            Antony Austin has founded two companies. VirtusCo is a pre-seed robotics startup
            building an autonomous airport luggage porter robot, where he is Co-founder and
            CTO. Noviq is a web and AI studio he founded in March 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {venturesData.map((v, i) => (
            <article
              key={v.name}
              className={`bg-background p-8 flex flex-col reveal ${visible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1 + 0.15}s` }}
            >
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="text-2xl font-medium tracking-tight text-foreground">{v.name}</h3>
                <Link
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit the ${v.name} website`}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-1"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>

              <p className="text-muted-foreground text-[15px] mb-5">{v.tagline}</p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6 pb-6 border-b border-border">
                <span className="text-foreground">{v.role}</span>
                <span aria-hidden="true">·</span>
                <span>{v.period}</span>
                <span aria-hidden="true">·</span>
                <span>{v.stage}</span>
              </div>

              <p className="text-muted-foreground leading-[1.8] text-[15px] mb-6">{v.description}</p>

              <ul className="space-y-2 mb-8 flex-1">
                {v.highlights.map((h, hi) => (
                  <li key={hi} className="flex gap-3 text-[13px] text-muted-foreground leading-relaxed">
                    <span className="text-muted-foreground/40 shrink-0" aria-hidden="true">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-[13px] text-foreground hover:opacity-70 transition-opacity link-underline w-fit"
              >
                {v.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
