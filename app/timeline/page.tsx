import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import Timeline from "@/components/timeline"

export default function TimelinePage() {
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
            My Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            A chronological timeline of my academic achievements, professional experiences, projects, and milestones in
            technology and innovation.
          </p>
        </div>

        <div className="max-w-4xl">
          <Timeline />
        </div>
      </div>
    </main>
  )
}
