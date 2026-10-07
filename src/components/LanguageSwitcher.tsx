"use client";

import { useId } from "react";
import { m } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/messages";

export function LanguageSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const { locale, setLocale, t } = useLanguage();
  const pillId = useId();
  const idle =
    variant === "dark"
      ? "text-white/70 hover:text-white"
      : "text-navy/55 hover:text-navy";
  const active = variant === "dark" ? "text-primary-darker" : "text-white";
  const pill = variant === "dark" ? "bg-gold" : "bg-ocean";

  return (
    <div
      className={`inline-flex items-center gap-0.5 border p-0.5 font-condensed text-[12px] font-semibold uppercase tracking-[0.16em] ${
        variant === "dark" ? "border-white/20" : "border-neutral-border"
      }`}
      role="group"
      aria-label={t.lang.label}
    >
      {(["fr", "en"] as const).map((code: Locale) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`relative cursor-pointer px-2 py-0.5 transition-colors duration-300 ${
            locale === code ? active : idle
          }`}
          aria-pressed={locale === code}
          lang={code}
        >
          {locale === code ? (
            <m.span
              layoutId={pillId}
              className={`absolute inset-0 ${pill}`}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          ) : null}
          <span className="relative">{t.lang[code]}</span>
        </button>
      ))}
    </div>
  );
}
