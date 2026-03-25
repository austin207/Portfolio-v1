"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Freelance", href: "/freelance" },
  { name: "Timeline", href: "/timeline" },
  { name: "Certificates", href: "/certificates" },
  { name: "Skills", href: "/skills-path" },
  { name: "Contact", href: "/#contact" },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center text-foreground"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col justify-center px-8">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-2xl font-medium text-foreground hover:opacity-50 transition-opacity border-b border-border"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <p className="mt-12 font-mono text-[11px] text-muted-foreground">{personalInfo.name}</p>
        </div>
      )}
    </div>
  )
}
