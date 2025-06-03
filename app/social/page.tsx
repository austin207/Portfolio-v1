import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Share2 } from "lucide-react"
import SocialLinksGrid from "@/components/social-links-grid"

export default function SocialPage() {
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

          <div className="flex items-center gap-3 mb-4">
            <Share2 className="h-8 w-8 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              Connect With Me
            </h1>
          </div>

          <p className="text-xl text-gray-300 max-w-3xl">
            Let's connect across different platforms! Follow my journey in tech, get updates on projects, and join the
            conversation about electronics, AI/ML, and innovation.
          </p>
        </div>

        {/* Primary Social Links */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-semibold text-cyan-400">Primary Channels</h2>
          </div>
          <SocialLinksGrid showAll={false} variant="grid" />
        </section>

        {/* All Social Links */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-purple-400">All Platforms</h2>
          <SocialLinksGrid showAll={true} variant="grid" />
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-gray-700 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              Let's Collaborate!
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Interested in working together on innovative projects? Have questions about my work? Or just want to chat
              about the latest in tech? I'd love to hear from you!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600">
                  Send Message
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" className="border-purple-700 text-purple-400 hover:bg-purple-950/30">
                  View Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
