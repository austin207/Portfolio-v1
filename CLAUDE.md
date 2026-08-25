# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Next.js 15)
pnpm build        # Production build (ESLint/TS errors are ignored via next.config.mjs)
pnpm lint         # Run ESLint
pnpm create-project       # Interactive script to scaffold a new project JSON file
pnpm validate-projects    # Validate project JSON files in content/projects/
pnpm typecheck            # tsc --noEmit — the REAL gate; the build ignores TS errors
pnpm verify-seo [url]     # 97 assertions on metadata, schema, canonicals, assets
```

No test framework is configured. `next.config.mjs` sets `typescript.ignoreBuildErrors`
and `eslint.ignoreDuringBuilds` to `true`, so **a green `pnpm build` proves nothing
about type correctness** — run `pnpm typecheck` separately. As of 2026-08-25 there are
22 pre-existing TS errors (contact route, markdown-renderer, blog-post.tsx); treat that
as the baseline and don't add to it.

`pnpm verify-seo` needs a running server: `pnpm build && pnpm start`, then
`pnpm verify-seo` (defaults to localhost:3000) or `pnpm verify-seo https://antonyaustin.site`.
It is the only automated test in the repo.

## Architecture

**Next.js 15 App Router** personal portfolio for Antony Austin (BTech AEI, 6th semester, Rajagiri). React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix). Deployed on Vercel.

### Design system — monochrome "Editorial"

The 2026-03-25 redesign replaced an earlier cyan/glass system. There is **no cyan,
no glass cards, no gradients**. `.glass-card`, `.gradient-border`, `.gradient-text`,
and `.section-number` no longer exist — don't reintroduce them.

- Pure greyscale. Every CSS variable in `app/globals.css` is `0 0% X%` HSL, light + dark.
- Fonts: **Space Grotesk** (sans) + **IBM Plex Mono** (labels, tags, eyebrows), loaded
  via `next/font/google` in `app/layout.tsx`
- Utility classes that DO exist: `.divider`, `.reveal`, `.line-reveal`, `.fade-in`,
  `.stagger`, `.noise`, `.link-underline`, `.animate-marquee`
- Custom cursor: `html { cursor: none }` with `components/custom-cursor.tsx`
  (re-enabled on touch devices via media query)
- `.dot-grid` is referenced on the two `/checkout` pages but has **no CSS definition** —
  those divs render nothing.

**Section heading pattern.** Sections use a two-tier header: a mono uppercase eyebrow
`<p>` above a real sentence-case `<h2>`. The `<h2>` is phrased as a question
("Who is Antony Austin?") because answer engines match question-shaped headings. Keep
this pattern when adding sections — see `components/sections/about-section.tsx`.

**Scroll reveal is progressive enhancement.** `.reveal` is `opacity: 1` by default;
the animation only applies under `html.js`, a class set by an inline script in
`app/layout.tsx`. This means content stays visible if JS fails or an
IntersectionObserver never fires. There is a `prefers-reduced-motion` block that
disables all of it. **Never make `.reveal` opacity:0 by default again** — that hid the
whole page from Googlebot and from any user with a JS error.

### Data-driven home page

The home page (`app/page.tsx`) renders sections dynamically from `lib/data/sections.ts`. Each section has `enabled` flag and `order`. The `sectionComponents` map connects config to components in `components/sections/`. Includes a sticky `<Navbar />`.

`personalInfo` and `testimonials` are **hardcoded in `lib/data/sections.ts`**, not JSON —
unlike everything in the table below.

### Content system (JSON + Markdown)

All regularly-updated content lives in JSON files — edit and push to git for updates:

| Content | File |
|---|---|
| Timeline events | `content/data/timeline.json` |
| Experience, orgs, awards | `content/data/experience.json` |
| Education & certs (home) | `content/data/education.json` |
| Certificates (full page) | `content/data/certificates.json` |
| Skills & levels | `content/data/skills.json` |
| About bio, interests, stats | `content/data/about.json` |
| Featured projects (home) | `content/data/featured-projects.json` |
| Skills map tree | `data/robotics-skills-data.json` |
| Blog posts | `content/blog/*.md` (frontmatter parsed with gray-matter) |
| Project detail pages | `content/projects/*.json` (loaded by ProjectManager with caching) |
| Founder ventures (VirtusCo, Noviq) | `content/data/ventures.json` |
| FAQ / AEO answers | `content/data/faq.json` |
| Sitemap lastmod dates | `content/data/route-dates.json` (hand-maintained) |

**Static params**: `app/projects/[slug]/page.tsx` has hardcoded `generateStaticParams` — update when adding new projects. `app/blog/[slug]/page.tsx` derives its own from `getAllPosts()`.

**Blog slugs come from the markdown filename** (`lib/data/blog-posts.ts`), so
`LLamaremake.md` → `/blog/LLamaremake`. Renaming a file changes a live URL and needs a
301 in `next.config.mjs`.

