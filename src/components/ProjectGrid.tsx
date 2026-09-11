"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteImage } from "@/components/SiteImage";
import { projects, serviceLabel, type ServiceId } from "@/data/content";

const filters: { id: "all" | ServiceId; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "eau", label: "Eau" },
  { id: "btp", label: "BTP" },
  { id: "electricite", label: "Électricité" },
  { id: "commerce", label: "Commerce général" },
];

export function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`min-h-11 cursor-pointer px-4 font-condensed text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors ${
              filter === f.id
                ? "bg-navy text-gold"
                : "border border-navy/15 text-navy hover:border-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link
            key={p.slug}
            href={`/realisations/${p.slug}`}
            className="group block border border-navy/10 bg-white transition hover:border-gold"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-mist">
              <SiteImage
                src={p.image}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="font-condensed text-[11px] uppercase tracking-[0.18em] text-ocean">
                {serviceLabel[p.category]} · {p.location} · {p.year}
              </p>
              <h2 className="mt-2 font-heading text-2xl text-navy">{p.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
