"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { CopyButton } from "@/components/CopyButton";
import { CtaBand } from "@/components/CtaBand";
import { GoldButton } from "@/components/GoldButton";
import { PageHero } from "@/components/PageHero";
import { QuoteWizard } from "@/components/QuoteWizard";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE_OUT, Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company, emailLink } from "@/lib/company";
import type { LordiconName } from "@/lib/lordicons";

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&z=15&output=embed`;

export function ContactView() {
  const { t, tr } = useLanguage();
  const c = t.contact;

  return (
    <>
      <PageHero
        kicker={c.kicker}
        title={c.title}
        text={c.text}
        crumbs={[
          { href: "/", label: t.nav.home },
          { href: "/contact", label: t.nav.contact },
        ]}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <RevealGroup as="ul" className="space-y-4" stagger={0.1}>
            <ContactRow icon="mail" label={c.email} copy={company.email}>
              <a
                href={emailLink()}
                className="block break-all font-heading text-2xl text-navy hover:text-ocean sm:text-3xl"
              >
                {company.email}
              </a>
            </ContactRow>
            <ContactRow
              icon="phone"
              label={`${c.phone} (${t.callsOnly})`}
              copy={company.phone}
            >
              <a
                href={company.phoneHref}
                className="block font-heading text-2xl text-navy hover:text-ocean sm:text-3xl"
              >
                {company.phone}
              </a>
            </ContactRow>
            <ContactRow icon="pin" label={c.address}>
              <p className="text-lg">{tr(company.address)}</p>
              <p className="text-ink/70">{company.addressDetail}</p>
            </ContactRow>
            <ContactRow icon="clock" label={c.hours}>
              <p className="text-lg">{tr(company.hours)}</p>
            </ContactRow>
          </RevealGroup>
          <Reveal delay={0.3} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic className="w-full sm:w-auto">
              <GoldButton href={emailLink("Demande de devis")} className="w-full">
                {t.writeUs}
              </GoldButton>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <GoldButton href={company.mapsLink} variant="navy" className="w-full">
                {c.directions}
              </GoldButton>
            </Magnetic>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="border border-neutral-border bg-mist p-6 sm:p-8">
          <h2 className="font-heading text-2xl text-navy">{c.formTitle}</h2>
          <p className="mt-2 text-ink/70">{c.formText}</p>
          <div className="mt-6">
            <QuoteWizard compact />
          </div>
        </Reveal>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <h2 className="font-heading text-3xl text-navy">{c.mapTitle}</h2>
            <p className="mt-3 max-w-2xl text-ink/70">
              {c.mapText}{" "}
              <a
                href={company.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean underline underline-offset-4 hover:text-gold"
              >
                {c.directions} →
              </a>
            </p>
          </Reveal>
          <m.div
            className="relative mt-6 overflow-hidden border border-neutral-border"
            initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            <iframe
              title={c.mapFrame}
              src={mapSrc}
              className="h-[380px] w-full"
              loading="lazy"
            />
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 bg-primary-darker px-4 py-2 text-white shadow-lg">
              <AnimatedIcon name="pin" size={28} tone="dark" trigger="loop" />
              <span className="font-condensed text-[12px] uppercase tracking-[0.16em]">
                {company.name} · {company.city}
              </span>
            </div>
          </m.div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function ContactRow({
  icon,
  label,
  copy,
  children,
}: {
  icon: LordiconName;
  label: string;
  copy?: string;
  children: ReactNode;
}) {
  return (
    <RevealItem
      as="li"
      data-icon-trigger
      className="group flex items-start gap-4 border border-transparent p-3 transition-colors duration-300 hover:border-neutral-border hover:bg-mist/60"
    >
      <span className="flex size-14 shrink-0 items-center justify-center border border-ocean/25 bg-white transition-colors group-hover:border-gold">
        <AnimatedIcon name={icon} size={40} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-condensed text-[11px] uppercase tracking-[0.2em] text-ocean">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
      {copy ? <CopyButton value={copy} className="mt-1" /> : null}
    </RevealItem>
  );
}
