import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { generateSEO, faqGraph, SITE_URL } from "@/lib/seo"
import JsonLd from "@/components/json-ld"
import faqData from "@/content/data/faq.json"

export const metadata = generateSEO({
  title: "FAQ — About Antony Austin",
  description:
    "Direct answers about Antony Austin: what he specialises in, VirtusCo and Noviq, his robotics and embedded firmware work, the 253M-parameter transformer, freelance rates, and how to reach him.",
  url: `${SITE_URL}/faq`,
  keywords: ["Antony Austin", "who is Antony Austin", "hire ROS 2 developer", "embedded engineer FAQ"],
})

// Server component on purpose. AI crawlers do not execute JavaScript, so the
// answers must be in the initial HTML — and the FAQPage schema below is built
// from the SAME array that renders visibly, which makes a schema/content
// mismatch structurally impossible.
export default function FaqPage() {
  const categories = Array.from(new Set(faqData.map((f) => f.category)))

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={faqGraph(faqData)} />

      <div className="max-w-[900px] mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-16"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        <div className="mb-20">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3">
            Questions
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Frequently asked questions about Antony Austin
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Short, factual answers about Antony Austin&apos;s background, engineering work,
            companies, and availability. Every answer is self-contained, so it can be read
            or quoted on its own.
          </p>
        </div>

        <div className="space-y-20">
          {categories.map((category) => (
            <section key={category}>
              <div className="divider mb-10" />
              <h2 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-10">
                {category}
              </h2>

              <div className="space-y-12">
                {faqData
                  .filter((f) => f.category === category)
                  .map((faq) => (
                    <article key={faq.question}>
                      {/* Sentence case, normal weight — a question has to read
                          as a question, not as a mono uppercase label. */}
                      <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground mb-4">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-[1.8] max-w-2xl">
                        {faq.answer}
                      </p>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <div className="divider mt-20 mb-10" />
        <p className="text-[13px] text-muted-foreground">
          Something not answered here?{" "}
          <Link href="/#contact" className="text-foreground hover:opacity-70 transition-opacity">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
