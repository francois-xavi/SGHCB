"use client";

import { MessageCircle, Phone } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

export function WhatsAppFab() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      <a
        href={company.phoneHref}
        className="inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-navy text-gold shadow-[0_12px_30px_rgba(11,37,69,0.35)] transition hover:bg-ocean hover:text-white lg:hidden"
        aria-label={`Appeler ${company.phoneDisplay}`}
      >
        <Phone className="size-6" />
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.4)] transition hover:scale-105"
        aria-label="Écrire sur WhatsApp"
      >
        <MessageCircle className="size-7" />
      </a>
    </div>
  );
}
