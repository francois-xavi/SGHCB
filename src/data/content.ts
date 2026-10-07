import { pillars, type PillarId } from "@/data/pillars";
import type { L } from "@/i18n/messages";

export type ServiceId = PillarId;

export type Service = {
  id: ServiceId;
  slug: string;
  label: L;
  short: L;
  headline: L;
  intro: L;
  prestations: { title: L; text: L }[];
  /** Référencement local : en français uniquement. */
  seo: { title: string; description: string };
  image: string;
};

const details: Record<
  ServiceId,
  Pick<Service, "headline" | "intro" | "prestations" | "seo" | "image">
> = {
  etudes: {
    headline: {
      fr: "Voir juste, avant de construire.",
      en: "Getting it right, before building.",
    },
    intro: {
      fr: "Études, conception et contrôle : SIGEB réalise plans, notes de calcul et études de faisabilité, puis assure le suivi de chantier et le contrôle qualité des ouvrages publics et privés, avec des logiciels spécialisés (AutoCAD, EPANET, ETAP).",
      en: "Studies, design and supervision: SIGEB produces drawings, design calculations and feasibility studies, then provides site supervision and quality control for public and private works, using specialised software (AutoCAD, EPANET, ETAP).",
    },
    prestations: [
      {
        title: { fr: "Études techniques & plans", en: "Technical studies & drawings" },
        text: {
          fr: "Réalisation de plans, études techniques et dimensionnement des ouvrages.",
          en: "Drawings, technical studies and sizing of structures.",
        },
      },
      {
        title: { fr: "Faisabilité & audits", en: "Feasibility & audits" },
        text: {
          fr: "Études de faisabilité, planification et évaluation des performances des projets.",
          en: "Feasibility studies, planning and performance assessment of projects.",
        },
      },
      {
        title: { fr: "Contrôle & suivi de chantier", en: "Site supervision & control" },
        text: {
          fr: "Suivi de chantier, contrôle qualité et conformité des ouvrages publics et privés.",
          en: "Site follow-up, quality control and compliance of public and private works.",
        },
      },
      {
        title: { fr: "Études environnementales", en: "Environmental studies" },
        text: {
          fr: "Études d'impact environnemental et conformité environnementale des projets.",
          en: "Environmental impact assessments and environmental compliance of projects.",
        },
      },
    ],
    seo: {
      title: "Études, conception et contrôle au Bénin",
      description:
        "Études techniques, plans, faisabilité, suivi et contrôle de chantier. SIGEB, ingénierie à Abomey-Calavi, Bénin.",
    },
    image: "/images/hydraulique/traitement/prelevement-echantillons-eau.jpg",
  },
  hydraulique: {
    headline: {
      fr: "L'eau, de la nappe au robinet.",
      en: "Water, from aquifer to tap.",
    },
    intro: {
      fr: "Hydraulique & assainissement : SIGEB conçoit, réalise et entretient forages, réseaux d'adduction d'eau potable, stations de pompage et ouvrages d'assainissement pour les communautés rurales, les collectivités, les bâtiments et les exploitations agricoles.",
      en: "Water & sanitation: SIGEB designs, builds and maintains boreholes, drinking water networks, pumping stations and sanitation works for rural communities, local authorities, buildings and farms.",
    },
    prestations: [
      {
        title: { fr: "Forages & hydraulique villageoise", en: "Boreholes & rural water supply" },
        text: {
          fr: "Réalisation de forages, pompes manuelles et motorisées, approvisionnement en eau potable des communautés rurales.",
          en: "Borehole drilling, hand and motorised pumps, drinking water supply for rural communities.",
        },
      },
      {
        title: { fr: "Hydraulique bâtiment", en: "Building water networks" },
        text: {
          fr: "Conception et installation des réseaux de canalisation, raccordements et distribution interne.",
          en: "Design and installation of pipe networks, connections and internal distribution.",
        },
      },
      {
        title: { fr: "Pompes & équipements de forage", en: "Pumps & borehole equipment" },
        text: {
          fr: "Électrification, automatisation et maintenance des systèmes de pompage.",
          en: "Electrification, automation and maintenance of pumping systems.",
        },
      },
      {
        title: { fr: "Maintenance hydraulique", en: "Hydraulic maintenance" },
        text: {
          fr: "Entretien préventif et correctif, réparation des réseaux et optimisation des performances.",
          en: "Preventive and corrective maintenance, network repair and performance optimisation.",
        },
      },
      {
        title: { fr: "Assainissement & environnement", en: "Sanitation & environment" },
        text: {
          fr: "Réseaux d'assainissement, traitement des eaux usées et solutions durables.",
          en: "Sewerage networks, wastewater treatment and sustainable solutions.",
        },
      },
      {
        title: { fr: "Aménagement hydro-agricole", en: "Irrigation development" },
        text: {
          fr: "Périmètres irrigués, irrigation gravitaire, goutte-à-goutte et aspersion, gestion de l'eau agricole.",
          en: "Irrigated schemes, gravity, drip and sprinkler irrigation, agricultural water management.",
        },
      },
    ],
    seo: {
      title: "Forage, eau potable et assainissement au Bénin",
      description:
        "Forage, adduction d'eau potable, pompage, traitement et assainissement au Bénin. SIGEB, Abomey-Calavi. Devis sous 24–48h.",
    },
    image: "/images/hydraulique/pompage/tete-forage-ventouse.jpg",
  },
  "genie-civil": {
    headline: {
      fr: "Le béton qui tient. Les délais qui tiennent.",
      en: "Concrete that holds. Deadlines that hold.",
    },
    intro: {
      fr: "Pôle BTP & génie civil : maîtrise d'œuvre, construction de bâtiments et d'infrastructures routières, construction métallique. Nous coordonnons les intervenants et pilotons délais et budgets jusqu'à la réception.",
      en: "Construction & civil works: project management, buildings, road infrastructure and steel structures. We coordinate all parties and manage schedules and budgets through to handover.",
    },
    prestations: [
      {
        title: { fr: "Maîtrise d'œuvre & conduite d'opérations", en: "Project management" },
        text: {
          fr: "Coordination des intervenants, gestion des délais et budgets, pilotage global des projets de construction.",
          en: "Coordination of stakeholders, schedule and budget management, overall steering of construction projects.",
        },
      },
      {
        title: { fr: "Bâtiments & infrastructures routières", en: "Buildings & road infrastructure" },
        text: {
          fr: "Construction de bâtiments publics et privés et développement d'infrastructures routières.",
          en: "Construction of public and private buildings and development of road infrastructure.",
        },
      },
      {
        title: { fr: "Construction métallique", en: "Steel structures" },
        text: {
          fr: "Conception et montage de charpentes, hangars, passerelles et structures industrielles et urbaines.",
          en: "Design and erection of frameworks, hangars, footbridges and industrial and urban structures.",
        },
      },
      {
        title: { fr: "Ouvrages des réseaux d'eau", en: "Civil works for water networks" },
        text: {
          fr: "Regards, chambres de vannes et ouvrages béton des réseaux d'adduction.",
          en: "Inspection chambers, valve chambers and concrete works for water supply networks.",
        },
      },
    ],
    seo: {
      title: "BTP et génie civil au Bénin",
      description:
        "Entreprise BTP au Bénin : maîtrise d'œuvre, bâtiments, routes et construction métallique. SIGEB, Abomey-Calavi.",
    },
    image: "/images/hydraulique/reseau-aep/regard-vanne-02.jpg",
  },
  electricite: {
    headline: {
      fr: "Des réseaux sûrs, de la source à l'usage.",
      en: "Safe networks, from source to use.",
    },
    intro: {
      fr: "Électricité, électromécanique & énergie : SIGEB installe, raccorde et entretient réseaux électriques, coffrets de commande, pompes et groupes électrogènes, et met en place des solutions solaires et hybrides.",
      en: "Electrical, electromechanical & energy: SIGEB installs, connects and maintains electrical networks, control panels, pumps and generators, and deploys solar and hybrid solutions.",
    },
    prestations: [
      {
        title: { fr: "Électricité bâtiment", en: "Building electrical works" },
        text: {
          fr: "Conception, installation et maintenance des réseaux électriques des bâtiments publics et privés.",
          en: "Design, installation and maintenance of electrical networks in public and private buildings.",
        },
      },
      {
        title: { fr: "Électricité des forages", en: "Borehole electrical systems" },
        text: {
          fr: "Câblage, alimentation, coffrets de commande et automatisation des pompes et systèmes de captage.",
          en: "Wiring, power supply, control panels and automation of pumps and abstraction systems.",
        },
      },
      {
        title: { fr: "Électromécanique & hydromécanique", en: "Electromechanics & hydromechanics" },
        text: {
          fr: "Montage et entretien des machines, pompes, groupes électrogènes et systèmes hydrauliques.",
          en: "Installation and servicing of machines, pumps, generators and hydraulic systems.",
        },
      },
      {
        title: { fr: "Énergies renouvelables", en: "Renewable energy" },
        text: {
          fr: "Systèmes solaires, biomasse et solutions hybrides pour réduire la dépendance énergétique.",
          en: "Solar, biomass and hybrid systems to reduce energy dependence.",
        },
      },
    ],
    seo: {
      title: "Électricité, électromécanique et énergie au Bénin",
      description:
        "Installation électrique, coffrets de pompage, groupes électrogènes et solaire au Bénin. SIGEB, Abomey-Calavi.",
    },
    image: "/images/electricite/groupe-electrogene-kohler.jpg",
  },
  commerce: {
    headline: {
      fr: "Le bon matériel, au bon moment.",
      en: "The right equipment, at the right time.",
    },
    intro: {
      fr: "Technologies, commerce & import-export : fournitures techniques pour l'hydraulique, l'énergie et le bâtiment, matériel informatique et bureautique, solutions IT et télécom, pour les entreprises, les administrations et les particuliers.",
      en: "Technology, trade & import-export: technical supplies for water, energy and construction, IT and office equipment, IT and telecom solutions, for companies, public bodies and individuals.",
    },
    prestations: [
      {
        title: { fr: "Fournitures hydrauliques & techniques", en: "Water & technical supplies" },
        text: {
          fr: "Pièces en fonte ductile, vannes, colliers de prise en charge, tuyaux et accessoires de réseau.",
          en: "Ductile iron fittings, valves, tapping saddles, pipes and network accessories.",
        },
      },
      {
        title: { fr: "Commerce général & import-export", en: "General trade & import-export" },
        text: {
          fr: "Importation et distribution de biens divers et de matériaux pour l'hydraulique, l'énergie et le bâtiment.",
          en: "Import and distribution of goods and materials for water, energy and construction.",
        },
      },
      {
        title: { fr: "Matériel informatique & bureautique", en: "IT & office equipment" },
        text: {
          fr: "Ordinateurs, imprimantes, périphériques et équipements de bureau pour entreprises, administrations et particuliers.",
          en: "Computers, printers, peripherals and office equipment for companies, public bodies and individuals.",
        },
      },
      {
        title: { fr: "Solutions informatiques & télécom", en: "IT & telecom solutions" },
        text: {
          fr: "Développement de logiciels, mise en place de réseaux, maintenance informatique et télécommunications.",
          en: "Software development, network setup, IT maintenance and telecommunications.",
        },
      },
      {
        title: { fr: "Services intégrés", en: "Integrated services" },
        text: {
          fr: "Assistance aux entreprises et institutions dans la gestion de leurs équipements.",
          en: "Support for companies and institutions in managing their equipment.",
        },
      },
    ],
    seo: {
      title: "Fournitures, informatique et import-export au Bénin",
      description:
        "Fournitures hydrauliques, matériaux, matériel informatique et import-export au Bénin. SIGEB, Abomey-Calavi.",
    },
    image: "/images/commerce/fournitures/stock-pieces-hydrauliques.jpg",
  },
  prestation: {
    headline: {
      fr: "Le savoir-faire, au-delà du chantier.",
      en: "Know-how, beyond the worksite.",
    },
    intro: {
      fr: "Formation & expertise : SIGEB accompagne collectivités, ONG et entreprises avec des audits, des études de faisabilité et des formations pratiques, pour des infrastructures autonomes et pérennes.",
      en: "Training & expertise: SIGEB supports local authorities, NGOs and companies with audits, feasibility studies and hands-on training, for self-reliant and lasting infrastructure.",
    },
    prestations: [
      {
        title: { fr: "Conseil & expertise technique", en: "Technical advice & expertise" },
        text: {
          fr: "Audits, études de faisabilité, planification stratégique et évaluation des performances.",
          en: "Audits, feasibility studies, strategic planning and performance assessment.",
        },
      },
      {
        title: { fr: "Formation & renforcement de capacités", en: "Training & capacity building" },
        text: {
          fr: "Sessions pratiques et théoriques pour ingénieurs, techniciens, gestionnaires et acteurs communautaires.",
          en: "Hands-on and classroom sessions for engineers, technicians, managers and community stakeholders.",
        },
      },
      {
        title: { fr: "Appui institutionnel & partenariats", en: "Institutional support & partnerships" },
        text: {
          fr: "Assistance aux collectivités locales, ONG et entreprises, avec une ouverture vers la coopération internationale.",
          en: "Support for local authorities, NGOs and companies, open to international cooperation.",
        },
      },
      {
        title: { fr: "Développement des compétences locales", en: "Local skills development" },
        text: {
          fr: "Programmes adaptés aux zones rurales et urbaines, pour l'autonomie et la pérennité des infrastructures.",
          en: "Programmes tailored to rural and urban areas, for self-reliant and lasting infrastructure.",
        },
      },
    ],
    seo: {
      title: "Formation et expertise technique au Bénin",
      description:
        "Conseil, audits, formation et renforcement de capacités en hydraulique, énergie et génie civil. SIGEB, Bénin.",
    },
    image: "/a-propos-chantier.jpg",
  },
};

