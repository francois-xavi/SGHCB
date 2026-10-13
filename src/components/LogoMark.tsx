"use client";

import { useId } from "react";
import { m, type Variants } from "motion/react";
import { EASE_OUT } from "@/components/motion/Reveal";
import { company } from "@/lib/company";

type LogoMarkProps = {
  variant?: "compact" | "full";
  play?: "mount" | "inView";
  /** `dark` = baseline lisible sur fond marine (footer). */
  tone?: "light" | "dark";
  className?: string;
  onComplete?: () => void;
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.55 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.38, ease: EASE_OUT },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.48, ease: EASE_OUT },
  },
};

const slide: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

const origin = { originX: 0.5, originY: 0.5 } as const;

export function LogoMark({
  variant = "compact",
  play = "mount",
  tone = "light",
  className,
  onComplete,
}: LogoMarkProps) {
  const uid = useId().replace(/:/g, "");
  const full = variant === "full";
  const label = `${company.name} — ${company.legal}`;

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  return (
    <m.svg
      viewBox={full ? "0 0 480 268" : "0 0 480 190"}
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMinYMid meet"
      overflow="visible"
      variants={container}
      initial="hidden"
      animate={play === "mount" ? "show" : undefined}
      whileInView={play === "inView" ? "show" : undefined}
      viewport={play === "inView" ? { once: true, amount: 0.45 } : undefined}
    >
      <title>{label}</title>
      <defs>
        <linearGradient id={`${uid}-drop`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#3FA9E8" />
          <stop offset="55%" stopColor="#1E6FC4" />
          <stop offset="100%" stopColor="#0B3D7A" />
        </linearGradient>
        <linearGradient id={`${uid}-bolt`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D24A" />
          <stop offset="42%" stopColor="#C9D93F" />
          <stop offset="100%" stopColor="#7FA82A" />
        </linearGradient>
        <linearGradient id={`${uid}-word`} x1="0%" y1="0%" x2="92%" y2="88%">
          {tone === "dark" ? (
            <>
              <stop offset="0%" stopColor="#DCEEFB" />
              <stop offset="28%" stopColor="#7EC8F0" />
              <stop offset="70%" stopColor="#3FA9E8" />
              <stop offset="100%" stopColor="#1E6FC4" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#6EC8F4" />
              <stop offset="18%" stopColor="#3FA9E8" />
              <stop offset="46%" stopColor="#1E6FC4" />
              <stop offset="78%" stopColor="#0B3D7A" />
              <stop offset="100%" stopColor="#081F42" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`${uid}-gloss`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-arc`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E6FC4" />
          <stop offset="50%" stopColor="#0B3D7A" />
          <stop offset="100%" stopColor="#1E6FC4" />
        </linearGradient>
      </defs>

      {/* Hydraulique */}
      <m.g variants={pop} style={origin}>
        <path
          d="M56 10c0 0-22 32-22 48a22 22 0 1 0 44 0C78 42 56 10 56 10Z"
          fill={`url(#${uid}-drop)`}
        />
        <path
          d="M48 28c-2 8-4 16-3 26c1 8 6 12 11 12c-8-2-14-12-12-26c1-6 3-10 4-12Z"
          fill="#DCEEFB"
          opacity="0.55"
        />
        <ellipse cx="48" cy="52" rx="6" ry="9" fill="#7EC8F0" opacity="0.45" />
      </m.g>

      {/* Génie civil — grue */}
      <m.g variants={pop} style={origin} fill="#0B3D7A">
        <path d="M96 28h86v4.5H96z" />
        <path d="M108 32v8h3.2V32z" />
        <path d="M109.2 40h1.2v16h-1.2z" />
        <path d="M106.5 56h6.4v3h-6.4z" />
        <path d="M148 32h10v8h-10z" />
        <path d="M151.2 40h3.6v36h-3.6z" />
        <path d="M148.8 46l9.6 10v3.2l-9.6-10z" />
        <path d="M158.4 46l-9.6 10v3.2l9.6-10z" />
        <path d="M148.8 62l9.6 10v3.2l-9.6-10z" />
        <path d="M158.4 62l-9.6 10v3.2l9.6-10z" />
        <path d="M147 76h14v6H147z" />
        <path d="M168 62h16v20h-16z" />
        <path d="M186 70h14v12h-14z" />
        <path d="M170 64h12v3h-12z" fill="#1E6FC4" />
        <path d="M188 72h10v2.4h-10z" fill="#1E6FC4" />
      </m.g>

      {/* Prestation — aimant */}
      <m.g variants={pop} style={origin}>
        <path
          fill="#0B3D7A"
          fillRule="evenodd"
          d="M214 12h20v40c0 8 5 16 12 16s12-8 12-16V12h20v42c0 20-15 36-32 36s-32-16-32-36V12zm24 12h-8v28c0 6 4 10 16 10s16-4 16-10V24h-8v28c0 2-3 5-8 5s-8-3-8-5V24z"
        />
      </m.g>

      {/* Électricité */}
      <m.g variants={pop} style={origin}>
        <path
          d="M324 8L292 48h22L288 86l52-46h-24L324 8z"
          fill={`url(#${uid}-bolt)`}
        />
      </m.g>

      {/* Import — tombereau */}
      <m.g variants={pop} style={origin}>
        <path fill="#C9D93F" d="M390 28h22v16h-22z" />
        <path fill="#A8B82F" d="M414 30h20v14h-20z" />
        <path fill="#1E6FC4" d="M372 44h78l8 22H366z" />
        <path fill="#0B3D7A" d="M360 52h12v10h-16z" />
        <circle cx="386" cy="72" r="8" fill="#081F42" />
        <circle cx="386" cy="72" r="3.2" fill="#3FA9E8" />
        <circle cx="432" cy="72" r="8" fill="#081F42" />
        <circle cx="432" cy="72" r="3.2" fill="#3FA9E8" />
      </m.g>

      <m.path
        variants={draw}
        d="M22 90 Q240 74 458 90"
        fill="none"
        stroke={`url(#${uid}-arc)`}
        strokeWidth="5"
        strokeLinecap="round"
      />

      <m.g variants={slide}>
        <text
          x="240"
          y="164"
          textAnchor="middle"
          fill="#081F42"
          fontFamily="var(--font-barlow), 'Barlow Condensed', sans-serif"
          fontSize="86"
          fontWeight="800"
          fontStyle="italic"
          letterSpacing="-3.2"
          opacity={tone === "dark" ? 0.35 : 1}
        >
          SiGEB
        </text>
        <text
          x="239"
          y="162"
          textAnchor="middle"
          fill={`url(#${uid}-word)`}
          fontFamily="var(--font-barlow), 'Barlow Condensed', sans-serif"
          fontSize="86"
          fontWeight="800"
          fontStyle="italic"
          letterSpacing="-3.2"
        >
          SiGEB
        </text>
        <rect
          x="40"
          y="100"
          width="400"
          height="36"
          fill={`url(#${uid}-gloss)`}
          style={{ mixBlendMode: "soft-light" }}
          pointerEvents="none"
        />
      </m.g>

      <m.path
        variants={draw}
        d="M36 182 Q240 196 444 182"
        fill="none"
        stroke={`url(#${uid}-arc)`}
        strokeWidth="4"
        strokeLinecap="round"
        onAnimationComplete={!full ? onComplete : undefined}
      />

      {full ? (
        <m.g
          variants={fade}
          fill={tone === "dark" ? "#ffffff" : "#0B3D7A"}
          onAnimationComplete={onComplete}
        >
          <text
            x="240"
            y="222"
            textAnchor="middle"
            fontFamily="var(--font-source), 'Source Sans 3', sans-serif"
            fontSize="15"
            fontWeight="600"
            letterSpacing="0.01em"
          >
            {company.legal}
          </text>
          <text
            x="240"
            y="246"
            textAnchor="middle"
            fontFamily="var(--font-source), 'Source Sans 3', sans-serif"
            fontSize="9.5"
            fill={tone === "dark" ? "#C9D93F" : "#1E6FC4"}
            letterSpacing="0.04em"
          >
            Hydraulique · Génie Civil · Électricité · Prestation · Import &amp;
            Export · Commerce
          </text>
        </m.g>
      ) : null}
    </m.svg>
  );
}
