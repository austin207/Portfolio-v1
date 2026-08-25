"use client"

import { testimonials } from "@/lib/data/sections"
import { StaggerTestimonials, type TestimonialItem } from "@/components/ui/stagger-testimonials"
import { useReveal } from "@/hooks/use-reveal"

// Map portfolio testimonial data to the StaggerTestimonials shape.
// Avatars use i.pravatar.cc seeded by the testimonial id so each person
// always gets the same unique face.
// Repeat the 3 real testimonials 4× → 12 cards for a full carousel chain.
// Each copy gets a unique tempId so React keys never collide.
const BASE_COUNT = 4
const mappedTestimonials: TestimonialItem[] = Array.from({ length: BASE_COUNT }, (_, pass) =>
  testimonials.map((t) => ({
    tempId: `${t.id}-${pass}`,
    testimonial: t.content,
    by: `${t.name}, ${t.role} at ${t.company}`,
    imgSrc:
      t.avatar && !t.avatar.includes("placeholder")
        ? t.avatar
        : `https://i.pravatar.cc/150?img=${Number(t.id) + 10}`,
  }))
).flat()

export default function TestimonialsSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="testimonials" className="py-24 overflow-hidden" ref={ref}>
      {/* Section header — consistent with the rest of the page */}
      <div className="max-w-[1100px] mx-auto px-6 mb-12">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            What do people say about working with Antony Austin?
          </h2>
        </div>
      </div>

      {/* Stagger carousel */}
      <div className={`reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
        <StaggerTestimonials testimonials={mappedTestimonials} />
      </div>
    </section>
  )
}