export const services: Service[] = pillars.map((p) => ({
  id: p.id,
  slug: p.slug,
  label: p.label,
  short: p.short,
  ...details[p.id],
}));

export const stats: { value: string; label: L }[] = [
  { value: "2026", label: { fr: "Année de création", en: "Year founded" } },
  { value: "6", label: { fr: "Pôles d'expertise", en: "Areas of expertise" } },
  { value: "9", label: { fr: "Responsables clés", en: "Key managers" } },
  { value: "24–48h", label: { fr: "Délai de devis", en: "Quote turnaround" } },
];

export const reasons: { num: string; title: L; text: L }[] = [
  {
    num: "01",
    title: { fr: "Équipe pluridisciplinaire", en: "Multidisciplinary team" },
    text: {
      fr: "Ingénieurs hydrauliciens, génie civil et électromécaniciens, environnementalistes, économistes et experts-comptables réunis.",
      en: "Hydraulic, civil and electromechanical engineers, environmental specialists, economists and accountants working together.",
    },
  },
  {
    num: "02",
    title: { fr: "Qualité & standards", en: "Quality & standards" },
    text: {
      fr: "Des prestations fiables, conformes aux standards nationaux et internationaux, contrôlées à chaque étape.",
      en: "Reliable services that meet national and international standards, checked at every stage.",
    },
  },
  {
    num: "03",
    title: { fr: "Outils modernes", en: "Modern tools" },
    text: {
      fr: "Logiciels spécialisés (AutoCAD, EPANET, ETAP, MATLAB) au service de la précision et de l'innovation.",
      en: "Specialised software (AutoCAD, EPANET, ETAP, MATLAB) for precision and innovation.",
    },
  },
  {
    num: "04",
    title: { fr: "Impact durable", en: "Lasting impact" },
    text: {
      fr: "Des solutions respectueuses de l'environnement, qui placent les populations au centre des projets.",
      en: "Environmentally sound solutions that put people at the heart of every project.",
    },
  },
];

