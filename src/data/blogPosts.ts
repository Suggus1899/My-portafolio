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
    slug: 'caso-de-estudio-logmaster',
    date: '2026-08-05',
    readTime: '6 min',
    tags: ['Case Study', 'Electron', 'SQLCipher', 'Security'],
    title: {
      es: 'Caso de estudio: LogMaster — gestión digital de visitantes',
      en: 'Case Study: LogMaster — Digital Visitor Management',
      fr: 'Étude de cas : LogMaster — gestion numérique des visiteurs',
      it: 'Caso di studio: LogMaster — gestione digitale dei visitatori'
    },
    excerpt: {
      es: 'Cómo se organizan el registro de visitas, el control de acceso y los informes de auditoría.',
      en: 'How visitor registration, access management and audit reporting fit into one workflow.',
      fr: 'Comment réunir l’enregistrement des visiteurs, la gestion des accès et les rapports d’audit.',
      it: 'Come riunire registrazione dei visitatori, gestione degli accessi e report di audit.'
    },
    content: {
      es: [
        'Industrias de Alimentos El Trébol necesitaba reemplazar un control de acceso y gestión de visitantes manual, lento y sin trazabilidad, por un sistema digital confiable.',
        'El primer paso fue el levantamiento de requisitos: entender los roles del negocio (Administrador, Guardia, Auditor) y los puntos donde más se perdía tiempo operativo.',
        'El sistema reúne los pasos de la visita —desde la llegada y admisión hasta una salida temporal, el reingreso y el cierre— en un flujo digital con roles de operación y auditoría.',
        'El cliente web usa React y TypeScript; la API está construida con Go sobre PostgreSQL. Los informes exportables en PDF y Excel apoyan las consultas y auditorías.',
        'El trabajo se centró en entender el proceso, modelar sus estados y llevar el registro de acceso a una aplicación que el equipo pueda mantener.'
      ],
      en: [
        'Industrias de Alimentos El Trébol needed to replace a manual, slow, and untraceable access control and visitor management process with a reliable digital system.',
        'The first step was requirements gathering: understanding the business roles (Administrator, Guard, Auditor) and the points where the most operational time was lost.',
        'The system brings each visit step—from arrival and admission to temporary exit, re-entry and closure—into a digital workflow with operational and audit roles.',
        'The web client uses React and TypeScript; the API is built with Go and PostgreSQL. PDF and Excel exports support review and audit work.',
        'The work focused on understanding the process, modeling its states and moving access records into an application the team can maintain.'
      ],
      fr: [
        'Industrias de Alimentos El Trébol avait besoin de remplacer un processus de contrôle d\'accès et de gestion des visiteurs manuel, lent et sans traçabilité, par un système numérique fiable.',
        'La première étape a été le recueil des besoins : comprendre les rôles métier (Administrateur, Garde, Auditeur) et les points où le plus de temps opérationnel était perdu.',
        'Le système réunit chaque étape de la visite — arrivée, admission, sortie temporaire, retour et clôture — dans un flux numérique avec des rôles opérationnels et d’audit.',
        'Le client web utilise React et TypeScript ; l’API repose sur Go et PostgreSQL. Les exports PDF et Excel facilitent la consultation et l’audit.',
        'Le travail a consisté à comprendre le processus, à en modéliser les états et à transférer le suivi des accès dans une application maintenable.'
      ],
      it: [
        'Industrias de Alimentos El Trébol aveva bisogno di sostituire un processo di controllo accessi e gestione visitatori manuale, lento e senza tracciabilità, con un sistema digitale affidabile.',
        'Il primo passo è stato la raccolta dei requisiti: capire i ruoli aziendali (Amministratore, Guardia, Auditor) e i punti dove si perdeva più tempo operativo.',
        'Il sistema riunisce ogni fase della visita — arrivo, ammissione, uscita temporanea, rientro e chiusura — in un flusso digitale con ruoli operativi e di audit.',
        'Il client web usa React e TypeScript; l’API è realizzata con Go e PostgreSQL. Le esportazioni PDF ed Excel supportano consultazione e audit.',
        'Il lavoro si è concentrato sulla comprensione del processo, la modellazione dei suoi stati e il passaggio delle registrazioni di accesso a un’applicazione manutenibile.'
      ]
    }
  },
  {
    slug: 'caso-de-estudio-keoit-flutter-multiplataforma',
    date: '2026-07-15',
    readTime: '6 min',
    tags: ['Case Study', 'Flutter', 'Cross-platform'],
    title: {
      es: 'Caso de estudio: una aplicación multiplataforma con Flutter en KeoIT',
      en: 'Case Study: A Cross-Platform Flutter App at KeoIT',
      fr: 'Étude de cas : une application multiplateforme avec Flutter chez KeoIT',
      it: 'Caso di studio: un’app multipiattaforma Flutter per KeoIT'
    },
    excerpt: {
      es: 'Decisiones de arquitectura, sesión y diseño al desarrollar un cliente Flutter para varias plataformas.',
      en: 'Architecture, session and design choices while building a Flutter client for multiple platforms.',
      fr: 'Choix d’architecture, de session et de design pour un client Flutter multiplateforme.',
      it: 'Scelte di architettura, sessione e design per un client Flutter multipiattaforma.'
    },
    content: {
      es: [
        'El equipo necesitaba un cliente Flutter/Dart para Android, iOS y escritorio, con una experiencia coherente en sus distintas plataformas.',
        'Elegí Flutter/Dart con Clean Architecture y Provider para desacoplar la gestión de sesión y el control de roles de la capa de presentación, manteniendo el código testeable y escalable.',
        'Para la experiencia visual integré animaciones vectoriales con Rive y un diseño Glassmorphism.',
        'También participé en la capa web del sistema con Next.js, manteniendo consistencia de producto entre plataformas.',
        'El trabajo combinó una base compartida en Flutter con decisiones de interfaz, sesión y roles adaptadas a cada plataforma.'
      ],
      en: [
        'The team needed a Flutter/Dart client for Android, iOS and desktop with a consistent experience across platforms.',
        'I chose Flutter/Dart with Clean Architecture and Provider to decouple session management and role control from the presentation layer, keeping the code testable and scalable.',
        'For the visual experience, I integrated vector animations with Rive and a Glassmorphism design.',
        'I also contributed to the web layer of the system with Next.js, keeping product consistency across platforms.',
        'The work combined a shared Flutter foundation with interface, session and role decisions suited to each platform.'
      ],
      fr: [
        'L’équipe avait besoin d’un client Flutter/Dart pour Android, iOS et desktop avec une expérience cohérente sur chaque plateforme.',
        'J\'ai choisi Flutter/Dart avec Clean Architecture et Provider pour découpler la gestion de session et le contrôle des rôles de la couche de présentation, en gardant le code testable et évolutif.',
        'Pour l’expérience visuelle, j’ai intégré des animations vectorielles avec Rive et un design Glassmorphism.',
        'J\'ai également contribué à la couche web du système avec Next.js, en maintenant la cohérence du produit entre les plateformes.',
        'Le travail a associé une base Flutter partagée à des choix d’interface, de session et de rôles adaptés à chaque plateforme.'
      ],
      it: [
        'Il team aveva bisogno di un client Flutter/Dart per Android, iOS e desktop con un’esperienza coerente sulle diverse piattaforme.',
        'Ho scelto Flutter/Dart con Clean Architecture e Provider per disaccoppiare la gestione della sessione e il controllo dei ruoli dal layer di presentazione, mantenendo il codice testabile e scalabile.',
        'Per l’esperienza visiva ho integrato animazioni vettoriali con Rive e un design Glassmorphism.',
        'Ho contribuito anche al layer web del sistema con Next.js, mantenendo coerenza di prodotto tra le piattaforme.',
        'Il lavoro ha unito una base Flutter condivisa a scelte di interfaccia, sessione e ruoli adatte a ogni piattaforma.'
      ]
    }
  },
  {
    slug: 'hibernate-jpa-n-plus-1-problem',
    date: '2026-03-20',
    readTime: '6 min',
    tags: ['Java', 'Spring Boot', 'Hibernate', 'JPA'],
    title: {
      es: 'El problema N+1 en Hibernate/JPA y cómo evitarlo',
      en: 'The N+1 Problem in Hibernate/JPA and How to Avoid It',
      fr: 'Le problème N+1 dans Hibernate/JPA et comment l\'éviter',
      it: 'Il problema N+1 in Hibernate/JPA e come evitarlo'
    },
    excerpt: {
      es: 'Optimiza tus consultas de base de datos entendiendo cuándo usar JOIN FETCH o @EntityGraph.',
      en: 'Optimize your database queries by understanding when to use JOIN FETCH or @EntityGraph.',
      fr: 'Optimisez vos requêtes de base de données en comprenant quand utiliser JOIN FETCH ou @EntityGraph.',
      it: 'Ottimizza le tue query di database capendo quando usare JOIN FETCH o @EntityGraph.'
    },
    content: {
      es: [
        'El problema N+1 es el asesino silencioso del rendimiento en aplicaciones Spring Boot con datos relacionales.',
        'Ocurre cuando cargas una entidad y luego accedes a sus colecciones lazy, ejecutando una consulta adicional por cada elemento.',
        'La solución más limpia y moderna es usar @EntityGraph en tus repositorios de Spring Data JPA para definir dinámicamente qué relaciones cargar.'
      ],
      en: [
        'The N+1 problem is the silent performance killer in Spring Boot applications with relational data.',
        'It happens when you load an entity and then access its lazy collections, executing an additional query for each item.',
        'The cleanest modern solution is using @EntityGraph in your Spring Data JPA repositories to dynamically define which relationships to fetch.'
      ],
      fr: [
        'Le problème N+1 est le tueur silencieux des performances dans les applications Spring Boot avec des données relationnelles.',
        'Il se produit lorsque vous chargez une entité puis accédez à ses collections paresseuses, exécutant une requête supplémentaire pour chaque élément.',
        'La solution moderne la plus propre consiste à utiliser @EntityGraph dans vos dépôts Spring Data JPA pour définir dynamiquement les relations à charger.'
      ],
      it: [
        'Il problema N+1 è il killer silenzioso delle prestazioni nelle applicazioni Spring Boot con dati relazionali.',
        'Si verifica quando si carica un entità e poi si accede alle sue collezioni lazy, eseguendo una query aggiuntiva per ogni elemento.',
        'La soluzione moderna più pulita è utilizzare @EntityGraph nei repository Spring Data JPA per definire dinamicamente quali relazioni caricare.'
      ]
    }
  },
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
  },
  {
    slug: 'spring-security-para-apis-rest',
    date: '2026-03-01',
    readTime: '7 min',
    tags: ['Java', 'Spring Boot', 'Security'],
    title: {
      es: 'Spring Security para APIs REST: autenticacion sin magia',
      en: 'Spring Security for REST APIs: Authentication Without Magic',
      fr: 'Spring Security pour les APIs REST: authentification sans magie',
      it: 'Spring Security per API REST: autenticazione senza magia'
    },
    excerpt: {
      es: 'Como configurar JWT, roles y permisos en Spring Boot de forma explícita y mantenible.',
      en: 'How to configure JWT, roles and permissions in Spring Boot in an explicit and maintainable way.',
      fr: 'Comment configurer JWT, roles et permissions dans Spring Boot de maniere explicite et maintenable.',
      it: 'Come configurare JWT, ruoli e permessi in Spring Boot in modo esplicito e manutenibile.'
    },
    content: {
      es: [
        'Spring Security puede parecer complicado, pero la clave esta en entender su cadena de filtros y configurar explicitamente lo que necesitas.',
        'Para APIs REST stateless, lo mas limpio es deshabilitar sesiones y CSRF, usar un filtro JWT propio y definir rules de acceso por endpoint.',
        'Los roles y permisos deben vivir en el token y validarse en cada request, no en sesion. Esto hace la arquitectura horizontal y escalable.'
      ],
      en: [
        'Spring Security can feel complex, but the key is understanding its filter chain and configuring only what you actually need.',
        'For stateless REST APIs, the cleanest approach is to disable sessions and CSRF, add a custom JWT filter and define per-endpoint access rules.',
        'Roles and permissions should live in the token and be validated per request, not per session. This enables stateless horizontal scaling.'
      ],
      fr: [
        'Spring Security peut sembler complexe, mais la cle est de comprendre sa chaine de filtres et de configurer uniquement ce dont vous avez besoin.',
        'Pour des APIs REST stateless, la meilleure approche est de desactiver les sessions et CSRF, ajouter un filtre JWT personnalise et definir des regles par endpoint.',
        'Les roles et permissions doivent vivre dans le token et etre valides a chaque requete, pas en session. Cela permet une scalabilite horizontale.'
      ],
      it: [
        'Spring Security puo sembrare complesso, ma la chiave e capire la sua catena di filtri e configurare solo cio di cui hai bisogno.',
        'Per API REST stateless, l approccio piu pulito e disabilitare sessioni e CSRF, aggiungere un filtro JWT personalizzato e definire regole per endpoint.',
        'Ruoli e permessi devono risiedere nel token e essere validati per ogni richiesta, non in sessione. Questo abilitante il scaling orizzontale.'
      ]
    }
  },
  {
    slug: 'de-javascript-a-typescript-en-el-backend',
    date: '2026-02-20',
    readTime: '5 min',
    tags: ['TypeScript', 'JavaScript', 'Backend'],
    title: {
      es: 'De JavaScript a TypeScript: que cambia realmente en el backend',
      en: 'From JavaScript to TypeScript: What Actually Changes on the Backend',
      fr: 'De JavaScript a TypeScript: ce qui change vraiment cote backend',
      it: 'Da JavaScript a TypeScript: cosa cambia davvero nel backend'
    },
    excerpt: {
      es: 'Mas alla de los tipos: como TypeScript cambia la arquitectura, el refactor y la confianza en el codigo.',
      en: 'Beyond types: how TypeScript changes architecture, refactoring confidence and runtime predictability.',
      fr: 'Au-dela des types: comment TypeScript change l architecture, la confiance dans le refactor et la predictibilite du code.',
      it: 'Oltre i tipi: come TypeScript cambia l architettura, la confidenza nel refactor e la prevedibilita del codice.'
    },
    content: {
      es: [
        'Migrar a TypeScript no es solo poner tipos encima del codigo. Es repensar como estructuras dominios, contratos y capas de tu aplicacion.',
        'Los beneficios reales aparecen en el refactor: cambias una interfaz y el compilador te senala todos los puntos de rotura antes de ejecutar nada.',
        'Para el backend, los mayores ganancias son en los contratos de API (request/response shapes), la validacion de entrada y la seguridad de los modelos de datos.'
      ],
      en: [
        'Migrating to TypeScript is not just adding types on top of existing code. It is rethinking how you structure domains, contracts and application layers.',
        'The real benefits appear during refactoring: change one interface and the compiler immediately shows you every breakpoint before you run anything.',
        'For backends, the biggest wins are in API contracts (request/response shapes), input validation and type-safe data models.'
      ],
      fr: [
        'Migrer vers TypeScript n est pas juste ajouter des types sur du code existant. C est repenser comment structurer domaines, contrats et couches applicatives.',
        'Les vrais benefices apparaissent lors du refactor: changez une interface et le compilateur vous montre immediatement chaque point de rupture.',
        'Pour le backend, les plus grands gains sont dans les contrats API (formes requete/reponse), la validation des entrees et les modeles de donnees types.'
      ],
      it: [
        'Migrare a TypeScript non significa solo aggiungere tipi al codice esistente. Significa ripensare come strutturare dominio, contratti e layer applicativi.',
        'I vantaggi reali emergono nel refactor: cambia un interfaccia e il compilatore mostra immediatamente ogni punto di rottura prima di eseguire qualsiasi cosa.',
        'Per il backend, i guadagni piu grandi sono nei contratti API (forme request/response), la validazione degli input e i modelli di dati tipizzati.'
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
