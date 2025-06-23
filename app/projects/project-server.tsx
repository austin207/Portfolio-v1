// Server Component - NO "use client" directive
import { getProjectBySlug } from "@/lib/data/projects";
import ProjectClient from "./project-client";

interface ProjectServerProps {
  slug: string;
}

export default async function ProjectServer({ slug }: ProjectServerProps) {
  // Server-side data fetching
  const project = await getProjectBySlug(slug);

  if (!project) {
    return null; // This will trigger not found
  }

  // Pass data to client component
  return <ProjectClient project={project} />;
}
