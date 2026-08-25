import type { MetadataRoute } from "next"
import { getAllProjects } from "@/lib/data/projects"
import { getAllPosts } from "@/lib/data/blog-posts"
import { SITE_URL } from "@/lib/seo"
import routeDates from "@/content/data/route-dates.json"

type StaticRoute = {
  path: string
  changeFrequency: "weekly" | "monthly"
  priority: number
}

const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/freelance", changeFrequency: "weekly", priority: 0.9 },
  { path: "/certificates", changeFrequency: "monthly", priority: 0.7 },
  { path: "/timeline", changeFrequency: "monthly", priority: 0.7 },
  { path: "/skills-path", changeFrequency: "monthly", priority: 0.7 },
]

// Previously every static route reported `new Date()` — i.e. build time — so
// the whole sitemap claimed "modified today" on every deploy, which makes
// lastmod worthless as a freshness signal. Dates now come from a
// hand-maintained map in content/data/route-dates.json.
const dates = routeDates as Record<string, string>

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getAllProjects(), getAllPosts()])

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified: new Date(dates[route.path] ?? "2026-08-25"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...projectPages, ...blogPages]
}
