"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { services } from "@/data/content";

export type QuoteInput = {
  service: string;
  description: string;
  budget?: string;
  delai?: string;
  name: string;
  phone?: string;
  email: string;
  /** Champ piège invisible : rempli uniquement par les robots. */
  website?: string;
};

export type QuoteResult =
  | { ok: true }
  | { ok: false; reason: "config" | "invalid" | "rate" | "send" };

const schema = z.object({
  service: z.string().min(1).max(40),
  description: z.string().trim().min(10).max(4000),
  budget: z.string().trim().max(120).optional(),
  delai: z.string().trim().max(120).optional(),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional(),
  email: z.email().max(200),
  website: z.string().max(0).optional(),
});

// Limite simple en mémoire : 5 demandes / 10 min par IP (par instance serveur).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function sendQuote(input: QuoteInput): Promise<QuoteResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    // Un robot qui remplit le champ piège reçoit une réponse « ok » silencieuse.
    if (input.website) return { ok: true };
    return { ok: false, reason: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "config" };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return { ok: false, reason: "rate" };

  const data = parsed.data;
  const serviceName =
    services.find((s) => s.id === data.service)?.label.fr ?? data.service;

  const text = [
    "Nouvelle demande de devis depuis le site SIGEB",
    "",
    `Service : ${serviceName}`,
    `Projet : ${data.description}`,
    data.budget ? `Budget : ${data.budget}` : null,
    data.delai ? `Délai : ${data.delai}` : null,
    "",
    `Nom : ${data.name}`,
    data.phone ? `Téléphone : ${data.phone}` : null,
    `Email : ${data.email}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // TODO: utiliser une adresse du domaine vérifié (ex. devis@sigeb.net) après l'achat du domaine.
      from: process.env.QUOTE_FROM_EMAIL ?? "SIGEB <onboarding@resend.dev>",
      to: process.env.QUOTE_TO_EMAIL ?? "sigebbursecretariat@gmail.com",
      replyTo: data.email,
      subject: `Demande de devis — ${serviceName} — ${data.name}`,
      text,
    });
    if (error) return { ok: false, reason: "send" };
    return { ok: true };
  } catch {
    return { ok: false, reason: "send" };
  }
}
