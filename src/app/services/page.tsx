import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { PoleIcon } from "@/components/PoleIcon";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Services BTP, forage, électricité",
  description:
    "Les 4 pôles SGHCB : eau et génie hydraulique, BTP, électricité et commerce général au Bénin.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Quatre pôles, un interlocuteur."
        text="Choisissez le métier. Le devis, le chantier et le suivi restent chez SGHCB."
        crumbs={[
          { href: "/", label: "Accueil" },
          { href: "/services", label: "Services" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="group flex flex-col border border-navy/10 bg-mist p-8 transition hover:border-gold hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-14 items-center justify-center border border-ocean/30 text-ocean">
                  <PoleIcon id={s.id} />
                </div>
                <span className="font-condensed text-[11px] uppercase tracking-[0.2em] text-gold">
                  Pôle {s.label}
                </span>
              </div>
              <h2 className="mt-8 font-heading text-3xl text-navy">
                {s.headline}
              </h2>
              <p className="mt-4 text-ink/75">{s.short}</p>
              <span className="mt-8 font-condensed text-[12px] uppercase tracking-[0.16em] text-ocean group-hover:text-gold">
                Ouvrir la fiche →
              </span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
