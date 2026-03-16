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
  return (
    <main className="min-h-screen bg-background relative">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-300 group"
              asChild
            >
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Badge className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono">
                {project.category}
              </Badge>
              <Badge className={`px-3 py-1.5 text-xs rounded-full ${project.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"} border`}>
                {project.status}
              </Badge>
              {project.featured && (
                <Badge className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground max-w-4xl mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5 text-cyan-400/60" />
                <span>{project.duration}</span>
              </div>

              {project.github && (
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/[0.1] text-foreground/80 hover:bg-white/[0.05] rounded-full">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                </Link>
              )}

              {project.demoUrl && (
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-full font-semibold shadow-lg shadow-cyan-500/20">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </Link>
              )}

              {project.videoUrl && (
                <Link href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/[0.1] text-foreground/80 hover:bg-white/[0.05] rounded-full">
                    <Play className="mr-2 h-4 w-4" />
                    Demo Video
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/[0.08]">
            <div className="absolute inset-0 bg-background/40 z-10"></div>
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
            <TabsList className="flex flex-wrap gap-1 bg-transparent border-0 p-0 h-auto mb-8">
              <TabsTrigger value="overview" className="rounded-full px-5 py-2 text-sm text-muted-foreground data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/20 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]">Overview</TabsTrigger>
              <TabsTrigger value="technical" className="rounded-full px-5 py-2 text-sm text-muted-foreground data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/20 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]">Technical</TabsTrigger>
              <TabsTrigger value="challenges" className="rounded-full px-5 py-2 text-sm text-muted-foreground data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/20 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]">Challenges</TabsTrigger>
              <TabsTrigger value="results" className="rounded-full px-5 py-2 text-sm text-muted-foreground data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/20 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]">Results</TabsTrigger>
              <TabsTrigger value="future" className="rounded-full px-5 py-2 text-sm text-muted-foreground data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/20 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]">Future Work</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="rounded-2xl glass-card gradient-border mb-6">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">Project Overview</h3>
                      <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl glass-card gradient-border">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-semibold mb-4 text-foreground tracking-tight flex items-center gap-2">
                        <Target className="h-6 w-6 text-cyan-400/60" />
                        Objectives
                      </h3>
                      <ul className="space-y-3">
                        {project.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-cyan-500/60 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="rounded-2xl glass-card gradient-border">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4 text-foreground tracking-tight">Project Details</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-mono text-cyan-400/70 uppercase tracking-wider text-xs mb-1">Status</h4>
                          <Badge className={`px-3 py-1.5 text-xs rounded-full ${project.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"} border`}>
                            {project.status}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-mono text-cyan-400/70 uppercase tracking-wider text-xs mb-1">Duration</h4>
                          <p className="text-muted-foreground">{project.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-mono text-cyan-400/70 uppercase tracking-wider text-xs mb-1">Category</h4>
                          <p className="text-muted-foreground">{project.category}</p>
                        </div>
                        {project.repositories && (
                          <div>
                            <h4 className="font-mono text-cyan-400/70 uppercase tracking-wider text-xs mb-2">Repositories</h4>
                            <div className="space-y-2">
                              {project.repositories.map((repo, index) => (
                                <Link key={index} href={repo.url} target="_blank" rel="noopener noreferrer">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
              <Card className="rounded-2xl glass-card gradient-border">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground tracking-tight flex items-center gap-2">
                    <Code className="h-6 w-6 text-cyan-400/60" />
                    Technologies & Tools
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.technologies.map((tech, index) => (
                      <div key={index} className="glass-card-hover gradient-border p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">{tech.name}</h4>
                        <p className="text-muted-foreground text-sm">{tech.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="mt-0">
              <div className="space-y-6">
                {project.challenges.map((challenge, index) => (
                  <Card key={index} className="rounded-2xl glass-card gradient-border">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-white/[0.03] p-2 rounded-full border border-white/[0.06]">
                          <AlertCircle className="h-6 w-6 text-cyan-400/60" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-foreground mb-2 tracking-tight">{challenge.title}</h4>
                          <p className="text-muted-foreground mb-4">{challenge.description}</p>
                          <div className="glass-card p-4 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2">Solution:</h5>
                            <p className="text-muted-foreground">{challenge.solution}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results" className="mt-0">
              <Card className="rounded-2xl glass-card gradient-border">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground tracking-tight flex items-center gap-2">
                    <Zap className="h-6 w-6 text-cyan-400/60" />
                    Key Results & Achievements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.results.map((result, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-cyan-500/60 mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">{result}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="future" className="mt-0">
              <Card className="rounded-2xl glass-card gradient-border">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground tracking-tight">Future Enhancements</h3>
                  <div className="space-y-4">
                    {project.futureWork.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-white/[0.03] p-1 rounded-full">
                          <div className="w-2 h-2 bg-cyan-500/40 rounded-full"></div>
                        </div>
                        <p className="text-muted-foreground">{item}</p>
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
              <h3 className="text-2xl font-semibold mb-6 text-foreground tracking-tight">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden border border-white/[0.08]">
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
          <div className="mt-12 pt-8 border-t border-white/[0.04] flex justify-between">
            <Link href="/projects">
              <Button variant="outline" className="border-white/[0.1] text-foreground/80 hover:bg-white/[0.05] rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Projects
              </Button>
            </Link>
            <Link href="/#contact">
              <Button className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-full font-semibold shadow-lg shadow-cyan-500/20">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
