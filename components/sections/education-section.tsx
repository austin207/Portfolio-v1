"use client"

import educationData from "@/content/data/education.json"
import { useReveal } from "@/hooks/use-reveal"

export default function EducationSection() {
  const { education, certifications } = educationData
  const { ref, visible } = useReveal()

  return (
    <section id="education" className="py-24 px-6" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className={`text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8 reveal ${visible ? "visible" : ""}`}>Education</h2>
            <div className="space-y-0 divide-y divide-border">
              {education.map((edu, i) => (
                <div key={i} className={`py-5 first:pt-0 reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.1 + 0.1}s` }}>
                  <h3 className="text-foreground font-medium text-[15px]">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{edu.institution}</p>
                  <div className="flex items-center gap-4 mt-2 font-mono text-[11px] text-muted-foreground">
                    <span>{edu.period}</span>
                    <span>·</span>
                    <span>{edu.location}</span>
                  </div>
                  {edu.description && (
                    <p className="text-[13px] text-muted-foreground mt-3 pl-3 border-l border-border">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className={`text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8 reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.05s" }}>Certifications</h2>
            <div className="space-y-0 divide-y divide-border">
              {certifications.map((cert, i) => (
                <div key={i} className={`py-4 first:pt-0 flex items-start justify-between gap-4 reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.08 + 0.15}s` }}>
                  <div>
                    <h4 className="text-foreground text-[15px]">{cert.title}</h4>
                    <p className="text-[13px] text-muted-foreground mt-1">{cert.issuer}</p>
                    {cert.description && (
                      <p className="text-[12px] text-muted-foreground/70 mt-1">{cert.description}</p>
                    )}
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground shrink-0">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
