import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { GoldButton } from "@/components/GoldButton";
import { Hero } from "@/components/Hero";
import { PoleIcon } from "@/components/PoleIcon";
import { QuoteForm } from "@/components/QuoteForm";
import { SiteImage } from "@/components/SiteImage";
import {
  featuredProjects,
  process,
  reasons,
  serviceLabel,
  services,
  stats,
  testimonials,
} from "@/data/content";
import { company } from "@/lib/company";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="poles" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
            Quatre pôles
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-4xl font-semibold text-navy sm:text-5xl">
            Un métier. Quatre expertises.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">
            Le losange du logo n&apos;est pas un décor : c&apos;est la carte
            de nos métiers. Choisissez le pôle, nous prenons le chantier.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="group relative border border-navy/10 bg-mist p-7 transition duration-300 hover:-translate-y-1 hover:border-gold hover:bg-white hover:shadow-[0_20px_50px_rgba(11,37,69,0.08)]"
              >
                <div className="flex size-14 items-center justify-center border border-ocean/25 text-ocean transition group-hover:border-gold group-hover:text-gold">
                  <PoleIcon id={s.id} />
                </div>
                <h3 className="mt-6 font-heading text-2xl text-navy">
                  {s.label}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                  {s.short}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-condensed text-[12px] uppercase tracking-[0.16em] text-ocean group-hover:text-gold">
                  Voir le pôle <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-field">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="text-center lg:text-left">
              <p className="font-heading text-5xl font-semibold text-gold">
                {item.value}
              </p>
              <p className="mt-2 font-condensed text-[12px] uppercase tracking-[0.2em] text-white/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
                Projets phares
              </p>
              <h2 className="mt-3 font-heading text-4xl font-semibold text-navy sm:text-5xl">
                Ce que le terrain retient.
              </h2>
            </div>
            <GoldButton href="/realisations" variant="navy">
              Toutes les réalisations
            </GoldButton>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/realisations/${p.slug}`}
                className="group relative block min-h-[340px] overflow-hidden bg-navy"
              >
                <SiteImage
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-condensed text-[11px] uppercase tracking-[0.2em] text-gold">
                    {serviceLabel[p.category]} · {p.location} · {p.year}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl text-white">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
            Pourquoi SGHCB
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-4xl font-semibold text-navy sm:text-5xl">
            Le chantier, sans improvisation.
          </h2>
          <div className="mt-12 grid gap-px bg-navy/10 sm:grid-cols-2">
            {reasons.map((r) => (
              <article key={r.num} className="bg-white p-8">
                <p className="font-condensed text-[13px] text-gold">{r.num}</p>
                <h3 className="mt-3 font-heading text-2xl text-navy">
                  {r.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/75">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
            Processus
          </p>
          <h2 className="mt-3 font-heading text-4xl font-semibold text-navy sm:text-5xl">
            Quatre étapes. Un seul fil.
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-4">
            {process.map((step, i) => (
              <div key={step.num} className="relative">
                {i < process.length - 1 ? (
                  <span
                    className="absolute left-8 top-4 hidden h-px w-[calc(100%-1rem)] bg-gold/50 lg:block"
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-10 flex size-8 items-center justify-center bg-gold font-condensed text-[12px] font-bold text-navy">
                  {step.num}
                </div>
                <h3 className="mt-5 font-heading text-2xl text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-ink/75">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
            Témoignages
          </p>
          <h2 className="mt-3 font-heading text-4xl font-semibold text-navy">
            Ce que disent les maîtres d&apos;ouvrage.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="border-l-2 border-gold bg-mist p-8"
              >
                <p className="text-lg leading-relaxed text-ink/85">
                  « {t.quote} »
                </p>
                <footer className="mt-6">
                  <cite className="not-italic font-heading text-navy">
                    {t.name}
                  </cite>
                  <p className="mt-1 text-sm text-ink/60">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
              Devis
            </p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-navy">
              Décrivez le projet. Nous chiffrons.
            </h2>
            <p className="mt-4 text-lg text-ink/75">
              Formulaire structuré, réponse sous 24–48h. En Afrique de
              l&apos;Ouest, le plus rapide reste souvent un appel ou WhatsApp —
              les deux sont à un tap.
            </p>
            <a
              href={company.phoneHref}
              className="mt-8 inline-block font-heading text-3xl text-navy hover:text-ocean"
            >
              {company.phoneDisplay}
            </a>
          </div>
          <div className="border border-navy/10 bg-white p-6 sm:p-8">
            <QuoteForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
