import type { Metadata } from "next";
import { company } from "@/lib/company";
import { ContactView } from "@/views/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${company.name} à Abomey-Calavi : email, téléphone, formulaire et plan d'accès. Devis sous 24–48h.`,
};

export default function ContactPage() {
  return <ContactView />;
}
