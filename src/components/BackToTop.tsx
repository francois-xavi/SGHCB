"use client";

import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Bouton de retour en haut avec anneau de progression de lecture. */
export function BackToTop() {
  const { t } = useLanguage();
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <m.button
          type="button"
          aria-label={t.ui.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-24 right-4 z-[70] hidden size-12 cursor-pointer items-center justify-center bg-primary-darker text-gold shadow-[0_12px_30px_rgba(8,31,66,0.35)] md:bottom-8 md:right-8 md:flex"
        >
          <svg className="absolute inset-0 size-12 -rotate-90" viewBox="0 0 48 48" aria-hidden>
            <rect x="2" y="2" width="44" height="44" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
            <m.rect
              x="2"
              y="2"
              width="44"
              height="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              pathLength={1}
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp className="relative size-5" aria-hidden />
        </m.button>
      ) : null}
    </AnimatePresence>
  );
}
