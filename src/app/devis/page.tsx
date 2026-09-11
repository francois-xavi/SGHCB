import type { Metadata } from "next";
import { GoldButton } from "@/components/GoldButton";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Demander un devis",
  description:
    "Demande de devis SGHCB : type de service, description, budget, délai. Réponse sous 24–48h.",
};

export default function DevisPage() {
  return (
    <>
      <PageHero
        kicker="Devis"
        title="Décrivez l'ouvrage. Nous chiffrons."
        text={`${company.responseDelay}. Un chargé d'affaires vous rappelle. Vous pouvez aussi appeler maintenant.`}
        crumbs={[
          { href: "/", label: "Accueil" },
          { href: "/devis", label: "Devis" },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="border border-navy/10 bg-white p-6 sm:p-10">
            <QuoteForm />
          </div>
        </div>
        <aside className="lg:col-span-5">
          <div className="navy-field p-8 text-white">
            <p className="font-condensed text-[12px] uppercase tracking-[0.22em] text-gold">
              Engagement
            </p>
            <h2 className="mt-3 font-heading text-3xl">Réponse sous 24–48h</h2>
            <ul className="mt-6 space-y-4 text-white/80">
              <li>Visite de site si le projet l&apos;exige</li>
              <li>Proposition technique et chiffrage</li>
              <li>Un interlocuteur jusqu&apos;à la réception</li>
            </ul>
            <GoldButton href={company.phoneHref} className="mt-8">
              Appeler {company.phoneDisplay}
            </GoldButton>
          </div>
        </aside>
      </section>
    </>
  );
}
