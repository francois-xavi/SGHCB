"use client";

import Link from "next/link";
import { m } from "motion/react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { CtaBand } from "@/components/CtaBand";
import { OrgChart } from "@/components/OrgChart";
import { PageHero } from "@/components/PageHero";
import { PoleIcon } from "@/components/PoleIcon";
import { SiteImage } from "@/components/SiteImage";
import { CountUp } from "@/components/motion/CountUp";
import { Marquee } from "@/components/motion/Marquee";
import { EASE_OUT, Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { StepsTimeline } from "@/components/motion/StepsTimeline";
import { TiltCard } from "@/components/motion/TiltCard";
import { engagements, services, stats } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company } from "@/lib/company";
import { pillarLordicon, type LordiconName } from "@/lib/lordicons";

const mvvIcons: LordiconName[] = ["target", "globe", "heart"];
const engagementIcons: LordiconName[] = ["medal", "eye", "recycling", "heart"];

export function AboutView() {
  const { t, tr } = useLanguage();
  const a = t.about;
  const tools = a.tools.split(" · ");

  return (
    <>
      <PageHero
        kicker={a.kicker}
        title={a.title}
        text={company.legal}
        crumbs={[
          { href: "/", label: t.nav.home },
          { href: "/a-propos", label: t.nav.about },
        ]}
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <RevealGroup stagger={0.12}>
          <RevealItem as="h2" className="font-heading text-3xl text-navy sm:text-4xl">
            {a.historyTitle}
          </RevealItem>
          {a.history.map((paragraph, i) => (
            <RevealItem
              as="p"
              key={i}
              className={
                i === 0
                  ? "mt-5 text-lg leading-relaxed text-ink/80"
                  : "mt-4 leading-relaxed text-ink/75"
              }
            >
              {paragraph}
            </RevealItem>
          ))}
        </RevealGroup>
        <m.div
          className="relative min-h-[320px] overflow-hidden bg-mist lg:min-h-[420px]"
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          whileInView={{ clipPath: "inset(0 0 0 0%)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
        >
          <SiteImage
            src="/a-propos-chantier.jpg"
            alt={a.imageAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 bg-gold px-5 py-3 font-condensed text-[12px] font-semibold uppercase tracking-[0.18em] text-primary-darker">
            {company.name} · {company.founded}
          </div>
        </m.div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <h2 className="font-heading text-3xl text-navy">{a.statsTitle}</h2>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <RevealItem
                key={s.label.fr}
                className="border border-neutral-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-gold"
              >
                <p className="font-heading text-4xl text-navy">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2 font-condensed text-[12px] uppercase tracking-[0.16em] text-ink/60">
                  {tr(s.label)}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <h2 className="font-heading text-3xl text-navy">{a.mvvTitle}</h2>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-6 lg:grid-cols-3" stagger={0.12}>
          {a.mvv.map((item, i) => (
            <RevealItem key={item.title} className="h-full">
              <TiltCard className="h-full">
                <article className="h-full border-l-2 border-gold bg-mist p-7 transition-colors duration-300 hover:bg-white">
                  <AnimatedIcon name={mvvIcons[i]} size={52} trigger="in-view" />
                  <h3 className="mt-4 font-heading text-2xl text-navy">{item.title}</h3>
                  <p className="mt-2 text-ink/75">{item.text}</p>
                </article>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <h2 className="font-heading text-3xl text-navy">{a.orgTitle}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink/75">{a.orgText}</p>
          </Reveal>
          <OrgChart
            root={a.departments[0]}
            leaderLabel={a.leaderLabel}
            leaderName={company.leader.name}
            leaderTitle={tr(company.leader.title)}
            departments={a.departments.slice(1)}
            expertsLabel={a.expertsLabel}
            experts={a.experts}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <h2 className="font-heading text-3xl text-navy">{a.strategyTitle}</h2>
        </Reveal>
        <StepsTimeline steps={a.strategy} columns={3} />
      </section>

      <section className="border-y border-neutral-border bg-white py-8">
        <p className="mb-4 text-center font-condensed text-[12px] uppercase tracking-[0.2em] text-ink/60">
          {a.toolsLabel.replace(/\s*:$/, "")}
        </p>
        <Marquee>
          {[...tools, ...tools].map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="mx-8 font-heading text-3xl text-navy/25 transition-colors hover:text-navy sm:text-4xl"
            >
              {tool}
            </span>
          ))}
        </Marquee>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <h2 className="font-heading text-3xl text-navy">{a.engagementsTitle}</h2>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 md:grid-cols-2">
            {engagements.map((r, i) => (
              <RevealItem
                key={r.title.fr}
                data-icon-trigger
                className="flex gap-4 border-l-2 border-gold pl-5"
              >
                <AnimatedIcon name={engagementIcons[i]} size={44} />
                <div>
                  <h3 className="font-heading text-2xl text-navy">{tr(r.title)}</h3>
                  <p className="mt-2 text-ink/75">{tr(r.text)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <RevealGroup as="ul" className="mt-12 flex flex-wrap gap-3" stagger={0.05}>
            {services.map((s) => (
              <RevealItem
                as="li"
                key={s.id}
                className="border border-neutral-border bg-white font-condensed text-[12px] uppercase tracking-[0.16em] text-navy transition hover:-translate-y-0.5 hover:border-gold"
              >
                <Link
                  href={`/services/${s.slug}`}
                  data-icon-trigger
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <AnimatedIcon
                    name={pillarLordicon[s.id]}
                    size={22}
                    fallback={<PoleIcon id={s.id} className="size-4 text-ocean" />}
                  />
                  {tr(s.label)}
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
