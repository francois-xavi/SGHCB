"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

type Props = {
  images: string[];
  alt: string;
  /** Index ouvert, ou null si fermé. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Visionneuse plein écran : clavier (← → Échap), balayage, compteur et vignettes. */
export function Lightbox({ images, alt, index, onIndexChange }: Props) {
  const { t } = useLanguage();
  const [direction, setDirection] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDirection(delta);
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Ouverture : focus sur « Fermer », scroll bloqué, focus rendu à la fermeture.
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndexChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onIndexChange]);

  return (
    <AnimatePresence>
      {open && index !== null ? (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex flex-col bg-primary-darker/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p className="font-condensed text-[13px] tracking-[0.2em]">
              <span className="text-gold">{pad(index + 1)}</span> / {pad(count)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onIndexChange(null)}
              aria-label={t.projects.close}
              className="inline-flex size-11 cursor-pointer items-center justify-center text-white transition hover:rotate-90 hover:text-gold"
            >
              <X className="size-7" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <m.img
                key={images[index]}
                src={images[index]}
                alt={`${alt} — ${index + 1}/${count}`}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.96 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.96 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                draggable={false}
                className="max-h-[78vh] max-w-full cursor-grab select-none object-contain shadow-[0_30px_80px_rgba(0,0,0,0.45)] active:cursor-grabbing"
              />
            </AnimatePresence>

            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t.projects.prevPhoto}
                  className="absolute left-2 top-1/2 inline-flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center bg-white/10 text-white transition hover:bg-gold hover:text-navy sm:left-6"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t.projects.nextPhoto}
                  className="absolute right-2 top-1/2 inline-flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center bg-white/10 text-white transition hover:bg-gold hover:text-navy sm:right-6"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            ) : null}
          </div>

          {count > 1 ? (
            <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    onIndexChange(i);
                  }}
                  aria-label={`${t.projects.enlarge} ${i + 1}`}
                  aria-current={i === index}
                  className={`relative size-14 shrink-0 cursor-pointer overflow-hidden transition sm:size-16 ${
                    i === index ? "ring-2 ring-gold" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
