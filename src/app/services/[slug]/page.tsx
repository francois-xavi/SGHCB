import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/content";
import { ServiceView } from "@/views/ServiceView";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!getService(slug)) notFound();

  return <ServiceView slug={slug} />;
}
