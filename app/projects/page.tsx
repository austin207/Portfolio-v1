"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Home, Code, ExternalLink } from "lucide-react"
import ProjectSearch from "@/components/project-search"
import { useState } from "react"
import Image from "next/image"

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

  const getStatusColor = (status: string) => {
    return status === "Completed"
      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-300 group"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 glass-card rounded-full mb-6">
              <Code className="h-8 w-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
              My Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore my complete portfolio of projects spanning AI/ML, embedded systems, IoT, automation, and more.
              Each project showcases innovation, technical expertise, and problem-solving capabilities.
            </p>
          </div>

          {/* Search and Filter Component */}
          <ProjectSearch projects={projects} onFilteredProjects={setFilteredProjects} />

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="group rounded-2xl glass-card-hover gradient-border transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards"
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-background/60" />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-cyan-400 transition-colors duration-300 leading-tight tracking-tight">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Calendar className="h-3 w-3 text-cyan-400/40" />
                    <span>{project.duration}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Button
                    className="w-full border border-white/[0.06] text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 rounded-full transition-all duration-300 group bg-transparent"
                    variant="outline"
                    asChild
                  >
                    <Link href={`/projects/${project.id}`}>
                      <span className="flex items-center justify-center gap-2">
                        View Details
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center p-4 glass-card rounded-full mb-6">
                <Code className="h-12 w-12 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 tracking-tight">
                No projects found matching your criteria
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to discover more projects.
              </p>
              <Button
                variant="outline"
                onClick={() => setFilteredProjects(projects)}
                className="border-white/[0.06] text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 rounded-full"
              >
                Show All Projects
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default ProjectsPage
