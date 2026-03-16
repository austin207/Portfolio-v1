"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const firstFocusableRef = useRef<HTMLAnchorElement>(null)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Timeline", href: "/timeline" },
    { name: "Certificates", href: "/certificates" },
    { name: "Freelance", href: "/freelance" },
    { name: "Contact", href: "/#contact" },
    { name: "Skills Path", href: "/skills-path" },
  ]

  const socialIcons = [
    { name: "GitHub", href: socialLinks.github, icon: Github },
    { name: "LinkedIn", href: socialLinks.linkedin, icon: Linkedin },
    { name: "Twitter", href: socialLinks.twitter, icon: Twitter },
    { name: "Instagram", href: socialLinks.instagram, icon: Instagram },
  ]

  const toggleMenu = () => {
    if (isAnimating) return

    setIsAnimating(true)
    const newIsOpen = !isOpen

    setIsOpen(newIsOpen)
    document.body.style.overflow = newIsOpen ? "hidden" : "auto"

    if (newIsOpen) {
      setTimeout(() => {
        firstFocusableRef.current?.focus()
        setIsAnimating(false)
      }, 300)
    } else {
      toggleButtonRef.current?.focus()
      setIsAnimating(false)
    }
  }

  const closeMenu = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setIsOpen(false)
    document.body.style.overflow = "auto"

    setTimeout(() => {
      toggleButtonRef.current?.focus()
      setIsAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeMenu()
      }
    }

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!isOpen || event.key !== "Tab") return

      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )

      if (!focusableElements || focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("keydown", handleFocusTrap)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("keydown", handleFocusTrap)
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="md:hidden">
      <Button
        ref={toggleButtonRef}
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 w-10 h-10 bg-background/80 hover:bg-background text-foreground backdrop-blur-xl border border-white/[0.06] rounded-full transition-all duration-200"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        disabled={isAnimating}
      >
        <div className="relative w-5 h-5">
          <Menu
            className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
              isOpen ? "opacity-0 rotate-180 scale-50" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-50"
            }`}
          />
        </div>
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed inset-y-0 right-0 w-72 max-w-[80vw] bg-background/95 backdrop-blur-2xl border-l border-white/[0.06] z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/[0.06]">
            <Link
              ref={firstFocusableRef}
              href="/"
              onClick={closeMenu}
              className="text-lg font-bold text-foreground"
              id="mobile-menu-title"
            >
              {personalInfo.name.split(" ")[0]}
              <span className="text-cyan-400">.</span>
            </Link>
          </div>

          <nav className="flex-1" role="navigation" aria-label="Main navigation">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-cyan-400 hover:bg-white/[0.04] rounded-lg transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-6 border-t border-white/[0.06]">
            <p className="text-[10px] font-mono text-cyan-400/50 mb-4 uppercase tracking-wider">
              Connect
            </p>
            <div className="flex gap-3">
              {socialIcons.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-300"
                  aria-label={`Visit ${name} profile`}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
