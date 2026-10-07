import type { L } from "@/i18n/messages";

const mapsQuery = "Allégléta, Abomey-Calavi, Bénin";

export const company = {
  name: "SIGEB",
  legal: "Société d'Ingénierie et de Génie du Bénin",
  tagline: {
    fr: "Ingénierie sûre, réalisations durables",
    en: "Sound engineering, lasting results",
  } satisfies L,
  baseline: {
    fr: "Études, conception, réalisation et suivi de travaux en hydraulique, génie civil, électricité et énergie ; technologies, commerce général et import-export ; conseil, formation et expertise technique.",
    en: "Studies, design, construction and supervision of works in water, civil engineering, electrical and energy; technology, general trade and import-export; advice, training and technical expertise.",
  } satisfies L,
  email: "sigebbursecretariat@gmail.com",
  phone: "+229 01 51 15 88 11",
  phoneHref: "tel:+2290151158811",
  city: "Abomey-Calavi",
  address: {
    fr: "Quartier Allégléta, Abomey-Calavi, République du Bénin",
    en: "Allégléta district, Abomey-Calavi, Republic of Benin",
  } satisfies L,
  addressDetail: "Îlot C/SB, Parcelle C/SB",
  // TODO: horaires à confirmer par SIGEB.
  hours: {
    fr: "Lun – Ven : 8h00 – 18h00 · Sam : 8h00 – 13h00",
    en: "Mon – Fri: 8:00am – 6:00pm · Sat: 8:00am – 1:00pm",
  } satisfies L,
  mapsQuery,
  mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
  leader: {
    name: "Gabriel Cyrille ANAGONOU",
    title: {
      fr: "Ingénieur Génie de l'Eau et de l'Assainissement",
      en: "Water and Sanitation Engineer",
    } satisfies L,
  },
  capital: "1 000 000 FCFA",
  rccm: "RB/ABC/26 B 12290",
  ifu: "3202639403731",
  founded: "2026",
  // TODO: confirmer après l'achat du domaine.
  siteUrl: "https://sigeb.net",
};

export function emailLink(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${company.email}${query ? `?${query}` : ""}`;
}
