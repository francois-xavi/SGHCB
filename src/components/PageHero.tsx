"use client";

import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { EASE_OUT } from "@/components/motion/Reveal";

type Props = {
  kicker?: string;
  title: string;
  text?: string;
  crumbs?: { href: string; label: string }[];
};

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
});

export function PageHero({ kicker, title, text, crumbs }: Props) {
  const { scrollY } = useScroll();
  const diamondY = useTransform(scrollY, [0, 500], [0, 120]);
  const diamondRotate = useTransform(scrollY, [0, 500], [45, 90]);

  return (
    <section className="navy-field relative overflow-hidden text-white">
      <m.div
        className="pointer-events-none absolute -right-16 top-10 size-64 border border-gold/20"
        style={{ y: diamondY, rotate: diamondRotate }}
        aria-hidden
      />
      <m.div
        className="pointer-events-none absolute -right-4 top-28 size-32 border border-gold/10"
        style={{ y: diamondY, rotate: diamondRotate }}
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {crumbs ? (
          <m.nav
            className="mb-6 font-condensed text-[12px] uppercase tracking-[0.16em] text-white/60"
            {...rise(0)}
          >
            {crumbs.map((c, i) => (
              <span key={c.href}>
                {i > 0 ? <span className="mx-2 text-gold">/</span> : null}
                <Link href={c.href} className="hover:text-gold">
                  {c.label}
                </Link>
              </span>
            ))}
          </m.nav>
        ) : null}
        {kicker ? (
          <m.p
            className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-gold"
            {...rise(0.08)}
          >
            {kicker}
          </m.p>
        ) : null}
        <m.h1
          className="mt-3 max-w-3xl font-heading text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
          {...rise(0.16)}
        >
          {title}
        </m.h1>
        {text ? (
          <m.p
            className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75"
            {...rise(0.26)}
          >
            {text}
          </m.p>
        ) : null}
        <m.span
          aria-hidden
          className="mt-8 block h-px w-24 origin-left bg-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.4 }}
        />
      </div>
    </section>
  );
}
