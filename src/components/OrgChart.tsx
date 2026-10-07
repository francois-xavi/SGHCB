"use client";

import { m } from "motion/react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { EASE_OUT } from "@/components/motion/Reveal";

type Props = {
  root: string;
  leaderLabel: string;
  leaderName: string;
  leaderTitle: string;
  departments: string[];
  expertsLabel: string;
  experts: string;
};

const view = { once: true, margin: "-80px" } as const;

/**
 * Organigramme : Direction générale → départements, connecteurs qui se dessinent,
 * puis nuage d'experts externes mobilisables.
 */
export function OrgChart({
  root,
  leaderLabel,
  leaderName,
  leaderTitle,
  departments,
  expertsLabel,
  experts,
}: Props) {
  const expertList = experts
    .replace(/\.$/, "")
    .split(/,\s*|\s+et\s+|\s+and\s+/)
    .filter(Boolean);

  return (
    <div className="mt-10">
      {/* Racine */}
      <m.div
        className="mx-auto flex max-w-md items-center gap-4 border border-gold bg-primary-darker p-5 text-white shadow-[0_20px_50px_rgba(8,31,66,0.25)]"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={view}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        data-icon-trigger
      >
        <AnimatedIcon name="team" size={52} tone="dark" trigger="in-view" />
        <div>
          <p className="font-condensed text-[11px] uppercase tracking-[0.2em] text-gold">
            {root} · {leaderLabel}
          </p>
          <p className="mt-1 font-heading text-xl">{leaderName}</p>
          <p className="text-[14px] text-white/70">{leaderTitle}</p>
        </div>
      </m.div>

      {/* Tronc */}
      <m.span
        aria-hidden
        className="mx-auto block h-10 w-px origin-top bg-gold"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={view}
        transition={{ duration: 0.4, delay: 0.4 }}
      />

      {/* Branche horizontale (desktop) */}
      <div className="relative hidden lg:block">
        <m.span
          aria-hidden
          className="absolute left-[7.14%] right-[7.14%] top-0 block h-px origin-center bg-gold"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={view}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT }}
        />
      </div>

      {/* Départements */}
      <m.ul
        className="relative grid gap-3 border-l border-gold/40 pl-5 lg:grid-cols-7 lg:border-l-0 lg:pl-0"
        initial="hidden"
        whileInView="show"
        viewport={view}
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } } }}
      >
        {departments.map((d) => (
          <m.li
            key={d}
            className="group relative lg:pt-6"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
            }}
          >
            <span
              aria-hidden
              className="absolute left-1/2 top-0 hidden h-6 w-px bg-gold lg:block"
            />
            <span
              aria-hidden
              className="absolute -left-5 top-1/2 block h-px w-5 bg-gold/40 lg:hidden"
            />
            <div className="flex min-h-16 items-center justify-center border border-neutral-border bg-white px-3 py-3 text-center font-condensed text-[12px] font-semibold uppercase tracking-[0.12em] text-navy transition duration-300 group-hover:-translate-y-1 group-hover:border-gold group-hover:bg-gold group-hover:text-primary-darker group-hover:shadow-[0_14px_30px_rgba(8,31,66,0.12)]">
              {d}
            </div>
          </m.li>
        ))}
      </m.ul>

      {/* Experts externes */}
      <div className="mt-12 text-center">
        <p className="font-condensed text-[12px] uppercase tracking-[0.2em] text-ocean">
          {expertsLabel}
        </p>
        <ul className="mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-3">
          {expertList.map((e, i) => (
            <m.li
              key={e}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={view}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <m.span
                className="inline-block border border-dashed border-ocean/40 bg-white px-4 py-2 text-[14px] text-navy"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              >
                {e.charAt(0).toUpperCase() + e.slice(1)}
              </m.span>
            </m.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
