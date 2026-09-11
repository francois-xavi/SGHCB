import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3, Syne } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { company } from "@/lib/company";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const source = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sghcb.bj"),
  title: {
    default: `${company.name} — ${company.legal}`,
    template: `%s · ${company.name}`,
  },
  description:
    "SGHCB — Société de Génie Hydraulique et Civil du Bénin. Forage, BTP, électricité et commerce général à Cotonou et sur tout le territoire.",
  keywords: [
    "BTP Bénin",
    "forage Bénin",
    "génie hydraulique Cotonou",
    "entreprise BTP Cotonou",
    "adduction d'eau Bénin",
    "électricité Bénin",
    "SGHCB",
  ],
  openGraph: {
    title: `${company.name} — ${company.legal}`,
    description: company.tagline,
    locale: "fr_BJ",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${source.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink font-sans">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
