import Link from "next/link"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft } from "lucide-react"

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10 text-center px-4 max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] mb-8">
          <XCircle className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
          Payment Cancelled
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          No worries — your card was not charged. Feel free to come back anytime or reach out if you have questions.
        </p>
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
  )
}
