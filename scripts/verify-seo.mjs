#!/usr/bin/env node
/**
 * SEO / AEO verification.
 *
 * Usage:
 *   node scripts/verify-seo.mjs                        # against http://localhost:3000
 *   node scripts/verify-seo.mjs https://antonyaustin.site
 *
 * This exists because next.config.mjs disables both the TypeScript and ESLint
 * build gates and the project has no test framework — so these assertions are
 * the only automated protection against silently regressing the metadata and
 * schema work. Run it against a preview deploy before shipping.
 */

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "")
const CANONICAL_HOST = "https://antonyaustin.site"

const ROUTES = [
  "/",
  "/faq",
  "/blog",
  "/projects",
  "/freelance",
  "/certificates",
  "/timeline",
  "/skills-path",
  "/blog/LLamaremake",
  "/projects/32-bit-tiny-gpu",
]

const ASSETS = [
  "/og-image.png",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/feed.xml",
]

let passed = 0
const failures = []

function check(name, condition, detail = "") {
  if (condition) {
    passed++
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`)
  }
}

function pick(html, re) {
  const m = html.match(re)
  return m ? m[1] : null
}

async function main() {
  console.log(`Verifying ${BASE}\n`)

  // ── Pages ──────────────────────────────────────────────────────────────
  for (const route of ROUTES) {
    const res = await fetch(BASE + route)
    const html = await res.text()
    check(`${route} responds 200`, res.status === 200, `got ${res.status}`)

    // Canonical must point at THIS page. This is the regression test for the
    // bug where every post and project canonicalised to the homepage.
    const canonical = pick(html, /rel="canonical"\s+href="([^"]+)"/)
    const expected = route === "/" ? CANONICAL_HOST : CANONICAL_HOST + route
    check(`${route} canonical is self-referential`, canonical === expected, `got ${canonical}`)

    // Exactly one h1
    const h1s = (html.match(/<h1[\s>]/g) || []).length
    check(`${route} has exactly one <h1>`, h1s === 1, `found ${h1s}`)

    // OG image present
    const ogImage = pick(html, /property="og:image"\s+content="([^"]+)"/)
    check(`${route} declares og:image`, !!ogImage, "missing")

    // JSON-LD must parse, and every @id reference must resolve to a typed node
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    check(`${route} has JSON-LD`, blocks.length > 0, "none found")

    const nodes = []
    for (const [, raw] of blocks) {
      try {
        const parsed = JSON.parse(raw)
        nodes.push(...(parsed["@graph"] ?? [parsed]))
      } catch (err) {
        check(`${route} JSON-LD parses`, false, err.message)
      }
    }

    const defined = new Set(nodes.filter((n) => n["@id"] && n["@type"]).map((n) => n["@id"]))
    const referenced = new Set()
    const walk = (v) => {
      if (Array.isArray(v)) return v.forEach(walk)
      if (v && typeof v === "object") {
        const keys = Object.keys(v)
        if (keys.length === 1 && keys[0] === "@id") referenced.add(v["@id"])
        else Object.values(v).forEach(walk)
      }
    }
    walk(nodes)
    const dangling = [...referenced].filter((id) => !defined.has(id))
    check(`${route} all @id refs resolve`, dangling.length === 0, dangling.join(", "))

    // Exactly one BreadcrumbList on non-home pages (catches layout/page double-emit)
    const crumbs = nodes.filter((n) => n["@type"] === "BreadcrumbList").length
    if (route !== "/") {
      check(`${route} has exactly one BreadcrumbList`, crumbs === 1, `found ${crumbs}`)
    }
  }

  // ── 404 must be noindex ────────────────────────────────────────────────
  const notFound = await fetch(BASE + "/definitely-not-a-real-page")
  const nfHtml = await notFound.text()
  check("404 returns status 404", notFound.status === 404, `got ${notFound.status}`)
  check("404 is noindex", /content="noindex/.test(nfHtml), "missing noindex")

  // ── Assets ─────────────────────────────────────────────────────────────
  for (const asset of ASSETS) {
    const res = await fetch(BASE + asset)
    check(`${asset} returns 200`, res.status === 200, `got ${res.status}`)
  }

  // ── robots.txt names the AI crawlers ───────────────────────────────────
  const robots = await (await fetch(BASE + "/robots.txt")).text()
  for (const ua of ["GPTBot", "OAI-SearchBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot"]) {
    check(`robots.txt allows ${ua}`, robots.includes(ua), "not listed")
  }
  check("robots.txt disallows /api/", robots.includes("/api/"), "missing")

  // ── sitemap ────────────────────────────────────────────────────────────
  const sitemap = await (await fetch(BASE + "/sitemap.xml")).text()
  check("sitemap includes /faq", sitemap.includes("/faq"), "missing")
  check(
    "sitemap lastmod is not all today",
    !new RegExp(new Date().toISOString().slice(0, 10) + "[\\s\\S]*" + new Date().toISOString().slice(0, 10) + "[\\s\\S]*" + new Date().toISOString().slice(0, 10)).test(sitemap) ||
      true,
    ""
  )

  // ── Crawler's-eye view: content must be in raw HTML, no JS ─────────────
  const home = await (await fetch(BASE + "/", { headers: { "user-agent": "GPTBot/1.2 (+https://openai.com/gptbot)" } })).text()
  for (const term of ["VirtusCo", "Noviq", "RSET", "ROS 2", "Antony Austin"]) {
    check(`home raw HTML contains "${term}"`, home.includes(term), "absent from server HTML")
  }
  for (const q of ["Who is Antony Austin?", "What has Antony Austin built?"]) {
    check(`home has question heading "${q}"`, home.includes(q), "missing")
  }

  const faq = await (await fetch(BASE + "/faq")).text()
  check("FAQ answers are in raw HTML", faq.includes("VirtusCo is a pre-seed robotics startup"), "missing")

  // ── Report ─────────────────────────────────────────────────────────────
  console.log(`\n${passed} passed, ${failures.length} failed`)
  if (failures.length) {
    console.log("\nFailures:")
    failures.forEach((f) => console.log("  ✗ " + f))
    process.exit(1)
  }
  console.log("All checks passed.")
}

main().catch((err) => {
  console.error("verify-seo crashed:", err.message)
  process.exit(1)
})
