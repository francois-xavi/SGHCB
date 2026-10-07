import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/content";
import { ProjectView } from "@/views/ProjectView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.location ? `${p.title.fr} — ${p.location}` : p.title.fr,
    description: p.excerpt.fr,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();

  return <ProjectView slug={slug} />;
}
