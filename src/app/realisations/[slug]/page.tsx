import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { GoldButton } from "@/components/GoldButton";
import { SiteImage } from "@/components/SiteImage";
import { getProject, projects, serviceLabel } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.location}`,
    description: p.excerpt,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <>
      <section className="relative min-h-[52vh] overflow-hidden bg-navy text-white">
        <SiteImage
          src={p.image}
          alt={p.title}
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-7xl flex-col justify-end px-6 py-16">
          <p className="font-condensed text-[12px] uppercase tracking-[0.22em] text-gold">
            {serviceLabel[p.category]} · {p.location} · {p.year}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold sm:text-6xl">
            {p.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-ink/80">{p.description}</p>
          <GoldButton href="/devis" className="mt-8">
            Un projet similaire
          </GoldButton>
        </div>
        <aside className="border border-navy/10 bg-mist p-6 lg:col-span-5">
          <dl className="space-y-4">
            <Row label="Localisation" value={p.location} />
            <Row label="Année" value={p.year} />
            <Row label="Durée" value={p.duration} />
            {p.client ? <Row label="Client" value={p.client} /> : null}
            <Row label="Pôle" value={serviceLabel[p.category]} />
          </dl>
          <Link
            href="/realisations"
            className="mt-8 inline-block font-condensed text-[12px] uppercase tracking-[0.16em] text-ocean hover:text-gold"
          >
            ← Toutes les réalisations
          </Link>
        </aside>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-heading text-3xl text-navy">Galerie</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {p.gallery.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden bg-navy">
                <SiteImage
                  src={src}
                  alt={`${p.title} — vue de chantier`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-navy/10 pb-3">
      <dt className="font-condensed text-[11px] uppercase tracking-[0.16em] text-ink/50">
        {label}
      </dt>
      <dd className="text-navy">{value}</dd>
    </div>
  );
}
