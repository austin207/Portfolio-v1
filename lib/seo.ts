import type { Metadata } from "next"

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
}

export function generateSEO({
  title = "Antony Austin - Electronics Engineer & Tech Innovator",
  description = "Portfolio of Antony Austin, an Electronics Engineer and Tech Innovator specializing in robotics, AI/ML, embedded systems, and automation. Founder of VirtusCo.",
  keywords = [
    "Electronics Engineer",
    "Embedded Systems",
    "AI/ML",
    "Robotics",
    "Automation",
    "IoT",
    "VLSI",
    "Arduino",
    "Python",
    "C++",
    "PCB Design",
    "VirtusCo",
    "Tech Portfolio",
  ],
  image = "/placeholder.svg?height=630&width=1200",
  url = "https://antonyaustin.dev",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Antony Austin",
}: SEOProps = {}): Metadata {
  const fullTitle = title.includes("Antony Austin") ? title : `${title} | Antony Austin`

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    robots: {
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
      siteName: "Antony Austin Portfolio",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
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
      creator: "@antonyaustin",
    },
    alternates: {
      canonical: url,
    },
    other: {
      "application-name": "Antony Austin Portfolio",
      "apple-mobile-web-app-title": "Antony Austin",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "format-detection": "telephone=no",
      "mobile-web-app-capable": "yes",
      "msapplication-config": "/browserconfig.xml",
      "msapplication-TileColor": "#0891b2",
      "msapplication-tap-highlight": "no",
      "theme-color": "#0891b2",
    },
  }
}

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Antony Austin",
  jobTitle: "Electronics Engineer & Tech Innovator",
  description:
    "Applied Electronics & Instrumentation Engineering undergraduate specializing in robotics, AI/ML, embedded systems, and automation.",
  url: "https://antonyaustin.dev",
  email: "austinantony06@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kochi",
    addressCountry: "India",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Rajagiri School of Engineering & Technology",
  },
  knowsAbout: [
    "Electronics Engineering",
    "Embedded Systems",
    "Artificial Intelligence",
    "Machine Learning",
    "Robotics",
    "Automation",
    "IoT",
    "VLSI Design",
    "PCB Design",
    "Microcontrollers",
  ],
  sameAs: ["https://github.com/austin207", "https://linkedin.com/in/antony-austin"],
  founder: {
    "@type": "Organization",
    name: "VirtusCo",
    description: "Robotics-focused tech startup",
  },
}
