import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import ProjectClient from "../project-client";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  return <ProjectClient project={project} />;
}

export async function generateStaticParams() {
  return [
    { slug: 'ai-ml-language-models' },
    { slug: 'ambulance-traffic-system' },
    { slug: 'computer-vision' },
    { slug: 'iot-home-automation' },
    { slug: 'solar-tracker' },
    { slug: 'wifi-range-extension' },
  ];
}
