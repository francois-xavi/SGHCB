import type { PillarId } from "@/data/pillars";

/**
 * Icônes Lordicon gratuites (famille « wired », style « lineal »), servies par le CDN
 * officiel. Licence gratuite : un lien « Icons by Lordicon.com » est affiché dans le footer.
 * Clé = identifiant CDN (https://cdn.lordicon.com/<clé>.json).
 */
export const LORDICONS = {
  studies: "vwzukuhn", // file-pencil
  water: "ftzwyxct", // drop
  buildings: "hyvuvsxh", // buildings-downtown
  solar: "qmqpybih", // solar-panel
  cart: "hwpohgdf", // cart
  book: "zbtbhzsg", // book-bookmark
  mail: "gtvaxhwv", // mail-fast
  phone: "qctplryk", // hand-call-me
  pin: "dhmavvpz", // location-pin
  clock: "gdowkrjt", // clock
  check: "pxixoqxa", // check
  quote: "uljpxtvi", // quote-right
  warning: "pilfbsjh", // warning-triangle
  desktop: "yquwpfkc", // desktop
  medal: "wmqqbxlm", // medal-first-place
  eye: "knitbwfa", // eye
  recycling: "oorvqwpg", // recycling
  heart: "ewmfucya", // heart
  team: "xvmmqwjv", // avatars-chatting
  ribbon: "glwzslnh", // badge-ribbon
  plant: "anutbrah", // growing-plant
  target: "bqjenhkf", // crosshair
  globe: "tyntlpjn", // globe
  briefcase: "obyhgzls", // briefcase
  calendar: "laobovmg", // calendar-24-dec
  rules: "ciwxnydt", // list-rules
  layers: "wixhsrdu", // layers
} as const;

export type LordiconName = keyof typeof LORDICONS;

export function lordiconUrl(name: LordiconName) {
  return `https://cdn.lordicon.com/${LORDICONS[name]}.json`;
}

export const pillarLordicon: Record<PillarId, LordiconName> = {
  etudes: "studies",
  hydraulique: "water",
  "genie-civil": "buildings",
  electricite: "solar",
  commerce: "cart",
  prestation: "book",
};
