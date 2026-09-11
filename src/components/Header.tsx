"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { services } from "@/data/content";
import { company } from "@/lib/company";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services", children: true },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const blockServicesOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[13px]">
          <p className="font-condensed uppercase tracking-[0.18em] text-white/80">
            {company.legal}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 text-gold transition-colors hover:text-white"
            >
              <Phone className="size-3.5" aria-hidden />
              {company.phoneDisplay}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="text-white/80 transition-colors hover:text-gold"
            >
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b bg-white transition-shadow ${
          scrolled
            ? "border-gold/40 shadow-[0_8px_30px_rgba(11,37,69,0.08)]"
            : "border-navy/8"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="relative z-10 shrink-0" aria-label="SGHCB, accueil">
            <Image
              src="/logo.png"
              alt="SGHCB — Société de Génie Hydraulique et Civil du Bénin"
              width={360}
              height={120}
              className="h-12 w-auto object-contain object-left sm:h-16 lg:h-[4.25rem]"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Principal">
            {links.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (!blockServicesOpen.current) setServicesOpen(true);
                  }}
                  onMouseLeave={() => {
                    blockServicesOpen.current = false;
                    setServicesOpen(false);
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setServicesOpen(false);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex min-h-11 items-center gap-1 px-3 font-condensed text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                      pathname.startsWith("/services")
                        ? "text-ocean"
                        : "text-navy hover:text-ocean"
                    }`}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => {
                      blockServicesOpen.current = true;
                      setServicesOpen(false);
                    }}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 opacity-70" aria-hidden />
                  </Link>
                  <div
                    className={`absolute left-0 top-full z-20 w-[340px] pt-3 transition ${
                      servicesOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-1 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="border border-navy/10 bg-white p-3 shadow-[0_20px_50px_rgba(11,37,69,0.12)]">
                      {services.map((s) => (
                        <Link
                          key={s.id}
                          href={`/services/${s.slug}`}
                          className="block px-3 py-2.5 transition-colors hover:bg-mist"
                          onClick={() => {
                            blockServicesOpen.current = true;
                            setServicesOpen(false);
                          }}
                        >
                          <span className="font-condensed text-[12px] font-semibold uppercase tracking-[0.16em] text-navy">
                            {s.label}
                          </span>
                          <span className="mt-0.5 block text-[13px] text-ink/70">
                            {s.short}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex min-h-11 items-center px-3 font-condensed text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    pathname === item.href
                      ? "text-ocean"
                      : "text-navy hover:text-ocean"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/devis"
              className="inline-flex min-h-11 items-center bg-gold px-4 font-condensed text-[12px] font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold-deep hover:text-white sm:px-5 sm:text-[13px]"
            >
              Demander un devis
            </Link>
            <button
              type="button"
              className="inline-flex size-11 cursor-pointer items-center justify-center text-navy xl:hidden"
              aria-expanded={open}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-b border-navy/10 bg-white xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4" aria-label="Mobile">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-navy/8 py-3 font-condensed text-[15px] font-semibold uppercase tracking-[0.14em] text-navy"
              >
                {item.label}
              </Link>
            ))}
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="py-2.5 pl-3 text-[15px] text-ink/80"
              >
                {s.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="mt-4 inline-flex min-h-12 items-center justify-center bg-navy font-condensed uppercase tracking-[0.14em] text-gold"
            >
              Appeler {company.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
