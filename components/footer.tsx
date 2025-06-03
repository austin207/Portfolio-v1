import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"

export default function Footer() {
  return (
    <footer className="py-8 px-4 md:px-6 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href={personalInfo.github} className="text-gray-400 hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link href={personalInfo.linkedin} className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-white transition-colors">
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
