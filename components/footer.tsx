import { Github, Linkedin, Mail, Instagram } from "lucide-react"
import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"

export default function Footer() {
  return (
    <footer className="py-8 px-4 md:px-6 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href={socialLinks.github} className="text-gray-400 hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link href={socialLinks.linkedin} className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href={socialLinks.twitter} className="text-gray-400 hover:text-white transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 30 30" fill="currentColor">
              <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
            </svg>
          </Link>
          <Link href={socialLinks.instagram} className="text-gray-400 hover:text-white transition-colors">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href={socialLinks.medium} className="text-gray-400 hover:text-white transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </Link>
          <Link href={`mailto:${socialLinks.email}`} className="text-gray-400 hover:text-white transition-colors">
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
