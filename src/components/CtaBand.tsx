import { GoldButton } from "./GoldButton";
import { company } from "@/lib/company";

export function CtaBand({
  title = "Un projet ? Parlons-en.",
  text = "Devis sous 24–48h. Un appel ou un message WhatsApp suffit pour démarrer.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="navy-field text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-center">
        <div>
          <p className="font-condensed text-[12px] uppercase tracking-[0.28em] text-gold">
            {company.name}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-white/75">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <GoldButton href="/devis">Demander un devis</GoldButton>
          <GoldButton href={company.phoneHref} variant="outline">
            {company.phoneDisplay}
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
