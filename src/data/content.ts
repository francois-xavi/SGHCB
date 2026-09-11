export type ServiceId = "eau" | "btp" | "electricite" | "commerce";

export type Service = {
  id: ServiceId;
  slug: string;
  label: string;
  short: string;
  headline: string;
  intro: string;
  prestations: { title: string; text: string }[];
  seo: { title: string; description: string };
  image: string;
};

export const services: Service[] = [
  {
    id: "eau",
    slug: "eau",
    label: "Eau",
    short: "Forage, adduction, châteaux d'eau et assainissement.",
    headline: "L'eau, de la nappe au robinet.",
    intro:
      "SGHCB conçoit et réalise des ouvrages hydrauliques pour les collectivités, les industries et les particuliers. De l'étude hydrogéologique à la mise en service, nous livrons des installations durables, aux normes, adaptées au climat et aux usages du Bénin.",
    prestations: [
      {
        title: "Forage et pompage",
        text: "Forages d'eau potable, équipements de pompage, tests de débit et mises en service.",
      },
      {
        title: "Châteaux d'eau et réservoirs",
        text: "Réservoirs surélevés, bâches au sol et ouvrages de stockage dimensionnés pour vos besoins.",
      },
      {
        title: "Adduction d'eau potable",
        text: "Réseaux AEP, bornes-fontaines, branchements et réhabilitation de canalisations.",
      },
      {
        title: "Assainissement",
        text: "Eaux usées, drainage pluvial, stations de traitement et ouvrages d'évacuation.",
      },
    ],
    seo: {
      title: "Forage et génie hydraulique au Bénin",
      description:
        "Forage, château d'eau, adduction d'eau potable et assainissement au Bénin. Devis SGHCB sous 24–48h.",
    },
    image: "/hero_caroussel/water_pomping.png",
  },
  {
    id: "btp",
    slug: "btp",
    label: "Bâtiment et Travaux Publics",
    short: "Bâtiments, voiries, ouvrages d'art et génie civil.",
    headline: "Le béton qui tient. Les délais qui tiennent.",
    intro:
      "Pôle BTP de SGHCB : construction de bâtiments, voiries et réseaux divers, et ouvrages de génie civil. Nous pilotons le chantier de l'implantation à la réception, avec un suivi de qualité, de sécurité et de planning.",
    prestations: [
      {
        title: "Bâtiment",
        text: "Bureaux, logements, équipements publics et bâtiments industriels, du gros œuvre aux finitions.",
      },
      {
        title: "Voiries et réseaux divers",
        text: "Routes, pistes, parkings, assainissement routier et réseaux enterrés.",
      },
      {
        title: "Ouvrages de génie civil",
        text: "Dalles, fondations spéciales, murs de soutènement et structures béton.",
      },
      {
        title: "Réhabilitation",
        text: "Renforcement, extension et mise aux normes d'ouvrages existants.",
      },
    ],
    seo: {
      title: "BTP et génie civil au Bénin",
      description:
        "Entreprise BTP au Bénin : bâtiment, travaux publics et génie civil. SGHCB, devis et réalisation.",
    },
    image: "/hero_caroussel/rebar_cutting.png",
  },
  {
    id: "electricite",
    slug: "electricite",
    label: "Électricité",
    short: "Installation, réseaux et maintenance électrique.",
    headline: "Des réseaux sûrs, de la source à l'usage.",
    intro:
      "Installations électriques neuves, rénovation et maintenance. Nous intervenons sur les bâtiments, les sites industriels et les ouvrages hydrauliques — éclairage, force motrice, tableaux et protection.",
    prestations: [
      {
        title: "Installations neuves",
        text: "Courants forts, tableaux généraux, éclairage et prises, conformité et réception.",
      },
      {
        title: "Réseaux et éclairage public",
        text: "Réseaux de distribution, éclairage de voiries, sites et parkings.",
      },
      {
        title: "Sites hydrauliques",
        text: "Alimentation de forages, pompes, châteaux d'eau et automatismes de base.",
      },
      {
        title: "Maintenance",
        text: "Contrôles périodiques, dépannage et contrats de suivi.",
      },
    ],
    seo: {
      title: "Installation électrique au Bénin",
      description:
        "Installation et maintenance électrique au Bénin : bâtiments, réseaux et sites hydrauliques. SGHCB.",
    },
    image: "/hero_caroussel/electrician.png",
  },
  {
    id: "commerce",
    slug: "commerce-general",
    label: "Commerce général",
    short: "Fourniture de matériaux, équipements et matériels de chantier.",
    headline: "Le bon matériel, au bon moment.",
    intro:
      "Pôle commerce : fourniture de matériaux de construction, équipements hydrauliques et matériels électriques pour vos chantiers. Un canal unique pour sécuriser les délais d'approvisionnement.",
    prestations: [
      {
        title: "Matériaux de construction",
        text: "Ciments, aciers, granulats et fournitures de gros œuvre selon cahier des charges.",
      },
      {
        title: "Équipements hydrauliques",
        text: "Pompes, tuyauteries, vannes, compteurs et accessoires de forage.",
      },
      {
        title: "Matériel électrique",
        text: "Câbles, tableaux, éclairage et composants de protection.",
      },
      {
        title: "Approvisionnement chantier",
        text: "Logistique, délais négociés et lots complets pour vos projets.",
      },
    ],
    seo: {
      title: "Commerce général BTP au Bénin",
      description:
        "Fourniture de matériaux, équipements hydrauliques et matériels électriques pour chantiers au Bénin.",
    },
    image: "/hero_caroussel/warehouse.png",
  },
];

