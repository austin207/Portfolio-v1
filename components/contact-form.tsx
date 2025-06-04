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
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 sm:p-6 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-900/30 text-green-400 mb-3 sm:mb-4">
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-medium mb-2">Message Sent!</h3>
        <p className="text-gray-400 text-sm sm:text-base">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
        <Button
          className="mt-4 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-sm"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
            className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500 text-sm h-9 sm:h-10"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500 text-sm h-9 sm:h-10"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="What is this regarding?"
          required
          className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500 text-sm h-9 sm:h-10"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message..."
          rows={4}
          required
          className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500 text-sm min-h-[100px]"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-sm h-9 sm:h-10"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message <Send className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
