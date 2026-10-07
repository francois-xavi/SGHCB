"use client";

import Link from "next/link";
import { useMemo, useState, ViewTransition } from "react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { ArrowRight, Images } from "lucide-react";
import { SiteImage } from "@/components/SiteImage";
import { projects, type ServiceId } from "@/data/content";
import { pillars } from "@/data/pillars";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { L } from "@/i18n/messages";
import { projectMeta } from "@/lib/projectMeta";

type FilterId = "all" | ServiceId;

const filters: { id: FilterId; label?: L; count: number }[] = [
  { id: "all", count: projects.length },
  ...pillars
    .map((p) => ({
      id: p.id as FilterId,
      label: p.shortLabel,
      count: projects.filter((x) => x.category === p.id).length,
    }))
    .filter((f) => f.count > 0),
];

export function ProjectGrid() {
  const { locale, t, tr } = useLanguage();
  const [filter, setFilter] = useState<FilterId>("all");
  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div>
      <LayoutGroup id="project-filters">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.projects.tabs}>
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`relative inline-flex min-h-11 cursor-pointer items-center gap-2 px-4 font-condensed text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  active ? "text-gold" : "border border-neutral-border text-navy hover:border-gold"
                }`}
              >
                {active ? (
                  <m.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-primary-darker"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{f.label ? tr(f.label) : t.projects.all}</span>
                <span
                  className={`relative inline-flex min-w-5 items-center justify-center px-1 text-[11px] ${
                    active ? "bg-gold text-primary-darker" : "bg-mist text-navy/70"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <m.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <m.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
            >
              <Link
                href={`/realisations/${p.slug}`}
                className="group block h-full border border-neutral-border bg-white transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_50px_rgba(8,31,66,0.10)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
                    <SiteImage
                      src={p.image}
                      alt={tr(p.title)}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </ViewTransition>
                  <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-primary-darker/85 via-primary-darker/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="inline-flex translate-y-3 items-center gap-2 font-condensed text-[12px] uppercase tracking-[0.16em] text-gold transition-transform duration-500 group-hover:translate-y-0">
                      {t.projects.view}
                      <ArrowRight className="size-4" />
                    </span>
                    <span className="inline-flex translate-y-3 items-center gap-1.5 font-condensed text-[12px] uppercase tracking-[0.12em] text-white transition-transform delay-75 duration-500 group-hover:translate-y-0">
                      <Images className="size-4" aria-hidden />
                      {p.gallery.length} {t.projects.photos}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-condensed text-[11px] uppercase tracking-[0.18em] text-ocean">
                    {projectMeta(p, locale)}
                  </p>
                  <h2 className="mt-2 font-heading text-2xl text-navy transition-colors group-hover:text-ocean">
                    {tr(p.title)}
                  </h2>
                </div>
              </Link>
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>
    </div>
  );
}
