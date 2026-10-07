"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "motion/react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { CtaBand } from "@/components/CtaBand";
import { FeaturedProjectsCarousel } from "@/components/FeaturedProjectsCarousel";
import { GoldButton } from "@/components/GoldButton";
import { Hero } from "@/components/Hero";
import { PoleIcon } from "@/components/PoleIcon";
import { QuoteWizard } from "@/components/QuoteWizard";
import { Testimonials } from "@/components/Testimonials";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { StepsTimeline } from "@/components/motion/StepsTimeline";
import { TiltCard } from "@/components/motion/TiltCard";
import {
  engagements,
  process,
  reasons,
  services,
  stats,
  testimonials,
} from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company, emailLink } from "@/lib/company";
import { pillarLordicon, type LordiconName } from "@/lib/lordicons";

const reasonIcons: LordiconName[] = ["team", "ribbon", "desktop", "plant"];
const engagementIcons: LordiconName[] = ["medal", "eye", "recycling", "heart"];

export function HomeView() {
  const { t, tr } = useLanguage();

  return (
    <>
      <Hero />

      <section id="poles" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
              {t.home.polesKicker}
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-4xl font-semibold text-navy sm:text-5xl">
              {t.home.polesTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-ink/75">
              {tr(company.baseline)}
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <RevealItem key={s.id} className="h-full">
                <TiltCard className="h-full">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative block h-full border border-neutral-border bg-mist p-7 transition duration-300 hover:border-gold hover:bg-white hover:shadow-[0_20px_50px_rgba(8,31,66,0.08)]"
                  >
                    <div className="flex size-14 items-center justify-center border border-ocean/25 text-ocean transition group-hover:border-gold group-hover:text-gold">
                      <AnimatedIcon
                        name={pillarLordicon[s.id]}
                        size={40}
                        fallback={<PoleIcon id={s.id} />}
                      />
                    </div>
                    <h3 className="mt-6 font-heading text-2xl text-navy">
                      {tr(s.label)}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                      {tr(s.short)}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-condensed text-[12px] uppercase tracking-[0.16em] text-ocean group-hover:text-gold">
                      {t.home.seePole}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </Link>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="navy-field">
        <RevealGroup className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <RevealItem key={item.label.fr} className="text-center lg:text-left">
              <p className="font-heading text-5xl font-semibold text-gold">
                <CountUp value={item.value} />
              </p>
              <m.span
                aria-hidden
                className="mx-auto mt-3 block h-px w-16 origin-left bg-gold/60 lg:mx-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <p className="mt-3 font-condensed text-[12px] uppercase tracking-[0.2em] text-white/70">
                {tr(item.label)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
                {t.home.projectsKicker}
              </p>
              <h2 className="mt-3 font-heading text-4xl font-semibold text-navy sm:text-5xl">
                {t.home.projectsTitle}
              </h2>
            </div>
            <GoldButton href="/realisations" variant="navy">
              {t.home.allProjects}
            </GoldButton>
          </Reveal>

          <Reveal className="mt-12" delay={0.1}>
            <FeaturedProjectsCarousel />
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12">
          <Reveal className="self-start lg:sticky lg:top-36 lg:col-span-5">
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
              {t.home.whyKicker} {company.name}
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-4xl font-semibold text-navy sm:text-5xl">
              {t.home.whyTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-ink/75">{t.home.whyIntro}</p>
          </Reveal>
          <RevealGroup
            className="grid gap-px bg-neutral-border sm:grid-cols-2 lg:col-span-7"
            stagger={0.12}
          >
            {reasons.map((r, i) => (
              <RevealItem
                key={r.num}
                as="article"
                data-icon-trigger
                className="group bg-white p-8 transition-colors duration-300 hover:bg-mist"
              >
                <div className="flex items-center justify-between">
                  <p className="font-condensed text-[13px] text-gold">{r.num}</p>
                  <AnimatedIcon name={reasonIcons[i]} size={44} trigger="in-view" />
                </div>
                <h3 className="mt-3 font-heading text-2xl text-navy">{tr(r.title)}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{tr(r.text)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
              {t.home.engagementsKicker}
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-4xl font-semibold text-navy sm:text-5xl">
              {t.home.engagementsTitle}
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engagements.map((item, i) => (
              <RevealItem key={item.title.fr} className="h-full">
                <TiltCard className="h-full">
                  <article className="h-full border border-neutral-border bg-white p-7 transition-colors duration-300 hover:border-gold">
                    <AnimatedIcon
                      name={engagementIcons[i]}
                      size={48}
                      trigger="in-view"
                    />
                    <h3 className="mt-4 font-heading text-2xl text-navy">{tr(item.title)}</h3>
                    <p className="mt-3 leading-relaxed text-ink/75">{tr(item.text)}</p>
                  </article>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
              {t.home.processKicker}
            </p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-navy sm:text-5xl">
              {t.home.processTitle}
            </h2>
          </Reveal>
          <StepsTimeline
            steps={process.map((s) => ({ num: s.num, title: tr(s.title), text: tr(s.text) }))}
          />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
              {t.home.testimonialsKicker}
            </p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-navy">
              {t.home.testimonialsTitle}
            </h2>
          </Reveal>
          <Testimonials items={testimonials} />
        </div>
      </section>

      <CtaBand />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2">
          <Reveal>
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-ocean">
              {t.home.quoteKicker}
            </p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-navy">
              {t.home.quoteTitle}
            </h2>
            <p className="mt-4 text-lg text-ink/75">{t.home.quoteText}</p>
            <a
              href={emailLink()}
              className="mt-8 inline-block break-all font-heading text-2xl text-navy hover:text-ocean sm:text-3xl"
            >
              {company.email}
            </a>
          </Reveal>
          <Reveal delay={0.15} className="border border-neutral-border bg-mist p-6 sm:p-8">
            <QuoteWizard compact />
          </Reveal>
        </div>
      </section>
    </>
  );
}
