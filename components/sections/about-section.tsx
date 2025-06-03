import { Calendar, MapPin, Mail, Github, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"

export default function AboutSection() {
  const interests = [
    "Robotics and automation",
    "AI and ML research",
    "VLSI chip designing",
    "Algorithm Design",
    "Electronic circuits",
    "Developer platforms",
  ]

  return (
    <section id="about" className="py-20 px-4 md:px-6 bg-gray-900/50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Personal Info</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>{personalInfo.birthDate}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{personalInfo.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{socialLinks.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-gray-400" />
                  <Link href={socialLinks.github} className="hover:text-cyan-400 transition-colors">
                    GitHub Profile
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-gray-400" />
                  <Link href={socialLinks.linkedin} className="hover:text-cyan-400 transition-colors">
                    LinkedIn Profile
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 30 30" fill="currentColor">
                    <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
                  </svg>
                  <Link href={socialLinks.twitter} className="hover:text-cyan-400 transition-colors">
                    X Profile
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-gray-400" />
                  <Link href={socialLinks.instagram} className="hover:text-cyan-400 transition-colors">
                    Instagram Profile
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                  <Link href={socialLinks.medium} className="hover:text-cyan-400 transition-colors">
                    Medium Profile
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 md:col-span-2">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Profile</h3>
              <p className="text-gray-300 leading-relaxed">
                Applied Electronics & Instrumentation Engineering undergraduate at Rajagiri School of Engineering and
                Technology with 3 years of experience in hardware design, embedded systems, software development, and
                VLSI, delivering 15+ projects in embedded C, Python, AI/ML, and IoT.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                Founder of VirtusCo, a robotics-focused tech startup, with expertise in circuit design, microcontroller
                programming, and innovative electronics engineering solutions.
              </p>
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-3 text-purple-400">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} className="bg-gray-700 hover:bg-gray-600 text-white">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
