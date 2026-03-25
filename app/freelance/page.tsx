"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Globe,
  Cpu,
  Bot,
  PenTool,
  Mail,
  Clock,
  Shield,
  Star,
  ExternalLink,
  MessageSquare,
  Loader2,
  Check,
  ChevronDown,
  Plus,
  AlertCircle,
  HelpCircle,
} from "lucide-react"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"
import { services as allServices, type Service, type ServiceTier } from "@/lib/data/services"
import { freelanceStructuredData } from "@/lib/seo"
import { useReveal } from "@/hooks/use-reveal"

const iconMap: Record<string, any> = {
  MessageSquare,
  Cpu,
  Bot,
  Zap: ArrowRight,
  PenTool,
}

const highlights = [
  { icon: Clock, text: "Fast turnaround" },
  { icon: Shield, text: "Clean, maintainable code" },
  { icon: Star, text: "Transparent pricing" },
  { icon: CheckCircle, text: "Post-delivery support" },
]

function TierCard({
  serviceId,
  tier,
  fiverrUrl,
}: {
  serviceId: string
  tier: ServiceTier
  fiverrUrl: string
}) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, tierName: tier.name }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || "Something went wrong")
      }
    } catch {
      alert("Failed to start checkout. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`border border-border p-5 flex flex-col relative ${
        tier.highlighted ? "border-foreground/30" : ""
      }`}
    >
      {tier.highlighted && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-foreground text-background font-mono text-[10px] font-semibold px-3 py-0.5 z-10">
          Popular
        </span>
      )}

      <div className="flex items-baseline justify-between mb-2">
        <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">{tier.label}</h4>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">${tier.price}</span>
        </div>
      </div>

      <p className="text-muted-foreground text-xs leading-relaxed mb-3">{tier.description}</p>

      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono mb-3 pb-3 border-b border-border">
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{tier.delivery}</span>
        <span>{tier.revisions} revision{tier.revisions !== "1" ? "s" : ""}</span>
      </div>

      <ul className="space-y-1.5 mb-4 flex-1">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2 mt-auto">
        <Button
          onClick={handleCheckout}
          disabled={loading}
          size="sm"
          className="w-full bg-foreground text-background hover:opacity-80 text-xs font-semibold transition-opacity"
        >
          {loading ? (
            <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />Processing</>
          ) : (
            <>Pay with Stripe</>
          )}
        </Button>
        <Link href={fiverrUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button
            variant="outline"
            size="sm"
            className="w-full border border-border text-foreground hover:bg-foreground hover:text-background text-[11px] font-medium transition-colors"
          >
            <ExternalLink className="mr-1.5 h-3 w-3" />
            Order on Fiverr
          </Button>
        </Link>
      </div>
    </div>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = iconMap[service.icon] || Briefcase
  const startingPrice = Math.min(...service.tiers.map((t) => t.price))
  const paidExtras = service.extras.filter((e) => e.price !== null || e.perTier)

  return (
    <div className={`border overflow-hidden transition-colors duration-300 ${expanded ? "border-foreground/20" : "border-border"}`}>
      {/* Collapsed header -- always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 flex items-start gap-4 group cursor-pointer hover:bg-foreground/[0.02] transition-colors"
      >
        <Icon className={`h-5 w-5 shrink-0 mt-0.5 transition-colors duration-300 ${expanded ? "text-foreground" : "text-muted-foreground"}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-foreground">
              {service.title}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{service.headline}</p>
          <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3">
            {service.tags.slice(0, 5).map((tag, j) => (
              <span
                key={j}
                className="font-mono text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {service.tags.length > 5 && (
              <span className="font-mono text-[10px] text-muted-foreground">
                +{service.tags.length - 5}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className="text-xs font-mono text-muted-foreground">from</span>
          <span className="text-2xl font-bold text-foreground">${startingPrice}</span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground mt-2 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Animated expand/collapse */}
      <div className={`expand-container ${expanded ? "open" : ""}`}>
        <div className="expand-inner">
        <div className="px-6 pb-6 border-t border-border">
          {/* Pre-order note */}
          <div className="flex items-start gap-2 mt-5 mb-6 p-3 border border-border">
            <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">{service.preOrderNote}</p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

          {/* What I Offer / Why Choose Me sections */}
          {service.sections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {service.sections.map((section, si) => (
                <div key={si} className="border border-border p-4">
                  <h5 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3">{section.title}</h5>
                  <ul className="space-y-1.5">
                    {section.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Pricing tiers */}
          <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-4">Choose a Package</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {service.tiers.map((tier) => (
              <TierCard
                key={tier.name}
                serviceId={service.id}
                tier={tier}
                fiverrUrl={service.fiverr}
              />
            ))}
          </div>

          {/* Extras */}
          {paidExtras.length > 0 && (
            <div className="mb-6">
              <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3">Add-ons</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {paidExtras.map((extra, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border text-xs">
                    <div className="flex items-center gap-2">
                      <Plus className="h-3 w-3 text-muted-foreground" />
                      <span className="text-foreground">{extra.name}</span>
                    </div>
                    <div className="text-muted-foreground font-mono">
                      {extra.price !== null ? (
                        <span>+${extra.price}{extra.delivery ? ` (${extra.delivery})` : ""}</span>
                      ) : extra.perTier ? (
                        <span>from +${Math.min(...Object.values(extra.perTier).map(v => v.price))}</span>
                      ) : (
                        <span>Ask</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {service.faq && service.faq.length > 0 && (
            <div>
              <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3">I&apos;ll Need to Know</h4>
              <div className="space-y-1.5">
                {service.faq.map((q, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground p-2">
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default function FreelancePage() {
  const { ref: servicesRef, visible: servicesVisible } = useReveal()
  const { ref: quoteRef, visible: quoteVisible } = useReveal()
  const { ref: processRef, visible: processVisible } = useReveal()
  const { ref: ctaRef, visible: ctaVisible } = useReveal()

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(freelanceStructuredData) }}
      />
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </div>

          {/* Hero */}
          <div className="mb-16">
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3 fade-in">Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground tracking-tight fade-in" style={{ animationDelay: "0.1s" }}>
              Freelance Services
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8 fade-in" style={{ animationDelay: "0.15s" }}>
              Select a service to see packages, pricing, and extras.
              Order directly via Stripe or through Fiverr — same quality, your choice.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-sm text-muted-foreground fade-in" style={{ animationDelay: "0.2s" }}>
              {highlights.map((h, i) => (
                <span key={i} className="flex items-center gap-2">
                  <h.icon className="h-3.5 w-3.5" />
                  {h.text}
                </span>
              ))}
            </div>
            <div className="fade-in" style={{ animationDelay: "0.25s" }}>
              <Link href={socialLinks.fiverr} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border border-border text-foreground hover:bg-foreground hover:text-background px-8 h-10 text-sm font-medium transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Fiverr Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Service Cards */}
          <div className="mb-16" ref={servicesRef}>
            <div className={`flex items-center gap-4 mb-8 reveal ${servicesVisible ? "visible" : ""}`}>
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">01</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Services</h2>
              <div className="flex-1 h-px bg-border ml-4" />
            </div>

            <div className="space-y-4">
              {allServices.map((service, i) => (
                <div key={service.id} className={`reveal ${servicesVisible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.08 + 0.1}s` }}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          {/* Web Dev -- quote-based */}
          <div className="mb-16" ref={quoteRef}>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">02</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Custom Quote</h2>
              <div className="flex-1 h-px bg-border ml-4" />
            </div>
            <div className={`border border-border p-6 md:p-8 reveal ${quoteVisible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Web Development</h3>
                      <p className="text-xs text-muted-foreground font-mono">Custom pricing per project</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Modern, responsive websites and web apps built with Next.js, React, and TypeScript. SEO-optimized,
                    performance-tuned, and deployed on Vercel. Every project is different -- let&apos;s discuss yours and
                    I&apos;ll send a detailed proposal with timeline and pricing.
                  </p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 mb-5">
                    {["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "SEO"].map((tag, j) => (
                      <span
                        key={j}
                        className="font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* What I Offer / Why Choose Me */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div className="border border-border p-3">
                      <h5 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">What I Offer</h5>
                      <ul className="space-y-1">
                        {[
                          "Custom landing pages and business websites",
                          "Full-stack web applications with APIs",
                          "Portfolio and personal brand sites",
                          "SEO optimization and performance tuning",
                          "Responsive design for all devices",
                          "CMS integration and admin panels",
                          "Deployment on Vercel, Netlify, or custom hosting",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                            <Check className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border border-border p-3">
                      <h5 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">Why Choose Me</h5>
                      <ul className="space-y-1">
                        {[
                          "Built and deployed sites for real clients (Yehi, VirtusCo)",
                          "Modern stack -- Next.js 15, React 19, TypeScript",
                          "Clean, maintainable, well-structured code",
                          "SEO and Core Web Vitals optimized",
                          "Clear communication and milestone delivery",
                          "Post-launch support and iterations",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                            <Check className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <h5 className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-3">Typical Price Ranges</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {[
                      { label: "Landing Pages", range: "$45 -- $150" },
                      { label: "Business Websites", range: "$200 -- $500" },
                      { label: "Web Applications", range: "$500 -- $2,000+" },
                      { label: "Portfolio Sites", range: "$100 -- $300" },
                    ].map((item, i) => (
                      <div key={i} className="border border-border p-3 text-center">
                        <p className="text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-foreground font-mono font-semibold">{item.range}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:w-56 shrink-0">
                  <Link href={`mailto:${socialLinks.email}?subject=Web Development Inquiry`}>
                    <Button className="w-full bg-foreground text-background hover:opacity-80 font-semibold text-sm transition-opacity">
                      <Mail className="mr-2 h-4 w-4" />
                      Request a Quote
                    </Button>
                  </Link>
                  <Link href="/#contact">
                    <Button
                      variant="outline"
                      className="w-full border border-border text-foreground hover:bg-foreground hover:text-background text-sm transition-colors"
                    >
                      Use Contact Form
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* How I Work */}
          <div className="mb-16" ref={processRef}>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">03</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">How It Works</h2>
              <div className="flex-1 h-px bg-border ml-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { s: "01", t: "Discovery", d: "We discuss your project goals, requirements, and timeline." },
                { s: "02", t: "Proposal", d: "Detailed scope, timeline, and transparent pricing." },
                { s: "03", t: "Build", d: "Development with regular updates and milestone reviews." },
                { s: "04", t: "Deliver", d: "Final delivery with documentation and post-launch support." },
              ].map((step, i) => (
                <div key={i} className={`border border-border p-6 relative reveal ${processVisible ? "visible" : ""}`} style={{ transitionDelay: `${i * 0.1 + 0.1}s` }}>
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">{step.s}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{step.t}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.d}</p>
                  {i < 3 && (
                    <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className={`border border-border p-10 text-center reveal ${ctaVisible ? "visible" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              Ready to start a project?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Pick a package above, or reach out for a custom quote.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={socialLinks.fiverr} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border border-border text-foreground hover:bg-foreground hover:text-background px-8 h-11 font-semibold transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Fiverr Profile
                </Button>
              </Link>
              <Link href={`mailto:${socialLinks.email}`}>
                <Button className="bg-foreground text-background hover:opacity-80 px-8 h-11 font-semibold transition-opacity">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Me
                </Button>
              </Link>
              <Link href="/#contact">
                <Button
                  variant="outline"
                  className="border border-border text-foreground hover:bg-foreground hover:text-background px-8 h-11 text-sm transition-colors"
                >
                  Contact Form
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
