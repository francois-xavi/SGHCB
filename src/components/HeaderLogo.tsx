"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/LogoMark";
import { EASE_OUT } from "@/components/motion/Reveal";
import { company } from "@/lib/company";

const box =
  "relative inline-block h-10 w-[6.35rem] origin-left transition-transform duration-300 ease-out group-hover:scale-[1.03] sm:h-11 sm:w-[7rem] lg:h-12 lg:w-[7.6rem]";

/** Révélation SVG, puis fondu vers le PNG officiel. La boîte garde la même taille. */
export function HeaderLogo() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const showReal = done || reduce === true;

  const finish = useCallback(() => setDone(true), []);

  useEffect(() => {
    if (reduce) finish();
    const id = window.setTimeout(finish, 2000);
    return () => window.clearTimeout(id);
  }, [finish, reduce]);

  return (
    <span className={box}>
      <AnimatePresence>
        {!showReal ? (
          <m.span
            key="svg"
            className="absolute inset-y-0 left-0 flex h-full"
            exit={{ opacity: 0, transition: { duration: 0.45, ease: EASE_OUT } }}
          >
            <LogoMark
              variant="compact"
              play="mount"
              onComplete={finish}
              className="h-full w-auto max-h-full"
            />
          </m.span>
        ) : null}
      </AnimatePresence>
      <m.span
        className="absolute inset-y-0 left-0 flex h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: showReal ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        <Image
          src="/logo.png"
          alt={`${company.name} — ${company.legal}`}
          width={280}
          height={96}
          className="h-full w-auto max-h-full object-contain object-left"
          priority
        />
      </m.span>
    </span>
  );
}
