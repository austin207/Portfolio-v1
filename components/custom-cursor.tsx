"use client"

import { useEffect, useRef, useCallback } from "react"

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const state = useRef<"default" | "hover" | "click" | "text">("default")
  const scale = useRef(1)
  const targetScale = useRef(1)
  const opacity = useRef(1)
  const targetOpacity = useRef(1)
  const trail = useRef<{ x: number; y: number; age: number }[]>([])
  const isVisible = useRef(true)
  const rafId = useRef<number>(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
      ctx.scale(dpr, dpr)
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    if (!isVisible.current) {
      rafId.current = requestAnimationFrame(draw)
      return
    }

    // Smooth follow
    const speed = state.current === "hover" ? 0.06 : 0.12
    pos.current.x += (mouse.current.x - pos.current.x) * speed
    pos.current.y += (mouse.current.y - pos.current.y) * speed

    // Smooth scale
    scale.current += (targetScale.current - scale.current) * 0.12
    opacity.current += (targetOpacity.current - opacity.current) * 0.15

    // Trail
    trail.current.unshift({ x: mouse.current.x, y: mouse.current.y, age: 0 })
    if (trail.current.length > 16) trail.current.pop()
    trail.current.forEach((p) => (p.age += 1))

    const px = pos.current.x
    const py = pos.current.y
    const mx = mouse.current.x
    const my = mouse.current.y
    const s = scale.current
    const o = opacity.current

    // Draw trail
    if (state.current === "default" || state.current === "hover") {
      for (let i = 1; i < trail.current.length; i++) {
        const p = trail.current[i]
        const alpha = (1 - p.age / 16) * 0.06 * o
        if (alpha <= 0) continue
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }
    }

    // Ring
    if (state.current === "text") {
      // Text cursor: vertical bar
      ctx.save()
      ctx.globalAlpha = o * 0.7
      ctx.fillStyle = "#ededed"
      ctx.fillRect(px - 1, py - 14, 2, 28)
      ctx.restore()
    } else {
      // Outer ring
      const ringSize = state.current === "hover" ? 36 * s : state.current === "click" ? 18 * s : 22 * s
      ctx.beginPath()
      ctx.arc(px, py, ringSize, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255, 255, 255, ${state.current === "hover" ? 0.4 * o : state.current === "click" ? 0.6 * o : 0.2 * o})`
      ctx.lineWidth = state.current === "click" ? 2 : 1
      ctx.stroke()

      // Fill on hover
      if (state.current === "hover") {
        ctx.beginPath()
        ctx.arc(px, py, ringSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.03 * o})`
        ctx.fill()

        // Rotating dashes on hover
        const time = Date.now() * 0.001
        ctx.save()
        ctx.translate(px, py)
        ctx.rotate(time * 0.8)
        ctx.setLineDash([4, 8])
        ctx.beginPath()
        ctx.arc(0, 0, ringSize + 6, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * o})`
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()
      }
    }

    // Dot
    if (state.current !== "text") {
      const dotSize = state.current === "hover" ? 4 * s : state.current === "click" ? 3 * s : 6 * s
      ctx.beginPath()
      ctx.arc(mx, my, dotSize, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${o})`
      ctx.fill()
    }

    rafId.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    // Check for touch device
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches
    if (isTouch) return

    draw()

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const onMouseDown = () => {
      state.current = "click"
      targetScale.current = 0.7
    }

    const onMouseUp = () => {
      targetScale.current = 1
      state.current = document.querySelector(":hover")?.matches("a, button, [role='button'], [data-cursor-hover]") ? "hover" : "default"
    }

    const onEnterClickable = () => {
      state.current = "hover"
      targetScale.current = 1.2
    }

    const onLeaveClickable = () => {
      state.current = "default"
      targetScale.current = 1
    }

    const onEnterText = () => {
      state.current = "text"
    }

    const onLeaveText = () => {
      state.current = "default"
    }

    const onLeaveWindow = () => {
      isVisible.current = false
      targetOpacity.current = 0
    }

    const onEnterWindow = () => {
      isVisible.current = true
      targetOpacity.current = 1
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseleave", onLeaveWindow)
    document.addEventListener("mouseenter", onEnterWindow)

    const clickableSelector = "a, button, [role='button'], [data-cursor-hover]"
    const textSelector = "input, textarea"

    const attachListeners = () => {
      document.querySelectorAll(clickableSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterClickable)
        el.removeEventListener("mouseleave", onLeaveClickable)
        el.addEventListener("mouseenter", onEnterClickable)
        el.addEventListener("mouseleave", onLeaveClickable)
      })
      document.querySelectorAll(textSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterText)
        el.removeEventListener("mouseleave", onLeaveText)
        el.addEventListener("mouseenter", onEnterText)
        el.addEventListener("mouseleave", onLeaveText)
      })
    }

    attachListeners()
    const observer = new MutationObserver(() => attachListeners())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseleave", onLeaveWindow)
      document.removeEventListener("mouseenter", onEnterWindow)
      observer.disconnect()
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{ mixBlendMode: "difference" }}
    />
  )
}
