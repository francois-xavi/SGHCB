"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import {
  IconBatiment,
  IconEau,
  IconElectricite,
  IconEtudes,
  IconPrestation,
  IconRoute,
} from "@/components/LogoMarks";
import { Magnetic } from "@/components/motion/Magnetic";
import { pillars } from "@/data/pillars";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company } from "@/lib/company";
import { pillarLordicon } from "@/lib/lordicons";

const SLIDE_MS = 5000;

const pillarIcons = {
  etudes: IconEtudes,
  hydraulique: IconEau,
  "genie-civil": IconBatiment,
  electricite: IconElectricite,
  commerce: IconRoute,
  prestation: IconPrestation,
} as const;

const slides = pillars;
const poles = pillars.map((p) => ({
  ...p,
  href: `/services/${p.slug}`,
  Icon: pillarIcons[p.id],
}));

export function HeroCarousel() {
  const { t, tr } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const active = slides[index];
  const fade = reducedMotion ? "duration-0" : "duration-[800ms]";

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 96]);
  const copyY = useTransform(scrollY, [0, 700], [0, -60]);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, index]);

  const titleWords = t.hero.titleStart.split(" ");

  return (
    <section
      className="relative isolate min-h-[85vh] overflow-hidden bg-primary-darker text-white md:h-[min(100vh,calc(100dvh-7.25rem))] md:max-h-[100vh]"
      aria-roledescription="carousel"
      aria-label={`${t.hero.slidesLabel} ${company.name}`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setPaused(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setPaused(false);
      }}
    >
      <m.div className="absolute inset-x-0 -top-24 bottom-0" style={{ y: bgY }}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 overflow-hidden transition-opacity ease-in-out ${fade} ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              {...(i === 0 ? {} : { loading: "eager" as const })}
              className={`object-cover object-[78%_center] md:object-[82%_center] ${
                i === index && !reducedMotion ? "ken-burns" : ""
              }`}
              sizes="100vw"
            />
          </div>
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary-darker from-[12%] via-primary-darker/88 via-[55%] to-primary-darker/45 md:hidden"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-primary-darker/80 to-transparent md:hidden"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden bg-gradient-to-r from-primary-darker/90 via-primary-darker/60 to-primary-darker/30 md:block"
          aria-hidden
        />
      </m.div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-end px-6 pb-8 pt-10 md:h-full md:min-h-0 md:justify-center md:py-16 lg:px-8">
        <m.div className="hero-copy-shadow max-w-3xl" style={{ y: copyY }}>
          <p
            className="hero-reveal font-condensed text-xs font-semibold uppercase tracking-widest text-gold md:text-sm"
            style={{ "--hero-delay": "0ms" } as CSSProperties}
          >
            {company.legal}
          </p>

          <h1
            key={t.hero.titleStart}
            className="mt-4 max-w-[18ch] font-heading text-3xl font-semibold leading-tight md:mt-5 md:max-w-none md:text-6xl"
          >
            {titleWords.map((word, i) => (
              <m.span
                key={`${word}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: "0.6em", filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}&nbsp;
              </m.span>
            ))}
            <br className="md:hidden" />
            <m.span
              className="inline-block text-gold"
              initial={{ opacity: 0, y: "0.6em", filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + titleWords.length * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t.hero.titleEnd}.
            </m.span>
          </h1>

          <p
            className="hero-reveal mt-5 hidden max-w-xl text-[15px] leading-relaxed text-primary-pale/90 md:block"
            style={{ "--hero-delay": "400ms" } as CSSProperties}
          >
            {tr(company.baseline)}
          </p>

          <div
            className="hero-reveal relative mt-6 min-h-[3.25rem]"
            style={{ "--hero-delay": "450ms" } as CSSProperties}
            aria-live="polite"
          >
            {slides.map((slide, i) => (
              <p
                key={slide.id}
                className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 transition-all ease-in-out ${fade} ${
                  i === index
                    ? "relative translate-y-0 opacity-100"
                    : "pointer-events-none absolute inset-0 translate-y-2 opacity-0"
                }`}
              >
                <span
                  className="font-condensed text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: slide.accentColor }}
                >
                  {tr(slide.heroLabel)}
                </span>
                <span className="text-[15px] italic text-white/80">
                  {tr(slide.heroPhrase)}
                </span>
              </p>
            ))}
          </div>

          <ul
            className="hero-reveal mt-5 grid grid-cols-3 gap-x-2 gap-y-3 md:mt-6 md:flex md:flex-wrap md:items-center md:gap-x-0 md:gap-y-3"
            style={{ "--hero-delay": "500ms" } as CSSProperties}
          >
            {poles.map(({ id, href, label, shortLabel, Icon }, i) => {
              const isActive = active.id === id;
              return (
                <li
                  key={href}
                  className={`flex justify-center md:items-center ${
                    i > 0 ? "md:ml-4 md:border-l md:border-white/30 md:pl-4" : ""
                  }`}
                >
                  <Link
                    href={href}
                    data-icon-trigger
                    aria-current={isActive ? "true" : undefined}
                    onFocus={() => goTo(i)}
                    className={`group flex flex-col items-center transition duration-200 ease-out md:flex-row md:gap-2 ${
                      isActive
                        ? "scale-105 text-gold"
                        : "text-white/80 md:hover:-translate-y-1 md:hover:text-gold"
                    }`}
                  >
                    <AnimatedIcon
                      name={pillarLordicon[id]}
                      size={28}
                      tone="dark"
                      play={isActive ? index + 1 : 0}
                      fallback={<Icon className="size-6 md:size-7" />}
                    />
                    <span className="mt-1.5 text-center font-condensed text-[10px] uppercase tracking-[0.1em] md:mt-0 md:text-[11px] md:tracking-[0.12em]">
                      <span className="md:hidden">{tr(shortLabel)}</span>
                      <span className="hidden md:inline">{tr(label)}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="hero-reveal mt-8 flex flex-col items-start gap-4 md:mt-10 md:flex-row md:items-center md:gap-6"
            style={{ "--hero-delay": "600ms" } as CSSProperties}
          >
            <Magnetic>
              <Link
                href="/devis"
                className="inline-flex w-auto cursor-pointer items-center justify-center rounded-md bg-gold px-8 py-4 font-condensed text-[15px] font-semibold uppercase tracking-[0.14em] text-primary-darker transition-colors duration-200 hover:bg-gold-deep"
              >
                {t.nav.quote}
              </Link>
            </Magnetic>
            <Link
              href="/realisations"
              className="group text-[15px] text-white underline decoration-white/70 underline-offset-4 transition-colors duration-200 hover:text-gold hover:decoration-gold"
            >
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                {t.hero.seeProjects}
              </span>
            </Link>
          </div>

          <div
            className="hero-reveal mt-6 w-full border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md md:hidden"
            style={{ "--hero-delay": "700ms" } as CSSProperties}
          >
            <ProofStat />
          </div>

          <div
            className="hero-reveal mt-5 flex items-center gap-1 pr-16 md:hidden"
            style={{ "--hero-delay": "750ms" } as CSSProperties}
          >
            <SlideIndicators
              index={index}
              goTo={goTo}
              size="sm"
              paused={paused || reducedMotion}
            />
          </div>
        </m.div>

        <div
          className="hero-reveal absolute bottom-10 right-8 hidden border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md md:block lg:bottom-14 lg:right-10"
          style={{ "--hero-delay": "700ms" } as CSSProperties}
        >
          <ProofStat />
        </div>

        <a
          href="#poles"
          className="hero-reveal mt-8 inline-flex w-fit items-center gap-2 font-condensed text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-gold md:absolute md:bottom-8 md:left-8 md:mt-0 lg:left-10"
          style={{ "--hero-delay": "800ms" } as CSSProperties}
        >
          <span className="hero-arrow inline-block">↓</span>
          {t.hero.discover}
        </a>

        <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
          <div className="pointer-events-auto">
            <SlideIndicators
              index={index}
              goTo={goTo}
              size="md"
              paused={paused || reducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideIndicators({
  index,
  goTo,
  size,
  paused,
}: {
  index: number;
  goTo: (i: number) => void;
  size: "sm" | "md";
  paused: boolean;
}) {
  const { tr } = useLanguage();
  return (
    <div className="flex items-center gap-1" role="tablist" aria-label="Slides">
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={tr(slide.heroLabel)}
            onClick={() => goTo(i)}
            className={`inline-flex cursor-pointer items-center justify-center ${
              size === "sm" ? "min-h-10 min-w-10" : "min-h-11 min-w-11"
            }`}
          >
            <span
              className={`relative block overflow-hidden rounded-full bg-white/30 transition-all duration-300 ${
                active
                  ? size === "sm"
                    ? "h-1 w-6"
                    : "h-1.5 w-8"
                  : size === "sm"
                    ? "h-1 w-3"
                    : "h-1.5 w-4"
              }`}
            >
              {active ? (
                <span
                  key={`${index}-${paused}`}
                  className="slide-progress absolute inset-0 bg-gold"
                  style={
                    {
                      "--slide-duration": `${SLIDE_MS}ms`,
                      animationPlayState: paused ? "paused" : "running",
                    } as CSSProperties
                  }
                />
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ProofStat() {
  const { t } = useLanguage();
  return (
    <p className="flex items-baseline gap-3">
      <span className="font-heading text-3xl font-semibold text-white">
        {pillars.length}
      </span>
      <span className="font-condensed text-[11px] uppercase tracking-[0.18em] text-white/70">
        {t.hero.proofLabel}
      </span>
    </p>
  );
}
