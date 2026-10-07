"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Anime la partie numérique de tête d'une valeur (« 2026 », « 6 », « 24–48h »).
 * Le rendu serveur affiche la valeur finale ; le texte est mis à jour directement dans le DOM.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const numeric = Boolean(match);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const from = target > 100 ? target - 40 : 0;

  useEffect(() => {
    if (!numeric || reduce || !ref.current) return;
    if (!inView) {
      ref.current.textContent = `${from}${suffix}`;
      return;
    }
    const controls = animate(from, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, numeric, from, target, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
