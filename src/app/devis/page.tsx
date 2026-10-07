import type { Metadata } from "next";
import { company } from "@/lib/company";
import { QuoteView } from "@/views/QuoteView";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: `Demande de devis ${company.name} : type de service, description, budget, délai. Réponse sous 24–48h.`,
};

export default function DevisPage() {
  return <QuoteView />;
}
