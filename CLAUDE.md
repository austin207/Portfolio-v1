# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Next.js 15)
pnpm build        # Production build (ESLint/TS errors are ignored via next.config.mjs)
pnpm lint         # Run ESLint
pnpm create-project       # Interactive script to scaffold a new project JSON file
pnpm validate-projects    # Validate project JSON files in content/projects/
```

No test framework is configured.

## Architecture

**Next.js 15 App Router** personal portfolio for Antony Austin (BTech AEI, 6th semester, Rajagiri). React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix). Deployed on Vercel.

### Design system

- Dark-first with cyan (`#22d3ee`) as primary accent, violet/blue as secondary
- Glass card components: `.glass-card`, `.glass-card-hover`, `.gradient-border` (defined in `app/globals.css`)
- `.dot-grid` background, `.gradient-text` for hero text, `.section-number` for numbered sections
- Fonts: Inter (primary) + JetBrains Mono (labels, tags, badges, mono elements)
- All sections use left-aligned headers with `section-number` + gradient horizontal rule
- CSS variables in HSL format for light/dark in `app/globals.css`

### Data-driven home page

The home page (`app/page.tsx`) renders sections dynamically from `lib/data/sections.ts`. Each section has `enabled` flag and `order`. The `sectionComponents` map connects config to components in `components/sections/`. Includes a sticky `<Navbar />` and dot-grid background.

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

**Static params**: `app/projects/[slug]/page.tsx` has hardcoded `generateStaticParams` — update when adding new projects.

### Freelance & payments

- `/freelance` — Card-based service catalog with expandable pricing tiers
- Service data (tiers, extras, FAQ): `lib/data/services.ts`
- Stripe checkout: `POST /api/checkout` creates sessions from service/tier selection
- Stripe init: `lib/stripe.ts` (lazy — only errors when checkout is actually called)
- Success/cancel pages: `/checkout/success`, `/checkout/cancel`
- Each service links to both Stripe and Fiverr gig URLs
- Web dev is quote-based (no Stripe), shown as a separate card

### API routes

- `POST /api/contact` — Gmail OAuth2 email (googleapis). Env vars: `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REDIRECT_URI`, `GMAIL_REFRESH_TOKEN`, `GMAIL_SENDER`, `GMAIL_RECEIVER`
- `GET /api/contact` — Returns blog posts as JSON
- `POST /api/checkout` — Stripe checkout session creation

### Environment variables

See `.env.example` for all required vars. `.env.local` has placeholders. Key groups:
- **Stripe**: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Gmail OAuth2**: `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REDIRECT_URI`, `GMAIL_REFRESH_TOKEN`, `GMAIL_SENDER`, `GMAIL_RECEIVER`
- **Analytics**: `NEXT_PUBLIC_GA_ID`

### Key directories

- `content/data/` — JSON data files for all regularly-updated content
- `content/blog/` — Markdown blog posts with frontmatter
- `content/projects/` — JSON project detail files
- `lib/data/` — Data loading logic (sections, projects, blog, social links, services)
- `lib/stripe.ts` — Lazy Stripe client initialization
- `lib/seo.ts` — Metadata generation and JSON-LD structured data
- `lib/analytics.ts` — Google Analytics event tracking
- `components/sections/` — Home page section components (read from JSON files)
- `components/blog/` — Blog components including markdown renderer
- `components/ui/` — shadcn/ui primitives (do not manually edit)
- `components/navbar.tsx` — Sticky top nav (desktop), `components/mobile-nav.tsx` (mobile)
- `data/robotics-skills-data.json` — Recursive tree powering `/skills-path`

### Routes

| Route | Type | Purpose |
|---|---|---|
| `/` | Static | Landing page with configurable sections |
| `/blog` | Static | Blog listing with search/filters |
| `/blog/[slug]` | Dynamic | Blog post (markdown rendered) |
| `/projects` | Static | Projects listing with search/filters |
| `/projects/[slug]` | SSG | Project detail page |
| `/certificates` | Static | Certificates with search/filters |
| `/skills-path` | Static | Interactive skills map (tree from JSON) |
| `/timeline` | Static | Chronological journey |
| `/freelance` | Static | Service catalog with Stripe + Fiverr checkout |
| `/checkout/success` | Static | Payment confirmation |
| `/checkout/cancel` | Static | Payment cancelled |