// TODO: remplacer par le parcours client fourni par SIGEB (prospect → livraison).
export const process: { num: string; title: L; text: L }[] = [
  {
    num: "01",
    title: { fr: "Prise de contact", en: "First contact" },
    text: {
      fr: "Par email ou formulaire. Nous cadrons le besoin et les contraintes.",
      en: "By email or form. We scope the need and the constraints.",
    },
  },
  {
    num: "02",
    title: { fr: "Étude & devis", en: "Study & quote" },
    text: {
      fr: "Visite si besoin, plan d'action, chiffrage et proposition technique sous 24–48h.",
      en: "Site visit if needed, action plan, pricing and technical proposal within 24–48h.",
    },
  },
  {
    num: "03",
    title: { fr: "Exécution & contrôle", en: "Execution & control" },
    text: {
      fr: "Mobilisation des équipes, suivi rigoureux du budget et contrôle qualité à chaque étape.",
      en: "Team mobilisation, strict budget tracking and quality control at every stage.",
    },
  },
  {
    num: "04",
    title: { fr: "Réception & suivi", en: "Handover & follow-up" },
    text: {
      fr: "Réception, rapports techniques et financiers, accompagnement après mise en service.",
      en: "Handover, technical and financial reports, support after commissioning.",
    },
  },
];

