"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
    } catch (error) {
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="glass-card p-8 text-center gradient-border">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 mb-4">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2 text-foreground">Message Sent!</h3>
        <p className="text-muted-foreground text-sm">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
        <Button
          className="mt-6 bg-cyan-500 text-black hover:bg-cyan-400 rounded-full px-6 text-sm font-semibold"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[10px] font-mono text-cyan-400/70 mb-1.5 uppercase tracking-wider">
            Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
            className="glass-card border-white/[0.06] focus:border-cyan-500/30 focus:ring-cyan-500/20 text-sm h-10 rounded-lg placeholder:text-muted-foreground/40"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[10px] font-mono text-cyan-400/70 mb-1.5 uppercase tracking-wider">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="glass-card border-white/[0.06] focus:border-cyan-500/30 focus:ring-cyan-500/20 text-sm h-10 rounded-lg placeholder:text-muted-foreground/40"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-[10px] font-mono text-cyan-400/70 mb-1.5 uppercase tracking-wider">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="What is this regarding?"
          required
          className="glass-card border-white/[0.06] focus:border-cyan-500/30 focus:ring-cyan-500/20 text-sm h-10 rounded-lg placeholder:text-muted-foreground/40"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[10px] font-mono text-cyan-400/70 mb-1.5 uppercase tracking-wider">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message..."
          rows={4}
          required
          className="glass-card border-white/[0.06] focus:border-cyan-500/30 focus:ring-cyan-500/20 text-sm rounded-lg min-h-[120px] placeholder:text-muted-foreground/40"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-cyan-500 text-black hover:bg-cyan-400 text-sm h-10 rounded-lg font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/30"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
