import type { Metadata } from "next"

export const SITE_URL = "https://antonyaustin.site"
export const SITE_NAME = "Antony Austin"

const DEFAULT_TITLE = "Antony Austin — Applied Electronics Engineer | VLSI | Robotics | AI/ML"
const DEFAULT_DESCRIPTION =
  "Portfolio of Antony Austin — AEI undergraduate at RSET specializing in VLSI, embedded systems, robotics, and AI/ML. Co-founder & CTO of VirtusCo (autonomous porter robot). Founder of Noviq. Builder of a 253M-parameter LLM. Freelance ROS 2 developer."

// Deliberately short. Google largely ignores `keywords`, and the GEO study
// (arXiv 2311.09735) measured keyword stuffing at ~10% BELOW baseline for AI
// citation rate. Per-route sets should stay this tight.
const DEFAULT_KEYWORDS = [
  "Antony Austin",
  "embedded systems engineer",
  "ROS 2 developer",
  "VLSI",
  "robotics",
  "AI/ML",
]

const OG_IMAGE = `${SITE_URL}/og-image.png`
const FEED_URL = `${SITE_URL}/feed.xml`

/**
 * Stable @id fragments. Every schema node references these instead of
 * repeating inline copies, so answer engines resolve one entity rather than
 * several unlinked look-alikes.
 */
export const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  virtusco: `${SITE_URL}/#org-virtusco`,
  noviq: `${SITE_URL}/#org-noviq`,
  rset: `${SITE_URL}/#org-rset`,
  service: `${SITE_URL}/freelance#service`,
} as const

const ref = (id: string) => ({ "@id": id })

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noIndex?: boolean
}

export function generateSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = OG_IMAGE,
  url = SITE_URL,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Antony Austin",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: author, url: SITE_URL }],
    creator: author,
    publisher: author,
    robots: noIndex
      // follow:true so link equity still flows out of noindexed pages.
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@AntonyAustin19",
      site: "@AntonyAustin19",
    },
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": FEED_URL,
      },
    },
    ...((googleVerification || bingVerification) && {
      verification: {
        ...(googleVerification && { google: googleVerification }),
        ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
      },
    }),
  }
}

/* ────────────────────────────────────────────────────────────────
   Core entity nodes. These carry @id and are emitted once, sitewide,
   from app/layout.tsx. Page-level graphs reference them by @id.
   ──────────────────────────────────────────────────────────────── */

