import type { Metadata } from "next";
import { company } from "@/lib/company";
import { ServicesView } from "@/views/ServicesView";

export const metadata: Metadata = {
  title: "Services d'ingénierie et de génie",
  description: `Les 6 pôles ${company.name} : études, hydraulique et assainissement, BTP et génie civil, électricité et énergie, technologies et commerce, formation et expertise au Bénin.`,
};

export default function ServicesPage() {
  return <ServicesView />;
}
