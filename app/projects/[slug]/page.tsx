import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import ProjectClient from "../project-client";
import { Metadata } from "next";
import { generateSEO, projectGraph, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/json-ld";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return generateSEO({
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
      noIndex: true,
    });
  }

  // Routed through generateSEO so this page gets its OWN canonical, plus the
  // twitter card and openGraph locale/siteName the hand-rolled version dropped.
  return generateSEO({
    title: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    type: "article",
    modifiedTime: project.updatedAt,
    ...(project.image && { image: `${SITE_URL}${project.image}` }),
    ...(project.tags && project.tags.length > 0 && { keywords: project.tags }),
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={projectGraph(project, [
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <ProjectClient project={project} />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { slug: '32-bit-tiny-gpu' },
    { slug: 'axelcc-compiler' },
    { slug: 'axel-assembler' },
    { slug: 'tiny-gpu-fpga-port' },
    { slug: 'ai-ml-language-models' },
    { slug: 'ambulance-traffic-system' },
    { slug: 'computer-vision' },
    { slug: 'iot-home-automation' },
    { slug: 'solar-tracker' },
    { slug: 'wifi-range-extension' },
  ];
}

