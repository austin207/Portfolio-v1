"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Send, ArrowRight, X } from "lucide-react"

interface Message { role: "user" | "assistant"; content: string }
interface Vec2    { x: number; y: number }
type Mode = "idle" | "tour-prompt" | "touring" | "qa"

// ── Tour steps ────────────────────────────────────────────────────────────────
const TOUR = [
  { id: "about",      title: "Who I am",        rx: 0.80, ry: 0.42,
    prompt: "Introduce Austin's background and who he is to a portfolio visitor in 2 sentences. Mention his degree at RSET, years of experience, and key ventures (VirtusCo, Noviq)." },
  { id: "skills",     title: "What I know",      rx: 0.15, ry: 0.40,
    prompt: "Describe Austin's technical skills to a visitor in 2 sentences. Highlight the breadth across embedded systems, robotics, AI/ML, and web — with a specific impressive example." },
  { id: "projects",   title: "What I've built",  rx: 0.80, ry: 0.38,
    prompt: "Tell a visitor about Austin's most impressive projects in 2 sentences. Mention the 253M-parameter transformer model and the autonomous airport robot." },
  { id: "experience", title: "Where I've worked", rx: 0.15, ry: 0.45,
    prompt: "Summarise Austin's work experience to a visitor in 2 sentences. Include remote BLE firmware at a US startup while being a full-time student, and freelance work." },
  { id: "contact",    title: "Let's connect",    rx: 0.60, ry: 0.55,
    prompt: "Wrap up the portfolio tour and invite the visitor to reach out to Austin in 2 sentences. Mention the contact form and LinkedIn. Sound warm and inviting." },
]

// ── Robot SVG ─────────────────────────────────────────────────────────────────
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
  const [isTourStreaming, setIsTourStreaming] = useState(false)
  const [qaHistory,   setQaHistory]  = useState<Message[]>([])
  const [vp,          setVp]         = useState({ w: 1200, h: 800 })

  const robotRef     = useRef<HTMLDivElement>(null)
  const bubbleRef    = useRef<HTMLDivElement>(null)
  const inputRef     = useRef<HTMLInputElement>(null)
  const isTouringRef = useRef(false)
  const abortRef     = useRef<AbortController | null>(null)

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

  // ── Stream utility (shared for tour + Q&A) ───────────────────────────────
  const streamFromAPI = useCallback(async (
    messages: Array<{ role: string; content: string }>,
    onToken: (t: string) => void,
    signal?: AbortSignal
  ) => {
    const res = await fetch("/api/avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal,
    })
    if (!res.body) return ""
    const reader  = res.body.getReader()
    const decoder = new TextDecoder()
    let buf = "", full = ""
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buf += decoder.decode(value, { stream: true })
      const lines = buf.split("\n"); buf = lines.pop() ?? ""
      for (const line of lines) {
        const t = line.trim()
        if (!t.startsWith("data: ")) continue
        const d = t.slice(6); if (d === "[DONE]") break
        try {
          const tok = JSON.parse(d)?.choices?.[0]?.delta?.content ?? ""
          if (tok) { full += tok; onToken(full) }
        } catch { /* skip */ }
      }
    }
    return full
  }, [])

  // ── Tour step (AI-narrated) ────────────────────────────────────────────────
  const goToStep = useCallback((idx: number) => {
    // Cancel any in-flight tour stream
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    if (idx >= TOUR.length) {
      // Tour finished → go home, switch to Q&A
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

    // Move robot
    setPos({
      x: window.innerWidth  * step.rx,
      y: window.innerHeight * step.ry,
    })
    // Scroll section
    setTimeout(() => {
      document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 200)

    // Stream AI narration
    setTimeout(async () => {
      setIsTourStreaming(true)
      try {
        await streamFromAPI(
          [{ role: "user", content: step.prompt }],
          (full) => setTypeText(full),
          abortRef.current?.signal
        )
      } catch { /* aborted or error */ } finally {
        setIsTourStreaming(false)
      }
    }, 500)
  }, [homePos, streamFromAPI])

  const startTour = useCallback(() => {
    isTouringRef.current = true
    setMode("touring")
    setBubbleOpen(true)
    goToStep(0)
  }, [goToStep])

  const skipTour = useCallback(() => {
    abortRef.current?.abort()
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
    setQaText("")
    setIsStreaming(true)
    const nextHist: Message[] = [...qaHistory, { role: "user", content: q }]
    setQaHistory(nextHist)
    try {
      const res = await fetch("/api/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextHist }),
      })
      if (!res.body) throw new Error()
      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let buf = "", full = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split("\n"); buf = lines.pop() ?? ""
        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith("data: ")) continue
          const data = trimmed.slice(6)
          if (data === "[DONE]") break
          try {
            const tok = JSON.parse(data)?.choices?.[0]?.delta?.content ?? ""
            if (tok) { full += tok; setQaText(full) }
          } catch { /* skip */ }
        }
      }
      setQaHistory(h => [...h, { role: "assistant", content: full }])
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
          <RobotSVG isThinking={isStreaming || isTourStreaming} />
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
                {typeText || (isTourStreaming && <span className="animate-pulse text-muted-foreground/40">thinking…</span>)}
                {isTourStreaming && (
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
