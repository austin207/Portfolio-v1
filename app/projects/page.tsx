import { getAllProjects } from "@/lib/data/projects"
import { projectListingGraph } from "@/lib/seo"
import JsonLd from "@/components/json-ld"
import ProjectsClient, { type ProjectListItem } from "./projects-client"

// Server wrapper so the listing schema is server-rendered (AI crawlers do not
// run JS) and so the visible cards and the ItemList schema are built from the
// SAME source — content/projects/*.json via getAllProjects().
//
// The JSON-LD lives here rather than in layout.tsx because the layout also
// wraps /projects/[slug], which would otherwise inherit the listing's
// CollectionPage node and a second, conflicting BreadcrumbList.
export default async function ProjectsPage() {
  const projects = await getAllProjects()

  const items: ProjectListItem[] = projects.map((p) => ({
    id: p.slug,
    title: p.title,
    description: p.description,
    image: p.image,
    tags: p.tags ?? [],
    status: p.status,
    duration: p.duration,
    category: p.category,
  }))

  return (
    <>
      <JsonLd data={projectListingGraph(projects)} />
      <ProjectsClient projects={items} />
    </>
  )
}
