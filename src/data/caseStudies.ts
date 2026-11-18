import type { AppLocale, BlogPost } from './blogPosts';

type CaseSection = { heading: string; body: string };
type LocalizedCaseSections = Record<AppLocale, CaseSection[]>;

type CaseStudyPost = BlogPost & {
  caseStudy: { projectId: string; sections: LocalizedCaseSections };
};

export const caseStudyPosts: CaseStudyPost[] = [
  {
    slug: 'caso-de-estudio-logmaster',
    date: '2026-08-05',
    readTime: '2 min',
    tags: ['Go', 'React', 'PostgreSQL'],
    title: {
      es: 'Caso de estudio: LogMaster — gestión digital de visitantes',
      en: 'Case Study: LogMaster — Digital Visitor Management',
      fr: 'Étude de cas : LogMaster — gestion numérique des visiteurs',
      it: 'Caso di studio: LogMaster — gestione digitale dei visitatori'
    },
    excerpt: {
      es: 'Registro de visitas, gestión de roles y reportes de auditoría en el contexto de unas prácticas profesionales.',
      en: 'Visitor records, role-based operations and audit reports in the context of a professional internship.',
      fr: 'Registre des visiteurs, rôles opérationnels et rapports d’audit dans le cadre d’un stage professionnel.',
      it: 'Registrazione dei visitatori, ruoli operativi e report di audit nel contesto di un tirocinio professionale.'
    },
    caseStudy: {
      projectId: 'visitors',
      sections: {
        es: [
          { heading: 'Contexto', body: 'LogMaster se desarrolló durante mis prácticas profesionales en Industrias de Alimentos El Trébol, realizadas aproximadamente entre febrero y agosto de 2026. El caso aborda el registro de visitas y el control de acceso en instalaciones corporativas.' },
          { heading: 'Decisión de diseño', body: 'El flujo representa cada visita desde la llegada y admisión hasta una salida temporal, el reingreso y el cierre. Los roles de Administrador, Guardia y Auditor organizan las tareas de operación y consulta.' },
          { heading: 'Implementación', body: 'El cliente web está construido con React y TypeScript. La API usa Go con Chi y PostgreSQL. El sistema contempla registro, consentimientos, fotografías e informes exportables en PDF y Excel para apoyar auditorías.' },
          { heading: 'Evidencia y alcance', body: 'El diagrama de esta página ilustra el ciclo de visita; no es una captura de producción. Se puede revisar la implementación y el historial directamente en el repositorio. No se atribuyen métricas de impacto que no estén documentadas.' }
        ],
        en: [
          { heading: 'Context', body: 'LogMaster was developed during my professional internship at Industrias de Alimentos El Trébol, approximately from February to August 2026. The case covers visitor records and access management at corporate facilities.' },
          { heading: 'Design decision', body: 'The workflow follows each visit from arrival and admission through a temporary exit, re-entry and closure. Administrator, Guard and Auditor roles organize operational tasks and review.' },
          { heading: 'Implementation', body: 'The web client uses React and TypeScript. The API uses Go with Chi and PostgreSQL. The system covers registration, consent, photographs and PDF and Excel exports to support audit work.' },
          { heading: 'Evidence and scope', body: 'The diagram on this page illustrates the visit lifecycle; it is not a production screenshot. The implementation and history can be reviewed in the repository. No undocumented impact metrics are claimed.' }
        ],
        fr: [
          { heading: 'Contexte', body: 'LogMaster a été développé pendant mon stage professionnel chez Industrias de Alimentos El Trébol, approximativement de février à août 2026. Le projet porte sur le registre des visiteurs et la gestion des accès aux installations de l’entreprise.' },
          { heading: 'Choix de conception', body: 'Le parcours suit chaque visite, de l’arrivée et l’admission jusqu’à la sortie temporaire, au retour et à la clôture. Les rôles Administrateur, Garde et Auditeur organisent les opérations et la consultation.' },
          { heading: 'Mise en œuvre', body: 'Le client web utilise React et TypeScript. L’API repose sur Go avec Chi et PostgreSQL. Le système prévoit l’enregistrement, le consentement, les photos et des exports PDF et Excel pour faciliter les audits.' },
          { heading: 'Éléments et portée', body: 'Le schéma présenté illustre le cycle d’une visite ; ce n’est pas une capture de production. Le code et son historique sont consultables dans le dépôt. Aucune mesure d’impact non documentée n’est avancée.' }
        ],
        it: [
          { heading: 'Contesto', body: 'LogMaster è stato sviluppato durante il mio tirocinio professionale presso Industrias de Alimentos El Trébol, approssimativamente da febbraio ad agosto 2026. Il progetto riguarda la registrazione dei visitatori e la gestione degli accessi aziendali.' },
          { heading: 'Scelta progettuale', body: 'Il flusso segue ogni visita dall’arrivo e dall’ammissione fino all’uscita temporanea, al rientro e alla chiusura. I ruoli di Amministratore, Guardia e Auditor organizzano le operazioni e la consultazione.' },
          { heading: 'Implementazione', body: 'Il client web usa React e TypeScript. L’API si basa su Go con Chi e PostgreSQL. Il sistema comprende registrazione, consensi, fotografie ed esportazioni PDF ed Excel a supporto degli audit.' },
          { heading: 'Evidenze e limiti', body: 'Il diagramma illustra il ciclo di una visita e non è una schermata di produzione. Il codice e la cronologia sono consultabili nel repository. Non vengono dichiarate metriche di impatto prive di documentazione.' }
        ]
      }
    },
    content: {
      es: [], en: [], fr: [], it: []
    }
  },
  {
    slug: 'caso-de-estudio-trickreport',
    date: '2026-11-07',
    readTime: '2 min',
    tags: ['Go', 'Next.js', 'WebSockets'],
    title: {
      es: 'Caso de estudio: Trickreport — soporte y tickets multiempresa',
      en: 'Case Study: Trickreport — Multi-Company Support and Tickets',
      fr: 'Étude de cas : Trickreport — support et tickets multi-entreprise',
      it: 'Caso di studio: Trickreport — assistenza e ticket multi-azienda'
    },
    excerpt: {
      es: 'Un centro de ayuda que reúne tickets, acuerdos de servicio y conocimiento de soporte para varias empresas.',
      en: 'A help desk that brings tickets, service agreements and support knowledge together across companies.',
      fr: 'Un centre d’assistance qui réunit tickets, engagements de service et ressources de support pour plusieurs entreprises.',
      it: 'Un help desk che riunisce ticket, accordi di servizio e conoscenza operativa per più aziende.'
    },
    caseStudy: {
      projectId: 'trickreport',
      sections: {
        es: [
          { heading: 'Contexto', body: 'Trickreport organiza el trabajo de soporte para varias empresas en una plataforma de mesa de ayuda. Su alcance incluye tickets, acuerdos de nivel de servicio (SLA) y una base de conocimiento.' },
          { heading: 'Decisión de diseño', body: 'El producto presenta los tickets como flujos de trabajo y vincula el seguimiento del servicio con cada empresa. También incluye analítica y notificaciones en tiempo real para comunicar cambios del ticket.' },
          { heading: 'Implementación', body: 'Las aplicaciones web utilizan Next.js y TypeScript; la API está desarrollada con Go y Chi sobre PostgreSQL. WebSockets forman parte de la comunicación de eventos en tiempo real.' },
          { heading: 'Evidencia y alcance', body: 'La ilustración representa una vista esquemática de tickets agrupados por estado, no una captura del producto en uso. El repositorio contiene el código del sistema; no se publican mediciones de rendimiento no verificadas.' }
        ],
        en: [
          { heading: 'Context', body: 'Trickreport organizes support work for multiple companies in a help desk platform. Its scope includes tickets, service-level agreements (SLAs) and a knowledge base.' },
          { heading: 'Design decision', body: 'The product presents tickets as workflows and ties service tracking to each company. It also includes analytics and real-time notifications to communicate ticket changes.' },
          { heading: 'Implementation', body: 'The web applications use Next.js and TypeScript; the API is built with Go and Chi on PostgreSQL. WebSockets are part of its real-time event communication.' },
          { heading: 'Evidence and scope', body: 'The illustration is a schematic view of tickets grouped by status, not a screenshot of the running product. The repository contains the system code; no unverified performance measurements are published.' }
        ],
        fr: [
          { heading: 'Contexte', body: 'Trickreport organise le support de plusieurs entreprises sur une plateforme de centre d’assistance. Son périmètre comprend les tickets, les accords de niveau de service (SLA) et une base de connaissances.' },
          { heading: 'Choix de conception', body: 'Le produit présente les tickets comme des flux de travail et relie le suivi des services à chaque entreprise. Il comprend aussi des analyses et des notifications en temps réel sur l’évolution des tickets.' },
          { heading: 'Mise en œuvre', body: 'Les applications web utilisent Next.js et TypeScript ; l’API est développée avec Go et Chi sur PostgreSQL. Les WebSockets participent à la communication des événements en temps réel.' },
          { heading: 'Éléments et portée', body: 'L’illustration est un schéma de tickets regroupés par état et non une capture du produit en fonctionnement. Le dépôt contient le code du système ; aucune mesure de performance non vérifiée n’est publiée.' }
        ],
        it: [
          { heading: 'Contesto', body: 'Trickreport organizza l’assistenza per più aziende in una piattaforma di help desk. Il progetto comprende ticket, accordi sul livello di servizio (SLA) e una base di conoscenza.' },
          { heading: 'Scelta progettuale', body: 'Il prodotto presenta i ticket come flussi di lavoro e collega il monitoraggio del servizio a ogni azienda. Include inoltre analisi e notifiche in tempo reale sulle modifiche dei ticket.' },
          { heading: 'Implementazione', body: 'Le applicazioni web usano Next.js e TypeScript; l’API è realizzata con Go e Chi su PostgreSQL. WebSockets partecipano alla comunicazione degli eventi in tempo reale.' },
          { heading: 'Evidenze e limiti', body: 'L’illustrazione è uno schema di ticket raggruppati per stato, non una schermata del prodotto in esecuzione. Il repository contiene il codice; non vengono pubblicate misurazioni delle prestazioni non verificate.' }
        ]
      }
    },
    content: { es: [], en: [], fr: [], it: [] }
  },
  {
    slug: 'caso-de-estudio-chiguire',
    date: '2026-11-07',
    readTime: '2 min',
    tags: ['Next.js', 'Flutter', 'Go'],
    title: {
      es: 'Caso de estudio: Chiguire — operación local y sincronización',
      en: 'Case Study: Chiguire — Local Operations and Sync',
      fr: 'Étude de cas : Chiguire — opérations locales et synchronisation',
      it: 'Caso di studio: Chiguire — operatività locale e sincronizzazione'
    },
    excerpt: {
      es: 'Un ERP para negocios venezolanos que contempla el trabajo sin conexión y la sincronización al recuperarla.',
      en: 'An ERP for Venezuelan businesses designed around offline work and sync when connectivity returns.',
      fr: 'Un ERP pour les entreprises vénézuéliennes conçu pour le travail hors connexion et la synchronisation au retour du réseau.',
      it: 'Un ERP per le imprese venezuelane pensato per operare offline e sincronizzarsi al ripristino della connessione.'
    },
    caseStudy: {
      projectId: 'chiguire',
      sections: {
        es: [
          { heading: 'Contexto', body: 'Chiguire es un ERP multiempresa enfocado en negocios venezolanos. Reúne tareas de inventario, facturación y operación fiscal, incluidas integraciones y procesos relacionados con SENIAT.' },
          { heading: 'Decisión de diseño', body: 'El flujo contempla la operación local cuando no hay conexión y la sincronización al restablecerse. Así se hace visible el ciclo principal sin prometer reglas de resolución de conflictos no documentadas.' },
          { heading: 'Implementación', body: 'El ecosistema combina aplicaciones web y móvil con una API en Go y PostgreSQL. El cliente web usa Next.js y la aplicación móvil está desarrollada con Flutter.' },
          { heading: 'Evidencia y alcance', body: 'El diagrama representa la relación entre los clientes web y móvil y la sincronización posterior; es ilustrativo, no una captura real. El repositorio permite revisar los componentes públicos del proyecto.' }
        ],
        en: [
          { heading: 'Context', body: 'Chiguire is a multi-company ERP focused on Venezuelan businesses. It brings together inventory, invoicing and fiscal operations, including SENIAT-related processes.' },
          { heading: 'Design decision', body: 'The workflow accounts for local operation while offline and synchronization after connectivity returns. This makes the core cycle clear without claiming undocumented conflict-resolution rules.' },
          { heading: 'Implementation', body: 'The ecosystem combines web and mobile applications with an API built in Go and PostgreSQL. The web client uses Next.js and the mobile application uses Flutter.' },
          { heading: 'Evidence and scope', body: 'The diagram illustrates the relationship between the web and mobile clients and later synchronization; it is not a real screenshot. The repository provides a way to review the project’s public components.' }
        ],
        fr: [
          { heading: 'Contexte', body: 'Chiguire est un ERP multi-entreprise destiné aux entreprises vénézuéliennes. Il réunit inventaire, facturation et opérations fiscales, y compris les processus liés au SENIAT.' },
          { heading: 'Choix de conception', body: 'Le flux prévoit le travail local sans connexion et la synchronisation au retour du réseau. Il présente le cycle essentiel sans avancer de règles de résolution de conflits non documentées.' },
          { heading: 'Mise en œuvre', body: 'L’écosystème combine des applications web et mobiles avec une API développée en Go et PostgreSQL. Le client web utilise Next.js et l’application mobile Flutter.' },
          { heading: 'Éléments et portée', body: 'Le schéma illustre le lien entre les clients web et mobile et leur synchronisation ultérieure ; ce n’est pas une capture réelle. Le dépôt permet de consulter les composants publics du projet.' }
        ],
        it: [
          { heading: 'Contesto', body: 'Chiguire è un ERP multi-azienda rivolto alle imprese venezuelane. Riunisce inventario, fatturazione e operazioni fiscali, compresi i processi legati al SENIAT.' },
          { heading: 'Scelta progettuale', body: 'Il flusso prevede il lavoro locale senza connessione e la sincronizzazione quando la rete ritorna. Descrive il ciclo principale senza dichiarare regole di risoluzione dei conflitti non documentate.' },
          { heading: 'Implementazione', body: 'L’ecosistema combina applicazioni web e mobile con un’API realizzata in Go e PostgreSQL. Il client web usa Next.js e l’app mobile è sviluppata con Flutter.' },
          { heading: 'Evidenze e limiti', body: 'Il diagramma illustra il rapporto tra client web e mobile e la successiva sincronizzazione; non è una schermata reale. Il repository consente di esaminare i componenti pubblici del progetto.' }
        ]
      }
    },
    content: { es: [], en: [], fr: [], it: [] }
  }
];
