import type { Metadata } from "next"

const SITE_URL = "https://antonyaustin.site"
const SITE_NAME = "Antony Austin"
const DEFAULT_TITLE = "Antony Austin — Applied Electronics Engineer | VLSI | Robotics | AI/ML"
const DEFAULT_DESCRIPTION =
  "Portfolio of Antony Austin — AEI undergraduate at RSET specializing in VLSI, embedded systems, robotics, and AI/ML. Co-founder & CTO of VirtusCo (autonomous porter robot). Founder of Noviq. Builder of a 253M-parameter LLM. Freelance ROS 2 developer."
const DEFAULT_KEYWORDS = [
  "Antony Austin",
  "Electronics Engineer",
  "Embedded Systems",
  "AI/ML",
  "Robotics",
  "ROS 2",
  "Automation",
  "IoT",
  "VLSI",
  "Arduino",
  "ESP32",
  "Python",
  "C++",
  "PCB Design",
  "Altium Designer",
  "VirtusCo",
  "Next.js Developer",
  "Freelance Engineer",
  "n8n Automation",
  "AI Agents",
  "Noviq",
  "SystemVerilog",
  "COMSOL",
  "nRF5340",
  "Zephyr RTOS",
  "MAP-NEO",
  "HuggingFace",
  "Kochi India",
  "Rajagiri",
]
const OG_IMAGE = `${SITE_URL}/og-image.png`

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article"
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

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: author, url: SITE_URL }],
    creator: author,
    publisher: author,
    robots: noIndex
      ? { index: false, follow: false }
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
      type,
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
    },
  }
}

// Person structured data (home page)
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Antony Austin",
  givenName: "Antony",
  familyName: "Austin",
  jobTitle: "Applied Electronics Engineer | VLSI | Embedded Systems | Robotics | AI/ML",
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  email: "austinantony06@gmail.com",
  image: `${SITE_URL}/Profile.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Rajagiri School of Engineering & Technology",
    url: "https://www.rajagiritech.ac.in/",
  },
  knowsAbout: [
    "Electronics Engineering",
    "Embedded Systems",
    "Artificial Intelligence",
    "Machine Learning",
    "Robotics",
    "ROS 2",
    "Automation",
    "IoT",
    "VLSI Design",
    "PCB Design",
    "Microcontrollers",
    "Arduino",
    "ESP32",
    "Python",
    "Next.js",
    "n8n Automation",
  ],
  sameAs: [
    "https://github.com/austin207",
    "https://linkedin.com/in/antony-austin-b7287226a",
    "https://x.com/AntonyAustin19",
    "https://medium.com/@austinantony06",
    "https://www.instagram.com/antonyavstin",
    "https://pro.fiverr.com/s/7Y9Kbq4",
    "https://www.noviq.website",
    "https://huggingface.co/Austin207",
  ],
  founder: [
    {
      "@type": "Organization",
      name: "VirtusCo",
      description: "Robotics-focused tech startup",
    },
    {
      "@type": "Organization",
      name: "Noviq",
      url: "https://www.noviq.website",
      description: "Web development studio for local businesses in Kochi — websites, apps, and AI chatbots",
    },
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Freelance Electronics Engineer & Developer",
    occupationLocation: {
      "@type": "Country",
      name: "India",
    },
  },
}

// Website structured data
export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  author: {
    "@type": "Person",
    name: "Antony Austin",
  },
}

// Service structured data for freelance
export const freelanceStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Antony Austin — Freelance Engineering Services",
  url: `${SITE_URL}/freelance`,
  description:
    "Freelance services: AI chatbot development, Arduino/ESP32 firmware, ROS 2 applications, n8n automation, PCB design, and web development.",
  provider: {
    "@type": "Person",
    name: "Antony Austin",
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Freelance Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Chatbot Development",
          description: "Custom AI chatbots with LLM integration, RAG, and agentic workflows",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: "500",
          minPrice: "500",
          maxPrice: "2000",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Arduino & ESP32 Firmware Development",
          description: "Custom embedded firmware for IoT, sensor integration, and wireless connectivity",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: "20",
          minPrice: "20",
          maxPrice: "75",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ROS 2 Application Development",
          description: "Custom ROS 2 apps for Gazebo, URDF, RViz, and real robot deployments",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: "25",
          minPrice: "25",
          maxPrice: "150",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "n8n Automation & AI Agents",
          description: "Workflow automation, AI agents, and multi-app integrations using n8n",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: "45",
          minPrice: "45",
          maxPrice: "275",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "PCB Design",
          description: "Schematic capture and PCB layout using Altium Designer, KiCad, Eagle",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: "100",
          minPrice: "100",
          maxPrice: "500",
        },
      },
    ],
  },
}
