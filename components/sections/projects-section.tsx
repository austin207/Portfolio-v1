import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import ProjectCard from "@/components/project-card"

export default function ProjectsSection() {
  const featuredProjects = [
    {
      title: "AI/ML Language Model Prototyping",
      description:
        "Built an RNN-based text generator, then developed MiniGPT from scratch for modest hardware. Currently building a scalable LLaMA-like transformer model.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["PyTorch", "NLP", "Transformers", "RNN", "LLaMA"],
      github: "https://github.com/austin207/Transformer-Virtue-v2.git",
      projectUrl: "/projects/ai-ml-language-models",
    },
    {
      title: "Ambulance Traffic Reduction System",
      description:
        "Developed an Arduino Mega-based prototype with RF modules for real-time traffic monitoring, integrating RF signal validation and Dijkstra's algorithm.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Arduino", "RF Modules", "Algorithms", "Embedded Systems"],
      projectUrl: "/projects/ambulance-traffic-system",
    },
    {
      title: "Computer Vision Implementation",
      description:
        "Built a face recognition system using OpenCV in Python and an object classification system with GoogLeNet TL in MATLAB.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["OpenCV", "Python", "MATLAB", "GoogLeNet", "Computer Vision"],
      projectUrl: "/projects/computer-vision",
    },
    {
      title: "IoT Home Automation System",
      description:
        "Designed a home automation system with NodeMCU ESP8266, relay modules, Blynk, and IFTTT, enabling mobile control and Google Assistant voice commands.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["IoT", "ESP8266", "Blynk", "IFTTT", "Home Automation"],
      projectUrl: "/projects/iot-home-automation",
    },
    {
      title: "Dual Axis Solar Tracker",
      description:
        "Developed a solar energy optimization prototype using microcontrollers, servo motors, and an LDR array for real-time sun tracking with closed-loop control.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Solar Energy", "Microcontrollers", "Servo Motors", "Control Systems"],
      projectUrl: "/projects/solar-tracker",
    },
    {
      title: "Wi-Fi Range Extension System",
      description:
        "Developed a custom Wi-Fi repeater using Raspberry Pi 4B with adaptive channel management, enhancing range and mimicking mesh network functionality.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Raspberry Pi", "Networking", "Wi-Fi", "Linux"],
      projectUrl: "/projects/wifi-range-extension",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 md:px-6 bg-gray-900/50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600">
              View All Projects <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
