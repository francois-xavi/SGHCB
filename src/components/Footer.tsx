"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { services } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company, emailLink } from "@/lib/company";

export function Footer() {
  const { t, tr } = useLanguage();
  return (
    <footer className="navy-field text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Image
              src="/logo_footer.png"
              alt={`${company.name} — ${company.legal}`}
              width={360}
              height={140}
              className="h-16 w-auto max-w-[220px] object-contain object-left sm:h-[4.5rem] sm:max-w-[260px]"
            />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/75">
              {company.legal}. {t.footer.text}
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
              {t.footer.navigation}
            </p>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <Link href="/" className="hover:text-gold">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-gold">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-gold">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/devis" className="hover:text-gold">
                  {t.nav.quote}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
              {t.footer.poles}
            </p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="hover:text-gold">
                    {tr(s.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
              {t.footer.contact}
            </p>
            <ul className="mt-4 space-y-3 text-[15px] text-white/80">
              <li>{tr(company.address)}</li>
              <li>
                <a href={emailLink()} className="hover:text-gold">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.phoneHref} className="hover:text-gold">
                  {company.phone}
                </a>{" "}
                ({t.callsOnly})
              </li>
              <li>{tr(company.hours)}</li>
            </ul>
            <a
              href={emailLink("Demande de devis")}
              className="mt-6 inline-flex min-h-11 items-center gap-2 bg-gold px-4 font-condensed text-[13px] font-semibold uppercase tracking-[0.14em] text-navy hover:bg-gold-deep hover:text-white"
            >
              <Mail className="size-4" aria-hidden />
              {t.writeUs}
            </a>
            <div className="mt-5">
              <LanguageSwitcher variant="dark" />
            </div>
          </div>
        </div>

        <div className="gold-rule mt-12" />
        <div className="mt-6 flex flex-col gap-3 text-[13px] text-white/55 sm:flex-row sm:justify-between">
          <p>© 2026 {company.name}. {t.footer.rights}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-gold">
              {t.nav.legal}
            </Link>
            <a
              href="https://lordicon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              {t.ui.iconsCredit}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
