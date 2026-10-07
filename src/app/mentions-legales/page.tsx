import type { Metadata } from "next";
import { LegalView } from "@/views/LegalView";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function LegalPage() {
  return <LegalView />;
}
