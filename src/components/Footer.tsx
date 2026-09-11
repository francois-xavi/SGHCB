import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { services } from "@/data/content";
import { company, whatsappLink } from "@/lib/company";

export function Footer() {
  return (
    <footer className="navy-field text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Image
              src="/logo_footer.png"
              alt="SGHCB — Société de Génie Hydraulique et Civil du Bénin"
              width={720}
              height={280}
              className="h-32 w-auto max-w-full object-contain object-left sm:h-40 lg:h-48"
            />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/75">
              {company.legal}. Quatre pôles, un interlocuteur : eau, BTP,
              électricité et commerce général.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
              Navigation
            </p>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <Link href="/" className="hover:text-gold">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-gold">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-gold">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/devis" className="hover:text-gold">
                  Demander un devis
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
              Pôles
            </p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="hover:text-gold">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
              Coordonnées
            </p>
            <ul className="mt-4 space-y-3 text-[15px] text-white/80">
              <li>{company.address}</li>
              <li>
                <a href={company.phoneHref} className="hover:text-gold">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-gold">
                  {company.email}
                </a>
              </li>
              <li>{company.hours}</li>
            </ul>
            <a
              href={whatsappLink()}
              className="mt-6 inline-flex min-h-11 items-center gap-2 bg-gold px-4 font-condensed text-[13px] font-semibold uppercase tracking-[0.14em] text-navy hover:bg-gold-deep hover:text-white"
            >
              <Phone className="size-4" aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="gold-rule mt-12" />
        <div className="mt-6 flex flex-col gap-3 text-[13px] text-white/55 sm:flex-row sm:justify-between">
          <p>© 2026 {company.name}. Tous droits réservés.</p>
          <Link href="/mentions-legales" className="hover:text-gold">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
