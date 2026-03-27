"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch("https://formspree.io/f/mnjonoyj", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error()
      setIsSubmitted(true)
    } catch {
      alert("Failed to send. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="border border-border p-8 text-center">
        <p className="text-foreground font-medium mb-2">Message sent.</p>
        <p className="text-sm text-muted-foreground mb-6">I'll get back to you soon.</p>
        <button onClick={() => setIsSubmitted(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors underline">
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">Name</label>
          <Input id="name" name="name" required className="bg-transparent border-border rounded-none text-sm h-10 focus:border-foreground focus:ring-0 placeholder:text-muted-foreground/50" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">Email</label>
          <Input id="email" name="email" type="email" required className="bg-transparent border-border rounded-none text-sm h-10 focus:border-foreground focus:ring-0 placeholder:text-muted-foreground/50" placeholder="you@email.com" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">Subject</label>
        <Input id="subject" name="subject" required className="bg-transparent border-border rounded-none text-sm h-10 focus:border-foreground focus:ring-0 placeholder:text-muted-foreground/50" placeholder="What's this about?" />
      </div>
      <div>
        <label htmlFor="message" className="block font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">Message</label>
        <Textarea id="message" name="message" rows={5} required className="bg-transparent border-border rounded-none text-sm min-h-[120px] focus:border-foreground focus:ring-0 placeholder:text-muted-foreground/50" placeholder="Your message..." />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 text-sm font-medium bg-foreground text-background hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Send Message"}
      </button>
    </form>
  )
}
