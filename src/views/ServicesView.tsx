"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { PoleIcon } from "@/components/PoleIcon";
import { SiteImage } from "@/components/SiteImage";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { services } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pillarLordicon } from "@/lib/lordicons";

export function ServicesView() {
  const { t, tr } = useLanguage();

  return (
    <>
      <PageHero
        kicker={t.services.kicker}
        title={t.services.title}
        text={t.services.text}
        crumbs={[
          { href: "/", label: t.nav.home },
          { href: "/services", label: t.nav.services },
        ]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <RevealGroup className="grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <RevealItem key={s.id} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                data-icon-trigger
                className="group relative flex h-full flex-col overflow-hidden border border-neutral-border bg-mist p-8 transition-colors duration-500 hover:border-gold"
              >
                {/* Photo du pôle qui remonte au survol */}
                <div
                  aria-hidden
                  className="absolute inset-0 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                >
                  <SiteImage
                    src={s.image}
                    alt=""
                    className="h-full w-full scale-110 object-cover transition-transform duration-[1200ms] group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-primary-darker/85" />
                </div>

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex size-14 items-center justify-center border border-ocean/30 bg-white text-ocean transition-colors group-hover:border-gold">
                    <AnimatedIcon
                      name={pillarLordicon[s.id]}
                      size={40}
                      fallback={<PoleIcon id={s.id} />}
                    />
                  </div>
                  <span className="font-condensed text-[11px] uppercase tracking-[0.2em] text-gold">
                    {t.services.pole} {tr(s.label)}
                  </span>
                </div>
                <h2 className="relative mt-8 font-heading text-3xl text-navy transition-colors duration-500 group-hover:text-white">
                  {tr(s.headline)}
                </h2>
                <p className="relative mt-4 text-ink/75 transition-colors duration-500 group-hover:text-white/80">
                  {tr(s.short)}
                </p>
                <span className="relative mt-8 inline-flex items-center gap-2 font-condensed text-[12px] uppercase tracking-[0.16em] text-ocean transition-colors group-hover:text-gold">
                  {t.services.open}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <CtaBand />
    </>
  );
}
