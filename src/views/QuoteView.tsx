"use client";

import { AnimatedIcon } from "@/components/AnimatedIcon";
import { GoldButton } from "@/components/GoldButton";
import { PageHero } from "@/components/PageHero";
import { QuoteWizard } from "@/components/QuoteWizard";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company, emailLink } from "@/lib/company";

export function QuoteView() {
  const { t } = useLanguage();
  const q = t.quotePage;

  return (
    <>
      <PageHero
        kicker={q.kicker}
        title={q.title}
        text={q.text}
        crumbs={[
          { href: "/", label: t.nav.home },
          { href: "/devis", label: q.kicker },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="border border-neutral-border bg-white p-6 shadow-[0_20px_50px_rgba(8,31,66,0.06)] sm:p-10">
            <QuoteWizard />
          </div>
        </Reveal>
        <Reveal as="aside" delay={0.15} className="lg:col-span-5">
          <div className="navy-field sheen p-8 text-white lg:sticky lg:top-28">
            <p className="font-condensed text-[12px] uppercase tracking-[0.22em] text-gold">
              {q.asideKicker}
            </p>
            <h2 className="mt-3 font-heading text-3xl">{q.asideTitle}</h2>
            <ul className="mt-6 space-y-4 text-white/80">
              {q.asideItems.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  <AnimatedIcon name={(["calendar", "rules", "team"] as const)[i % 3]} size={32} tone="dark" trigger="in-view" />
                  {item}
                </li>
              ))}
            </ul>
            <GoldButton href={emailLink("Demande de devis")} className="mt-8 break-all">
              {company.email}
            </GoldButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
