"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { Menu, X, ChevronDown, Mail, Phone } from "lucide-react";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PoleIcon } from "@/components/PoleIcon";
import { services } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company, emailLink } from "@/lib/company";
import { pillarLordicon } from "@/lib/lordicons";

export function Header() {
  const pathname = usePathname();
  const { t, tr } = useLanguage();
  // Les menus sont liés à la page courante : ils se ferment d'eux-mêmes à la navigation.
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [servicesFor, setServicesFor] = useState<string | null>(null);
  const open = menuFor === pathname;
  const servicesOpen = servicesFor === pathname;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const blockServicesOpen = useRef(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(y > 160 && y > previous + 2);
    if (y < previous - 2) setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services, children: true },
    { href: "/realisations", label: t.nav.projects },
    { href: "/a-propos", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeServices = () => {
    blockServicesOpen.current = true;
    setServicesFor(null);
  };

  return (
    <>
      <m.header
        className="sticky top-0 z-50"
        animate={{ y: hidden && !open && !servicesOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hidden bg-primary-darker text-white lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[13px]">
            <p className="font-condensed uppercase tracking-[0.18em] text-white/80">
              {company.legal}
            </p>
            <div className="flex items-center gap-6">
              <a
                href={company.phoneHref}
                className="text-white/80 transition-colors hover:text-gold"
              >
                {company.phone}
              </a>
              <a
                href={emailLink()}
                className="text-white/80 transition-colors hover:text-gold"
              >
                {company.email}
              </a>
              <LanguageSwitcher variant="dark" />
            </div>
          </div>
        </div>

        <div
          className={`relative border-b bg-white transition-shadow ${
            scrolled
              ? "border-gold/40 shadow-[0_8px_30px_rgba(8,31,66,0.08)]"
              : "border-neutral-border"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link
              href="/"
              className="relative z-10 shrink-0"
              aria-label={`${company.name}, ${t.nav.home}`}
            >
              <Image
                src="/logo.png"
                alt={`${company.name} — ${company.legal}`}
                width={280}
                height={96}
                className="h-10 w-auto max-h-10 object-contain object-left sm:h-11 sm:max-h-11 lg:h-12 lg:max-h-12"
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
                      if (!blockServicesOpen.current) setServicesFor(pathname);
                    }}
                    onMouseLeave={() => {
                      blockServicesOpen.current = false;
                      setServicesFor(null);
                    }}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setServicesFor(null);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`relative inline-flex min-h-11 items-center gap-1 px-3 font-condensed text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                        isActive(item.href) ? "text-ocean" : "text-navy hover:text-ocean"
                      }`}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      onClick={closeServices}
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-3.5 opacity-70 transition-transform duration-300 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                      {isActive(item.href) ? <NavUnderline /> : null}
                    </Link>
                    <AnimatePresence>
                      {servicesOpen ? (
                        <m.div
                          className="absolute left-1/2 top-full z-20 w-[640px] -translate-x-1/2 pt-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <m.div
                            className="grid grid-cols-2 gap-1 border border-neutral-border bg-white p-3 shadow-[0_20px_50px_rgba(8,31,66,0.12)]"
                            initial="hidden"
                            animate="show"
                            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
                          >
                            {services.map((s) => (
                              <m.div
                                key={s.id}
                                variants={{
                                  hidden: { opacity: 0, y: 8 },
                                  show: { opacity: 1, y: 0 },
                                }}
                              >
                                <Link
                                  href={`/services/${s.slug}`}
                                  data-icon-trigger
                                  className="group flex gap-3 px-3 py-3 transition-colors hover:bg-mist"
                                  onClick={closeServices}
                                >
                                  <AnimatedIcon
                                    name={pillarLordicon[s.id]}
                                    size={40}
                                    fallback={<PoleIcon id={s.id} className="size-6 text-ocean" />}
                                  />
                                  <span>
                                    <span className="font-condensed text-[12px] font-semibold uppercase tracking-[0.16em] text-navy group-hover:text-ocean">
                                      {tr(s.label)}
                                    </span>
                                    <span className="mt-0.5 block text-[13px] leading-snug text-ink/70">
                                      {tr(s.short)}
                                    </span>
                                  </span>
                                </Link>
                              </m.div>
                            ))}
                          </m.div>
                        </m.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative inline-flex min-h-11 items-center px-3 font-condensed text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                      isActive(item.href) ? "text-ocean" : "text-navy hover:text-ocean"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) ? <NavUnderline /> : null}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="lg:hidden">
                <LanguageSwitcher />
              </div>
              <Link
                href="/devis"
                className="inline-flex min-h-11 items-center bg-gold px-3 font-condensed text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-darker transition-colors hover:bg-gold-deep sm:px-5 sm:text-[13px]"
              >
                {t.nav.quote}
              </Link>
              <button
                type="button"
                className="inline-flex size-11 cursor-pointer items-center justify-center text-navy xl:hidden"
                aria-expanded={open}
                aria-label={open ? t.closeMenu : t.openMenu}
                onClick={() => setMenuFor(open ? null : pathname)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <m.span
                    key={open ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="size-6" /> : <Menu className="size-6" />}
                  </m.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          <m.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold"
            style={{ scaleX: progress }}
          />
        </div>
      </m.header>

      <AnimatePresence>
        {open ? (
          <>
            <m.div
              key="overlay"
              className="fixed inset-0 z-[70] bg-primary-darker/50 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuFor(null)}
            />
            <m.nav
              key="panel"
              aria-label="Mobile"
              className="fixed inset-y-0 right-0 z-[80] flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-white px-6 pb-8 pt-4 shadow-[-20px_0_60px_rgba(8,31,66,0.25)] xl:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <LanguageSwitcher />
                <button
                  type="button"
                  className="inline-flex size-11 cursor-pointer items-center justify-center text-navy"
                  aria-label={t.closeMenu}
                  onClick={() => setMenuFor(null)}
                >
                  <X className="size-6" />
                </button>
              </div>
              <m.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {links.map((item) => (
                  <m.li
                    key={item.href}
                    variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between border-b border-neutral-border py-3 font-condensed text-[15px] font-semibold uppercase tracking-[0.14em] ${
                        isActive(item.href) ? "text-ocean" : "text-navy"
                      }`}
                    >
                      {item.label}
                      {isActive(item.href) ? <span className="size-1.5 bg-gold" /> : null}
                    </Link>
                  </m.li>
                ))}
                {services.map((s) => (
                  <m.li
                    key={s.id}
                    variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href={`/services/${s.slug}`}
                      data-icon-trigger
                      className="flex items-center gap-3 py-2 text-[15px] text-ink/80"
                    >
                      <AnimatedIcon
                        name={pillarLordicon[s.id]}
                        size={30}
                        trigger="in-view"
                        fallback={<PoleIcon id={s.id} className="size-5 text-ocean" />}
                      />
                      {tr(s.label)}
                    </Link>
                  </m.li>
                ))}
              </m.ul>
              <div className="mt-6 grid gap-2">
                <a
                  href={company.phoneHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-navy font-condensed uppercase tracking-[0.14em] text-navy"
                >
                  <Phone className="size-4" aria-hidden />
                  {company.phone}
                </a>
                <a
                  href={emailLink()}
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary-darker font-condensed uppercase tracking-[0.14em] text-gold"
                >
                  <Mail className="size-4" aria-hidden />
                  {t.writeUs}
                </a>
              </div>
            </m.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NavUnderline() {
  return (
    <m.span
      layoutId="nav-underline"
      className="absolute inset-x-3 bottom-1 h-0.5 bg-gold"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  );
}
