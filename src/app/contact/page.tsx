import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { GoldButton } from "@/components/GoldButton";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { company, whatsappLink } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez SGHCB à Cotonou : téléphone, WhatsApp, formulaire et carte. Devis sous 24–48h.",
};

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&z=12&output=embed`;

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Un appel. Un message. Un devis."
        text="En Afrique de l'Ouest, beaucoup de projets se lancent au téléphone. Le formulaire est là. WhatsApp aussi."
        crumbs={[
          { href: "/", label: "Accueil" },
          { href: "/contact", label: "Contact" },
        ]}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <ul className="space-y-6">
            <li>
              <p className="font-condensed text-[11px] uppercase tracking-[0.2em] text-ocean">
                Téléphone
              </p>
              <a
                href={company.phoneHref}
                className="mt-1 block font-heading text-3xl text-navy hover:text-ocean"
              >
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <p className="font-condensed text-[11px] uppercase tracking-[0.2em] text-ocean">
                WhatsApp
              </p>
              <a
                href={whatsappLink()}
                className="mt-1 text-lg text-navy hover:text-gold"
              >
                Écrire maintenant
              </a>
            </li>
            <li>
              <p className="font-condensed text-[11px] uppercase tracking-[0.2em] text-ocean">
                Email
              </p>
              <a href={`mailto:${company.email}`} className="mt-1 text-lg hover:text-ocean">
                {company.email}
              </a>
            </li>
            <li>
              <p className="font-condensed text-[11px] uppercase tracking-[0.2em] text-ocean">
                Adresse
              </p>
              <p className="mt-1 text-lg">{company.address}</p>
            </li>
            <li>
              <p className="font-condensed text-[11px] uppercase tracking-[0.2em] text-ocean">
                Horaires
              </p>
              <p className="mt-1 text-lg">{company.hours}</p>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <GoldButton href={company.phoneHref}>Appeler</GoldButton>
            <GoldButton href={whatsappLink()} variant="navy">
              WhatsApp
            </GoldButton>
          </div>
        </div>
        <div className="border border-navy/10 bg-mist p-6 sm:p-8">
          <h2 className="font-heading text-2xl text-navy">Formulaire</h2>
          <p className="mt-2 text-ink/70">
            Nom, téléphone, service, message. Nous répondons sous 24–48h.
          </p>
          <div className="mt-6">
            <QuoteForm compact />
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-heading text-3xl text-navy">Nous trouver</h2>
          <div className="mt-6 overflow-hidden border border-navy/10">
            <iframe
              title="Carte — SGHCB Cotonou"
              src={mapSrc}
              className="h-[380px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
