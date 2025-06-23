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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "AI/ML": "bg-purple-500/20 text-purple-300 border-purple-400/50",
      "Embedded Systems": "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
      "IoT": "bg-blue-500/20 text-blue-300 border-blue-400/50",
      "Automation": "bg-amber-500/20 text-amber-300 border-amber-400/50",
      "Networking": "bg-cyan-500/20 text-cyan-300 border-cyan-400/50",
    }
    return colors[category] || "bg-gray-500/20 text-gray-300 border-gray-400/50"
  }

  const getStatusColor = (status: string) => {
    return status === "Completed" 
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50"
      : "bg-amber-500/20 text-amber-300 border-amber-400/50"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-purple-900/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
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
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full mb-6">
              <Code className="h-8 w-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                My Projects
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
                className="group bg-gray-800/40 backdrop-blur-md border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 rounded-2xl overflow-hidden"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={`${getStatusColor(project.status)} shadow-lg`}>
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(project.category)}>
                      {project.category}
                    </Badge>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Calendar className="h-3 w-3" />
                    <span>{project.duration}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary" 
                        className="text-xs bg-gray-700/50 text-gray-300 border-gray-600/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs text-purple-400 border-purple-500/50">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 text-cyan-300 hover:text-white transition-all duration-300 group"
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
              <div className="inline-flex items-center justify-center p-4 bg-gray-800/50 rounded-full mb-6">
                <Code className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                No projects found matching your criteria
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to discover more projects.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setFilteredProjects(projects)}
                className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white"
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

        .bg-grid-white\/\[0\.02\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.02)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }

        .bg-grid-16 {
          background-size: 16px 16px;
        }
      `}</style>
    </div>
  )
}

export default ProjectsPage
