import Link from "next/link";

type Props = {
  kicker?: string;
  title: string;
  text?: string;
  crumbs?: { href: string; label: string }[];
};

export function PageHero({ kicker, title, text, crumbs }: Props) {
  return (
    <section className="navy-field relative overflow-hidden text-white">
      <div
        className="pointer-events-none absolute -right-16 top-10 size-64 rotate-45 border border-gold/20"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {crumbs ? (
          <nav className="mb-6 font-condensed text-[12px] uppercase tracking-[0.16em] text-white/60">
            {crumbs.map((c, i) => (
              <span key={c.href}>
                {i > 0 ? <span className="mx-2 text-gold">/</span> : null}
                <Link href={c.href} className="hover:text-gold">
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}
        {kicker ? (
          <p className="font-condensed text-[12px] font-semibold uppercase tracking-[0.28em] text-gold">
            {kicker}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {text ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {text}
          </p>
        ) : null}
      </div>
    </section>
  );
}
