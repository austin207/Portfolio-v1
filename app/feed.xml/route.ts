import { SITE_URL, SITE_NAME } from "@/lib/seo"
import { getAllPosts } from "@/lib/data/blog-posts"

export const dynamic = "force-static"

/** XML entity escaping. Titles contain colons and ampersands — skipping this
 *  produces a feed that fails validation and silently breaks readers. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = await getAllPosts()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`
      return [
        "    <item>",
        `      <title>${esc(post.title)}</title>`,
        `      <link>${esc(url)}</link>`,
        `      <guid isPermaLink="true">${esc(url)}</guid>`,
        `      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`,
        `      <description><![CDATA[${post.excerpt}]]></description>`,
        ...(post.tags ?? []).map((tag) => `      <category>${esc(tag)}</category>`),
        "    </item>",
      ].join("\n")
    })
    .join("\n")

  const lastBuildDate =
    posts.length > 0 ? new Date(posts[0].publishedAt).toUTCString() : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)} — Technical Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Technical writing on embedded systems, robotics, VLSI, and AI/ML by ${esc(SITE_NAME)}.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
