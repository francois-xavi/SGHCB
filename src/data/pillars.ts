import type { L } from "@/i18n/messages";

export const PILLAR_IDS = [
  "etudes",
  "hydraulique",
  "genie-civil",
  "electricite",
  "commerce",
  "prestation",
] as const;

export type PillarId = (typeof PILLAR_IDS)[number];

export type Pillar = {
  id: PillarId;
  slug: string;
  label: L;
  shortLabel: L;
  short: L;
  heroLabel: L;
  heroPhrase: L;
  accentColor: string;
  /** Visuel paysage du carrousel d'accueil. */
  image: string;
};

export const pillars: Pillar[] = [
  {
    id: "etudes",
    slug: "etudes-conception-controle",
    label: { fr: "Études, Conception & Contrôle", en: "Studies, Design & Supervision" },
    shortLabel: { fr: "Études", en: "Studies" },
    short: {
      fr: "Études techniques, plans, faisabilité, contrôle qualité et suivi de chantier.",
      en: "Technical studies, drawings, feasibility, quality control and site supervision.",
    },
    heroLabel: { fr: "ÉTUDES", en: "STUDIES" },
    heroPhrase: {
      fr: "De l'idée au dossier d'exécution.",
      en: "From idea to construction drawings.",
    },
    accentColor: "var(--primary-dark)",
    image: "/hero_caroussel/rebar_cutting.png",
  },
  {
    id: "hydraulique",
    slug: "hydraulique",
    label: { fr: "Hydraulique & Assainissement", en: "Water & Sanitation" },
    shortLabel: { fr: "Hydraulique", en: "Water" },
    short: {
      fr: "Forages, adduction d'eau potable, pompage, traitement et assainissement.",
      en: "Boreholes, drinking water supply, pumping, treatment and sanitation.",
    },
    heroLabel: { fr: "HYDRAULIQUE", en: "WATER" },
    heroPhrase: {
      fr: "L'eau qui alimente vos projets.",
      en: "The water that powers your projects.",
    },
    accentColor: "var(--primary-light)",
    image: "/hero_caroussel/water_pomping.png",
  },
  {
    id: "genie-civil",
    slug: "genie-civil",
    label: { fr: "BTP & Génie civil", en: "Construction & Civil Works" },
    shortLabel: { fr: "Génie civil", en: "Civil works" },
    short: {
      fr: "Maîtrise d'œuvre, bâtiments, infrastructures routières et construction métallique.",
      en: "Project management, buildings, road infrastructure and steel structures.",
    },
    heroLabel: { fr: "GÉNIE CIVIL", en: "CIVIL WORKS" },
    heroPhrase: {
      fr: "Du gros œuvre à la réception.",
      en: "From structural works to handover.",
    },
    accentColor: "var(--primary)",
    image: "/hero_caroussel/rebar_cutting.png",
  },
  {
    id: "electricite",
    slug: "electricite",
    label: { fr: "Électricité & Énergie", en: "Electrical & Energy" },
    shortLabel: { fr: "Électricité", en: "Electrical" },
    short: {
      fr: "Électricité bâtiment et forages, électromécanique, groupes électrogènes et énergies renouvelables.",
      en: "Building and borehole electrics, electromechanics, generators and renewable energy.",
    },
    heroLabel: { fr: "ÉLECTRICITÉ", en: "ELECTRICAL" },
    heroPhrase: {
      fr: "L'énergie qui fait tourner vos installations.",
      en: "The power that keeps your facilities running.",
    },
    accentColor: "var(--accent)",
    image: "/hero_caroussel/electrician.png",
  },
  {
    id: "commerce",
    slug: "technologies-commerce",
    label: { fr: "Technologies & Commerce", en: "Technology & Trade" },
    shortLabel: { fr: "Commerce", en: "Trade" },
    short: {
      fr: "Fournitures techniques, matériel informatique, commerce général et import-export.",
      en: "Technical supplies, IT equipment, general trade and import-export.",
    },
    heroLabel: { fr: "COMMERCE", en: "TRADE" },
    heroPhrase: {
      fr: "Vos approvisionnements, sans rupture.",
      en: "Your supplies, without disruption.",
    },
    accentColor: "var(--primary-light)",
    image: "/hero_caroussel/warehouse.png",
  },
  {
    id: "prestation",
    slug: "formation-expertise",
    label: { fr: "Formation & Expertise", en: "Training & Expertise" },
    shortLabel: { fr: "Formation", en: "Training" },
    short: {
      fr: "Conseil technique, formation, appui institutionnel et compétences locales.",
      en: "Technical advice, training, institutional support and local skills.",
    },
    heroLabel: { fr: "FORMATION", en: "TRAINING" },
    heroPhrase: {
      fr: "Transmettre le savoir-faire, durablement.",
      en: "Passing on know-how, for the long term.",
    },
    accentColor: "var(--accent-dark)",
    image: "/hero_caroussel/warehouse.png",
  },
];

export const serviceLabel = Object.fromEntries(
  pillars.map((p) => [p.id, p.shortLabel]),
) as Record<PillarId, L>;

export function getPillar(slug: string) {
  return pillars.find((p) => p.slug === slug);
}
