"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Send, ArrowRight, X } from "lucide-react"

interface Message { role: "user" | "assistant"; content: string }
interface Vec2    { x: number; y: number }
type Mode = "idle" | "tour-prompt" | "touring" | "qa"

// ── Tour steps ────────────────────────────────────────────────────────────────
const TOUR = [
  { id: "about",      title: "Who I am",        rx: 0.80, ry: 0.42,
    prompt: "In 2 short sentences (max 40 words), introduce Austin: 20yr-old engineer at RSET Kerala, 3+ years across VLSI/embedded/robotics/AI-ML, co-founder & CTO of VirtusCo, founder of Noviq. Be warm and direct. Stop after the second sentence." },
  { id: "skills",     title: "What I know",      rx: 0.15, ry: 0.40,
    prompt: "In 2 short sentences (max 40 words), describe Austin's technical skills: 6 domains from Embedded C and SystemVerilog to ROS 2, PyTorch, and Next.js — expert in both hardware and software. Stop after the second sentence." },
  { id: "projects",   title: "What I've built",  rx: 0.80, ry: 0.38,
    prompt: "In 2 short sentences (max 40 words), describe Austin's notable projects: 253M-parameter LLaMA-like transformer from scratch, autonomous airport robot with full ROS 2 stack, computer vision systems — all real working code. Stop after the second sentence." },
  { id: "experience", title: "Where I've worked", rx: 0.15, ry: 0.45,
    prompt: "In 2 short sentences (max 40 words), summarise Austin's experience: remote BLE firmware on Zephyr RTOS for a US startup, freelance ROS 2 on Fiverr, web dev — all while a full-time student. Stop after the second sentence." },
  { id: "contact",    title: "Let's connect",    rx: 0.60, ry: 0.55,
    prompt: "In 2 short sentences (max 35 words), warmly invite visitors to contact Austin via the form or LinkedIn/GitHub. Stop after the second sentence." },
]

