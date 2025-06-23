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
    { name: "Contact", href: "/#contact" },
    { name: "Skills Path", href: "/skills-path" },
  ]

  const socialIcons = [
    { name: "GitHub", href: socialLinks.github, icon: Github },
    { name: "LinkedIn", href: socialLinks.linkedin, icon: Linkedin },
    { name: "Twitter", href: socialLinks.twitter, icon: Twitter },
    { name: "Instagram", href: socialLinks.instagram, icon: Instagram },
  ]

  // Fixed toggle function with proper state handling
  const toggleMenu = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const newIsOpen = !isOpen
    
    setIsOpen(newIsOpen)
    
    // Fix: Use the new state value directly instead of current state
    document.body.style.overflow = newIsOpen ? "hidden" : "auto"
    
    // Focus management
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

  // Handle escape key
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="md:hidden">
      {/* Enhanced toggle button with proper accessibility */}
      <Button
        ref={toggleButtonRef}
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-gray-800/90 hover:bg-gray-700/90 text-white backdrop-blur-md border border-gray-700/50 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        disabled={isAnimating}
      >
        <div className="relative w-6 h-6">
          <Menu 
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              isOpen ? "opacity-0 rotate-180 scale-50" : "opacity-100 rotate-0 scale-100"
            }`} 
          />
          <X 
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-50"
            }`} 
          />
        </div>
      </Button>

      {/* Enhanced overlay with backdrop blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Enhanced mobile menu with improved animations */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-purple-900/20 pointer-events-none" />
        
        <div className="relative flex flex-col h-full p-6">
          {/* Header with enhanced styling */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700/50">
            <Link 
              ref={firstFocusableRef}
              href="/" 
              onClick={closeMenu} 
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-purple-300 transition-all duration-300"
              id="mobile-menu-title"
            >
              {personalInfo.name}
            </Link>
          </div>

          {/* Enhanced navigation with better spacing and animations */}
          <nav className="flex-1" role="navigation" aria-label="Main navigation">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block px-4 py-3 text-lg font-medium text-white/90 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 group`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isOpen ? "slideInRight 0.4s ease-out forwards" : "none"
                    }}
                  >
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Enhanced social links section */}
          <div className="mt-auto pt-6 border-t border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialIcons.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-600/50 group min-h-[48px]"
                  aria-label={`Visit ${name} profile`}
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">{name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced animations */}
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
