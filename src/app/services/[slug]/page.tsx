import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { SiteImage } from "@/components/SiteImage";
import { getService, projectsByCategory, type ServiceId } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

const slugs = ["eau", "btp", "electricite", "commerce-general"] as const;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
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
  const service = getService(slug);
  if (!service) notFound();

  const gallery = projectsByCategory(service.id as ServiceId).slice(0, 4);

  return (
    <>
      <PageHero
        kicker="Pôle d'activité"
        title={service.headline}
        text={service.intro}
        crumbs={[
          { href: "/", label: "Accueil" },
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.label },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-condensed text-[12px] uppercase tracking-[0.28em] text-ocean">
              Prestations
            </p>
            <h2 className="mt-3 font-heading text-3xl text-navy sm:text-4xl">
              Ce que nous réalisons
            </h2>
            <ul className="mt-8 divide-y border-y border-navy/10">
              {service.prestations.map((p) => (
                <li key={p.title} className="py-6">
                  <h3 className="font-heading text-xl text-navy">{p.title}</h3>
                  <p className="mt-2 text-ink/75">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="relative min-h-[280px] overflow-hidden bg-mist">
              <SiteImage
                src={service.image}
                alt={service.label}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 font-condensed text-[12px] uppercase tracking-[0.16em] text-ink/50">
              {service.label} · Bénin
            </p>
          </div>
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="bg-mist">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-heading text-3xl text-navy">
              Réalisations liées
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {gallery.map((p) => (
                <a
                  key={p.slug}
                  href={`/realisations/${p.slug}`}
                  className="relative block min-h-[220px] overflow-hidden bg-navy"
                >
                  <SiteImage
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-navy/40" />
                  <p className="absolute bottom-4 left-4 font-heading text-xl text-white">
                    {p.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="font-condensed text-[12px] uppercase tracking-[0.28em] text-ocean">
            Conversion
          </p>
          <h2 className="mt-3 font-heading text-3xl text-navy sm:text-4xl">
            Demander un devis — {service.label}
          </h2>
          <p className="mt-4 text-ink/75">
            Le service est déjà pré-sélectionné. Décrivez le projet, nous
            revenons vers vous sous 24–48h.
          </p>
        </div>
        <div className="border border-navy/10 bg-mist p-6 sm:p-8">
          <QuoteForm defaultService={service.id} />
        </div>
      </section>
      <CtaBand title={`Un projet ${service.label.toLowerCase()} ?`} />
    </>
  );
}
