import type { Metadata } from "next";
import { company } from "@/lib/company";
import { AboutView } from "@/views/AboutView";

export const metadata: Metadata = {
  title: "À propos",
  description: `${company.name}, ${company.legal} : histoire, mission, vision, valeurs, organisation et pôles d'expertise. Siège à Abomey-Calavi, Bénin.`,
};

export default function AboutPage() {
  return <AboutView />;
}
