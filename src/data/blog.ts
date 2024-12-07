export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
  headings: {
    text: string;
    slug: string;
    depth: number;
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    title: "Les semis et travaux de janvier au potager : préparez votre jardin pour la nouvelle année",
    slug: "semis-travaux-janvier-potager",
    excerpt: "En tant qu'expert jardinier depuis plus de 20 ans, je partage avec vous tous mes secrets pour bien démarrer l'année au potager. De la planification aux semis, en passant par la préparation du sol, découvrez mes conseils pratiques pour un jardin qui fera des envieux !",
    date: "2024-12-07",
    author: "Marc",
    image: "/images/preparation-potager-pour-printemps.webp",
    category: "Guides pratiques",
    headings: [
      { text: "Planifier son potager : le secret d'une récolte abondante", slug: "planifier-potager", depth: 2 },
      { text: "Préparer le sol : bichonner la terre pour des légumes au top", slug: "preparer-sol", depth: 2 },
      { text: "Les semis de janvier : lancer la saison en beauté", slug: "semis-janvier", depth: 2 },
      { text: "Entretien et protection : chouchouter son potager hivernal", slug: "entretien-protection", depth: 2 }
    ]
  },
  {
    title: "Le guide complet du compostage : transformez vos déchets en or vert",
    slug: "guide-compostage",
    excerpt: "Après 20 ans d'expérience en jardinage, je vous livre tous mes secrets pour transformer vos déchets en un compost d'exception. Une technique que j'ai perfectionnée au fil des années pour obtenir un terreau riche et naturel.",
    date: "2024-12-10",
    author: "Marc",
    image: "/images/guide-du-compostage-transformez-vos-dechets.webp",
    category: "Guides pratiques",
    headings: []
  },
  {
    title: "Les tomates pour les débutants : devenez un expert des tomates",
    slug: "tomates-debutants",
    excerpt: "En tant que passionné de jardinage depuis plus de deux décennies, je vous guide pas à pas dans la culture des tomates. Je partage avec vous toutes mes astuces et le matériel optimal pour réussir votre première récolte !",
    date: "2024-12-13",
    author: "Marc",
    image: "/images/tomates-pour-debutants-devenez-un-expert.webp",
    category: "Guides pratiques",
    headings: []
  },
  {
    title: "La permaculture pour les débutants : jardinez en harmonie avec la nature",
    slug: "permaculture-debutants",
    excerpt: "Fort de mon expérience en jardinage écologique, je vous explique comment créer un jardin productif et durable. Découvrez mes conseils pratiques pour démarrer en permaculture, basés sur des années d'observation et d'expérimentation.",
    date: "2024-12-16",
    author: "Marc",
    image: "/images/La-permaculture-pour-les-debutants-jardinez-en-harmonie-avec-la-nature.webp",
    category: "Guides pratiques",
    headings: []
  }
];