export const personNode = {
  "@type": "Person",
  "@id": ID.person,
  name: "Antony Austin",
  givenName: "Antony",
  familyName: "Austin",
  alternateName: "Austin",
  jobTitle: "Applied Electronics Engineer | VLSI | Embedded Systems | Robotics | AI/ML",
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  mainEntityOfPage: ref(ID.website),
  email: "austinantony06@gmail.com",
  image: `${SITE_URL}/Profile.png`,
  birthDate: "2005-03-16",
  knowsLanguage: ["en"],
  nationality: {
    "@type": "Country",
    name: "India",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  alumniOf: ref(ID.rset),
  worksFor: ref(ID.virtusco),
  knowsAbout: [
    "Electronics Engineering",
    "Embedded Systems",
    "Zephyr RTOS",
    "Bluetooth Low Energy",
    "Artificial Intelligence",
    "Machine Learning",
    "Transformer Architecture",
    "Robotics",
    "ROS 2",
    "SLAM",
    "Sensor Fusion",
    "Automation",
    "IoT",
    "VLSI Design",
    "SystemVerilog",
    "GPU Architecture",
    "PCB Design",
    "Phase Change Memory",
    "Microcontrollers",
    "Next.js",
  ],
  // `sameAs` asserts "this URL IS the same entity". Only personal profiles
  // belong here — noviq.website and virtusco.in were previously listed, but
  // those are companies, not Antony, and the conflation actively damages the
  // entity disambiguation this graph exists to build. They live on the
  // Organization nodes instead.
  sameAs: [
    "https://github.com/austin207",
    "https://linkedin.com/in/antony-austin-b7287226a",
    "https://x.com/AntonyAustin19",
    "https://medium.com/@austinantony06",
    "https://huggingface.co/Austin207",
    "https://www.instagram.com/antonyavstin",
    "https://pro.fiverr.com/s/7Y9Kbq4",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Electronics & Embedded Systems Engineer",
    skills: "Embedded C, ROS 2, SystemVerilog, PyTorch, Zephyr RTOS, PCB Design",
  },
}

export const rsetNode = {
  "@type": "EducationalOrganization",
  "@id": ID.rset,
  name: "Rajagiri School of Engineering & Technology",
  alternateName: "RSET",
  url: "https://www.rajagiritech.ac.in/",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kakkanad",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
}

// `founder` is an Organization property in schema.org, not a Person property.
// It previously sat on the Person node, which strict validators flag.
export const virtuscoNode = {
  "@type": "Organization",
  "@id": ID.virtusco,
  name: "VirtusCo",
  url: "https://www.virtusco.in",
  description:
    "Pre-seed robotics startup building Virtus, an autonomous B2B airport luggage porter robot. IEDC incubated.",
  sameAs: ["https://www.virtusco.in"],
  founder: ref(ID.person),
  foundingDate: "2025-01",
  foundingLocation: {
    "@type": "Place",
    name: "Kochi, Kerala, India",
  },
}

export const noviqNode = {
  "@type": "Organization",
  "@id": ID.noviq,
  name: "Noviq",
  url: "https://www.noviq.website",
  description:
    "Web and AI studio delivering Next.js and WordPress websites, Flutter apps, and AI-powered chatbots.",
  sameAs: ["https://www.noviq.website"],
  founder: ref(ID.person),
  foundingDate: "2026-03",
}

export const websiteNode = {
  "@type": "WebSite",
  "@id": ID.website,
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en",
  publisher: ref(ID.person),
  copyrightHolder: ref(ID.person),
  // No potentialAction/SearchAction: search on /blog and /projects is local
  // React state with no URL query parameter, so there is no endpoint to declare.
}

/** Wraps nodes in a @graph envelope. */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  }
}

/** Emitted once from app/layout.tsx — the sitewide entity backbone. */
export const rootGraph = graph(personNode, rsetNode, virtuscoNode, noviqNode, websiteNode)

/* ────────────────────────────────────────────────────────────────
   Per-page graph builders. Each references the core nodes by @id.
   ──────────────────────────────────────────────────────────────── */

export interface Crumb {
  name: string
  path: string
}

/** BreadcrumbList — absent sitewide before this. Cheap win for AEO and SEO. */
export function breadcrumbNode(crumbs: Crumb[]) {
  const last = crumbs[crumbs.length - 1]
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${last ? last.path : "/"}#breadcrumb`,
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
    })),
  }
}

/** ProfilePage for the home page — the canonical "who is this person" surface. */
export function profilePageGraph(dateModified?: string) {
  return graph({
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
    isPartOf: ref(ID.website),
    about: ref(ID.person),
    mainEntity: ref(ID.person),
    ...(dateModified && { dateModified }),
  })
}

export interface BlogPostLike {
  slug: string
  title: string
  excerpt: string
  content?: string
  author?: string
  publishedAt: string
  updatedAt?: string
  category?: string
  tags?: string[]
  image?: string
  readingTime?: number
}

