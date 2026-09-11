export const company = {
  name: "SGHCB",
  legal: "Société de Génie Hydraulique et Civil du Bénin",
  tagline: "L'eau. Le béton. L'énergie.",
  phoneDisplay: "+229 64 28 03 02",
  phoneHref: "tel:+22964280302",
  whatsapp: "22964280302",
  email: "contact@sghcb.bj",
  address: "Cotonou, République du Bénin",
  hours: "Lun – Ven : 8h00 – 18h00 · Sam : 8h00 – 13h00",
  mapsQuery: "Cotonou, Benin",
  responseDelay: "Réponse sous 24–48h",
  zones: "Tout le territoire béninois",
};

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ??
      "Bonjour SGHCB, je souhaite obtenir un devis pour un projet.",
  );
  return `https://wa.me/${company.whatsapp}?text=${text}`;
}
