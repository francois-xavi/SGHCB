"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { messages, tr, type L, type Locale, type Messages } from "@/i18n/messages";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
  /** Traduit un texte localisé des données. */
  tr: (value: L) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "sigeb-locale";
const listeners = new Set<() => void>();

function readLocale(): Locale {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "fr";
  } catch {
    return "fr";
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function storeLocale(next: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* stockage indisponible : la langue ne sera pas mémorisée */
  }
  // Fondu léger du contenu pendant le changement de langue (voir globals.css).
  const root = document.documentElement;
  root.classList.remove("lang-switch");
  void root.offsetWidth;
  root.classList.add("lang-switch");
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Langue mémorisée dans le navigateur ; le rendu serveur reste en français.
  const locale = useSyncExternalStore(subscribe, readLocale, () => "fr" as const);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: storeLocale,
      t: messages[locale],
      tr: (value: L) => tr(value, locale),
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
