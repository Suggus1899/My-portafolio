import { routing } from '@/i18n/routing';

export type AppLocale = (typeof routing.locales)[number];

type LocalizedText = Record<AppLocale, string>;
type LocalizedParagraphs = Record<AppLocale, string[]>;

export type BlogPost = {
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedParagraphs;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'api-first-design-en-nodejs',
    date: '2026-02-10',
    readTime: '5 min',
    tags: ['Node.js', 'Backend', 'API'],
    title: {
      es: 'Diseno API-First en Node.js para proyectos escalables',
      en: 'API-First Design in Node.js for Scalable Projects',
      fr: 'Conception API-First en Node.js pour des projets evolutifs',
      it: 'Design API-First in Node.js per progetti scalabili'
    },
    excerpt: {
      es: 'Como definir contratos, versionado y validaciones desde el inicio para evitar deuda tecnica.',
      en: 'How to define contracts, versioning and validation early to avoid technical debt.',
      fr: 'Comment definir les contrats, le versioning et la validation des le debut pour eviter la dette technique.',
      it: 'Come definire contratti, versioning e validazione fin dall inizio per evitare debito tecnico.'
    },
    content: {
      es: [
        'Cuando un proyecto crece rapido, el backend suele romperse por cambios sin contrato. API-First ayuda a evitar eso.',
        'El flujo recomendado es: disenar endpoints y payloads, documentar con OpenAPI y luego implementar.',
        'Tambien es clave separar validaciones de entrada y logica de dominio para mantener el codigo limpio.'
      ],
      en: [
        'When a project grows fast, backend failures often come from contract drift. API-First prevents that.',
        'A good flow is: design endpoints and payloads, document with OpenAPI, and then implement.',
        'It also helps to keep request validation separate from domain logic for cleaner architecture.'
      ],
      fr: [
        'Quand un projet evolue vite, le backend casse souvent a cause d un contrat instable. API-First reduit ce risque.',
        'Le flux conseille: definir les endpoints et payloads, documenter avec OpenAPI puis implementer.',
        'Il est utile de separer la validation des requetes de la logique metier.'
      ],
      it: [
        'Quando un progetto cresce rapidamente, il backend si rompe spesso per contratti instabili. API-First aiuta a evitarlo.',
        'Un flusso utile: progettare endpoint e payload, documentare con OpenAPI e poi implementare.',
        'Separare la validazione delle richieste dalla logica di dominio migliora la manutenibilita.'
      ]
    }
  },
  {
    slug: 'cloud-networking-basics-for-backend-devs',
    date: '2026-01-28',
    readTime: '4 min',
    tags: ['Cloud', 'Networking', 'AWS'],
    title: {
      es: 'Networking en Cloud para backend: lo minimo que debes dominar',
      en: 'Cloud Networking for Backend Engineers: The Minimum You Should Master',
      fr: 'Reseau Cloud pour backend: le minimum a maitriser',
      it: 'Networking Cloud per backend: il minimo da padroneggiare'
    },
    excerpt: {
      es: 'VPC, subredes, reglas y balanceadores explicados con enfoque practico para APIs.',
      en: 'VPCs, subnets, rules and load balancers explained with a practical API-first mindset.',
      fr: 'VPC, sous-reseaux, regles et load balancers expliques de facon pratique pour les APIs.',
      it: 'VPC, subnet, regole e load balancer spiegati in modo pratico per API.'
    },
    content: {
      es: [
        'No necesitas ser especialista en redes para desplegar bien un backend, pero si dominar lo esencial.',
        'Conocer VPC, subred publica/privada y grupos de seguridad reduce errores de despliegue.',
        'Tambien conviene separar entornos y aplicar principio de menor privilegio desde el inicio.'
      ],
      en: [
        'You do not need to be a networking expert to deploy backend services, but you need the fundamentals.',
        'Understanding VPCs, public/private subnets and security groups prevents common production mistakes.',
        'Separate environments and apply least privilege from day one.'
      ],
      fr: [
        'Vous n avez pas besoin d etre expert reseau, mais vous devez maitriser les bases.',
        'Comprendre VPC, sous-reseaux publics/prives et security groups evite des erreurs de production.',
        'Separez les environnements et appliquez le principe du moindre privilege des le depart.'
      ],
      it: [
        'Non serve essere esperti di rete, ma e fondamentale conoscere le basi.',
        'Capire VPC, subnet pubbliche/private e security group evita errori comuni in produzione.',
        'Separa gli ambienti e applica il principio del privilegio minimo fin dall inizio.'
      ]
    }
  },
  {
    slug: 'prompt-engineering-for-real-dev-workflows',
    date: '2025-12-16',
    readTime: '6 min',
    tags: ['AI', 'Prompt Engineering', 'Developer Productivity'],
    title: {
      es: 'Prompt engineering aplicado a flujos reales de desarrollo',
      en: 'Prompt Engineering for Real Development Workflows',
      fr: 'Prompt engineering applique aux vrais flux de developpement',
      it: 'Prompt engineering applicato ai flussi reali di sviluppo'
    },
    excerpt: {
      es: 'Patrones de prompts para documentar, refactorizar y acelerar tareas sin perder criterio tecnico.',
      en: 'Prompt patterns for docs, refactors and faster delivery without sacrificing technical judgment.',
      fr: 'Modeles de prompts pour documentation, refactor et execution plus rapide sans perdre la qualite.',
      it: 'Pattern di prompt per documentazione, refactor e velocita senza perdere qualita tecnica.'
    },
    content: {
      es: [
        'Usar IA bien no es delegar criterio: es estructurar mejor el trabajo para iterar mas rapido.',
        'Los mejores prompts incluyen contexto de arquitectura, restricciones y criterio de exito.',
        'Siempre valida cambios con pruebas y lint antes de dar una tarea por cerrada.'
      ],
      en: [
        'Using AI well is not about outsourcing judgment. It is about structuring work for faster iteration.',
        'Strong prompts include architecture context, constraints and a clear definition of done.',
        'Always validate outputs with tests and lint before closing work.'
      ],
      fr: [
        'Bien utiliser l IA ne signifie pas deleguer votre jugement. Cela signifie mieux structurer le travail.',
        'Les meilleurs prompts incluent contexte d architecture, contraintes et criteres de succes.',
        'Validez toujours avec tests et lint avant de considerer une tache terminee.'
      ],
      it: [
        'Usare bene l IA non significa delegare il giudizio tecnico, ma strutturare meglio il lavoro.',
        'I prompt migliori includono contesto architetturale, vincoli e criteri di successo.',
        'Valida sempre con test e lint prima di chiudere un task.'
      ]
    }
  }
];

export function getBlogPostsForLocale(locale: AppLocale) {
  return blogPosts.map((post) => ({
    ...post,
    title: post.title[locale],
    excerpt: post.excerpt[locale],
    content: post.content[locale]
  }));
}

export function getBlogPostBySlug(slug: string, locale: AppLocale) {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return null;
  }

  return {
    ...post,
    title: post.title[locale],
    excerpt: post.excerpt[locale],
    content: post.content[locale]
  };
}