export const stats = [
  { value: "15+", label: "Années d'expérience" },
  { value: "200+", label: "Projets livrés" },
  { value: "12", label: "Départements couverts" },
  { value: "24–48h", label: "Délai de devis" },
];

export const reasons = [
  {
    num: "01",
    title: "Équipe qualifiée",
    text: "Ingénieurs, conducteurs de travaux et équipes terrain formés aux ouvrages hydrauliques et de génie civil.",
  },
  {
    num: "02",
    title: "Respect des délais",
    text: "Planning de chantier, approvisionnement anticipé et reporting clair jusqu'à la réception.",
  },
  {
    num: "03",
    title: "Matériel adapté",
    text: "Moyens de forage, de terrassement et d'installation dimensionnés pour les réalités du terrain béninois.",
  },
  {
    num: "04",
    title: "Normes et sécurité",
    text: "Prévention sur chantier, qualité des ouvrages et conformité aux exigences des maîtres d'ouvrage.",
  },
];

export const process = [
  {
    num: "01",
    title: "Contact",
    text: "Appel, WhatsApp ou formulaire. Nous cadrons le besoin en quelques heures.",
  },
  {
    num: "02",
    title: "Étude & devis",
    text: "Visite si besoin, chiffrage et proposition technique. Réponse sous 24–48h.",
  },
  {
    num: "03",
    title: "Exécution",
    text: "Mobilisation, chantier, contrôle qualité et points d'arrêt convenus.",
  },
  {
    num: "04",
    title: "Livraison & suivi",
    text: "Réception, dossiers d'ouvrage et accompagnement après mise en service.",
  },
];

