import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function LegalPage() {
  return (
    <>
      <PageHero
        kicker="Juridique"
        title="Mentions légales"
        crumbs={[
          { href: "/", label: "Accueil" },
          { href: "/mentions-legales", label: "Mentions légales" },
        ]}
      />
      <article className="mx-auto max-w-3xl space-y-6 px-6 py-16 leading-relaxed text-ink/80">
        <p>
          <strong className="text-navy">{company.legal}</strong> ({company.name}
          ), {company.address}.
        </p>
        <p>
          Contact : {company.email} — {company.phoneDisplay}.
        </p>
        <p>
          Les contenus de ce site (textes, visuels, marque) sont protégés.
          Toute reproduction non autorisée est interdite. Les photographies
          de chantiers illustratives peuvent être remplacées par les visuels
          officiels de l&apos;entreprise.
        </p>
        <p>
          Les coordonnées affichées (téléphone, email, adresse) sont à
          confirmer par SGHCB avant mise en production.
        </p>
      </article>
    </>
  );
}
