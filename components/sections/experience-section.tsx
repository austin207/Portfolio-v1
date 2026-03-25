"use client"

import experienceData from "@/content/data/experience.json"
import { useReveal } from "@/hooks/use-reveal"

export default function ExperienceSection() {
  const { experiences, organizations, awards } = experienceData
  const { ref, visible } = useReveal()

  return (
    <section id="experience" className="py-24 px-6" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className={`text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8 reveal ${visible ? "visible" : ""}`}>Experience</h2>
            <div className="space-y-0 divide-y divide-border">
              {experiences.map((exp, i) => (
                <div key={i} className={`py-5 first:pt-0 reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.08 + 0.1}s` }}>
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="text-foreground font-medium text-[15px]">{exp.title}</h3>
                    <span className="font-mono text-[11px] text-muted-foreground shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{exp.company} · {exp.location}</p>
                  <ul className="space-y-1.5">
                    {exp.description.map((d, j) => (
                      <li key={j} className="text-[13px] text-muted-foreground leading-relaxed pl-3 border-l border-border">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className={`text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8 reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.05s" }}>Organizations</h2>
            <div className="space-y-0 divide-y divide-border mb-12">
              {organizations.map((org, i) => (
                <div key={i} className={`py-5 first:pt-0 reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.08 + 0.15}s` }}>
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className="text-foreground font-medium text-[15px]">{org.title}</h3>
                    <span className="font-mono text-[11px] text-muted-foreground shrink-0">{org.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{org.company} · {org.location}</p>
                  <ul className="space-y-1.5">
                    {org.description.map((d, j) => (
                      <li key={j} className="text-[13px] text-muted-foreground leading-relaxed pl-3 border-l border-border">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className={`text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6 reveal ${visible ? "visible" : ""}`}>Awards</h2>
            <div className="space-y-0 divide-y divide-border">
              {awards.map((a, i) => (
                <div key={i} className={`py-4 first:pt-0 reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.06 + 0.2}s` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-foreground text-[15px]">{a.title}</h4>
                      <p className="text-[13px] text-muted-foreground mt-1">{a.description}</p>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground shrink-0">{a.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
