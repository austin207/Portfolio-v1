import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, ArrowLeft, Home } from "lucide-react"
import Timeline from "@/components/timeline"

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-background relative">
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
              <Award className="h-8 w-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
              My Journey
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A chronological timeline of my academic achievements, professional experiences, projects, and milestones in
              technology and innovation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Timeline />
          </div>
        </div>
      </div>
    </main>
  )
}
