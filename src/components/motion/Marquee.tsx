import type { ReactNode } from "react";

/** Défilement horizontal infini (CSS), en pause au survol. */
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`marquee group overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