// ── Fallback texts (used if API fails) ───────────────────────────────────────
const FALLBACK_TEXTS = [
  "Austin is a 20-year-old Applied Electronics engineer at RSET Kerala, with 3+ years spanning VLSI, embedded systems, robotics, and AI/ML. He's co-founder & CTO of VirtusCo and founder of the web/AI studio Noviq.",
  "Austin's skills span 6 domains — Embedded C, SystemVerilog, ROS 2, Altium PCB design, PyTorch, and Next.js. Expert-level in both software and hardware, rare for someone still in undergrad.",
  "He built a 253M-parameter LLaMA-like transformer from scratch and an autonomous airport robot with a full ROS 2 navigation stack. Every project on this page is real, deployed, working code.",
  "Austin works remotely as a BLE firmware developer for a US startup using Zephyr RTOS, freelances ROS 2 on Fiverr for international clients, and builds web apps — all while being a full-time engineering student.",
  "Got a project in mind? Drop Austin a message using the form or reach him on LinkedIn, GitHub, or Fiverr. Click me anytime if you have more questions!",
]
const CHAR_SPEED = 14   // ms per character — fast but readable
function RobotSVG({ isThinking }: { isThinking: boolean }) {
  return (
    <svg width="36" height="42" viewBox="0 0 48 56" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="22" y="0"  width="4"  height="4"  fill="currentColor" opacity="0.5" />
      <rect x="20" y="4"  width="8"  height="4"  fill="currentColor" opacity="0.7" />
      <rect x="4"  y="8"  width="40" height="24" fill="currentColor" />
      <rect x="0"  y="12" width="4"  height="16" fill="currentColor" opacity="0.8" />
      <rect x="44" y="12" width="4"  height="16" fill="currentColor" opacity="0.8" />
      <rect x="8"  y="12" width="12" height="12" fill="hsl(var(--background))" />
      <rect x="28" y="12" width="12" height="12" fill="hsl(var(--background))" />
      {isThinking ? (
        <>
          <rect x="10" y="16" width="8" height="2" fill="currentColor" opacity="0.5" />
          <rect x="30" y="16" width="8" height="2" fill="currentColor" opacity="0.5" />
          <rect x="10" y="20" width="8" height="2" fill="currentColor" opacity="0.25" />
          <rect x="30" y="20" width="8" height="2" fill="currentColor" opacity="0.25" />
        </>
      ) : (
        <>
          <rect x="11" y="14" width="6" height="6" fill="currentColor" />
          <rect x="31" y="14" width="6" height="6" fill="currentColor" />
          <rect x="15" y="14" width="2" height="2" fill="hsl(var(--background))" />
          <rect x="35" y="14" width="2" height="2" fill="hsl(var(--background))" />
        </>
      )}
      <rect x="12" y="26" width="4" height="2" fill="hsl(var(--background))" />
      <rect x="18" y="26" width="4" height="2" fill="hsl(var(--background))" />
      <rect x="24" y="26" width="4" height="2" fill="hsl(var(--background))" />
      <rect x="30" y="26" width="4" height="2" fill="hsl(var(--background))" />
      <rect x="18" y="32" width="12" height="4" fill="currentColor" opacity="0.6" />
      <rect x="4"  y="36" width="40" height="16" fill="currentColor" />
      <rect x="0"  y="36" width="4"  height="12" fill="currentColor" opacity="0.8" />
      <rect x="44" y="36" width="4"  height="12" fill="currentColor" opacity="0.8" />
      <rect x="14" y="40" width="20" height="8"  fill="hsl(var(--background))" />
      <rect x="20" y="42" width="4"  height="4"  fill="currentColor" opacity={isThinking ? 0.2 : 0.9} />
      <rect x="12" y="52" width="8"  height="4"  fill="currentColor" opacity="0.9" />
      <rect x="28" y="52" width="8"  height="4"  fill="currentColor" opacity="0.9" />
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function AvatarAgent() {
  const [mounted,     setMounted]     = useState(false)
  const [pos,         setPos]         = useState<Vec2>({ x: 0, y: 0 })
  const [mode,        setMode]        = useState<Mode>("idle")
  const [tourStep,    setTourStep]    = useState(0)
  const [typeText,    setTypeText]    = useState("")
  const [bubbleOpen,  setBubbleOpen]  = useState(false)
  const [qaInput,     setQaInput]     = useState("")
  const [qaText,      setQaText]      = useState("")
  const [qaQuestion,  setQaQuestion]  = useState("")
  const [isStreaming,     setIsStreaming]     = useState(false)
  const [qaHistory,   setQaHistory]  = useState<Message[]>([])
  const [vp,          setVp]         = useState({ w: 1200, h: 800 })

  const robotRef      = useRef<HTMLDivElement>(null)
  const bubbleRef     = useRef<HTMLDivElement>(null)
  const inputRef      = useRef<HTMLInputElement>(null)
  const isTouringRef  = useRef(false)
  const abortRef      = useRef<AbortController | null>(null)
  const tourTextsRef  = useRef<string[]>(Array(TOUR.length).fill(""))  // pre-generated
  const typeTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const qaQueueRef    = useRef("")   // characters waiting to render
  const qaDrainRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Home position ──────────────────────────────────────────────────────────
  const homePos = useCallback(
    (w = window.innerWidth, h = window.innerHeight): Vec2 => ({
      x: w - 52,          // 52 = half-robot-width(18) + 34px margin
      y: h - 80,          // keeps robot fully above bottom edge
    }),
    []
  )

  // ── Mount ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true)
    const w = window.innerWidth, h = window.innerHeight
    setVp({ w, h })
    setPos(homePos(w, h))
    const onResize = () => {
      setVp({ w: window.innerWidth, h: window.innerHeight })
      if (!isTouringRef.current) setPos(homePos())
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [homePos])

  // ── Auto tour-prompt (first visit) ────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return
    const seen = sessionStorage.getItem("tour-seen")
    if (seen) { setMode("qa"); return }
    const t = setTimeout(() => {
      setMode("tour-prompt")
      setBubbleOpen(true)
    }, 4000)
    return () => clearTimeout(t)
  }, [mounted])

  // ── Pre-generate all tour texts on mount ─────────────────────────────────
  useEffect(() => {
    if (!mounted) return
    const seen = sessionStorage.getItem("tour-seen")
    if (seen) return
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms))
    ;(async () => {
      for (let i = 0; i < TOUR.length; i++) {
        try {
          if (i > 0) await delay(800)   // avoid Groq rate-limit between calls
          const res = await fetch("/api/avatar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [{ role: "user", content: TOUR[i].prompt }],
              max_tokens: 150,           // enough for 2-3 full sentences
            }),
          })
          if (!res.body) { tourTextsRef.current[i] = FALLBACK_TEXTS[i]; continue }
          const reader = res.body.getReader(); const dec = new TextDecoder()
          let buf = "", full = ""
          while (true) {
            const { done, value } = await reader.read(); if (done) break
            buf += dec.decode(value, { stream: true })
            const lines = buf.split("\n"); buf = lines.pop() ?? ""
            for (const line of lines) {
              const t = line.trim(); if (!t.startsWith("data: ")) continue
              const d = t.slice(6); if (d === "[DONE]") break
              try { full += JSON.parse(d)?.choices?.[0]?.delta?.content ?? "" } catch {}
            }
          }
          tourTextsRef.current[i] = full.trim() || FALLBACK_TEXTS[i]
        } catch {
          tourTextsRef.current[i] = FALLBACK_TEXTS[i]
        }
      }
    })()
  }, [mounted])

  // ── Typewriter (for tour display) ─────────────────────────────────────────
  const typewrite = useCallback((text: string) => {
    if (typeTimerRef.current) clearInterval(typeTimerRef.current)
    setTypeText("")
    let i = 0
    typeTimerRef.current = setInterval(() => {
      i++
      setTypeText(text.slice(0, i))
      if (i >= text.length) clearInterval(typeTimerRef.current!)
    }, CHAR_SPEED)
  }, [])

  // ── Q&A display drain (character queue → 28ms/char) ─────────────────────
  const startQADrain = useCallback(() => {
    if (qaDrainRef.current) return
    qaDrainRef.current = setInterval(() => {
      if (qaQueueRef.current.length > 0) {
        const ch = qaQueueRef.current[0]
        qaQueueRef.current = qaQueueRef.current.slice(1)
        setQaText(prev => prev + ch)
      }
    }, CHAR_SPEED)
  }, [])


  // ── Stream utility (Q&A only) ─────────────────────────────────────────────────
  const streamFromAPI = useCallback(async (
    messages: Array<{ role: string; content: string }>,
    onChunk: (tok: string) => void,
    signal?: AbortSignal
  ) => {
    const res = await fetch("/api/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal,
    })
    if (!res.body) return
    const reader = res.body.getReader(), dec = new TextDecoder()
    let buf = ""
    while (true) {
      const { done, value } = await reader.read(); if (done) break
      buf += dec.decode(value, { stream: true })
      const lines = buf.split("\n"); buf = lines.pop() ?? ""
      for (const line of lines) {
        const t = line.trim(); if (!t.startsWith("data: ")) continue
        const d = t.slice(6); if (d === "[DONE]") break
        try { onChunk(JSON.parse(d)?.choices?.[0]?.delta?.content ?? "") } catch {}
      }
    }
  }, [])

  // ── Tour step — uses pre-generated text + typewriter ──────────────────────
  const goToStep = useCallback((idx: number) => {
    if (typeTimerRef.current) clearInterval(typeTimerRef.current)
    if (idx >= TOUR.length) {
      isTouringRef.current = false
      sessionStorage.setItem("tour-seen", "true")
      setPos(homePos())
      setMode("qa")
      setBubbleOpen(false)
      return
    }
    const step = TOUR[idx]
    setTourStep(idx)
    setTypeText("")
    setPos({ x: window.innerWidth * step.rx, y: window.innerHeight * step.ry })
    setTimeout(() => {
      document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 200)
    // Typewrite the pre-generated (or fallback) text after robot moves
    setTimeout(() => typewrite(tourTextsRef.current[idx] || FALLBACK_TEXTS[idx]), 500)
  }, [homePos, typewrite])

  const startTour = useCallback(() => {
    isTouringRef.current = true
    setMode("touring")
    setBubbleOpen(true)
    goToStep(0)
  }, [goToStep])

  const skipTour = useCallback(() => {
    if (typeTimerRef.current) clearInterval(typeTimerRef.current)
    isTouringRef.current = false
    sessionStorage.setItem("tour-seen", "true")
    setPos(homePos())
    setMode("qa")
    setBubbleOpen(false)
  }, [homePos])

  // ── Esc / outside click ────────────────────────────────────────────────────
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (mode === "touring" || mode === "tour-prompt") skipTour()
      else setBubbleOpen(false)
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [mode, skipTour])

  useEffect(() => {
    if (!bubbleOpen || mode === "tour-prompt" || mode === "touring") return
    const handler = (e: MouseEvent) => {
      const t = e.target as Node
      if (!robotRef.current?.contains(t) && !bubbleRef.current?.contains(t))
        setBubbleOpen(false)
    }
    const id = setTimeout(() => document.addEventListener("mousedown", handler), 50)
    return () => { clearTimeout(id); document.removeEventListener("mousedown", handler) }
  }, [bubbleOpen, mode])

  // Focus input on open
  useEffect(() => {
    if (bubbleOpen && mode === "qa") setTimeout(() => inputRef.current?.focus(), 50)
  }, [bubbleOpen, mode])

  // ── Q&A streaming ─────────────────────────────────────────────────────────
  const askQuestion = async (q: string) => {
    if (!q.trim() || isStreaming) return
    setQaInput("")
    setQaQuestion(q)
    setQaText(""); qaQueueRef.current = ""
    if (qaDrainRef.current) { clearInterval(qaDrainRef.current); qaDrainRef.current = null }
    setIsStreaming(true)
    const nextHist: Message[] = [...qaHistory, { role: "user", content: q }]
    setQaHistory(nextHist)
    try {
      let full = ""
      await streamFromAPI(
        nextHist,
        (tok) => { qaQueueRef.current += tok; startQADrain() }
      )
      // Drain remaining queue and save history after done
      const flush = () => {
        if (qaQueueRef.current.length > 0) { setTimeout(flush, CHAR_SPEED * qaQueueRef.current.length + 50) }
        else {
          if (qaDrainRef.current) { clearInterval(qaDrainRef.current); qaDrainRef.current = null }
          setQaHistory(h => [...h, { role: "assistant", content: full }])
        }
      }
      // Collect full text for history from displayed state
      setQaText(prev => { full = prev; return prev })
      setTimeout(flush, 100)
    } catch {
      setQaText("Connection error. Try again.")
    } finally {
      setIsStreaming(false)
    }
  }

  if (!mounted) return null

  // ── Bubble placement ─────────────────────────────────────────────────────
  const BW = 224
  // Horizontal: robot on right half → bubble to left; robot on left half → bubble to right
  const preferLeft = pos.x > vp.w / 2
  const bubbleX    = preferLeft
    ? Math.max(8, pos.x - BW - 12)
    : Math.min(vp.w - BW - 8, pos.x + 24)
  // Vertical: prefer above robot; fall back below if near top
  const aboveY  = pos.y - 170
  const bubbleY = aboveY > 70 ? aboveY : pos.y + 50
  const ptrBot  = aboveY > 70   // pointer at bottom of bubble when bubble is above
  const step    = TOUR[tourStep]

  // Robot position transition
  const robotTransition = mode === "touring"
    ? "left 1.8s cubic-bezier(0.25,0.46,0.45,0.94), top 1.8s cubic-bezier(0.25,0.46,0.45,0.94)"
    : "left 0.5s ease-out, top 0.5s ease-out"
  // Bubble follows robot position only during tour
  const bubbleTransition = mode === "touring"
    ? "left 1.8s cubic-bezier(0.25,0.46,0.45,0.94), top 1.8s cubic-bezier(0.25,0.46,0.45,0.94)"
    : "none"

  return (
    <>
      {/* ── Robot ── */}
      <div
        ref={robotRef}
        className="fixed z-[60] select-none"
        style={{ left: pos.x, top: pos.y, transform: "translate(-50%,-50%)", transition: robotTransition }}
      >
        <button
          onClick={() => {
            if (mode === "qa" || mode === "idle") {
              if (!bubbleOpen) {
                setQaText(""); setQaQuestion(""); setQaInput(""); setQaHistory([])
              }
              if (mode === "idle") setMode("qa")
              setBubbleOpen(p => !p)
            }
          }}
          className="block focus:outline-none hover:scale-110 active:scale-95 transition-transform duration-150"
          style={{
            color:      "hsl(var(--foreground))",
            filter:     `drop-shadow(0 0 ${isStreaming ? 6 : 4}px hsl(var(--foreground)/${isStreaming ? 0.35 : 0.18}))`,
            opacity:    1,  // always fully visible
          }}
          aria-label="Chat with Austin's assistant"
        >
          <RobotSVG isThinking={isStreaming} />
        </button>
      </div>

      {/* ── Thought bubble ── */}
      {bubbleOpen && (
        <div
          ref={bubbleRef}
          className="fixed z-50 bg-background border border-border rounded-xl shadow-sm"
          style={{ left: bubbleX, top: bubbleY, width: BW, transition: bubbleTransition }}
        >
          {/* Pointer */}
          <span
            className="absolute left-1/2 -translate-x-1/2 block w-3 h-3 bg-background border-border rotate-45"
            style={{
              [ptrBot ? "bottom" : "top"]: "-7px",
              borderWidth: ptrBot ? "0 1px 1px 0" : "1px 0 0 1px",
              borderStyle: "solid",
            }}
          />

          {/* TOUR PROMPT */}
          {mode === "tour-prompt" && (
            <div className="px-3 py-3">
              <p className="text-xs text-foreground mb-2.5 leading-relaxed">
                👾 First time here? Want a quick tour of Austin's portfolio?
              </p>
              <div className="flex gap-2">
                <button onClick={startTour}
                  className="flex-1 text-[11px] py-1.5 bg-foreground text-background font-medium hover:opacity-80 transition-opacity rounded-sm">
                  Show me around
                </button>
                <button onClick={skipTour}
                  className="flex-1 text-[11px] py-1.5 border border-border text-muted-foreground hover:text-foreground transition-colors rounded-sm">
                  Skip
                </button>
              </div>
            </div>
          )}

          {/* TOURING */}
          {mode === "touring" && (
            <div className="px-3 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-muted-foreground/60 tracking-widest">
                  {String(tourStep + 1).padStart(2,"0")}/{String(TOUR.length).padStart(2,"0")} {step?.title}
                </span>
                <button onClick={skipTour} className="text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                  <X size={11} />
                </button>
              </div>
              {/* Progress */}
              <div className="flex gap-1 mb-2.5">
                {TOUR.map((_, i) => (
                  <div key={i} className="flex-1 h-px" style={{ background: i <= tourStep ? "hsl(var(--foreground)/0.6)" : "hsl(var(--border))" }} />
                ))}
              </div>
              {/* Text */}
              <p className="text-xs text-foreground leading-relaxed min-h-[52px]">
                {typeText || <span className="animate-pulse text-muted-foreground/40">thinking…</span>}
                {typeText.length > 0 && typeText.length < 300 && (
                  <span className="inline-block w-0.5 h-3 bg-foreground/50 ml-0.5 animate-pulse align-middle" />
                )}
              </p>
              {/* Navigation */}
              <div className="mt-3">
                <button
                  onClick={() => goToStep(tourStep + 1)}
                  className="w-full flex items-center justify-center gap-1 text-[11px] py-1.5 bg-foreground text-background font-medium hover:opacity-80 transition-opacity rounded-sm"
                >
                  {tourStep === TOUR.length - 1 ? "Done" : "Next"}
                  {tourStep < TOUR.length - 1 && <ArrowRight size={11} />}
                </button>
              </div>
            </div>
          )}

          {/* Q&A */}
          {mode === "qa" && (
            <>
              <div className="px-3 pt-3 pb-2 min-h-[56px]">
                {qaText ? (
                  <>
                    {qaQuestion && (
                      <p className="text-[10px] text-muted-foreground/50 mb-1.5 leading-tight truncate">
                        {qaQuestion}
                      </p>
                    )}
                    <p className="text-xs text-foreground leading-relaxed">
                      {qaText}
                      {isStreaming && (
                        <span className="inline-block w-0.5 h-3 bg-foreground/70 ml-0.5 animate-pulse align-middle" />
                      )}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground/50 leading-relaxed">
                    {isStreaming
                      ? <span className="animate-pulse">thinking…</span>
                      : "ask me anything about Austin"}
                  </p>
                )}
              </div>
              {!isStreaming && (
                <div className="border-t border-border/60 px-3 py-2 flex gap-1.5 items-center">
                  <input
                    ref={inputRef}
                    type="text" value={qaInput}
                    onChange={e => setQaInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && askQuestion(qaInput)}
                    placeholder="ask something…"
                    className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
                  />
                  <button onClick={() => askQuestion(qaInput)} disabled={!qaInput.trim()}
                    aria-label="Send"
                    className="text-muted-foreground hover:text-foreground disabled:opacity-25 transition-colors">
                    <Send size={11} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}
