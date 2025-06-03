import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Timeline from "@/components/timeline"

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950/30 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

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
