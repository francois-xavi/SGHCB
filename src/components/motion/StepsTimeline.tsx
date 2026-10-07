"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useSpring } from "motion/react";

type Step = { num: string; title: string; text: string };

/**
 * Étapes reliées par une ligne dorée qui se dessine au scroll ;
 * chaque numéro s'allume quand la ligne l'atteint.
 */
export function StepsTimeline({ steps, columns = 4 }: { steps: Step[]; columns?: 3 | 4 }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const last = Math.max(steps.length - 1, 1);
    setReached(Math.floor(v * last + 0.15) + 1);
  });

  return (
    <div
      ref={ref}
      className={`relative mt-12 grid gap-8 pl-12 lg:pl-0 ${
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      {/* Ligne verticale (mobile) */}
      <span
        aria-hidden
        className="absolute bottom-2 left-4 top-2 w-px bg-gold/25 lg:hidden"
      />
      <m.span
        aria-hidden
        className="absolute bottom-2 left-4 top-2 w-px origin-top bg-gold lg:hidden"
        style={{ scaleY: progress }}
      />
      {/* Ligne horizontale (desktop) */}
      <span
        aria-hidden
        className="absolute left-4 right-8 top-4 hidden h-px bg-gold/25 lg:block"
      />
      <m.span
        aria-hidden
        className="absolute left-4 right-8 top-4 hidden h-px origin-left bg-gold lg:block"
        style={{ scaleX: progress }}
      />

      {steps.map((step, i) => {
        const active = i < reached;
        return (
          <div key={step.num} className="relative">
            <div
              className={`relative z-10 -ml-12 flex size-8 items-center justify-center font-condensed text-[12px] font-bold transition-all duration-500 lg:ml-0 ${
                active
                  ? "scale-110 bg-gold text-navy shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_25%,transparent)]"
                  : "border border-gold/60 bg-white text-navy/60"
              }`}
            >
              {step.num}
            </div>
            <div
              className={`transition-all duration-700 ${
                active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-50"
              }`}
            >
              <h3 className="-mt-8 font-heading text-2xl text-navy lg:mt-5">{step.title}</h3>
              <p className="mt-3 text-ink/75">{step.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
