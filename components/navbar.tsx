"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"
import MobileNav from "@/components/mobile-nav"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
  { name: "Blog", href: "/blog" },
  { name: "Freelance", href: "/freelance" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight text-foreground hover:opacity-70 transition-opacity">
            {personalInfo.name}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/projects"
            className="hidden md:inline-flex text-[13px] px-4 py-1.5 border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
          >
            View Work
          </Link>
        </div>
      </header>
      <MobileNav />
    </>
  )
}
