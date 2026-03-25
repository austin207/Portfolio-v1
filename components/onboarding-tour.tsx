"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"

interface TourStep {
  target: string
  title: string
  description: string
  hint?: string
}

const tourSteps: TourStep[] = [
  {
    target: "#about",
    title: "Who I am",
    description: "3+ years across VLSI, embedded systems, robotics, and AI/ML. Co-founder of VirtusCo, founder of Noviq.",
    hint: "Scroll down to learn more",
  },
  {
    target: "#skills",
    title: "What I know",
    description: "6 skill domains — from SystemVerilog to ROS 2. Click the tabs to explore each area.",
    hint: "Try clicking a tab",
  },
  {
    target: "#projects",
    title: "What I've built",
    description: "From a 253M-parameter LLM to an autonomous airport robot. Click any project for the full story.",
    hint: "Click a project to explore",
  },
  {
    target: "#experience",
    title: "Where I've worked",
    description: "Remote firmware at ASAT, ROS 2 freelance on Fiverr, web dev for international clients, and two startups.",
  },
  {
    target: "#contact",
    title: "Let's connect",
    description: "Got a project in mind? Send a message or find me on GitHub, LinkedIn, or Fiverr.",
    hint: "Drop me a message",
  },
]

export default function OnboardingTour() {
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null)
  const animFrame = useRef(0)

  useEffect(() => {
    const seen = sessionStorage.getItem("tour-seen")
    if (seen) return
    const t = setTimeout(() => setShowPrompt(true), 4500)
    return () => clearTimeout(t)
  }, [])

  // Continuously track the target element position
  const trackTarget = useCallback(() => {
    if (!active) return
    const el = document.querySelector(tourSteps[step]?.target)
    if (el) {
      setHighlightRect(el.getBoundingClientRect())
    }
    animFrame.current = requestAnimationFrame(trackTarget)
  }, [active, step])

  useEffect(() => {
    if (active) {
      trackTarget()
    }
    return () => cancelAnimationFrame(animFrame.current)
  }, [active, trackTarget])

  const scrollToStep = useCallback((idx: number) => {
    const el = document.querySelector(tourSteps[idx].target)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [])

  const startTour = () => {
    setShowPrompt(false)
    setActive(true)
    setStep(0)
    sessionStorage.setItem("tour-seen", "true")
    scrollToStep(0)
  }

  const next = () => {
    if (step < tourSteps.length - 1) {
      const n = step + 1
      setStep(n)
      scrollToStep(n)
    } else {
      endTour()
    }
  }

  const prev = () => {
    if (step > 0) {
      const p = step - 1
      setStep(p)
      scrollToStep(p)
    }
  }

  const endTour = () => {
    setActive(false)
    setShowPrompt(false)
    cancelAnimationFrame(animFrame.current)
  }

  const dismiss = () => {
    setShowPrompt(false)
    sessionStorage.setItem("tour-seen", "true")
  }

  // Keyboard
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") next()
      else if (e.key === "ArrowLeft") prev()
      else if (e.key === "Escape") endTour()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  // Prompt
  if (showPrompt && !active) {
    return (
      <div
        className="fixed bottom-8 right-8 z-[99990]"
        style={{ animation: "tourIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        <div className="border border-border bg-background p-5 max-w-[280px]">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">First time here?</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Quick 30-second tour of the portfolio.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={startTour}
              className="flex-1 text-xs py-2.5 bg-foreground text-background font-medium hover:opacity-80 transition-opacity"
            >
              Show me around
            </button>
            <button
              onClick={dismiss}
              className="flex-1 text-xs py-2.5 border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes tourIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    )
  }

  if (!active || !highlightRect) return null

  const current = tourSteps[step]
  const pad = 10
  const hx = highlightRect.left - pad
  const hy = highlightRect.top - pad
  const hw = highlightRect.width + pad * 2
  const hh = highlightRect.height + pad * 2

  return (
    <>
      {/* Overlay — 4 dark rectangles around the cutout (no SVG mask needed) */}
      <div className="fixed inset-0 z-[99990]" onClick={endTour}>
        {/* Top */}
        <div className="fixed top-0 left-0 right-0 bg-black/70 transition-all duration-500 ease-out" style={{ height: Math.max(0, hy) }} />
        {/* Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/70 transition-all duration-500 ease-out" style={{ top: hy + hh }} />
        {/* Left */}
        <div className="fixed bg-black/70 transition-all duration-500 ease-out" style={{ top: hy, left: 0, width: Math.max(0, hx), height: hh }} />
        {/* Right */}
        <div className="fixed bg-black/70 transition-all duration-500 ease-out" style={{ top: hy, left: hx + hw, right: 0, height: hh }} />
      </div>

      {/* Highlight border */}
      <div
        className="fixed z-[99992] border border-foreground/30 pointer-events-none transition-all duration-500 ease-out"
        style={{ left: hx, top: hy, width: hw, height: hh }}
      />

      {/* Fixed bottom tooltip */}
      <div
        key={step}
        className="fixed bottom-0 left-0 right-0 z-[99995] border-t border-border bg-background"
        style={{ animation: "tooltipSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        {/* Progress bar */}
        <div className="flex h-px">
          {tourSteps.map((_, i) => (
            <div
              key={i}
              className="flex-1 transition-all duration-500"
              style={{ background: i <= step ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.05)" }}
            />
          ))}
        </div>

        <div className="max-w-[1100px] mx-auto px-6 py-6 flex items-center gap-8">
          {/* Step info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                {String(step + 1).padStart(2, "0")} / {String(tourSteps.length).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold text-foreground tracking-tight">{current.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{current.description}</p>
            {current.hint && (
              <p className="text-xs text-foreground/40 font-mono mt-2">→ {current.hint}</p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              disabled={step === 0}
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 disabled:opacity-20 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="h-10 px-6 bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              {step === tourSteps.length - 1 ? "Done" : "Next"}
              {step < tourSteps.length - 1 && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); endTour() }}
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes tooltipSlide {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
