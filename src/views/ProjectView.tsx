"use client";

import Link from "next/link";
import { useRef, useState, ViewTransition } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { GoldButton } from "@/components/GoldButton";
import { Lightbox } from "@/components/Lightbox";
import { SiteImage } from "@/components/SiteImage";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE_OUT, Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getProject, projects, serviceLabel } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { projectMeta } from "@/lib/projectMeta";

export function ProjectView({ slug }: { slug: string }) {
  const { locale, t, tr } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const p = getProject(slug);
  if (!p) return null;

  const title = tr(p.title);
  const position = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(position - 1 + projects.length) % projects.length];
  const next = projects[(position + 1) % projects.length];

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-[52vh] overflow-hidden bg-primary-darker text-white"
      >
        <m.div className="absolute inset-0" style={{ y: heroY, opacity: heroFade }}>
          <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
            <SiteImage
              src={p.image}
              alt={title}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
          </ViewTransition>
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-darker via-primary-darker/55 to-primary-darker/25" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-7xl flex-col justify-end px-6 py-16">
          <m.p
            className="font-condensed text-[12px] uppercase tracking-[0.22em] text-gold"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          >
            {projectMeta(p, locale)}
          </m.p>
          <m.h1
            className="mt-3 max-w-3xl font-heading text-4xl font-semibold sm:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
          >
            {title}
          </m.h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-ink/80">{tr(p.description)}</p>
          <Magnetic className="mt-8">
            <GoldButton href="/devis">{t.projects.similar}</GoldButton>
          </Magnetic>
        </Reveal>
        <Reveal as="aside" delay={0.15} className="border border-neutral-border bg-mist p-6 lg:col-span-5">
          <dl className="space-y-4">
            {p.location ? <Row label={t.projects.location} value={p.location} /> : null}
            {p.year ? <Row label={t.projects.year} value={p.year} /> : null}
            {p.duration ? <Row label={t.projects.duration} value={tr(p.duration)} /> : null}
            {p.client ? <Row label={t.projects.client} value={tr(p.client)} /> : null}
            <Row label={t.projects.pole} value={tr(serviceLabel[p.category])} />
            <Row label={t.projects.gallery} value={`${p.gallery.length} ${t.projects.photos}`} />
          </dl>
          <Link
            href="/realisations"
            className="mt-8 inline-block font-condensed text-[12px] uppercase tracking-[0.16em] text-ocean hover:text-gold"
          >
            {t.projects.back}
          </Link>
        </Reveal>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <h2 className="font-heading text-3xl text-navy">{t.projects.gallery}</h2>
          </Reveal>
          <RevealGroup className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3" stagger={0.06}>
            {p.gallery.map((src, i) => (
              <RevealItem key={src} className="mb-4 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`${t.projects.enlarge} ${i + 1}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden bg-primary-darker"
                >
                  <SiteImage
                    src={src}
                    alt={`${title} — ${t.projects.galleryAlt}`}
                    className="block h-auto w-full transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                  />
                  <span className="absolute right-3 top-3 inline-flex size-10 scale-75 items-center justify-center bg-gold text-navy opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Expand className="size-4" aria-hidden />
                  </span>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {projects.length > 1 ? (
        <nav aria-label={t.projects.otherProjects} className="border-t border-neutral-border bg-white">
          <div className="mx-auto grid max-w-7xl sm:grid-cols-2">
            <AdjacentProject
              href={`/realisations/${prev.slug}`}
              image={prev.image}
              label={t.projects.prev}
              title={tr(prev.title)}
              align="left"
            />
            <AdjacentProject
              href={`/realisations/${next.slug}`}
              image={next.image}
              label={t.projects.next}
              title={tr(next.title)}
              align="right"
            />
          </div>
        </nav>
      ) : null}

      <CtaBand />

      <Lightbox images={p.gallery} alt={title} index={lightbox} onIndexChange={setLightbox} />
    </>
  );
}

function AdjacentProject({
  href,
  image,
  label,
  title,
  align,
}: {
  href: string;
  image: string;
  label: string;
  title: string;
  align: "left" | "right";
}) {
  const right = align === "right";
  return (
    <Link
      href={href}
      className={`group relative flex min-h-40 items-center overflow-hidden px-6 py-10 ${
        right ? "justify-end text-right sm:border-l sm:border-neutral-border" : ""
      }`}
    >
      <SiteImage
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100"
      />
      <span className="absolute inset-0 bg-primary-darker/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative">
        <span
          className={`flex items-center gap-2 font-condensed text-[12px] uppercase tracking-[0.18em] text-ocean group-hover:text-gold ${
            right ? "justify-end" : ""
          }`}
        >
          {right ? null : (
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          )}
          {label}
          {right ? (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          ) : null}
        </span>
        <span className="mt-2 block font-heading text-2xl text-navy transition-colors group-hover:text-white">
          {title}
        </span>
      </span>
    </Link>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-neutral-border pb-3">
      <dt className="font-condensed text-[11px] uppercase tracking-[0.16em] text-ink/50">
        {label}
      </dt>
      <dd className="text-navy">{value}</dd>
    </div>
  );
}
