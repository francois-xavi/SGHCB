import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Barlow_Condensed, Source_Sans_3, Syne } from "next/font/google";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileActionBar } from "@/components/MobileActionBar";
import { SkipLink } from "@/components/SkipLink";
import { ToastProvider } from "@/components/Toast";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
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
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.name} — ${company.legal}`,
    template: `%s · ${company.name}`,
  },
  description: `${company.name} — ${company.legal}. ${company.baseline.fr}`,
  keywords: [
    "SIGEB",
    "ingénierie Bénin",
    "entreprise BTP Bénin",
    "forage Bénin",
    "adduction d'eau potable Bénin",
    "hydraulique Abomey-Calavi",
    "génie civil Bénin",
    "électricité et énergie Bénin",
    "groupe électrogène Bénin",
    "fournitures hydrauliques Bénin",
    "études et contrôle de travaux",
  ],
  openGraph: {
    title: `${company.name} — ${company.legal}`,
    description: company.tagline.fr,
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
      <body className="min-h-full flex flex-col bg-white pb-[calc(4rem+env(safe-area-inset-bottom))] text-ink font-sans md:pb-0">
        <LanguageProvider>
          <MotionProvider>
            <ToastProvider>
              <SkipLink />
              <Header />
              <main id="contenu" className="flex-1">
                <ViewTransition>{children}</ViewTransition>
              </main>
              <Footer />
              <BackToTop />
              <MobileActionBar />
            </ToastProvider>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
