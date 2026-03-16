"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Home,
  Briefcase,
  Zap,
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

const iconMap: Record<string, any> = {
  MessageSquare,
  Cpu,
  Bot,
  Zap,
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
      className={`glass-card p-5 flex flex-col relative ${
        tier.highlighted
          ? "ring-1 ring-cyan-500/20 border-cyan-500/10"
          : "border-white/[0.04]"
      }`}
    >
      {tier.highlighted && (
        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-semibold px-3 py-0.5 rounded-full z-10">
          Popular
        </Badge>
      )}

      <div className="flex items-baseline justify-between mb-2">
        <h4 className="text-xs font-mono text-cyan-400/70 uppercase tracking-wider">{tier.label}</h4>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">${tier.price}</span>
        </div>
      </div>

      <p className="text-muted-foreground text-xs leading-relaxed mb-3">{tier.description}</p>

      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono mb-3 pb-3 border-b border-white/[0.04]">
        <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-cyan-400/40" />{tier.delivery}</span>
        <span>{tier.revisions} revision{tier.revisions !== "1" ? "s" : ""}</span>
      </div>

      <ul className="space-y-1.5 mb-4 flex-1">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-cyan-500/60 shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2 mt-auto">
        <Button
          onClick={handleCheckout}
          disabled={loading}
          size="sm"
          className={`w-full rounded-lg text-xs font-semibold transition-all duration-300 ${
            tier.highlighted
              ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
              : "bg-white/[0.05] text-foreground hover:bg-cyan-500/10 hover:text-cyan-400 border border-white/[0.06] hover:border-cyan-500/20"
          }`}
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
            className="w-full border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 rounded-lg text-[11px] font-medium"
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
    <div className="glass-card-hover gradient-border overflow-hidden transition-all duration-500">
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 flex items-start gap-4 group cursor-pointer"
      >
        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 shrink-0">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
              {service.title}
            </h3>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-mono shrink-0">
              Fiverr
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{service.headline}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {service.tags.slice(0, 5).map((tag, j) => (
              <span
                key={j}
                className="px-2 py-0.5 text-[10px] rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono"
              >
                {tag}
              </span>
            ))}
            {service.tags.length > 5 && (
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.03] text-muted-foreground border border-white/[0.06] font-mono">
                +{service.tags.length - 5}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className="text-sm font-mono text-muted-foreground">from</span>
          <span className="text-2xl font-bold text-foreground">${startingPrice}</span>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground mt-2 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-6 pb-6 border-t border-white/[0.04]">
          {/* Pre-order note */}
          <div className="flex items-start gap-2 mt-5 mb-6 p-3 rounded-lg bg-amber-500/[0.06] border border-amber-500/10">
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-400/90">{service.preOrderNote}</p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

          {/* What I Offer / Why Choose Me sections */}
          {service.sections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {service.sections.map((section, si) => (
                <div key={si} className="glass-card p-4 rounded-lg">
                  <h5 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">{section.title}</h5>
                  <ul className="space-y-1.5">
                    {section.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-cyan-500/50 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Pricing tiers */}
          <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">Choose a Package</h4>
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
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">Add-ons</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {paidExtras.map((extra, i) => (
                  <div key={i} className="flex items-center justify-between p-3 glass-card rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <Plus className="h-3 w-3 text-cyan-400/40" />
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
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">I&apos;ll Need to Know</h4>
              <div className="space-y-1.5">
                {service.faq.map((q, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground p-2">
                    <HelpCircle className="h-3.5 w-3.5 text-cyan-400/30 shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function FreelancePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-300 group"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Hero */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/[0.05] rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center justify-center p-2 glass-card rounded-full mb-6">
                <Briefcase className="h-8 w-8 text-cyan-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
                Freelance <span className="gradient-text">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                Select a service to see packages, pricing, and extras.
                Order directly via Stripe or through Fiverr — same quality, your choice.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm text-muted-foreground">
                    <h.icon className="h-4 w-4 text-cyan-400/60" />
                    <span>{h.text}</span>
                  </div>
                ))}
              </div>
              <Link href={socialLinks.fiverr} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 rounded-full px-8 h-11 text-sm font-medium"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Fiverr Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Service Cards */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="section-number">01</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Services</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
            </div>

            <div className="space-y-4">
              {allServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Web Dev — quote-based */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="section-number">02</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Custom Quote</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
            </div>
            <div className="glass-card-hover gradient-border p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <Globe className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Web Development</h3>
                      <p className="text-xs text-muted-foreground font-mono">Custom pricing per project</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Modern, responsive websites and web apps built with Next.js, React, and TypeScript. SEO-optimized,
                    performance-tuned, and deployed on Vercel. Every project is different — let&apos;s discuss yours and
                    I&apos;ll send a detailed proposal with timeline and pricing.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "SEO"].map((tag, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-0.5 text-[10px] rounded-full bg-cyan-500/[0.06] text-cyan-400/80 border border-cyan-500/10 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* What I Offer / Why Choose Me */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div className="glass-card p-3 rounded-lg">
                      <h5 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">What I Offer</h5>
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
                            <Check className="h-3 w-3 text-cyan-500/50 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="glass-card p-3 rounded-lg">
                      <h5 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">Why Choose Me</h5>
                      <ul className="space-y-1">
                        {[
                          "Built and deployed sites for real clients (Yehi, VirtusCo)",
                          "Modern stack — Next.js 15, React 19, TypeScript",
                          "Clean, maintainable, well-structured code",
                          "SEO and Core Web Vitals optimized",
                          "Clear communication and milestone delivery",
                          "Post-launch support and iterations",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                            <Check className="h-3 w-3 text-cyan-500/50 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <h5 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">Typical Price Ranges</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {[
                      { label: "Landing Pages", range: "$45 – $150" },
                      { label: "Business Websites", range: "$200 – $500" },
                      { label: "Web Applications", range: "$500 – $2,000+" },
                      { label: "Portfolio Sites", range: "$100 – $300" },
                    ].map((item, i) => (
                      <div key={i} className="glass-card p-3 rounded-lg text-center">
                        <p className="text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-foreground font-mono font-semibold">{item.range}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:w-56 shrink-0">
                  <Link href={`mailto:${socialLinks.email}?subject=Web Development Inquiry`}>
                    <Button className="w-full bg-cyan-500 text-black hover:bg-cyan-400 rounded-lg font-semibold shadow-lg shadow-cyan-500/20 text-sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Request a Quote
                    </Button>
                  </Link>
                  <Link href="/#contact">
                    <Button
                      variant="outline"
                      className="w-full border-white/[0.06] text-muted-foreground hover:bg-white/[0.04] hover:text-foreground rounded-lg text-sm"
                    >
                      Use Contact Form
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* How I Work */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="section-number">03</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">How It Works</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { s: "01", t: "Discovery", d: "We discuss your project goals, requirements, and timeline." },
                { s: "02", t: "Proposal", d: "Detailed scope, timeline, and transparent pricing." },
                { s: "03", t: "Build", d: "Development with regular updates and milestone reviews." },
                { s: "04", t: "Deliver", d: "Final delivery with documentation and post-launch support." },
              ].map((step, i) => (
                <div key={i} className="glass-card-hover gradient-border p-6 relative">
                  <span className="text-5xl font-bold text-cyan-500/[0.06] absolute top-4 right-4 font-mono">{step.s}</span>
                  <span className="text-xs font-mono text-cyan-400/60 tracking-widest">{step.s}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{step.t}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.d}</p>
                  {i < 3 && (
                    <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="h-4 w-4 text-cyan-500/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card gradient-border p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-cyan-500/[0.06] rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Ready to start a project?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                Pick a package above, or reach out for a custom quote.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={socialLinks.fiverr} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-emerald-500 text-black hover:bg-emerald-400 rounded-full px-8 h-11 font-semibold shadow-lg shadow-emerald-500/20">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Fiverr Profile
                  </Button>
                </Link>
                <Link href={`mailto:${socialLinks.email}`}>
                  <Button className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-full px-8 h-11 font-semibold shadow-lg shadow-cyan-500/20">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button
                    variant="outline"
                    className="border-white/[0.1] text-foreground/80 hover:bg-white/[0.05] rounded-full px-8 h-11 text-sm"
                  >
                    Contact Form
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
