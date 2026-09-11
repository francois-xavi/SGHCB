"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import {
  IconBatiment,
  IconEau,
  IconElectricite,
  IconRoute,
} from "@/components/LogoMarks";

const slides = [
  {
    id: "eau",
    image: "/hero_caroussel/water_pomping.png",
    label: "EAU",
    phrase: "L'eau qui alimente vos projets.",
    accentColor: "#3B82C4",
  },
  {
    id: "btp",
    image: "/hero_caroussel/rebar_cutting.png",
    label: "BÂTIMENT & TP",
    phrase: "Du gros œuvre à la finition.",
    accentColor: "#C4703B",
  },
  {
    id: "electricite",
    image: "/hero_caroussel/electrician.png",
    label: "ÉLECTRICITÉ",
    phrase: "L'énergie qui fait tourner vos installations.",
    accentColor: "#D4A017",
  },
  {
    id: "commerce",
    image: "/hero_caroussel/warehouse.png",
    label: "COMMERCE GÉNÉRAL",
    phrase: "Vos approvisionnements, sans rupture.",
    accentColor: "#4A5568",
  },
] as const;

const poles = [
  { id: "eau", href: "/services/eau", label: "Eau", short: "Eau", Icon: IconEau },
  {
    id: "btp",
    href: "/services/btp",
    label: "Bâtiment et TP",
    short: "BTP",
    Icon: IconBatiment,
  },
  {
    id: "electricite",
    href: "/services/electricite",
    label: "Électricité",
    short: "Électricité",
    Icon: IconElectricite,
  },
  {
    id: "commerce",
    href: "/services/commerce-general",
    label: "Commerce général",
    short: "Commerce",
    Icon: IconRoute,
  },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const active = slides[index];
  const fade = reducedMotion ? "duration-0" : "duration-[800ms]";

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, index]);

  return (
    <section
      className="relative isolate min-h-[85vh] overflow-hidden bg-[#0A2540] text-white md:h-[min(100vh,calc(100dvh-7.25rem))] md:max-h-[100vh]"
      aria-roledescription="carousel"
      aria-label="Pôles d'activité SGHCB"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setPaused(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setPaused(false);
      }}
    >
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity ease-in-out ${fade} ${
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
              className="object-cover object-[78%_center] md:object-[82%_center]"
              sizes="100vw"
            />
          </div>
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0A2540] from-[12%] via-[#0A2540]/88 via-[55%] to-[#0A2540]/45 md:hidden"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#0A2540]/80 to-transparent md:hidden"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden bg-gradient-to-r from-[#0A2540]/90 via-[#0A2540]/60 to-[#0A2540]/30 md:block"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-end px-6 pb-8 pt-10 md:h-full md:min-h-0 md:justify-center md:py-16 lg:px-8">
        <div className="hero-copy-shadow max-w-3xl">
          <p
            className="hero-reveal font-condensed text-xs font-semibold uppercase tracking-widest text-[#D4A017] md:text-sm"
            style={{ "--hero-delay": "0ms" } as CSSProperties}
          >
            Société de Génie Hydraulique et Civil du Bénin
          </p>

          <h1
            className="hero-reveal mt-4 max-w-[18ch] font-heading text-3xl font-semibold leading-tight md:mt-5 md:max-w-none md:text-6xl"
            style={{ "--hero-delay": "100ms" } as CSSProperties}
          >
            L&apos;eau, le béton
            <br className="md:hidden" />{" "}
            <span className="text-[#D4A017]">et l&apos;énergie</span> du
            Bénin.
          </h1>

          <p
            className="hero-reveal mt-5 hidden max-w-[500px] text-lg leading-relaxed text-sky-100/80 md:block"
            style={{ "--hero-delay": "200ms" } as CSSProperties}
          >
            Un interlocuteur unique pour vos ouvrages hydrauliques, de génie
            civil, électriques et vos approvisionnements.
          </p>

          <div
            className="hero-reveal relative mt-6 min-h-[3.25rem]"
            style={{ "--hero-delay": "250ms" } as CSSProperties}
            aria-live="polite"
          >
            {slides.map((slide, i) => (
              <p
                key={slide.id}
                className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 transition-opacity ease-in-out ${fade} ${
                  i === index
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-0 opacity-0"
                }`}
              >
                <span
                  className="font-condensed text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: slide.accentColor }}
                >
                  {slide.label}
                </span>
                <span className="text-[15px] italic text-white/80">
                  {slide.phrase}
                </span>
              </p>
            ))}
          </div>

          <ul
            className="hero-reveal mt-5 grid grid-cols-4 gap-2 md:mt-6 md:flex md:flex-wrap md:items-center"
            style={{ "--hero-delay": "300ms" } as CSSProperties}
          >
            {poles.map(({ id, href, label, short, Icon }, i) => {
              const isActive = active.id === id;
              return (
                <li
                  key={href}
                  className={`flex justify-center md:items-center ${
                    i > 0
                      ? "md:ml-5 md:border-l md:border-white/30 md:pl-5"
                      : ""
                  }`}
                >
                  <Link
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className={`group flex flex-col items-center transition duration-200 ease-out md:flex-row md:gap-2.5 ${
                      isActive
                        ? "scale-105 text-[#D4A017]"
                        : "text-white/80 md:hover:-translate-y-1 md:hover:text-[#D4A017]"
                    }`}
                  >
                    <Icon className="size-6 md:size-8" />
                    <span className="mt-1.5 text-center font-condensed text-[10px] uppercase tracking-[0.12em] md:mt-0 md:text-[12px] md:tracking-[0.16em]">
                      <span className="md:hidden">{short}</span>
                      <span className="hidden md:inline">{label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="hero-reveal mt-8 flex flex-col items-start gap-4 md:mt-10 md:flex-row md:items-center md:gap-6"
            style={{ "--hero-delay": "400ms" } as CSSProperties}
          >
            <Link
              href="/devis"
              className="inline-flex w-auto cursor-pointer items-center justify-center rounded-md bg-gold px-8 py-4 font-condensed text-[15px] font-semibold uppercase tracking-[0.14em] text-navy transition-colors duration-200 hover:bg-gold-deep hover:text-white"
            >
              Demander un devis
            </Link>
            <Link
              href="/realisations"
              className="text-[15px] text-white underline decoration-white/70 underline-offset-4 transition-colors duration-200 hover:text-[#D4A017] hover:decoration-[#D4A017]"
            >
              Voir nos réalisations →
            </Link>
          </div>

          <div
            className="hero-reveal mt-6 w-full border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md md:hidden"
            style={{ "--hero-delay": "500ms" } as CSSProperties}
          >
            <ProofStat />
          </div>

          <div
            className="hero-reveal mt-5 flex items-center gap-1 pr-16 md:hidden"
            style={{ "--hero-delay": "550ms" } as CSSProperties}
          >
            <SlideIndicators
              index={index}
              goTo={goTo}
              size="sm"
            />
          </div>
        </div>

        <div
          className="hero-reveal absolute bottom-10 right-8 hidden border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md md:block lg:bottom-14 lg:right-10"
          style={{ "--hero-delay": "500ms" } as CSSProperties}
        >
          <ProofStat />
        </div>

        <a
          href="#poles"
          className="hero-reveal mt-8 inline-flex w-fit items-center gap-2 font-condensed text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-[#D4A017] md:absolute md:bottom-8 md:left-8 md:mt-0 lg:left-10"
          style={{ "--hero-delay": "600ms" } as CSSProperties}
        >
          <span className="hero-arrow inline-block">↓</span>
          Découvrir les pôles
        </a>

        <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
          <div className="pointer-events-auto">
            <SlideIndicators index={index} goTo={goTo} size="md" />
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
}: {
  index: number;
  goTo: (i: number) => void;
  size: "sm" | "md";
}) {
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
            aria-label={slide.label}
            onClick={() => goTo(i)}
            className={`inline-flex cursor-pointer items-center justify-center ${
              size === "sm" ? "min-h-10 min-w-10" : "min-h-11 min-w-11"
            }`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                active
                  ? size === "sm"
                    ? "h-1 w-6 bg-[#D4A017]"
                    : "h-1.5 w-8 bg-[#D4A017]"
                  : size === "sm"
                    ? "h-1 w-3 bg-white/30"
                    : "h-1.5 w-4 bg-white/30"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function ProofStat() {
  return (
    <p className="flex items-baseline gap-3">
      <span className="font-heading text-3xl font-semibold text-white">
        150+
      </span>
      <span className="font-condensed text-[11px] uppercase tracking-[0.18em] text-white/70">
        projets réalisés
      </span>
    </p>
  );
}
