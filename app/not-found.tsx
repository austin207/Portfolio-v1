import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Page not found.</p>
        <Link href="/" className="text-sm px-6 py-2.5 border border-border text-foreground hover:bg-foreground hover:text-background transition-all">
          Go Home
        </Link>
      </div>
    </div>
  )
}
