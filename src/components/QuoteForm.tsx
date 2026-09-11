"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { services, type ServiceId } from "@/data/content";
import { company, whatsappLink } from "@/lib/company";
import { GoldButton } from "./GoldButton";

type Props = {
  defaultService?: ServiceId | "";
  compact?: boolean;
};

export function QuoteForm({ defaultService = "", compact = false }: Props) {
  const [sent, setSent] = useState(false);
  const [service, setService] = useState<string>(defaultService);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const serviceId = String(data.get("service") || "");
    const serviceName =
      services.find((s) => s.id === serviceId)?.label || serviceId || "non précisé";
    const message = [
      "Bonjour SGHCB, demande de devis :",
      `Service : ${serviceName}`,
      `Projet : ${data.get("description")}`,
      data.get("budget") ? `Budget : ${data.get("budget")}` : null,
      data.get("delai") ? `Délai : ${data.get("delai")}` : null,
      `Nom : ${data.get("name")}`,
      `Téléphone : ${data.get("phone")}`,
      data.get("email") ? `Email : ${data.get("email")}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-gold/40 bg-mist p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-ocean" />
        <h3 className="mt-4 font-heading text-2xl text-navy">Demande envoyée</h3>
        <p className="mt-2 text-ink/80">
          WhatsApp s&apos;est ouvert avec votre message. {company.responseDelay}.
          Vous pouvez aussi nous appeler directement.
        </p>
        <a
          href={company.phoneHref}
          className="mt-6 inline-flex min-h-12 items-center justify-center bg-gold px-6 font-condensed text-[13px] font-semibold uppercase tracking-[0.14em] text-navy"
        >
          Appeler {company.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {!compact ? (
        <p className="font-condensed text-[12px] uppercase tracking-[0.2em] text-ocean">
          {company.responseDelay}
        </p>
      ) : null}

      <Field label="Service concerné">
        <select
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="field"
          required
        >
          <option value="">Choisir un pôle</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Description du projet">
        <textarea
          name="description"
          rows={compact ? 4 : 5}
          required
          placeholder="Type d'ouvrage, localisation, contraintes…"
          className="field resize-y"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Budget estimatif (optionnel)">
          <input name="budget" className="field" placeholder="Ex. 25 000 000 FCFA" />
        </Field>
        <Field label="Délai souhaité">
          <input name="delai" className="field" placeholder="Ex. 3 mois" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom et prénom">
          <input name="name" required autoComplete="name" className="field" />
        </Field>
        <Field label="Téléphone">
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="field"
          />
        </Field>
      </div>

      <Field label="Email (optionnel)">
        <input name="email" type="email" autoComplete="email" className="field" />
      </Field>

      <GoldButton type="submit" className="w-full sm:w-auto">
        Envoyer via WhatsApp
      </GoldButton>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-condensed text-[12px] font-semibold uppercase tracking-[0.16em] text-navy">
        {label}
      </span>
      {children}
    </label>
  );
}
