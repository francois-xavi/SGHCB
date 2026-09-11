import type { MetadataRoute } from "next";
import { projects, services } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sghcb.bj";
  const staticRoutes = [
    "",
    "/services",
    "/realisations",
    "/a-propos",
    "/contact",
    "/devis",
    "/mentions-legales",
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
    })),
    ...projects.map((p) => ({
      url: `${base}/realisations/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
