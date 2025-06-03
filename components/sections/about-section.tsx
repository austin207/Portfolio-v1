import { Calendar, MapPin, Mail, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { personalInfo } from "@/lib/data/sections"

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
                  <span>{personalInfo.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-gray-400" />
                  <Link href={personalInfo.github} className="hover:text-cyan-400 transition-colors">
                    GitHub Profile
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-gray-400" />
                  <Link href={personalInfo.linkedin} className="hover:text-cyan-400 transition-colors">
                    LinkedIn Profile
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