**`content/data/faq.json` is dual-purpose**: `app/faq/page.tsx` renders it visibly AND
builds the `FAQPage` schema from the same array. Google requires structured data to
match visible content, so never render one without the other.

**`updatedAt` on blog posts** comes from frontmatter `updated:` or falls back to `date:`.
Deliberately **not** `fs.statSync` mtime — on Vercel every file's mtime is the git-clone
timestamp, which would report "updated today" on every deploy and destroy the freshness
signal. Same reasoning behind `content/data/route-dates.json`.

### Ventures section

`components/sections/ventures-section.tsx` reads `content/data/ventures.json` and
presents VirtusCo and Noviq as **founded companies, not portfolio projects** — role,
period, stage, and a link to each live site. They resolve to their own Organization
nodes in the schema graph (`ID.virtusco`, `ID.noviq`), each with `founder` pointing back
at the Person node.

The Experience section's "Organizations" column covers the *wider* set of roles
(Apptronics, Electronics Club). Keep its heading distinct from the Ventures heading —
two identical `<h2>` passages on one page dilutes extraction.

### Freelance & payments

- `/freelance` — Card-based service catalog with expandable pricing tiers
- Service data (tiers, extras, FAQ): `lib/data/services.ts`
- **There is no Stripe account.** Tier CTAs are "Contact me" — a `mailto:` with the
  service and tier prefilled in the subject and body, so an enquiry arrives with the
  context the old checkout session carried. Fiverr remains the secondary CTA.
- Prices are still displayed and still in the `Offer` schema; they are indicative.
- **Dormant Stripe code**, kept in case an account is added later:
  `POST /api/checkout`, `lib/stripe.ts` (lazy init), and `/checkout/success` +
  `/checkout/cancel`. Nothing links to them. If Stripe is definitively not happening,
  delete those four plus the `stripe` and `@stripe/stripe-js` dependencies.
- Web dev is quote-based, shown as a separate card

### Contact form — Formspree, not Gmail

`components/contact-form.tsx` POSTs directly to `https://formspree.io/f/mnjonoyj`.

**`app/api/contact/route.ts` is dead code.** Nothing in the repo references
`/api/contact`. It contains a 250-line Gmail OAuth2 implementation (`POST`) and a
blog-posts JSON endpoint (`GET`), neither of which is reachable. The six `GMAIL_*`
env vars exist only for that dead route. Don't "fix" the Gmail route expecting the
contact form to change behaviour — change `contact-form.tsx`.

### AI avatar agent

A floating chat robot, mounted globally in `app/layout.tsx` via
`components/avatar-wrapper.tsx` (a `"use client"` shim so `next/dynamic` with
`ssr: false` is legal in a Server Component layout).

- `app/api/avatar/route.ts` streams from **Groq** (`llama-3.1-8b-instant`, temp 0.3,
  80 max tokens) — needs `GROQ_API_KEY`
- `lib/data/avatar-context.ts` holds a 122-line hand-curated `SYSTEM_PROMPT` with
  every biographical fact, plus a hard "never invent facts" rule. Server-side only.
- `components/onboarding-tour.tsx` is a `return null` stub; the real guided tour
  lives inside `avatar-agent.tsx`.

### API routes

- `POST /api/checkout` — Stripe checkout session creation
- `POST /api/avatar` — Groq SSE stream for the chat avatar
- `POST /api/contact`, `GET /api/contact` — **dead, unreferenced** (see above)

### Environment variables

See `.env.example` for all required vars. `.env.local` has placeholders. Key groups:
- **Stripe**: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Groq** (avatar chat): `GROQ_API_KEY`
- **Analytics**: `NEXT_PUBLIC_GA_ID` — loaded by `components/analytics.tsx`; renders
  nothing if unset or still the `G-XXXX` placeholder
- **Search verification** (optional): `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`,
  `NEXT_PUBLIC_BING_SITE_VERIFICATION` — emit meta tags only when set
- **Gmail OAuth2**: `GMAIL_*` — required only by the dead `/api/contact` route

### Key directories

- `content/data/` — JSON data files for all regularly-updated content
- `content/blog/` — Markdown blog posts with frontmatter
- `content/projects/` — JSON project detail files
- `lib/data/` — Data loading logic (sections, projects, blog, social links, services)
- `lib/stripe.ts` — Lazy Stripe client initialization
- `lib/seo.ts` — `generateSEO()` metadata + the whole JSON-LD graph (see below)
- `lib/analytics.ts` — GA event helpers; `components/analytics.tsx` loads the script
- `components/json-ld.tsx` — Server component that renders a graph into a script tag
- `scripts/verify-seo.mjs` — The repo's only automated test
- `components/sections/` — Home page section components (read from JSON files)
- `components/blog/` — Blog components including markdown renderer
- `components/ui/` — shadcn/ui primitives (do not manually edit)
- `components/navbar.tsx` — Sticky top nav (desktop), `components/mobile-nav.tsx` (mobile)
- `data/robotics-skills-data.json` — Recursive tree powering `/skills-path`

