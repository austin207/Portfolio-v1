"use client"

import { Button } from "@/components/ui/button"
import { Quote } from "lucide-react"
import { testimonials } from "@/lib/data/sections"
import Link from "next/link"

export default function TestimonialsSection() {
  // Double the testimonials for seamless loop
  const marqueeItems = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="py-28 overflow-hidden relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-3xl -translate-y-1/2" />
      <div className="container mx-auto px-4 md:px-6 mb-14 max-w-6xl">
        <div className="flex items-center gap-4 mb-14">
          <span className="section-number">04</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What People Say
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
        </div>
      </div>

      {/* Continuous Marquee */}
      <div className="marquee-mask">
        <div className="flex animate-marquee w-max gap-4 px-4">
          {marqueeItems.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[340px] md:w-[400px] glass-card-hover p-6 gradient-border"
            >
              <Quote className="h-6 w-6 text-cyan-500/20 mb-4" />

              <blockquote className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4">
                {testimonial.content}
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full border border-white/[0.08] object-cover"
                />
                <div>
                  <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-14 px-4">
        <p className="text-muted-foreground mb-6 text-sm">Want to work together?</p>
        <Link href="#contact">
          <Button className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-full px-8 h-11 font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/30">
            Get In Touch
          </Button>
        </Link>
      </div>
    </section>
  )
}
