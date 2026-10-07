"use client";

import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ProjectsView() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        kicker={t.projects.kicker}
        title={t.projects.title}
        text={t.projects.text}
        crumbs={[
          { href: "/", label: t.nav.home },
          { href: "/realisations", label: t.nav.projects },
        ]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <ProjectGrid />
      </section>
      <CtaBand title={t.projects.ctaTitle} />
    </>
  );
}
