/**
 * Renders a schema.org JSON-LD graph into the document.
 *
 * Server-rendered on purpose: AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
 * do not execute JavaScript, so anything injected client-side after hydration
 * is invisible to them. Keep this out of "use client" trees.
 */
export default function JsonLd({ data }: { data: object }) {
  // Escaping `<` is not cosmetic: an unescaped "</script>" or even a stray "<"
  // inside any description string (e.g. a project describing "<2ms latency")
  // terminates the script tag early and breaks the whole document.
  const json = JSON.stringify(data).replace(/</g, "\\u003c")

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
