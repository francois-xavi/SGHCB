"use client";

import Link from "next/link";
import { FileText, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company, emailLink } from "@/lib/company";

/** Barre d'actions collante sur mobile : Appeler · Email · Devis. */
export function MobileActionBar() {
  const { t } = useLanguage();
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 font-condensed text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors active:bg-white/10";

  return (
    <nav
      aria-label={t.ui.quickActions}
      className="fixed inset-x-0 bottom-0 z-[60] flex border-t border-gold/30 bg-primary-darker/95 pb-[env(safe-area-inset-bottom)] text-white backdrop-blur md:hidden"
    >
      <a href={company.phoneHref} className={item}>
        <Phone className="size-5 text-gold" aria-hidden />
        {t.ui.call}
      </a>
      <a href={emailLink()} className={`${item} border-x border-white/10`}>
        <Mail className="size-5 text-gold" aria-hidden />
        {t.ui.email}
      </a>
      <Link href="/devis" className={`${item} bg-gold text-primary-darker active:bg-gold-deep`}>
        <FileText className="size-5" aria-hidden />
        {t.ui.quote}
      </Link>
    </nav>
  );
}
