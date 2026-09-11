import Link from "next/link";
import { GoldButton } from "@/components/GoldButton";

export default function NotFound() {
  return (
    <section className="navy-field flex min-h-[60vh] flex-col items-center justify-center px-6 text-center text-white">
      <p className="font-condensed text-[12px] uppercase tracking-[0.28em] text-gold">
        404
      </p>
      <h1 className="mt-4 font-heading text-4xl font-semibold">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-white/70">
        Cette adresse n&apos;existe pas. Revenez à l&apos;accueil ou demandez
        un devis.
      </p>
      <div className="mt-8 flex gap-3">
        <GoldButton href="/">Accueil</GoldButton>
        <GoldButton href="/devis">
          Devis
        </GoldButton>
      </div>
    </section>
  );
}