export type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  category: ServiceId;
  client?: string;
  duration: string;
  excerpt: string;
  description: string;
  image: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "chateau-eau-ouidah",
    title: "Château d'eau et réseau AEP",
    location: "Ouidah",
    year: "2024",
    category: "eau",
    client: "Collectivité locale",
    duration: "7 mois",
    excerpt: "Ouvrage de stockage et desserte d'un quartier en extension.",
    description:
      "Réalisation d'un château d'eau, d'un forage d'accompagnement et d'un réseau de distribution pour sécuriser l'alimentation en eau potable d'un quartier en croissance. L'ouvrage a été dimensionné pour absorber les pics de consommation et faciliter la maintenance.",
    image: "/hero_caroussel/water_pomping.png",
    gallery: ["/hero_caroussel/water_pomping.png"],
  },
  {
    slug: "forage-commune-oueme",
    title: "Forage et station de pompage",
    location: "Vallée de l'Ouémé",
    year: "2023",
    category: "eau",
    duration: "4 mois",
    excerpt: "Forage productif, pompage solaire et bornes-fontaines.",
    description:
      "Campagne de forage, tests de débit, équipement de pompage et raccordement de bornes-fontaines. L'installation privilégie la robustesse et un entretien simple pour les équipes locales.",
    image: "/hero_caroussel/water_pomping.png",
    gallery: ["/hero_caroussel/water_pomping.png"],
  },
  {
    slug: "siege-administratif-cotonou",
    title: "Bâtiment administratif",
    location: "Cotonou",
    year: "2024",
    category: "btp",
    duration: "11 mois",
    excerpt: "Gros œuvre, second œuvre et livraisons par lots.",
    description:
      "Construction d'un bâtiment de bureaux : fondations, structure béton, clos-couvert et finitions. Coordination des lots techniques (électricité, plomberie) jusqu'à la réception.",
    image: "/hero_caroussel/rebar_cutting.png",
    gallery: ["/hero_caroussel/rebar_cutting.png"],
  },
  {
    slug: "voirie-abomey-calavi",
    title: "Voirie et assainissement pluvial",
    location: "Abomey-Calavi",
    year: "2023",
    category: "btp",
    duration: "6 mois",
    excerpt: "Chaussée, caniveaux et assainissement d'un axe structurant.",
    description:
      "Travaux de voirie urbaine avec reconstitution de la chaussée, caniveaux et ouvrages d'évacuation des eaux pluviales. Objectif : circulation pérenne en saison des pluies.",
    image: "/hero_caroussel/rebar_cutting.png",
    gallery: ["/hero_caroussel/rebar_cutting.png"],
  },
  {
    slug: "reseaux-site-industriel",
    title: "Réseaux électriques de site",
    location: "Sèmè-Podji",
    year: "2024",
    category: "electricite",
    duration: "3 mois",
    excerpt: "Tableaux, éclairage et alimentation de process.",
    description:
      "Installation des courants forts d'un site : TGBT, distribution, éclairage et protections. Interventions planifiées pour limiter l'arrêt d'activité.",
    image: "/hero_caroussel/electrician.png",
    gallery: ["/hero_caroussel/electrician.png"],
  },
  {
    slug: "eclairage-voirie-porto-novo",
    title: "Éclairage public de voirie",
    location: "Porto-Novo",
    year: "2022",
    category: "electricite",
    duration: "2 mois",
    excerpt: "Candélabres, câblage et mise en service nocturne.",
    description:
      "Fourniture et pose d'un éclairage de voirie, raccordement et essais. L'installation vise un éclairage homogène et une maintenance accessible.",
    image: "/hero_caroussel/electrician.png",
    gallery: ["/hero_caroussel/electrician.png"],
  },
  {
    slug: "fourniture-lot-hydraulique",
    title: "Lot pompes et tuyauterie",
    location: "Cotonou",
    year: "2024",
    category: "commerce",
    duration: "5 semaines",
    excerpt: "Approvisionnement d'un chantier hydraulique clé en main.",
    description:
      "Fourniture d'un lot complet : pompes, tuyauteries, vannes et accessoires, livré selon le planning du maître d'œuvre pour éviter les arrêts de chantier.",
    image: "/hero_caroussel/warehouse.png",
    gallery: ["/hero_caroussel/warehouse.png"],
  },
  {
    slug: "structure-beton-parakou",
    title: "Structure béton d'entrepôt",
    location: "Parakou",
    year: "2022",
    category: "btp",
    duration: "8 mois",
    excerpt: "Fondations, poteaux, poutres et dallage industriel.",
    description:
      "Génie civil d'un bâtiment de stockage : fondations, ossature béton et dallage. Coordination avec le lot couverture et les réseaux.",
    image: "/hero_caroussel/rebar_cutting.png",
    gallery: ["/hero_caroussel/rebar_cutting.png"],
  },
];

export const featuredProjects = projects.slice(0, 6);

export const testimonials = [
  {
    quote:
      "Le forage a été livré dans les délais, avec un débit conforme à l'étude. Le suivi de chantier était clair, sans mauvaise surprise.",
    name: "Direction des travaux",
    role: "Maître d'ouvrage public",
  },
  {
    quote:
      "Un interlocuteur unique pour le bâtiment et les lots techniques. Ça simplifie vraiment le pilotage quand on a plusieurs sites.",
    name: "Responsable patrimoine",
    role: "Groupe privé, Cotonou",
  },
  {
    quote:
      "Devis rapide, équipe sérieuse sur le terrain. On a reconduit SGHCB sur un second lot d'éclairage.",
    name: "Chef de projet",
    role: "Aménagement urbain",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsByCategory(id?: ServiceId) {
  if (!id) return projects;
  return projects.filter((p) => p.category === id);
}

export const serviceLabel: Record<ServiceId, string> = {
  eau: "Eau",
  btp: "BTP",
  electricite: "Électricité",
  commerce: "Commerce général",
};
