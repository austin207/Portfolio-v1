"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Home } from "lucide-react"
import ProjectSearch from "@/components/project-search"
import { useState } from "react"

const ProjectsPage = () => {
  const projects = [
    {
      id: "ai-ml-language-models",
      title: "AI/ML Language Model Prototyping",
      description:
        "Built an RNN-based text generator, then developed MiniGPT from scratch for modest hardware. Currently building a scalable LLaMA-like transformer model.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["PyTorch", "NLP", "Transformers", "RNN", "LLaMA"],
      status: "In Progress",
      duration: "April 2025 - Present",
      category: "AI/ML",
    },
    {
      id: "ambulance-traffic-system",
      title: "Ambulance Traffic Reduction System",
      description:
        "Developed an Arduino Mega-based prototype with RF modules for real-time traffic monitoring, integrating RF signal validation and Dijkstra's algorithm.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Arduino", "RF Modules", "Algorithms", "Embedded Systems"],
      status: "Completed",
      duration: "6 months",
      category: "Embedded Systems",
    },
    {
      id: "computer-vision",
      title: "Computer Vision Implementation",
      description:
        "Built a face recognition system using OpenCV in Python and an object classification system with GoogLeNet TL in MATLAB.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["OpenCV", "Python", "MATLAB", "GoogLeNet", "Computer Vision"],
      status: "Completed",
      duration: "4 months",
      category: "AI/ML",
    },
    {
      id: "iot-home-automation",
      title: "IoT Home Automation System",
      description:
        "Designed a home automation system with NodeMCU ESP8266, relay modules, Blynk, and IFTTT, enabling mobile control and Google Assistant voice commands.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["IoT", "ESP8266", "Blynk", "IFTTT", "Home Automation"],
      status: "Completed",
      duration: "3 months",
      category: "IoT",
    },
    {
      id: "solar-tracker",
      title: "Dual Axis Solar Tracker",
      description:
        "Developed a solar energy optimization prototype using microcontrollers, servo motors, and an LDR array for real-time sun tracking with closed-loop control.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Solar Energy", "Microcontrollers", "Servo Motors", "Control Systems"],
      status: "Completed",
      duration: "5 months",
      category: "Automation",
    },
    {
      id: "wifi-range-extension",
      title: "Wi-Fi Range Extension System",
      description:
        "Developed a custom Wi-Fi repeater using Raspberry Pi 4B with adaptive channel management, enhancing range and mimicking mesh network functionality.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Raspberry Pi", "Networking", "Wi-Fi", "Linux"],
      status: "Completed",
      duration: "2 months",
      category: "Networking",
    },
  ]

  const [filteredProjects, setFilteredProjects] = useState(projects)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="mb-8">
        <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            All Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Explore my complete portfolio of projects spanning AI/ML, embedded systems, IoT, automation, and more.
          </p>
        </div>

        <ProjectSearch projects={projects} onFilteredProjects={setFilteredProjects} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden bg-gray-800/50 border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 z-20">
                  <Badge
                    className={
                      project.status === "Completed"
                        ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                        : "bg-amber-950/80 text-amber-400 border-amber-800"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-purple-950/30 text-purple-400 border-purple-800">
                    {project.category}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-cyan-400">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs">
                      +{project.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <Link href={`/projects/${project.id}`}>
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-medium">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default ProjectsPage
