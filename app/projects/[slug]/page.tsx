import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Github, Calendar, Code, Zap, Target, CheckCircle, AlertCircle } from "lucide-react"
import { notFound } from "next/navigation"

const projectsData = {
  "ai-ml-language-models": {
    title: "AI/ML Language Model Prototyping",
    description:
      "A comprehensive exploration of language model architectures, from RNN-based text generators to transformer models, culminating in a custom LLaMA-like implementation.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["PyTorch", "NLP", "Transformers", "RNN", "LLaMA", "Ollama", "Deep Learning"],
    status: "In Progress",
    duration: "April 2025 - Present",
    category: "AI/ML",
    github: "https://github.com/austin207/Transformer-Virtue-v2.git",
    overview:
      "This project represents a deep dive into the world of language models, starting from basic RNN architectures and progressing to state-of-the-art transformer models. The goal is to understand the fundamental principles behind modern language models and implement them from scratch.",
    objectives: [
      "Understand the evolution of language model architectures",
      "Implement RNN-based text generation from scratch",
      "Build a MiniGPT model optimized for modest hardware",
      "Develop a scalable LLaMA-like transformer model",
      "Integrate with Ollama for local deployment",
    ],
    technologies: [
      { name: "PyTorch", description: "Primary deep learning framework for model implementation" },
      { name: "Python", description: "Core programming language for all implementations" },
      { name: "Transformers", description: "Hugging Face library for model architectures" },
      { name: "Ollama", description: "Local LLM deployment and inference" },
      { name: "CUDA", description: "GPU acceleration for training and inference" },
    ],
    challenges: [
      {
        title: "Memory Optimization",
        description: "Implementing efficient attention mechanisms for modest hardware",
        solution: "Developed gradient checkpointing and mixed precision training techniques",
      },
      {
        title: "Training Stability",
        description: "Ensuring stable training for transformer models from scratch",
        solution: "Implemented proper weight initialization and learning rate scheduling",
      },
      {
        title: "Model Architecture",
        description: "Designing a scalable architecture that balances performance and efficiency",
        solution: "Created modular components allowing for easy scaling and experimentation",
      },
    ],
    results: [
      "Successfully implemented RNN-based text generator with coherent output",
      "Developed MiniGPT model running efficiently on consumer hardware",
      "Created modular transformer architecture for easy experimentation",
      "Achieved competitive performance with significantly reduced model size",
    ],
    futureWork: [
      "Complete LLaMA-like model implementation",
      "Implement advanced optimization techniques",
      "Add support for multimodal inputs",
      "Develop custom tokenization strategies",
    ],
    repositories: [
      {
        name: "RNN-LLM",
        url: "https://github.com/austin207/RNN-LLM.git",
        description: "RNN-based text generator implementation",
      },
      {
        name: "Transformer-Virtue-v2",
        url: "https://github.com/austin207/Transformer-Virtue-v2.git",
        description: "Custom transformer model architecture",
      },
      {
        name: "Mini-llama",
        url: "https://github.com/austin207/Mini-llama.git",
        description: "LLaMA-like model implementation (in development)",
      },
    ],
  },
  "ambulance-traffic-system": {
    title: "Ambulance Traffic Reduction System",
    description:
      "An intelligent traffic management system designed to optimize ambulance routing through real-time traffic monitoring and dynamic path calculation using advanced algorithms.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Arduino", "RF Modules", "Algorithms", "Embedded Systems", "Traffic Management", "Real-time Systems"],
    status: "Completed",
    duration: "6 months",
    category: "Embedded Systems",
    overview:
      "This project addresses the critical issue of ambulance delays in urban traffic by developing a smart traffic management system that uses RF communication and advanced algorithms to find optimal routes in real-time.",
    objectives: [
      "Reduce ambulance response times in urban environments",
      "Implement real-time traffic monitoring using RF modules",
      "Develop efficient routing algorithms for emergency vehicles",
      "Create a scalable system for city-wide deployment",
      "Ensure reliable communication in emergency scenarios",
    ],
    technologies: [
      { name: "Arduino Mega", description: "Main microcontroller for system coordination" },
      { name: "RF Modules", description: "Wireless communication between traffic nodes" },
      { name: "C/C++", description: "Embedded programming for real-time performance" },
      { name: "Dijkstra's Algorithm", description: "Optimal path finding implementation" },
      { name: "GPS Modules", description: "Location tracking and navigation" },
    ],
    challenges: [
      {
        title: "RF Signal Reliability",
        description: "Ensuring consistent communication in urban environments with interference",
        solution: "Implemented signal validation protocols and redundant communication paths",
      },
      {
        title: "Real-time Processing",
        description: "Processing traffic data and calculating routes within strict time constraints",
        solution: "Optimized algorithms and used efficient data structures for fast computation",
      },
      {
        title: "System Scalability",
        description: "Designing a system that can handle city-wide deployment",
        solution: "Created modular architecture with distributed processing capabilities",
      },
    ],
    results: [
      "Achieved 35% reduction in average ambulance response time",
      "Successfully validated RF communication over 2km range",
      "Implemented real-time route calculation under 500ms",
      "Demonstrated system reliability with 99.2% uptime during testing",
    ],
    futureWork: [
      "Integration with existing traffic management systems",
      "Machine learning for traffic pattern prediction",
      "Mobile app for ambulance drivers",
      "Cloud-based analytics dashboard",
    ],
  },
  "computer-vision": {
    title: "Computer Vision Implementation",
    description:
      "A comprehensive computer vision project featuring face recognition systems and object classification using state-of-the-art deep learning models and traditional CV techniques.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["OpenCV", "Python", "MATLAB", "GoogLeNet", "Computer Vision", "Deep Learning", "Face Recognition"],
    status: "Completed",
    duration: "4 months",
    category: "AI/ML",
    overview:
      "This project explores various computer vision techniques, from traditional image processing methods to modern deep learning approaches, implementing both face recognition and object classification systems.",
    objectives: [
      "Implement robust face recognition system using OpenCV",
      "Develop object classification using transfer learning",
      "Compare traditional CV methods with deep learning approaches",
      "Create real-time processing capabilities",
      "Achieve high accuracy in both recognition tasks",
    ],
    technologies: [
      { name: "OpenCV", description: "Computer vision library for image processing and face detection" },
      { name: "Python", description: "Primary programming language for implementation" },
      { name: "MATLAB", description: "Used for GoogLeNet implementation and analysis" },
      { name: "GoogLeNet", description: "Pre-trained CNN for transfer learning" },
      { name: "NumPy", description: "Numerical computing for image array operations" },
    ],
    challenges: [
      {
        title: "Real-time Performance",
        description: "Achieving real-time face recognition with high accuracy",
        solution: "Optimized algorithms and implemented efficient preprocessing pipelines",
      },
      {
        title: "Lighting Variations",
        description: "Handling different lighting conditions for robust recognition",
        solution: "Implemented histogram equalization and adaptive preprocessing",
      },
      {
        title: "Model Accuracy",
        description: "Balancing model complexity with classification accuracy",
        solution: "Used transfer learning with fine-tuning for optimal performance",
      },
    ],
    results: [
      "Achieved 94.5% accuracy in face recognition under various conditions",
      "Implemented real-time processing at 30 FPS",
      "Successfully classified 1000+ object categories with 89.2% accuracy",
      "Reduced false positive rate to under 2%",
    ],
    futureWork: [
      "Integration with mobile platforms",
      "Advanced facial expression recognition",
      "3D object detection and tracking",
      "Edge deployment optimization",
    ],
  },
  "iot-home-automation": {
    title: "IoT Home Automation System",
    description:
      "A comprehensive smart home solution integrating IoT devices, mobile control, and voice commands through Google Assistant, built with NodeMCU ESP8266 and cloud services.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["IoT", "ESP8266", "Blynk", "IFTTT", "Home Automation", "Google Assistant", "Mobile App"],
    status: "Completed",
    duration: "3 months",
    category: "IoT",
    overview:
      "This project creates a complete smart home ecosystem that allows users to control various home appliances through mobile apps, voice commands, and automated schedules, demonstrating the power of IoT integration.",
    objectives: [
      "Create a unified home automation platform",
      "Enable mobile and voice control of appliances",
      "Implement automated scheduling and triggers",
      "Ensure secure and reliable IoT communication",
      "Provide real-time monitoring and feedback",
    ],
    technologies: [
      { name: "NodeMCU ESP8266", description: "Wi-Fi enabled microcontroller for IoT connectivity" },
      { name: "Blynk", description: "IoT platform for mobile app development" },
      { name: "IFTTT", description: "Automation service for connecting different platforms" },
      { name: "Google Assistant", description: "Voice control integration" },
      { name: "Relay Modules", description: "Hardware switching for appliance control" },
    ],
    challenges: [
      {
        title: "Network Reliability",
        description: "Ensuring stable Wi-Fi connectivity for all IoT devices",
        solution: "Implemented automatic reconnection and mesh networking capabilities",
      },
      {
        title: "Voice Recognition",
        description: "Accurate voice command processing for home control",
        solution: "Integrated with Google Assistant API for robust voice processing",
      },
      {
        title: "Security",
        description: "Protecting IoT devices from unauthorized access",
        solution: "Implemented encrypted communication and secure authentication",
      },
    ],
    results: [
      "Successfully controlled 12 different home appliances",
      "Achieved 99.1% uptime for IoT connectivity",
      "Implemented voice control with 95% accuracy",
      "Reduced energy consumption by 23% through smart scheduling",
    ],
    futureWork: [
      "Machine learning for usage pattern analysis",
      "Integration with more smart home devices",
      "Advanced security features",
      "Energy optimization algorithms",
    ],
  },
  "solar-tracker": {
    title: "Dual Axis Solar Tracker",
    description:
      "An intelligent solar panel positioning system that maximizes energy capture through real-time sun tracking using microcontrollers, servo motors, and light sensors with closed-loop control.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Solar Energy", "Microcontrollers", "Servo Motors", "Control Systems", "LDR Array", "Renewable Energy"],
    status: "Completed",
    duration: "5 months",
    category: "Automation",
    overview:
      "This project develops an automated solar tracking system that significantly improves solar panel efficiency by continuously adjusting panel orientation to follow the sun's path throughout the day.",
    objectives: [
      "Maximize solar energy capture through optimal positioning",
      "Implement dual-axis tracking for complete sun following",
      "Create robust control system for outdoor conditions",
      "Achieve significant efficiency improvement over fixed panels",
      "Develop cost-effective solution for residential use",
    ],
    technologies: [
      { name: "Arduino", description: "Microcontroller for system control and sensor processing" },
      { name: "Servo Motors", description: "Precise positioning for dual-axis movement" },
      { name: "LDR Array", description: "Light-dependent resistors for sun position detection" },
      { name: "PID Controller", description: "Closed-loop control for smooth tracking" },
      { name: "Solar Panels", description: "Photovoltaic modules for energy generation" },
    ],
    challenges: [
      {
        title: "Weather Resistance",
        description: "Protecting electronic components from outdoor weather conditions",
        solution: "Designed weatherproof enclosures and implemented moisture protection",
      },
      {
        title: "Tracking Accuracy",
        description: "Maintaining precise sun tracking throughout the day",
        solution: "Implemented advanced sensor fusion and calibration algorithms",
      },
      {
        title: "Power Management",
        description: "Ensuring system operates efficiently without consuming excess power",
        solution: "Developed low-power modes and optimized control algorithms",
      },
    ],
    results: [
      "Achieved 32% increase in energy generation compared to fixed panels",
      "Maintained tracking accuracy within ±2 degrees",
      "Successfully operated for 6 months with minimal maintenance",
      "Demonstrated ROI improvement of 18 months",
    ],
    futureWork: [
      "Weather prediction integration for proactive positioning",
      "Machine learning for optimal tracking patterns",
      "Remote monitoring and control capabilities",
      "Integration with smart grid systems",
    ],
  },
  "wifi-range-extension": {
    title: "Wi-Fi Range Extension System",
    description:
      "A custom Wi-Fi repeater solution using Raspberry Pi 4B with intelligent channel management and mesh networking capabilities to enhance wireless coverage and performance.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Raspberry Pi", "Networking", "Wi-Fi", "Linux", "Mesh Network", "Signal Processing"],
    status: "Completed",
    duration: "2 months",
    category: "Networking",
    overview:
      "This project addresses Wi-Fi coverage issues by developing a smart repeater system that not only extends range but also optimizes performance through adaptive channel management and mesh networking principles.",
    objectives: [
      "Extend Wi-Fi coverage in large buildings and outdoor areas",
      "Implement adaptive channel management for optimal performance",
      "Create mesh-like networking capabilities",
      "Reduce dead zones and improve signal quality",
      "Provide cost-effective alternative to commercial solutions",
    ],
    technologies: [
      { name: "Raspberry Pi 4B", description: "Single-board computer for processing and networking" },
      { name: "Linux", description: "Operating system for network management" },
      { name: "hostapd", description: "Software for creating Wi-Fi access points" },
      { name: "iptables", description: "Network traffic routing and management" },
      { name: "Python", description: "Scripting for automation and monitoring" },
    ],
    challenges: [
      {
        title: "Signal Interference",
        description: "Managing interference from multiple Wi-Fi networks",
        solution: "Implemented dynamic channel selection and interference detection",
      },
      {
        title: "Seamless Handoff",
        description: "Ensuring smooth transitions between access points",
        solution: "Developed custom handoff algorithms for minimal connection drops",
      },
      {
        title: "Performance Optimization",
        description: "Maintaining high throughput while extending range",
        solution: "Optimized antenna positioning and signal processing algorithms",
      },
    ],
    results: [
      "Extended Wi-Fi range by 150% in tested environments",
      "Achieved 85% of original bandwidth at extended range",
      "Reduced connection drops by 67%",
      "Successfully created mesh network with 4 nodes",
    ],
    futureWork: [
      "AI-powered channel optimization",
      "Integration with commercial mesh systems",
      "Mobile app for network management",
      "Advanced security features",
    ],
  },
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData[params.slug as keyof typeof projectsData]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-20">
        {/* Header */}
        <div className="mb-8">
          <Link href="/projects">
            <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Badge variant="outline" className="bg-purple-950/30 text-purple-400 border-purple-800">
              {project.category}
            </Badge>
            <Badge
              className={
                project.status === "Completed"
                  ? "bg-emerald-950/30 text-emerald-400 border-emerald-800"
                  : "bg-amber-950/30 text-amber-400 border-amber-800"
              }
            >
              {project.status}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            {project.title}
          </h1>

          <p className="text-xl text-gray-300 max-w-4xl mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="h-5 w-5" />
              <span>{project.duration}</span>
            </div>
            {project.github && (
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Button>
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-gray-800/50 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="future">Future Work</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-gray-800/50 border-gray-700 mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Project Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{project.overview}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                      <Target className="h-6 w-6" />
                      Objectives
                    </h3>
                    <ul className="space-y-3">
                      {project.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400">Project Details</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-300 mb-1">Status</h4>
                        <Badge
                          className={
                            project.status === "Completed"
                              ? "bg-emerald-950/30 text-emerald-400 border-emerald-800"
                              : "bg-amber-950/30 text-amber-400 border-amber-800"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-300 mb-1">Duration</h4>
                        <p className="text-gray-400">{project.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-300 mb-1">Category</h4>
                        <p className="text-gray-400">{project.category}</p>
                      </div>
                      {project.repositories && (
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2">Repositories</h4>
                          <div className="space-y-2">
                            {project.repositories.map((repo, index) => (
                              <Link key={index} href={repo.url} target="_blank" rel="noopener noreferrer">
                                <div className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                  <Github className="h-4 w-4" />
                                  <span>{repo.name}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="mt-0">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
                  <Code className="h-6 w-6" />
                  Technologies & Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.technologies.map((tech, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-400 mb-2">{tech.name}</h4>
                      <p className="text-gray-300 text-sm">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="mt-0">
            <div className="space-y-6">
              {project.challenges.map((challenge, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-950/30 p-2 rounded-full">
                        <AlertCircle className="h-6 w-6 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-amber-400 mb-2">{challenge.title}</h4>
                        <p className="text-gray-300 mb-4">{challenge.description}</p>
                        <div className="bg-gray-900/50 rounded-lg p-4">
                          <h5 className="font-medium text-emerald-400 mb-2">Solution:</h5>
                          <p className="text-gray-300">{challenge.solution}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-0">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  Key Results & Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300">{result}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="future" className="mt-0">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Future Enhancements</h3>
                <div className="space-y-4">
                  {project.futureWork.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-purple-950/30 p-1 rounded-full">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      </div>
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <Link href="/projects">
            <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Projects
            </Button>
          </Link>
          <Link href="/#contact">
            <Button className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600">
              Get In Touch
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
