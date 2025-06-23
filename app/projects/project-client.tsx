"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Github, Calendar, Code, Zap, Target, CheckCircle, AlertCircle, Home, ExternalLink, Play } from "lucide-react"
import Image from "next/image"
import type { ProjectWithMetadata } from "@/lib/data/projects"

interface ProjectClientProps {
  project: ProjectWithMetadata;
}

export default function ProjectClient({ project }: ProjectClientProps) {
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-purple-900/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group"
              asChild
            >
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Badge className={getCategoryColor(project.category)}>
                {project.category}
              </Badge>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              {project.featured && (
                <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/50">
                  Featured
                </Badge>
              )}
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

              {project.demoUrl && (
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </Link>
              )}

              {project.videoUrl && (
                <Link href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-emerald-700 text-emerald-400 hover:bg-emerald-950/30">
                    <Play className="mr-2 h-4 w-4" />
                    Demo Video
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
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
            <Image 
              src={project.image || "/placeholder.svg"} 
              alt={project.title} 
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-gray-800/50 mb-8 rounded-xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="future">Future Work</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="bg-gray-800/50 border-gray-700 mb-6 rounded-2xl">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Project Overview</h3>
                      <p className="text-gray-300 leading-relaxed">{project.overview}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700 rounded-2xl">
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
                  <Card className="bg-gray-800/50 border-gray-700 rounded-2xl">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4 text-cyan-400">Project Details</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-300 mb-1">Status</h4>
                          <Badge className={getStatusColor(project.status)}>
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
              <Card className="bg-gray-800/50 border-gray-700 rounded-2xl">
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
                  <Card key={index} className="bg-gray-800/50 border-gray-700 rounded-2xl">
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
              <Card className="bg-gray-800/50 border-gray-700 rounded-2xl">
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
              <Card className="bg-gray-800/50 border-gray-700 rounded-2xl">
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

          {/* Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden border border-gray-700/50">
                    <Image
                      src={image}
                      alt={`${project.title} gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

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
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .bg-grid-white\/\[0\.02\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.02)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }

        .bg-grid-16 {
          background-size: 16px 16px;
        }
      `}</style>
    </main>
  )
}
