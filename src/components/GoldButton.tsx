import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "gold" | "outline" | "navy";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const styles = {
  gold: "bg-gold text-primary-darker hover:bg-gold-deep",
  outline:
    "border border-white/70 text-white hover:border-gold hover:text-gold bg-transparent",
  navy: "bg-navy text-white hover:bg-ocean",
};

export function GoldButton({
  href,
  children,
  variant = "gold",
  className = "",
  type = "button",
  onClick,
}: Props) {
  const cls = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 px-6 text-center font-condensed text-[15px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${styles[variant]} ${className}`;

  if (href) {
    const external =
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");
    if (external) {
      const abs = href.startsWith("http");
      return (
        <a
          href={href}
          className={cls}
          {...(abs
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
