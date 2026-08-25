import { SITE_URL } from "@/lib/seo"
import { getAllProjects } from "@/lib/data/projects"
import { getAllPosts } from "@/lib/data/blog-posts"
import { services } from "@/lib/data/services"
import { socialLinks } from "@/lib/data/social-links"
import faqData from "@/content/data/faq.json"

export const dynamic = "force-static"

/**
 * /llms.txt
 *
 * Honest status: no major AI provider has confirmed reading llms.txt at
 * inference time, and crawl data shows GPTBot fetching it rarely with
 * ClaudeBot and PerplexityBot essentially never. It is included as cheap
 * insurance, not as a driver of citations — the real work is the
 * server-rendered HTML and schema on the pages this file points at.
 *
 * Generated from the same sources the site renders from, so it cannot drift
 * out of sync the way a hand-written static file would.
 */
export async function GET() {
  const [projects, posts] = await Promise.all([getAllProjects(), getAllPosts()])

  const lines: string[] = []

  lines.push("# Antony Austin")
  lines.push("")
  lines.push(
    "> Applied Electronics & Instrumentation Engineering undergraduate at Rajagiri School of"
  )
  lines.push(
    "> Engineering & Technology (RSET), Kochi, India. Co-founder & CTO of VirtusCo, a robotics"
  )
  lines.push(
    "> startup building an autonomous airport luggage porter robot. Founder of Noviq, a web and"
  )
  lines.push("> AI studio. Remote firmware developer for ASAT (US). Freelance ROS 2 developer.")
  lines.push("")
  lines.push(
    "Key facts: born 16 March 2005 in Kochi, India. BTech AEI 2023-2027, CGPA 7.9/10."
  )
  lines.push(
    "3+ years of experience, 15+ projects. Built a 253M-parameter LLaMA-style transformer from"
  )
  lines.push(
    "scratch in PyTorch. Wrote a YDLidar X4 Pro ROS 2 driver from scratch with no vendor SDK."
  )
  lines.push(
    "Completing an M.Tech-level thesis on electrothermal simulation of Phase Change Memory"
  )
  lines.push(
    "devices in COMSOL. Works remotely with clients worldwide; all freelance pricing in USD."
  )
  lines.push("")

  lines.push("## Pages")
  lines.push("")
  lines.push(`- [Home](${SITE_URL}/): Overview, skills, experience, and contact details.`)
  lines.push(
    `- [FAQ](${SITE_URL}/faq): Direct answers to the most common questions about Antony Austin.`
  )
  lines.push(`- [Projects](${SITE_URL}/projects): Engineering projects across GPU design, robotics, AI/ML, and IoT.`)
  lines.push(`- [Blog](${SITE_URL}/blog): Technical writing on transformers, automation, and embedded systems.`)
  lines.push(`- [Freelance](${SITE_URL}/freelance): Services, pricing tiers, and how to commission work.`)
  lines.push(`- [Certificates](${SITE_URL}/certificates): Professional certifications and credentials.`)
  lines.push(`- [Timeline](${SITE_URL}/timeline): Chronological engineering journey.`)
  lines.push(`- [Skills Map](${SITE_URL}/skills-path): Interactive breakdown of technical skills.`)
  lines.push("")

  if (projects.length > 0) {
    lines.push("## Projects")
    lines.push("")
    for (const p of projects) {
      lines.push(`- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}`)
    }
    lines.push("")
  }

  if (posts.length > 0) {
    lines.push("## Writing")
    lines.push("")
    for (const post of posts) {
      lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`)
    }
    lines.push("")
  }

  lines.push("## Services")
  lines.push("")
  for (const s of services) {
    const prices = s.tiers.map((t) => t.price).filter((p) => typeof p === "number")
    const range =
      prices.length > 0
        ? ` Starting at $${Math.min(...prices)} USD.`
        : " Quote-based."
    lines.push(`- [${s.title}](${SITE_URL}/freelance): ${s.description}${range}`)
  }
  lines.push("")

  lines.push("## Questions answered on this site")
  lines.push("")
  for (const f of faqData) {
    lines.push(`- ${f.question}`)
  }
  lines.push("")

  lines.push("## Profiles")
  lines.push("")
  lines.push(`- [GitHub](${socialLinks.github}): Source code for the projects listed above.`)
  lines.push(`- [LinkedIn](${socialLinks.linkedin}): Professional history.`)
  lines.push(`- [Hugging Face](${socialLinks.huggingface}): Published models.`)
  lines.push(`- [Medium](${socialLinks.medium}): Long-form technical writing.`)
  lines.push(`- [X](${socialLinks.twitter}): Updates.`)
  lines.push(`- [Fiverr](${socialLinks.fiverr}): Freelance gigs.`)
  lines.push("")

  lines.push("## Contact")
  lines.push("")
  lines.push(`- Email: ${socialLinks.email}`)
  lines.push("- Location: Kochi, Kerala, India (available remotely worldwide)")
  lines.push("")

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
