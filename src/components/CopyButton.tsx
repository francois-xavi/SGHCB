"use client";

import { Copy } from "lucide-react";
import { useToast } from "@/components/Toast";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Copie une valeur (email, téléphone) dans le presse-papier avec un toast de confirmation. */
export function CopyButton({ value, className = "" }: { value: string; className?: string }) {
  const toast = useToast();
  const { t } = useLanguage();

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      toast(`${t.ui.copied} ${value}`);
    } catch {
      toast(t.ui.copyFailed, "error");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${t.ui.copy} ${value}`}
      title={t.ui.copy}
      className={`inline-flex size-9 cursor-pointer items-center justify-center border border-neutral-border text-ocean transition hover:border-gold hover:bg-gold hover:text-navy ${className}`}
    >
      <Copy className="size-4" aria-hidden />
    </button>
  );
}
