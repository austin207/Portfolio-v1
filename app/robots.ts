import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

/**
 * AI crawlers fall into three jobs: training-corpus collection, search-index
 * building, and live user-initiated fetches. All three are allowed here on
 * purpose — for a personal portfolio, being present in both the training data
 * and the answer-engine index is the entire goal.
 *
 * Listing them explicitly rather than relying on the `*` default is a
 * deliberate signal; several operators document that they look for their own
 * user-agent token.
 *
 * Two caveats worth knowing:
 *  - `Google-Extended` and `Applebot-Extended` are opt-OUT control tokens, not
 *    crawlers. Allowing them is a documented no-op, kept here to record intent.
 *  - robots.txt cannot grant access the host denies. If Vercel's Firewall / Bot
 *    Management "AI bots" rule is enabled for this project, these crawlers get
 *    a 403 no matter what this file says. Check the Vercel dashboard if crawl
 *    logs stay empty.
 */
const AI_CRAWLERS = [
  // OpenAI — training, search index, live fetch
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Google-Extended governs Gemini/Vertex training)
  "Google-Extended",
  "GoogleOther",
  // Apple
  "Applebot",
  "Applebot-Extended",
  // Others
  "Amazonbot",
  "meta-externalagent",
  "Meta-ExternalFetcher",
  "CCBot",
  "DuckAssistBot",
  "MistralAI-User",
  "cohere-ai",
  "YouBot",
  "PetalBot",
  "AI2Bot",
  "Diffbot",
  "Bytespider",
  "Timpibot",
]

const DISALLOW = ["/api/", "/checkout/"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // `host` intentionally omitted — it is a Yandex-only directive that Google
    // and every AI crawler ignore.
  }
}
