import type { Metadata } from "next";
import { company } from "@/lib/company";
import { ProjectsView } from "@/views/ProjectsView";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description: `Réalisations ${company.name} : stations de pompage, traitement de l'eau, réseaux d'eau potable, groupes électrogènes et fournitures hydrauliques au Bénin.`,
};

export default function RealisationsPage() {
  return <ProjectsView />;
}