export function blogPostingGraph(post: BlogPostLike, crumbs: Crumb[]) {
  const url = `${SITE_URL}/blog/${post.slug}`
  return graph(
    {
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: post.title,
      description: post.excerpt,
      url,
      mainEntityOfPage: url,
      inLanguage: "en",
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: ref(ID.person),
      publisher: ref(ID.person),
      isPartOf: ref(ID.website),
      ...(post.image && { image: `${SITE_URL}${post.image}` }),
      ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(", ") }),
      ...(post.category && { articleSection: post.category }),
      ...(post.content && { wordCount: post.content.trim().split(/\s+/).length }),
      ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` }),
    },
    breadcrumbNode(crumbs)
  )
}

export function blogListingGraph(posts: BlogPostLike[]) {
  return graph(
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      name: `${SITE_NAME} — Technical Blog`,
      url: `${SITE_URL}/blog`,
      inLanguage: "en",
      isPartOf: ref(ID.website),
      author: ref(ID.person),
      publisher: ref(ID.person),
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/${p.slug}#post`,
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.publishedAt,
        author: ref(ID.person),
      })),
    },
    breadcrumbNode([{ name: "Blog", path: "/blog" }])
  )
}

export interface ProjectLike {
  slug: string
  title: string
  description: string
  image?: string
  tags?: string[]
  category?: string
  status?: string
  github?: string
  updatedAt?: string
}

export function projectGraph(project: ProjectLike, crumbs: Crumb[]) {
  const url = `${SITE_URL}/projects/${project.slug}`
  return graph(
    {
      "@type": project.github ? "SoftwareSourceCode" : "CreativeWork",
      "@id": `${url}#project`,
      name: project.title,
      headline: project.title,
      description: project.description,
      url,
      mainEntityOfPage: url,
      inLanguage: "en",
      author: ref(ID.person),
      creator: ref(ID.person),
      isPartOf: ref(ID.website),
      ...(project.image && { image: `${SITE_URL}${project.image}` }),
      ...(project.tags && project.tags.length > 0 && { keywords: project.tags.join(", ") }),
      ...(project.category && { genre: project.category }),
      ...(project.github && { codeRepository: project.github }),
      ...(project.tags && project.tags.length > 0 && { programmingLanguage: project.tags }),
      ...(project.updatedAt && { dateModified: project.updatedAt }),
    },
    breadcrumbNode(crumbs)
  )
}

export function projectListingGraph(projects: ProjectLike[]) {
  return graph(
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/projects#collection`,
      name: `${SITE_NAME} — Projects`,
      url: `${SITE_URL}/projects`,
      inLanguage: "en",
      isPartOf: ref(ID.website),
      about: ref(ID.person),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          url: `${SITE_URL}/projects/${p.slug}`,
        })),
      },
    },
    breadcrumbNode([{ name: "Projects", path: "/projects" }])
  )
}

export interface CertificateLike {
  title: string
  issuer: string
  date: string
  description?: string
  credentialId?: string
  skills?: string[]
}

export function certificatesGraph(certs: CertificateLike[]) {
  return graph(
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/certificates#collection`,
      name: `${SITE_NAME} — Certifications`,
      url: `${SITE_URL}/certificates`,
      inLanguage: "en",
      isPartOf: ref(ID.website),
      about: ref(ID.person),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: certs.length,
        itemListElement: certs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "EducationalOccupationalCredential",
            name: c.title,
            description: c.description,
            credentialCategory: "certificate",
            recognizedBy: {
              "@type": "Organization",
              name: c.issuer,
            },
            dateCreated: c.date,
            ...(c.credentialId && { identifier: c.credentialId }),
            ...(c.skills && c.skills.length > 0 && { competencyRequired: c.skills.join(", ") }),
            about: ref(ID.person),
          },
        })),
      },
    },
    breadcrumbNode([{ name: "Certificates", path: "/certificates" }])
  )
}

export interface TimelineLike {
  title: string
  date?: string
  year?: string
  description?: string
}

export function timelineGraph(events: TimelineLike[]) {
  return graph(
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/timeline#collection`,
      name: `${SITE_NAME} — Timeline`,
      url: `${SITE_URL}/timeline`,
      inLanguage: "en",
      isPartOf: ref(ID.website),
      about: ref(ID.person),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: events.length,
        itemListElement: events.map((e, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: e.title,
          ...(e.description && { description: e.description }),
        })),
      },
    },
    breadcrumbNode([{ name: "Timeline", path: "/timeline" }])
  )
}

