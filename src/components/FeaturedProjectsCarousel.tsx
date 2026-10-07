"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteImage } from "@/components/SiteImage";
import { featuredProjects } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { projectMeta } from "@/lib/projectMeta";

const SLIDE_MS = 5500;
const pad = (n: number) => String(n).padStart(2, "0");

export function FeaturedProjectsCarousel() {
  const { locale, t, tr } = useLanguage();
  const items = featuredProjects;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const dragged = useRef(false);
  const count = items.length;

  const goTo = useCallback(
    (i: number, dir?: number) => {
      if (!count) return;
      setDirection(dir ?? (i > index ? 1 : -1));
      setIndex((i + count) % count);
    },
    [count, index],
  );

  useEffect(() => {
    if (paused || reduce || count < 2) return;
    const id = window.setTimeout(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % count);
    }, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [paused, reduce, count, index]);

  if (!count) return null;

  const active = items[index];

  return (
    <div
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setPaused(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setPaused(false);
      }}
    >
      <div className="relative min-h-[380px] overflow-hidden bg-primary-darker md:min-h-[460px]">
        <AnimatePresence initial={false} custom={direction}>
          <m.div
            key={active.slug}
            className="absolute inset-0"
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, scale: 1.08, x: d * 60 }),
              center: { opacity: 1, scale: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, scale: 0.98, x: d * -60 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={() => {
              dragged.current = true;
            }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) goTo(index + 1, 1);
              else if (info.offset.x > 60) goTo(index - 1, -1);
              window.setTimeout(() => {
                dragged.current = false;
              }, 0);
            }}
          >
            <Link
              href={`/realisations/${active.slug}`}
              draggable={false}
              onClick={(e) => {
                if (dragged.current) e.preventDefault();
              }}
              className="group absolute inset-0 block cursor-grab active:cursor-grabbing"
              aria-roledescription="carousel"
              aria-label={`${t.projects.carouselLabel} — ${tr(active.title)}`}
            >
              <SiteImage
                src={active.image}
                alt={tr(active.title)}
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-darker via-primary-darker/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <m.p
                  className="font-condensed text-[11px] uppercase tracking-[0.2em] text-gold"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  {projectMeta(active, locale)}
                </m.p>
                <m.h3
                  className="mt-2 max-w-2xl font-heading text-3xl text-white md:text-4xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                >
                  {tr(active.title)}
                </m.h3>
                <m.p
                  className="mt-2 max-w-xl text-white/75"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                >
                  {tr(active.excerpt)}
                </m.p>
                <span className="mt-4 inline-flex items-center gap-2 font-condensed text-[12px] uppercase tracking-[0.16em] text-gold">
                  {t.projects.view}
                  <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </m.div>
        </AnimatePresence>

        {count > 1 ? (
          <>
            <p className="pointer-events-none absolute right-5 top-5 z-10 font-condensed text-[13px] tracking-[0.2em] text-white md:right-8 md:top-7">
              <span className="text-gold">{pad(index + 1)}</span> / {pad(count)}
            </p>
            <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/15">
              <span
                key={`${index}-${paused}`}
                className="slide-progress absolute inset-0 bg-gold"
                style={
                  {
                    "--slide-duration": `${SLIDE_MS}ms`,
                    animationPlayState: paused || reduce ? "paused" : "running",
                  } as CSSProperties
                }
              />
            </div>
            <button
              type="button"
              aria-label={t.projects.prev}
              onClick={() => goTo(index - 1, -1)}
              className="absolute left-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center bg-white/90 text-navy transition hover:scale-110 hover:bg-gold md:left-5"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label={t.projects.next}
              onClick={() => goTo(index + 1, 1)}
              className="absolute right-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center bg-white/90 text-navy transition hover:scale-110 hover:bg-gold md:right-5"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <>
          {/* Vignettes (desktop) */}
          <div
            className="mt-4 hidden gap-3 md:grid"
            style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
            role="tablist"
            aria-label={t.projects.tabs}
          >
            {items.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={tr(p.title)}
                onClick={() => goTo(i)}
                className={`group relative aspect-[16/9] cursor-pointer overflow-hidden transition-all duration-300 ${
                  i === index ? "ring-2 ring-gold ring-offset-2 ring-offset-mist" : "opacity-60 hover:opacity-100"
                }`}
              >
                <SiteImage
                  src={p.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </button>
            ))}
          </div>
          {/* Points (mobile) */}
          <div className="mt-4 flex justify-center gap-1 md:hidden" role="tablist" aria-label={t.projects.tabs}>
            {items.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={tr(p.title)}
                onClick={() => goTo(i)}
                className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === index ? "h-1.5 w-8 bg-gold" : "h-1.5 w-3 bg-navy/25"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
