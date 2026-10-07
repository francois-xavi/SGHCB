"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type Ref,
} from "react";
import { useInView, useReducedMotion } from "motion/react";
import type { Player as LordPlayer } from "@lordicon/react";
import { lordiconUrl, type LordiconName } from "@/lib/lordicons";

type Trigger = "hover" | "in-view" | "loop" | "none";
type Tone = "light" | "dark";

type Props = {
  name: LordiconName;
  size?: number;
  /**
   * hover : joue au survol de l'élément parent marqué `data-icon-trigger` (ou de l'icône) ;
   * in-view : joue une fois à l'apparition ; loop : boucle ; none : piloté par `play`.
   */
  trigger?: Trigger;
  /** light = fond clair (marine + or foncé) ; dark = fond sombre (blanc + or). */
  tone?: Tone;
  /** Incrémenter pour rejouer l'animation depuis le parent. */
  play?: number;
  /** Rendu statique avant chargement (et si le CDN est indisponible). */
  fallback?: ReactNode;
  className?: string;
};

const COLORS: Record<Tone, string> = {
  light: "primary:#0b3d7a,secondary:#a8b82f",
  dark: "primary:#ffffff,secondary:#c9d93f",
};

type PlayerComponent = ComponentType<LordPlayer["props"] & { ref?: Ref<LordPlayer> }>;

const iconCache = new Map<LordiconName, Promise<unknown>>();
let playerPromise: Promise<PlayerComponent> | null = null;

function loadIcon(name: LordiconName) {
  let pending = iconCache.get(name);
  if (!pending) {
    pending = fetch(lordiconUrl(name)).then((r) => {
      if (!r.ok) throw new Error(`Lordicon ${name}: ${r.status}`);
      return r.json();
    });
    pending.catch(() => iconCache.delete(name));
    iconCache.set(name, pending);
  }
  return pending;
}

function loadPlayer() {
  playerPromise ??= import("@lordicon/react").then(
    (m) => m.Player as unknown as PlayerComponent,
  );
  return playerPromise;
}

export function AnimatedIcon({
  name,
  size = 32,
  trigger = "hover",
  tone = "light",
  play,
  fallback,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const playerRef = useRef<LordPlayer>(null);
  const near = useInView(ref, { once: true, margin: "200px" });
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState<{ Player: PlayerComponent; icon: unknown } | null>(null);

  useEffect(() => {
    if (!near) return;
    let alive = true;
    Promise.all([loadPlayer(), loadIcon(name)])
      .then(([Player, icon]) => {
        if (alive) setLoaded({ Player, icon });
      })
      .catch(() => {
        /* le fallback statique reste affiché */
      });
    return () => {
      alive = false;
    };
  }, [near, name]);

  useEffect(() => {
    if (!loaded || trigger !== "hover" || reduce) return;
    const host =
      ref.current?.closest<HTMLElement>("[data-icon-trigger]") ?? ref.current;
    if (!host) return;
    const onEnter = () => playerRef.current?.playFromBeginning();
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("focusin", onEnter);
    return () => {
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("focusin", onEnter);
    };
  }, [loaded, trigger, reduce]);

  useEffect(() => {
    if (loaded && play && !reduce) playerRef.current?.playFromBeginning();
  }, [play, loaded, reduce]);

  const Player = loaded?.Player;

  return (
    <span
      ref={ref}
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {Player ? (
        <Player
          ref={playerRef}
          icon={loaded.icon}
          size={size}
          colors={COLORS[tone]}
          onReady={() => {
            if (reduce) return;
            if (trigger === "in-view" || trigger === "loop") {
              playerRef.current?.playFromBeginning();
            }
          }}
          onComplete={() => {
            if (trigger === "loop" && !reduce) {
              window.setTimeout(() => playerRef.current?.playFromBeginning(), 1200);
            }
          }}
        />
      ) : (
        fallback ?? null
      )}
    </span>
  );
}
