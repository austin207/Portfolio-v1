"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

export function useReveal(threshold = 0.1): { ref: RefObject<HTMLDivElement | null>; visible: boolean } {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}
