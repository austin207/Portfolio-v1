"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Github, Calendar, Code, Zap, Target, CheckCircle, AlertCircle, ExternalLink, Play } from "lucide-react"
import Image from "next/image"
import type { ProjectWithMetadata } from "@/lib/data/projects"
import { useReveal } from "@/hooks/use-reveal"

interface ProjectClientProps {
  project: ProjectWithMetadata;
}

export default function ProjectClient({ project }: ProjectClientProps) {
  const overviewReveal = useReveal()
  const technicalReveal = useReveal()
  const challengesReveal = useReveal()
  const resultsReveal = useReveal()
  const futureReveal = useReveal()
  const galleryReveal = useReveal()

  return (
    <main className="min-h-screen bg-background">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>

            <div className="flex flex-wrap items-center gap-4 mt-6 mb-4 fade-in" style={{ animationDelay: "0.1s" }}>
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                {project.category}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {project.status}
              </span>
              {project.featured && (
                <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight fade-in" style={{ animationDelay: "0.2s" }}>
              {project.title}
            </h1>

            <p className="text-lg text-muted-foreground max-w-4xl mb-6 fade-in" style={{ animationDelay: "0.3s" }}>{project.description}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{project.duration}</span>
              </div>

              {project.github && (
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border border-border text-foreground hover:bg-foreground hover:text-background rounded-none">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                </Link>
              )}

              {project.demoUrl && (
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="border border-border bg-foreground text-background hover:bg-muted-foreground rounded-none font-medium">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </Link>
              )}

              {project.videoUrl && (
                <Link href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border border-border text-foreground hover:bg-foreground hover:text-background rounded-none">
                    <Play className="mr-2 h-4 w-4" />
                    Demo Video
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span key={index} className="font-mono text-[10px] text-muted-foreground">
                  {tag}{index < project.tags.length - 1 && " /"}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-64 md:h-96 overflow-hidden mb-12 border border-border fade-in" style={{ animationDelay: "0.4s" }}>
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
            <TabsList className="flex flex-wrap gap-0 bg-transparent border-b border-border rounded-none p-0 h-auto mb-8 w-full">
              <TabsTrigger value="overview" className="rounded-none px-5 py-2.5 text-sm text-muted-foreground border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground bg-transparent data-[state=active]:bg-transparent hover:text-foreground data-[state=active]:shadow-none">Overview</TabsTrigger>
              <TabsTrigger value="technical" className="rounded-none px-5 py-2.5 text-sm text-muted-foreground border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground bg-transparent data-[state=active]:bg-transparent hover:text-foreground data-[state=active]:shadow-none">Technical</TabsTrigger>
              <TabsTrigger value="challenges" className="rounded-none px-5 py-2.5 text-sm text-muted-foreground border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground bg-transparent data-[state=active]:bg-transparent hover:text-foreground data-[state=active]:shadow-none">Challenges</TabsTrigger>
              <TabsTrigger value="results" className="rounded-none px-5 py-2.5 text-sm text-muted-foreground border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground bg-transparent data-[state=active]:bg-transparent hover:text-foreground data-[state=active]:shadow-none">Results</TabsTrigger>
              <TabsTrigger value="future" className="rounded-none px-5 py-2.5 text-sm text-muted-foreground border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground bg-transparent data-[state=active]:bg-transparent hover:text-foreground data-[state=active]:shadow-none">Future Work</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div ref={overviewReveal.ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className={`border border-border rounded-none bg-background mb-6 reveal ${overviewReveal.visible ? "visible" : ""}`} style={{ transitionDelay: "0s" }}>
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">Project Overview</h3>
                      <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
                    </CardContent>
                  </Card>

                  <Card className={`border border-border rounded-none bg-background reveal ${overviewReveal.visible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-semibold mb-4 text-foreground tracking-tight flex items-center gap-2">
                        <Target className="h-5 w-5 text-muted-foreground" />
                        Objectives
                      </h3>
                      <ul className="space-y-3">
                        {project.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className={`border border-border rounded-none bg-background reveal ${overviewReveal.visible ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4 text-foreground tracking-tight">Project Details</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-1">Status</h4>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {project.status}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-1">Duration</h4>
                          <p className="text-muted-foreground">{project.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-1">Category</h4>
                          <p className="text-muted-foreground">{project.category}</p>
                        </div>
                        {project.repositories && (
                          <div>
                            <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">Repositories</h4>
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
              <Card ref={technicalReveal.ref} className="border border-border rounded-none bg-background">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground tracking-tight flex items-center gap-2">
                    <Code className="h-5 w-5 text-muted-foreground" />
                    Technologies & Tools
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.technologies.map((tech, index) => (
                      <div key={index} className={`border border-border p-4 reveal ${technicalReveal.visible ? "visible" : ""}`} style={{ transitionDelay: `${index * 0.06}s` }}>
                        <h4 className="font-semibold text-foreground mb-2">{tech.name}</h4>
                        <p className="text-muted-foreground text-sm">{tech.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="mt-0">
              <div ref={challengesReveal.ref} className="space-y-6">
                {project.challenges.map((challenge, index) => (
                  <Card key={index} className={`border border-border rounded-none bg-background reveal ${challengesReveal.visible ? "visible" : ""}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-foreground mb-2 tracking-tight">{challenge.title}</h4>
                          <p className="text-muted-foreground mb-4">{challenge.description}</p>
                          <div className="border border-border p-4">
                            <h5 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">Solution</h5>
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
              <Card ref={resultsReveal.ref} className="border border-border rounded-none bg-background">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground tracking-tight flex items-center gap-2">
                    <Zap className="h-5 w-5 text-muted-foreground" />
                    Key Results & Achievements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.results.map((result, index) => (
                      <div key={index} className={`flex items-start gap-3 reveal ${resultsReveal.visible ? "visible" : ""}`} style={{ transitionDelay: `${index * 0.06}s` }}>
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">{result}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="future" className="mt-0">
              <Card ref={futureReveal.ref} className="border border-border rounded-none bg-background">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground tracking-tight">Future Enhancements</h3>
                  <div className="space-y-4">
                    {project.futureWork.map((item, index) => (
                      <div key={index} className={`flex items-start gap-3 reveal ${futureReveal.visible ? "visible" : ""}`} style={{ transitionDelay: `${index * 0.06}s` }}>
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
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
            <div ref={galleryReveal.ref} className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-foreground tracking-tight">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((image, index) => (
                  <div key={index} className={`relative h-48 overflow-hidden border border-border reveal ${galleryReveal.visible ? "visible" : ""}`} style={{ transitionDelay: `${index * 0.06}s` }}>
                    <Image
                      src={image}
                      alt={`${project.title} gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-border flex justify-between fade-in" style={{ animationDelay: "0.5s" }}>
            <Link href="/projects">
              <Button variant="outline" className="border border-border text-foreground hover:bg-foreground hover:text-background rounded-none">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Projects
              </Button>
            </Link>
            <Link href="/#contact">
              <Button className="border border-border bg-foreground text-background hover:bg-muted-foreground rounded-none font-medium">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
