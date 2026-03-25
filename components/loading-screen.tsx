"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [phase, setPhase] = useState(0) // 0: black, 1: text, 2: scroll-up, 3: done

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const t0 = setTimeout(() => setPhase(1), 500)
    const t1 = setTimeout(() => setPhase(2), 2800)
    const t2 = setTimeout(() => {
      setPhase(3)
      document.body.style.overflow = ""
    }, 3600)
    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2)
      document.body.style.overflow = ""
    }
  }, [])

  if (phase === 3) return null

  const name = "ANTONY AUSTIN"

  return (
    <div
      className={`fixed inset-0 z-[100000] bg-black flex items-center justify-center ${
        phase === 2 ? "loader-exit" : ""
      }`}
    >
      <div className={`relative z-10 flex flex-col items-center transition-opacity duration-300 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}>
        <div className="flex overflow-hidden">
          {name.split("").map((char, i) => (
            <span
              key={i}
              className="text-[clamp(1.2rem,3.5vw,2.8rem)] font-bold tracking-[0.25em] text-white"
              style={{
                animation: phase >= 1 ? `letterReveal 0.5s ease-out ${i * 0.05 + 0.1}s both` : "none",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        <div
          className="h-px bg-white/80 mt-5"
          style={{ animation: phase >= 1 ? "lineGrow 0.8s ease-out 1s both" : "none", width: 0 }}
        />

        <p
          className="font-mono text-[10px] text-white/40 uppercase tracking-[0.4em] mt-5"
          style={{ animation: phase >= 1 ? "fadeUp 0.5s ease-out 1.5s both" : "none", opacity: 0 }}
        >
          Engineer · Builder · Creator
        </p>

      </div>

      <style jsx>{`
        @keyframes letterReveal {
          from { opacity: 0; transform: translateY(110%) rotateX(-50deg); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to { width: 140px; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .loader-exit {
          animation: scrollUp 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes scrollUp {
          to { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  )
}
