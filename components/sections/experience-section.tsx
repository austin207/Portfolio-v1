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
            <div className={`reveal ${visible ? "visible" : ""}`}>
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">Experience</p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground mb-4">
                Where has Antony Austin worked?
              </h2>
              <p className="text-muted-foreground leading-[1.8] mb-8">
                Antony Austin is a remote firmware developer for ASAT, a US-based startup, building
                BLE peripheral firmware on the Nordic nRF5340 with Zephyr RTOS. He also works as a
                freelance ROS 2 developer on Fiverr and has delivered Next.js sites for clients in
                Australia and India since 2023.
              </p>
            </div>
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
            <div className={`reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.05s" }}>
              {/* The founder question is answered by the dedicated Ventures
                  section; this column covers the wider set of roles, so the
                  heading must not duplicate that passage. */}
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">Organizations</p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground mb-4">
                What organizations is Antony Austin part of?
              </h2>
              <p className="text-muted-foreground leading-[1.8] mb-8">
                Alongside founding VirtusCo and Noviq, Antony Austin coordinates science and
                technology events for RSET&apos;s Apptronics technical fest, and led three batches
                of 15 students as Head of the Electronics Club at Model Technical HSS from 2019
                to 2023, starting at age 14.
              </p>
            </div>
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
