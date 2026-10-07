"use client";

import Link from "next/link";
import { useRef, ViewTransition } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { PoleIcon } from "@/components/PoleIcon";
import { QuoteWizard } from "@/components/QuoteWizard";
import { SiteImage } from "@/components/SiteImage";
import { EASE_OUT, Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getService, projectsByCategory } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pillarLordicon } from "@/lib/lordicons";

export function ServiceView({ slug }: { slug: string }) {
  const { t, tr } = useLanguage();
  const service = getService(slug);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  if (!service) return null;

  const label = tr(service.label);
  const gallery = projectsByCategory(service.id).slice(0, 4);

  return (
    <>
      <PageHero
        kicker={t.services.detailKicker}
        title={tr(service.headline)}
        text={tr(service.intro)}
        crumbs={[
          { href: "/", label: t.nav.home },
          { href: "/services", label: t.nav.services },
          { href: `/services/${service.slug}`, label },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-4">
              <AnimatedIcon
                name={pillarLordicon[service.id]}
                size={56}
                trigger="in-view"
                fallback={<PoleIcon id={service.id} className="size-8 text-ocean" />}
              />
              <div>
                <p className="font-condensed text-[12px] uppercase tracking-[0.28em] text-ocean">
                  {t.services.prestationsKicker}
                </p>
                <h2 className="mt-1 font-heading text-3xl text-navy sm:text-4xl">
                  {t.services.prestationsTitle}
                </h2>
              </div>
            </Reveal>
            <RevealGroup as="ul" className="mt-8 divide-y border-y border-neutral-border">
              {service.prestations.map((p, i) => (
                <RevealItem
                  as="li"
                  key={p.title.fr}
                  className="group flex gap-5 py-6 transition-colors duration-300 hover:bg-mist/60"
                >
                  <CheckMark delay={0.2 + i * 0.08} />
                  <div>
                    <h3 className="font-heading text-xl text-navy transition-colors group-hover:text-ocean">
                      {tr(p.title)}
                    </h3>
                    <p className="mt-2 text-ink/75">{tr(p.text)}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <m.div
                ref={imageRef}
                className="relative min-h-[280px] overflow-hidden bg-mist lg:min-h-[460px]"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: EASE_OUT }}
              >
                <m.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: imageY }}>
                  <SiteImage
                    src={service.image}
                    alt={label}
                    className="h-full w-full object-cover"
                  />
                </m.div>
              </m.div>
              <p className="mt-4 font-condensed text-[12px] uppercase tracking-[0.16em] text-ink/50">
                {label} · {t.services.benin}
              </p>
            </div>
          </div>
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="bg-mist">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <h2 className="font-heading text-3xl text-navy">{t.services.related}</h2>
            </Reveal>
            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
              {gallery.map((p) => (
                <RevealItem key={p.slug}>
                  <Link
                    href={`/realisations/${p.slug}`}
                    className="group relative block min-h-[260px] overflow-hidden bg-primary-darker"
                  >
                    <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                      <SiteImage
                        src={p.image}
                        alt={tr(p.title)}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    </ViewTransition>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-darker/90 via-primary-darker/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="font-heading text-xl text-white">{tr(p.title)}</p>
                      <span className="mt-2 inline-flex translate-y-2 items-center gap-2 font-condensed text-[12px] uppercase tracking-[0.16em] text-gold opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {t.projects.view}
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
        <Reveal>
          <p className="font-condensed text-[12px] uppercase tracking-[0.28em] text-ocean">
            {t.services.quoteKicker}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-navy sm:text-4xl">
            {t.services.quoteTitle} — {label}
          </h2>
          <p className="mt-4 text-ink/75">{t.services.quoteText}</p>
        </Reveal>
        <Reveal delay={0.15} className="border border-neutral-border bg-mist p-6 sm:p-8">
          <QuoteWizard defaultService={service.id} />
        </Reveal>
      </section>
      <CtaBand title={t.services.ctaTitle} />
    </>
  );
}

/** Coche dorée qui se dessine à l'apparition. */
function CheckMark({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 size-6 shrink-0" aria-hidden>
      <m.rect
        x="1"
        y="1"
        width="22"
        height="22"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
      />
      <m.path
        d="M6.5 12.5l3.5 3.5 7.5-8"
        fill="none"
        stroke="var(--primary-dark)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.35 }}
      />
    </svg>
  );
}