export type Project = {
  slug: string;
  title: L;
  category: ServiceId;
  location?: string;
  year?: string;
  duration?: L;
  client?: L;
  excerpt: L;
  description: L;
  image: string;
  gallery: string[];
};

const img = (path: string) => `/images/${path}.jpg`;

// TODO: compléter lieu, année, durée et maître d'ouvrage avec SIGEB.
export const projects: Project[] = [
  {
    slug: "stations-pompage-forages",
    title: {
      fr: "Stations de pompage et équipements de forage",
      en: "Pumping stations and borehole equipment",
    },
    category: "hydraulique",
    excerpt: {
      fr: "Pompes immergées, têtes de forage et aménagement des stations.",
      en: "Submersible pumps, borehole heads and station layout.",
    },
    description: {
      fr: "Fourniture et installation de pompes immergées Grundfos et équipement des têtes de forage : colonnes, coudes et tés en fonte, ventouses et clapets. Les stations sont aménagées et clôturées pour faciliter l'exploitation et la maintenance.",
      en: "Supply and installation of Grundfos submersible pumps and fitting-out of borehole heads: ductile iron risers, bends and tees, air valves and check valves. Stations are laid out and fenced to make operation and maintenance easier.",
    },
    image: img("hydraulique/pompage/tete-forage-station"),
    gallery: [
      img("hydraulique/pompage/tete-forage-station"),
      img("hydraulique/pompage/tete-forage-ventouse"),
      img("hydraulique/pompage/pompe-immergee-grundfos-caisse"),
      img("hydraulique/pompage/pompe-immergee-emballage"),
      img("hydraulique/pompage/pompe-immergee-livraison"),
    ],
  },
  {
    slug: "traitement-chloration-eau",
    title: {
      fr: "Traitement et chloration de l'eau",
      en: "Water treatment and chlorination",
    },
    category: "hydraulique",
    excerpt: {
      fr: "Pompes doseuses, coffrets de commande et contrôle de la qualité de l'eau.",
      en: "Dosing pumps, control panels and water quality testing.",
    },
    description: {
      fr: "Mise en place de postes de chloration équipés de pompes doseuses Grundfos DMX, de coffrets de commande et d'instrumentation, et prélèvements d'échantillons pour contrôler la qualité de l'eau distribuée.",
      en: "Set-up of chlorination units fitted with Grundfos DMX dosing pumps, control panels and instrumentation, with sampling to check the quality of the water supplied.",
    },
    image: img("hydraulique/traitement/station-chloration"),
    gallery: [
      img("hydraulique/traitement/station-chloration"),
      img("hydraulique/traitement/pompe-doseuse-chloration"),
      img("hydraulique/traitement/prelevement-echantillons-eau"),
    ],
  },
  {
    slug: "reseau-eau-potable-regards-branchements",
    title: {
      fr: "Réseau d'eau potable : regards, vannes et branchements",
      en: "Drinking water network: chambers, valves and connections",
    },
    category: "hydraulique",
    excerpt: {
      fr: "Pose de canalisations, chambres de vannes maçonnées et branchements avec compteur.",
      en: "Pipe laying, masonry valve chambers and metered connections.",
    },
    description: {
      fr: "Pose de canalisations et de raccords en fonte en tranchée, construction de regards maçonnés pour vannes et réducteurs de pression, et réalisation de branchements particuliers avec compteur.",
      en: "Laying of pipes and ductile iron fittings in trenches, construction of masonry chambers for valves and pressure reducers, and installation of metered household connections.",
    },
    image: img("hydraulique/reseau-aep/regard-vanne-02"),
    gallery: [
      img("hydraulique/reseau-aep/regard-vanne-02"),
      img("hydraulique/reseau-aep/regard-reducteur-pression"),
      img("hydraulique/reseau-aep/regard-vanne-01"),
      img("hydraulique/reseau-aep/regard-vanne-03"),
      img("hydraulique/reseau-aep/raccord-fonte-tranchee-01"),
      img("hydraulique/reseau-aep/raccord-fonte-tranchee-02"),
      img("hydraulique/reseau-aep/branchement-compteur"),
    ],
  },
  {
    slug: "groupes-electrogenes-coffrets-commande",
    title: {
      fr: "Groupes électrogènes et coffrets de commande",
      en: "Generators and pump control panels",
    },
    category: "electricite",
    excerpt: {
      fr: "Énergie de secours et commande des pompes des stations.",
      en: "Backup power and pump control for water stations.",
    },
    description: {
      fr: "Installation de groupes électrogènes sur massifs en local technique, avec cuve à gasoil graduée, et pose de coffrets de commande des pompes (voltmètre, ampèremètre, voyants, mode manuel/automatique) avec leurs protections.",
      en: "Installation of generators on concrete bases in plant rooms, with a graduated diesel tank, and fitting of pump control panels (voltmeter, ammeter, indicator lights, manual/automatic mode) with their protection devices.",
    },
    image: img("electricite/groupe-electrogene-kohler"),
    gallery: [
      img("electricite/groupe-electrogene-kohler"),
      img("electricite/groupe-electrogene-01"),
      img("electricite/cuve-gasoil"),
      img("electricite/coffret-commande-grundfos-01"),
      img("electricite/coffret-commande-grundfos-02"),
      img("electricite/coffret-commande-3kw"),
      img("electricite/coffrets-commande-livraison"),
    ],
  },
  {
    slug: "fourniture-pieces-fonte-ductile",
    title: {
      fr: "Fourniture de pièces hydrauliques en fonte ductile",
      en: "Supply of ductile iron water fittings",
    },
    category: "commerce",
    excerpt: {
      fr: "Tés, brides, vannes, colliers de prise et bouches à clé pour réseaux d'eau.",
      en: "Tees, flanges, valves, tapping saddles and valve boxes for water networks.",
    },
    description: {
      fr: "Approvisionnement de chantiers d'adduction d'eau en pièces de fontainerie : tés et brides en fonte ductile, vannes à opercule, colliers de prise en charge, joints, bouches à clé, tuyaux et raccords PVC.",
      en: "Supply of water supply worksites with fittings: ductile iron tees and flanges, gate valves, tapping saddles, gaskets, valve boxes, PVC pipes and fittings.",
    },
    image: img("commerce/fournitures/brides-et-raccords"),
    gallery: [
      img("commerce/fournitures/brides-et-raccords"),
      img("commerce/fournitures/stock-pieces-hydrauliques"),
      img("commerce/fournitures/vannes-opercule"),
      img("commerce/fournitures/pieces-fonte-assortiment"),
      img("commerce/fournitures/te-bride-fonte"),
      img("commerce/fournitures/tes-fonte-alignes"),
      img("commerce/fournitures/tes-et-manchette-fonte"),
      img("commerce/fournitures/brides-et-joints"),
      img("commerce/fournitures/colliers-prise-en-charge-01"),
      img("commerce/fournitures/colliers-prise-en-charge-02"),
      img("commerce/fournitures/bouches-a-cle"),
      img("commerce/fournitures/stock-pvc-vannes"),
    ],
  },
];

