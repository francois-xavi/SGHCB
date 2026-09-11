import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { SiteImage } from "@/components/SiteImage";
import { reasons, services, stats } from "@/data/content";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "SGHCB, Société de Génie Hydraulique et Civil du Bénin : histoire, métiers, zones d'intervention.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="À propos"
        title="Une société de génie, ancrée au Bénin."
        text={company.legal}
        crumbs={[
          { href: "/", label: "Accueil" },
          { href: "/a-propos", label: "À propos" },
        ]}
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-3xl text-navy sm:text-4xl">
            De l&apos;étude au chantier, sans rupture.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">
            SGHCB rassemble les métiers qui font les territoires : l&apos;eau,
            le bâtiment, l&apos;électricité et l&apos;approvisionnement. Nous
            travaillons pour des maîtres d&apos;ouvrage publics et privés, avec
            une exigence simple — des ouvrages qui tiennent, des délais tenus,
            un suivi lisible.
          </p>
          <p className="mt-4 leading-relaxed text-ink/75">
            Le losange du logo — bâtiment, lame d&apos;or, vague hydraulique —
            est le programme de l&apos;entreprise. Quatre pôles, une seule
            responsabilité.
          </p>
        </div>
        <div className="relative min-h-[320px] overflow-hidden bg-mist">
          <SiteImage
            src="/a-propos-chantier.jpg"
            alt="Équipe de chantier SGHCB"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-heading text-3xl text-navy">Chiffres clés</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border border-navy/10 bg-white p-6">
                <p className="font-heading text-4xl text-navy">{s.value}</p>
                <p className="mt-2 font-condensed text-[12px] uppercase tracking-[0.16em] text-ink/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-heading text-3xl text-navy">Nos engagements</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {reasons.map((r) => (
            <article key={r.num} className="border-l-2 border-gold pl-5">
              <h3 className="font-heading text-2xl text-navy">{r.title}</h3>
              <p className="mt-2 text-ink/75">{r.text}</p>
            </article>
          ))}
        </div>
        <ul className="mt-12 flex flex-wrap gap-3">
          {services.map((s) => (
            <li
              key={s.id}
              className="border border-navy/15 px-4 py-2 font-condensed text-[12px] uppercase tracking-[0.16em] text-navy"
            >
              {s.label}
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