/** WebPage + BreadcrumbList for simple pages that need no richer type. */
export function simplePageGraph(path: string, name: string, description: string, crumbName: string) {
  return graph(
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}#webpage`,
      url: `${SITE_URL}${path}`,
      name,
      description,
      inLanguage: "en",
      isPartOf: ref(ID.website),
      about: ref(ID.person),
    },
    breadcrumbNode([{ name: crumbName, path }])
  )
}

export interface FaqItem {
  question: string
  answer: string
}

/**
 * FAQPage. Note: Google deprecated FAQ *rich results* on 2026-05-07 and pulled
 * Rich Results Test support in June 2026 — the markup is still valid
 * schema.org and still helps AI answer engines extract Q&A pairs, but the
 * visible content on the page is the real asset here, not this node.
 */
export function faqGraph(items: FaqItem[]) {
  return graph(
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/faq#faq`,
      url: `${SITE_URL}/faq`,
      name: `Frequently Asked Questions about ${SITE_NAME}`,
      inLanguage: "en",
      isPartOf: ref(ID.website),
      about: ref(ID.person),
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    breadcrumbNode([{ name: "FAQ", path: "/faq" }])
  )
}

/* ────────────────────────────────────────────────────────────────
   Freelance ProfessionalService.
   ProfessionalService is a LocalBusiness subtype, so address/image/
   priceRange are expected. The previous version also mixed `price` with
   `minPrice`/`maxPrice` in one PriceSpecification, which is contradictory —
   min/max alone is the correct construct for a range.
   ──────────────────────────────────────────────────────────────── */

interface ServiceOffer {
  name: string
  description: string
  minPrice: string
  maxPrice: string
}

const SERVICE_OFFERS: ServiceOffer[] = [
  {
    name: "AI Chatbot Development",
    description: "Custom AI chatbots with LLM integration, RAG, and agentic workflows",
    minPrice: "500",
    maxPrice: "2000",
  },
  {
    name: "Arduino & ESP32 Firmware Development",
    description: "Custom embedded firmware for IoT, sensor integration, and wireless connectivity",
    minPrice: "20",
    maxPrice: "75",
  },
  {
    name: "ROS 2 Application Development",
    description: "Custom ROS 2 apps for Gazebo, URDF, RViz, and real robot deployments",
    minPrice: "25",
    maxPrice: "150",
  },
  {
    name: "n8n Automation & AI Agents",
    description: "Workflow automation, AI agents, and multi-app integrations using n8n",
    minPrice: "45",
    maxPrice: "275",
  },
  {
    name: "PCB Design",
    description: "Schematic capture and PCB layout using Altium Designer, KiCad, Eagle",
    minPrice: "100",
    maxPrice: "500",
  },
]

export const freelanceGraph = graph(
  {
    "@type": "ProfessionalService",
    "@id": ID.service,
    name: "Antony Austin — Freelance Engineering Services",
    url: `${SITE_URL}/freelance`,
    description:
      "Freelance services: AI chatbot development, Arduino/ESP32 firmware, ROS 2 applications, n8n automation, PCB design, and web development. Delivered remotely to clients worldwide.",
    image: `${SITE_URL}/og-image.png`,
    provider: ref(ID.person),
    founder: ref(ID.person),
    priceRange: "$20–$2000",
    currenciesAccepted: "USD",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kochi",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    // The international signal: services are delivered remotely, not locally.
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    availableLanguage: "en",
    isPartOf: ref(ID.website),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Freelance Services",
      itemListElement: SERVICE_OFFERS.map((offer) => ({
        "@type": "Offer",
        url: `${SITE_URL}/freelance`,
        availability: "https://schema.org/InStock",
        seller: ref(ID.person),
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          description: offer.description,
          provider: ref(ID.person),
          areaServed: {
            "@type": "Place",
            name: "Worldwide",
          },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: offer.minPrice,
          maxPrice: offer.maxPrice,
        },
      })),
    },
  },
  breadcrumbNode([{ name: "Freelance", path: "/freelance" }])
)
