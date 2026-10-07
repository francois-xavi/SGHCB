import { serviceLabel, type Project } from "@/data/content";
import { tr, type Locale } from "@/i18n/messages";

/** « Pôle · Lieu · Année », sans les champs non renseignés. */
export function projectMeta(p: Project, locale: Locale) {
  return [tr(serviceLabel[p.category], locale), p.location, p.year]
    .filter(Boolean)
    .join(" · ");
}