export const featuredProjects = projects;

export type Testimonial = {
  quote: L;
  name: L;
  role: L;
  photo?: string;
  videoUrl?: string;
};

// TODO: remplacer par de vrais témoignages clients (la vidéo est prise en charge via videoUrl).
export const testimonials: Testimonial[] = [
  {
    quote: {
      fr: "Les pompes et les coffrets de commande ont été installés dans les délais, avec des essais clairs à la mise en service.",
      en: "The pumps and control panels were installed on schedule, with clear testing at commissioning.",
    },
    name: { fr: "Direction technique", en: "Technical department" },
    role: { fr: "Exploitant de réseau d'eau", en: "Water network operator" },
  },
  {
    quote: {
      fr: "Un seul interlocuteur pour la fourniture des pièces et la pose : cela simplifie vraiment le pilotage du chantier.",
      en: "One point of contact for both supply and installation: it really simplifies running the worksite.",
    },
    name: { fr: "Chef de projet", en: "Project manager" },
    role: { fr: "Entreprise de travaux", en: "Works contractor" },
  },
  {
    quote: {
      fr: "Équipe sérieuse et réactive, devis reçu rapidement et suivi transparent jusqu'à la réception.",
      en: "A serious, responsive team, a quick quote and transparent follow-up through to handover.",
    },
    name: { fr: "Responsable patrimoine", en: "Asset manager" },
    role: { fr: "Collectivité locale", en: "Local authority" },
  },
];

export const engagements: { title: L; text: L }[] = [
  {
    title: { fr: "Qualité", en: "Quality" },
    text: {
      fr: "Respect des standards nationaux et internationaux, contrôle qualité à chaque étape du projet.",
      en: "Compliance with national and international standards, quality control at every project stage.",
    },
  },
  {
    title: { fr: "Transparence", en: "Transparency" },
    text: {
      fr: "Gestion transparente des ressources et rapports techniques et financiers clairs.",
      en: "Transparent management of resources and clear technical and financial reporting.",
    },
  },
  {
    title: { fr: "Durabilité", en: "Sustainability" },
    text: {
      fr: "Des solutions respectueuses de l'environnement et des générations futures.",
      en: "Solutions that respect the environment and future generations.",
    },
  },
  {
    title: { fr: "Implication communautaire", en: "Community involvement" },
    text: {
      fr: "Les populations au centre des projets, pour un impact social positif et durable.",
      en: "People at the heart of every project, for a positive and lasting social impact.",
    },
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

export { serviceLabel } from "@/data/pillars";
