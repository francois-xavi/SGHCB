"use client";

import { PageHero } from "@/components/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company } from "@/lib/company";

export function LegalView() {
  const { locale, t, tr } = useLanguage();
  const l = t.legal;
  const colon = locale === "fr" ? " :" : ":";

  const rows = [
    { label: l.company, value: company.legal },
    { label: l.brand, value: company.name },
    { label: l.capital, value: company.capital },
    { label: l.rccm, value: company.rccm },
    { label: l.ifu, value: company.ifu },
    {
      label: l.seat,
      value: `${company.addressDetail}, ${tr(company.address)}`,
    },
    { label: l.contact, value: `${company.email} · ${company.phone}` },
    { label: l.host, value: l.hostValue },
  ];

  return (
    <>
      <PageHero
        kicker={l.kicker}
        title={l.title}
        crumbs={[
          { href: "/", label: t.nav.home },
          { href: "/mentions-legales", label: l.title },
        ]}
      />
      <RevealGroup
        as="article"
        stagger={0.05}
        className="mx-auto max-w-3xl space-y-6 px-6 py-16 leading-relaxed text-ink/80"
      >
        {rows.map((row) => (
          <RevealItem as="p" key={row.label}>
            <strong className="text-navy">
              {row.label}
              {colon}
            </strong>{" "}
            {row.value}
          </RevealItem>
        ))}
        <RevealItem as="p">{l.ip}</RevealItem>
      </RevealGroup>
    </>
  );
}
