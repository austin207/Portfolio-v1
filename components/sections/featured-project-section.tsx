"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

const project = {
  title: "32-Bit Tiny GPU",
  subtitle: "ISA · RTL · Assembler · Neural Network — built from zero",
  description:
    "A programmable GPU built from the ground up: a custom 21-instruction 32-bit ISA, 12 fully parameterized SystemVerilog modules (4 cores × 4 threads), a C-based assembler called AXEL, and a neural network that trains end-to-end on the simulated hardware using Q8 fixed-point arithmetic — converging within 2.5% of target across 20 epochs.",
  image: "/project-images/32-bit-tiny-gpu/architecture.png",
  tags: ["SystemVerilog", "Verilog", "C", "Python", "GPU Architecture", "ISA Design", "Neural Networks", "cocotb"],
  github: "https://github.com/austin207/32-bit-Tiny-GPU",
  projectUrl: "/projects/32-bit-tiny-gpu",
  stats: [
    { label: "ISA Instructions", value: "21" },
    { label: "RTL Modules", value: "12" },
    { label: "Parallel Threads", value: "16" },
    { label: "Training Epochs", value: "20" },
  ],
}

export default function FeaturedProjectSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="featured-project" className="py-24 px-6" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />

        <div className={`flex items-end justify-between mb-10 reveal ${visible ? "visible" : ""}`}>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Featured Project
          </h2>
        </div>

        {/* Main card */}
        <div
          className={`border border-border hover:border-foreground/20 transition-colors duration-500 reveal ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.1s" }}
        >
          {/* Architecture diagram */}
          <div className="relative w-full overflow-hidden border-b border-border bg-black" style={{ aspectRatio: "16/7" }}>
            <Image
              src={project.image}
              alt="32-Bit Tiny GPU architecture diagram"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8 sm:p-10">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              Computer Architecture · Hardware Design
            </p>
            <h3 className="text-2xl sm:text-3xl font-medium text-foreground mb-2">{project.title}</h3>
            <p className="font-mono text-[11px] text-muted-foreground mb-5">{project.subtitle}</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{project.description}</p>

            {/* Stats row */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border reveal ${visible ? "visible" : ""}`}
              style={{ transitionDelay: "0.25s" }}
            >
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-mono text-foreground">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tags + CTAs */}
            <div
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-border reveal ${visible ? "visible" : ""}`}
              style={{ transitionDelay: "0.35s" }}
            >
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </Link>
                <Link
                  href={project.projectUrl}
                  className="flex items-center gap-1 text-sm px-5 py-2 border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
                >
                  View Project
                  <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
