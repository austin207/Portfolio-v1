import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Mail } from "lucide-react"
import { personalInfo } from "@/lib/data/sections"

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10 text-center px-4 max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
          <CheckCircle className="h-10 w-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-2">
          Thank you for your order. I&apos;ll reach out within 24 hours to kick off the project.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          A confirmation email has been sent to your inbox.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`mailto:${personalInfo.email}`}>
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-full px-6 font-semibold shadow-lg shadow-cyan-500/20">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </Link>
          <Link href="/freelance">
            <Button
              variant="outline"
              className="border-white/[0.1] text-foreground/80 hover:bg-white/[0.05] rounded-full px-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