### Routes

| Route | Type | Purpose |
|---|---|---|
| `/` | Static | Landing page with configurable sections |
| `/faq` | Static | Q&A page; source of the `FAQPage` schema |
| `/blog` | Static | Blog listing with search/filters |
| `/blog/[slug]` | SSG | Blog post (markdown rendered) |
| `/projects` | Static | Projects listing (server page + `projects-client.tsx`) |
| `/projects/[slug]` | SSG | Project detail page |
| `/certificates` | Static | Certificates with search/filters |
| `/skills-path` | Static | Interactive skills map (tree from JSON) |
| `/timeline` | Static | Chronological journey |
| `/freelance` | Static | Service catalog with Stripe + Fiverr checkout |
| `/checkout/success` | Static | Payment confirmation |
| `/checkout/cancel` | Static | Payment cancelled |
| `/robots.txt` | Static | `app/robots.ts` — 27 explicit AI-crawler groups |
| `/sitemap.xml` | Static | `app/sitemap.ts` |
| `/feed.xml` | Static | RSS 2.0 from `getAllPosts()` |
| `/llms.txt` | Static | Generated directory of pages/projects/services |

## SEO / AEO layer

Built 2026-08-25 so AI answer engines (ChatGPT, Claude, Perplexity, Google AI
Overviews) can find and cite the site. Read this before touching `lib/seo.ts`,
metadata, or headings.

**The governing constraint: AI crawlers do not execute JavaScript.** GPTBot, ClaudeBot
and PerplexityBot read raw HTML only. Anything rendered after hydration is invisible to
them. `"use client"` is fine — Next still SSRs those components — but `next/dynamic`
with `ssr: false` and `useEffect`-gated content are not. Only `avatar-agent.tsx` is
`ssr: false`, deliberately.

**Schema is one `@id`-linked graph.** `lib/seo.ts` exports entity nodes (`personNode`,
`websiteNode`, `virtuscoNode`, `noviqNode`, `rsetNode`) with stable `@id`s from the `ID`
registry. `rootGraph` is emitted once sitewide from `app/layout.tsx`; per-page builders
(`profilePageGraph`, `blogPostingGraph`, `projectGraph`, `certificatesGraph`, `faqGraph`,
`simplePageGraph`, …) reference those nodes by `@id` rather than re-declaring them.
Render with `<JsonLd data={...} />` from a **server** component.

Rules that are easy to break:
- **Every page needs its own canonical.** Route new pages through `generateSEO({ url })`.
  Metadata is *not* deep-merged: a child that sets `openGraph` replaces the parent's
  entirely, and one that omits `alternates` silently inherits the root canonical. That
  bug once made every blog post and project declare the homepage as canonical.
- **Emit page schema from `page.tsx`, not `layout.tsx`**, when the layout also wraps a
  `[slug]` route — otherwise detail pages inherit the listing's `CollectionPage` and a
  duplicate `BreadcrumbList`.
- `sameAs` means "this URL *is* this entity" — personal profiles only. Company URLs
  belong on the Organization nodes.
- `<JsonLd>` unicode-escapes every less-than character in the JSON before
  injecting it. Do not hand-roll a script tag without that step: a less-than sign
  inside any description (e.g. a project citing "under 2ms latency" with a symbol)
  closes the script tag early and breaks the whole page.
- Keep `keywords` short. Google ignores the tag, and the GEO study (arXiv 2311.09735)
  measured keyword stuffing ~10% *below* baseline for AI citation.
- One `<h1>` per page. `markdown-renderer.tsx` demotes markdown headings a level
  (`#` → `<h2>`) so the post title stays the only `<h1>`.

Honest caveats: **llms.txt is unproven** — no provider confirms reading it; it's cheap
insurance, not a driver. **FAQ rich results were deprecated by Google on 2026-05-07**
(Rich Results Test support removed June 2026) — the markup still helps AI extraction,
but the visible Q&A is the real asset. Validate at validator.schema.org.

**hreflang is deliberately absent.** Single-language English site; adding it would only
create return-tag errors. "International" is handled via `inLanguage`, USD pricing,
`areaServed: Worldwide`, and visible "works remotely worldwide" copy.

**robots.txt cannot override host-level blocking.** If Vercel's Firewall / Bot
Management AI-bot rule is on, crawlers get a 403 regardless. Check the dashboard if
crawl logs stay empty.

<!-- gen-project-docs:start -->
## Regenerable artifacts

As of 2026-07-29, the build output in this project (`node_modules`, `.next`, totalling 1.23 GB) was deleted to reclaim disk space. Source, manifests and lockfiles are untouched.

Restore with `pnpm install --frozen-lockfile` - see `SETUP.md` in this folder for full detail.

<!-- gen-project-docs:end -->

