"use client";

import { GoldButton } from "./GoldButton";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { company, emailLink } from "@/lib/company";

export function CtaBand({
  title,
  text,
}: {
  title?: string;
  text?: string;
}) {
  const { t } = useLanguage();
  return (
    <section className="navy-field sheen text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-center">
        <Reveal>
          <p className="font-condensed text-[12px] uppercase tracking-[0.28em] text-gold">
            {company.name}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            {title ?? t.cta.title}
          </h2>
          <p className="mt-3 max-w-xl text-white/75">{text ?? t.cta.text}</p>
        </Reveal>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <Magnetic className="w-full sm:w-auto">
            <GoldButton href="/devis" className="w-full">
              {t.nav.quote}
            </GoldButton>
          </Magnetic>
          <GoldButton href={emailLink()} variant="outline">
            {company.email}
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
