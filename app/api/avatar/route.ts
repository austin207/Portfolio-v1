import { NextRequest } from "next/server"
import { SYSTEM_PROMPT } from "@/lib/data/avatar-context"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  const { messages, max_tokens } = await req.json()

  if (!process.env.GROQ_API_KEY) {
    return new Response(
      `data: ${JSON.stringify({ choices: [{ delta: { content: "API key not configured." } }] })}\n\ndata: [DONE]\n\n`,
      { headers: { "Content-Type": "text/event-stream" } }
    )
  }

  const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: max_tokens ?? 80,
      temperature: 0.3,
      stop: ["\n\n"],   // halt at paragraph break so response never runs on
      stream: true,
    }),
  })

  if (!upstream.ok || !upstream.body) {
    return new Response(
      `data: ${JSON.stringify({ choices: [{ delta: { content: "Upstream error. Try again." } }] })}\n\ndata: [DONE]\n\n`,
      { headers: { "Content-Type": "text/event-stream" } }
    )
  }

  // Pipe through our own ReadableStream to prevent Next.js buffering
  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader()
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          controller.enqueue(value)
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",   // prevents nginx buffering in production
      Connection: "keep-alive",
    },
  })
}
