import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10 text-center px-4 max-w-lg">
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-full px-8 h-11 font-semibold shadow-lg shadow-cyan-500/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
