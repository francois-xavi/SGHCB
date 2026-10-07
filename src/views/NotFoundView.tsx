"use client";

import { m } from "motion/react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { GoldButton } from "@/components/GoldButton";
import { useLanguage } from "@/i18n/LanguageProvider";

export function NotFoundView() {
  const { t } = useLanguage();

  return (
    <section className="navy-field flex min-h-[60vh] flex-col items-center justify-center px-6 text-center text-white">
      <AnimatedIcon name="warning" size={96} tone="dark" trigger="loop" />
      <m.p
        className="mt-4 font-condensed text-[12px] uppercase tracking-[0.28em] text-gold"
        initial={{ opacity: 0, letterSpacing: "0.8em" }}
        animate={{ opacity: 1, letterSpacing: "0.28em" }}
        transition={{ duration: 0.8 }}
      >
        404
      </m.p>
      <h1 className="mt-4 font-heading text-4xl font-semibold">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-white/70">{t.notFound.text}</p>
      <div className="mt-8 flex gap-3">
        <GoldButton href="/">{t.nav.home}</GoldButton>
        <GoldButton href="/devis">{t.notFound.quote}</GoldButton>
      </div>
    </section>
  );
}
