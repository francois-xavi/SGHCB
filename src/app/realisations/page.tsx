import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Réalisations BTP et hydraulique",
  description:
    "Portfolio SGHCB : forages, bâtiments, voiries, réseaux électriques et fournitures au Bénin.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        kicker="Portfolio"
        title="Des ouvrages livrés. Des territoires desservis."
        text="Filtrez par pôle. Chaque fiche détaille le contexte, la durée et la galerie."
        crumbs={[
          { href: "/", label: "Accueil" },
          { href: "/realisations", label: "Réalisations" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <ProjectGrid />
      </section>
      <CtaBand title="Un projet similaire ?" />
    </>
  );
}
