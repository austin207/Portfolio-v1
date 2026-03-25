"use client"

import { Quote } from "lucide-react"
import { testimonials } from "@/lib/data/sections"
import { useReveal } from "@/hooks/use-reveal"

export default function TestimonialsSection() {
  const marqueeItems = [...testimonials, ...testimonials]
  const { ref, visible } = useReveal()

  return (
    <section id="testimonials" className="py-24 overflow-hidden" ref={ref}>
      <div className="max-w-[1100px] mx-auto px-6 mb-12">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />
        <h2 className={`text-sm font-mono text-muted-foreground uppercase tracking-widest reveal ${visible ? "visible" : ""}`}>Testimonials</h2>
      </div>

      <div className={`reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
        <div className="marquee-mask">
          <div className="flex animate-marquee w-max gap-6 px-6">
            {marqueeItems.map((t, i) => (
              <div key={`${t.id}-${i}`} className="flex-shrink-0 w-[380px] border border-border p-6 space-y-4 hover:border-foreground/20 transition-colors">
                <Quote className="h-4 w-4 text-muted-foreground/30" />
                <blockquote className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {t.content}
                </blockquote>
                <div className="pt-4 border-t border-border flex items-center gap-3">
                  <img src={t.avatar || "/placeholder.svg"} alt={t.name} className="w-8 h-8 rounded-full grayscale object-cover" />
                  <div>
                    <p className="text-sm text-foreground">{t.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
