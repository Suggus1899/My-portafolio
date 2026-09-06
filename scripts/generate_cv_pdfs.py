from pathlib import Path
from io import BytesIO

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.pdfgen import canvas
from pypdf import PdfReader, PdfWriter


OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public"
PAGE_WIDTH = letter[0] - 0.72 * inch
CONTACT = "Aragua, Cagua - Venezuela | +58-424-3737586 | gustavojose0819@gmail.com | github.com/Suggus1899"


CVS = {
    "en": {
        "profile_title": "Professional Profile",
        "profile": "Informatics Engineering student specialized in Full-Stack development, focused on process automation and document workflow digitization. I have built web and desktop systems for industrial and remote environments that reduce operating time and the margin for human error. Strong in database design and modeling, clean architectures (Clean Architecture, SOLID), and results-oriented software delivery, with hands-on experience across the complete development cycle: from requirements gathering to production deployment.",
        "experience_title": "Professional Experience",
        "experience": [
            ("Full-Stack Developer - Remote", "KeoIT - Peru | March 2026 - July 2026", ["Developed a cross-platform Flutter/Dart client for Android, iOS, and desktop.", "Implemented Clean Architecture with Provider for session management and role-based access.", "Integrated interactive Rive vector animations and Glassmorphism design.", "Developed the system web layer with Next.js as part of the full-stack solution.", "Managed reactive state through a decoupled architecture designed for scalability."]),
            ("Full-Stack Developer (Professional Internship)", "Industrias de Alimentos El Trebol | February 2026 - August 2026", ["LogMaster - Access Control and Visitor Management System.", "Gathered requirements and analyzed operations to understand business logic.", "Designed a PostgreSQL database with AES-256-GCM encryption for sensitive PII.", "Designed and developed a Turborepo monorepo: Express/TypeScript backend with Sequelize and multiple Next.js apps for administration, auditing, and reception kiosk.", "Automated management processes with complete digital visitor and access records.", "Integrated PDF and Excel reporting for operational evidence and audits.", "Reduced process execution time from up to 10 minutes to under 1 minute.", "Implemented differentiated Administrator, Guard, and Auditor roles."]),
        ],
        "skills_title": "Technical Skills",
        "skills": [("Programming Languages", "JavaScript, TypeScript, Go, Python, Rust, Java, Dart, C++"), ("Frontend", "React, Next.js, Vue.js, Angular, Tailwind CSS, Vite, Framer Motion, shadcn/ui, React Flow, Zustand, Leaflet"), ("Backend", "Node.js, Express, NestJS, Spring Boot, Spring Security, Hibernate/JPA, Actix-web"), ("ORM & Databases", "Prisma, Sequelize, MongoDB, PostgreSQL, MySQL, SQLite, Redis / BullMQ"), ("DevOps & Cloud", "Docker, GitHub Actions, Nginx, MinIO, AWS, Vercel"), ("Systems & Mobile", "Flutter / Dart, Kotlin Multiplatform, TensorFlow (face-api.js), Socket.io"), ("Tools", "Git, GitHub, Swagger / OpenAPI, Postman, ESLint, Jest")],
        "education_title": "Education",
        "education": "Informatics Engineering - Systems Engineering Specialization\nExpected graduation: mid-2027\nUniversidad Nacional Experimental Romulo Gallegos (UNERG) - Aragua, Venezuela",
        "certifications_title": "Certifications",
        "certifications": "Data Science, Prompt Engineering, SQL (Introduction & Intermediate) - DataCamp<br/>Java Fundamentals, Java OOP, Spring Boot - TodoCode",
        "languages_title": "Languages",
        "language_headers": ["Language", "Level"],
        "languages": [("Spanish", "Native"), ("English", "Upper-intermediate"), ("French", "Intermediate"), ("Italian", "Intermediate")],
        "projects_title": "Selected Projects",
        "project_headers": ["Project", "Key technologies", "Description"],
        "projects": [("Chiguire", "Go (chi), Next.js, Flutter, PostgreSQL", "Offline-first multi-tenant ERP with PowerSync synchronization"), ("E-commerce Platform", "Go (chi, sqlc), Next.js, PostgreSQL", "Store and admin panel; Go monolith replacing 5 Spring Boot microservices"), ("Habitas", "Express, Sequelize, React/Vite, PostgreSQL", "Residential platform with biometric KYC and P2P transactions"), ("Hermit", "Rust, FUSE, cgroups/namespaces", "Linux container runtime (educational systems project)"), ("Meden", "Go (Gin), Flutter (GetX), PostgreSQL", "Fiscal, commercial, and operations management for Mexico with SAT integration"), ("Myvibesfit", "Go (chi), Flutter (Riverpod), PostgreSQL", "Multi-tenant gym training app with progression engine and gamification"), ("Ohana", "Express, Sequelize, React/Vite, Flutter", "Rental platform with biometric KYC, live chat, and mobile app"), ("Souvenirs", "NestJS, Prisma, Next.js, Expo", "Multi-tenant SaaS for photographer bookings, invoices, and payments"), ("TrickReport", "Go (chi), Astro 5, PostgreSQL, WebSockets", "IT ticketing system aligned with ITIL v4 and ISO/IEC 20000-1"), ("LogMaster", "Express, Sequelize, Next.js, Turborepo", "Encrypted (AES-256-GCM) access control and visitor management platform"), ("Libertarian Forum", "Next.js, Drizzle, Tiptap", "Bilingual CMS with an article editor for a think tank"), ("ZadintsPage", "React 19, Vite, Tailwind CSS", "Marketing website and dashboard for development services")],
    },
    "fr": {
        "profile_title": "Profil Professionnel",
        "profile": "Etudiant en ingenierie informatique specialise dans le developpement Full-Stack, avec un focus sur l'automatisation des processus et la numerisation des flux documentaires. J'ai construit des systemes web et desktop pour des environnements industriels et distants qui reduisent les temps operationnels et la marge d'erreur humaine. Solide en conception et modelisation de bases de donnees, architectures propres (Clean Architecture, SOLID) et livraison de logiciels orientes resultats, avec une maitrise pratique du cycle complet de developpement, de la collecte des besoins au deploiement en production.",
        "experience_title": "Experience Professionnelle",
        "experience": [
            ("Developpeur Full-Stack - A distance", "KeoIT - Perou | Mars 2026 - Juillet 2026", ["Developpement d'un client multiplateforme Flutter/Dart pour Android, iOS et desktop.", "Implementation de Clean Architecture avec Provider pour la gestion de session et les roles.", "Integration d'animations vectorielles Rive interactives et du design Glassmorphism.", "Developpement de la couche web avec Next.js dans la solution full-stack.", "Gestion d'etat reactif avec une architecture decouplee et evolutive."]),
            ("Developpeur Full-Stack (Stage professionnel)", "Industrias de Alimentos El Trebol | Fevrier 2026 - Aout 2026", ["LogMaster - Systeme de controle d'acces et de gestion des visiteurs.", "Recueil des besoins et analyse des processus operationnels pour comprendre la logique metier.", "Conception d'une base PostgreSQL avec chiffrement AES-256-GCM pour les donnees personnelles sensibles.", "Conception et developpement d'un monorepo Turborepo: backend Express/TypeScript avec Sequelize et plusieurs applications Next.js pour l'administration, l'audit et le kiosque d'accueil.", "Automatisation des processus de gestion avec registre numerique complet des visiteurs et acces.", "Integration de rapports PDF et Excel comme preuves operationnelles et d'audit.", "Reduction du temps d'execution des processus de jusqu'a 10 minutes a moins d'une minute.", "Implementation des roles Administrateur, Gardien et Auditeur."]),
        ],
        "skills_title": "Competences Techniques",
        "skills": [("Langages", "JavaScript, TypeScript, Go, Python, Rust, Java, Dart, C++"), ("Frontend", "React, Next.js, Vue.js, Angular, Tailwind CSS, Vite, Framer Motion, shadcn/ui, React Flow, Zustand, Leaflet"), ("Backend", "Node.js, Express, NestJS, Spring Boot, Spring Security, Hibernate/JPA, Actix-web"), ("ORM et Bases de donnees", "Prisma, Sequelize, MongoDB, PostgreSQL, MySQL, SQLite, Redis / BullMQ"), ("DevOps et Cloud", "Docker, GitHub Actions, Nginx, MinIO, AWS, Vercel"), ("Systemes et Mobile", "Flutter / Dart, Kotlin Multiplatform, TensorFlow (face-api.js), Socket.io"), ("Outils", "Git, GitHub, Swagger / OpenAPI, Postman, ESLint, Jest")],
        "education_title": "Formation",
        "education": "Ingenierie Informatique - Specialisation en Ingenierie des Systemes\nDiplome prevu mi-2027\nUniversidad Nacional Experimental Romulo Gallegos (UNERG) - Aragua, Venezuela",
        "certifications_title": "Certifications",
        "certifications": "Data Science, Prompt Engineering, SQL (Introduction et Intermediaire) - DataCamp<br/>Fondamentaux Java, Java OOP, Spring Boot - TodoCode",
        "languages_title": "Langues",
        "language_headers": ["Langue", "Niveau"],
        "languages": [("Espagnol", "Natif"), ("Anglais", "Intermediaire avance"), ("Francais", "Intermediaire"), ("Italien", "Intermediaire")],
        "projects_title": "Projets Selectionnes",
        "project_headers": ["Projet", "Technologies cles", "Description"],
        "projects": [("Chiguire", "Go (chi), Next.js, Flutter, PostgreSQL", "ERP multi-tenant offline-first avec synchronisation PowerSync"), ("E-commerce Platform", "Go (chi, sqlc), Next.js, PostgreSQL", "Boutique et panneau admin; monolithe Go remplacant 5 microservices Spring Boot"), ("Habitas", "Express, Sequelize, React/Vite, PostgreSQL", "Plateforme residentielle avec KYC biometrique et transactions P2P"), ("Hermit", "Rust, FUSE, cgroups/namespaces", "Runtime de conteneurs Linux (projet educatif de systemes)"), ("Meden", "Go (Gin), Flutter (GetX), PostgreSQL", "Gestion fiscale, commerciale et operationnelle au Mexique avec integration SAT"), ("Myvibesfit", "Go (chi), Flutter (Riverpod), PostgreSQL", "Application multi-tenant d'entrainement en salle avec moteur de progression et gamification"), ("Ohana", "Express, Sequelize, React/Vite, Flutter", "Plateforme de location avec KYC biometrique, chat en direct et application mobile"), ("Souvenirs", "NestJS, Prisma, Next.js, Expo", "SaaS multi-tenant pour reservations, factures et paiements de photographes"), ("TrickReport", "Go (chi), Astro 5, PostgreSQL, WebSockets", "Systeme de tickets IT conforme a ITIL v4 et ISO/IEC 20000-1"), ("LogMaster", "Express, Sequelize, Next.js, Turborepo", "Plateforme de controle d'acces et de visiteurs avec donnees chiffrees AES-256-GCM"), ("Libertarian Forum", "Next.js, Drizzle, Tiptap", "CMS bilingue avec editeur d'articles pour un think tank"), ("ZadintsPage", "React 19, Vite, Tailwind CSS", "Site marketing et tableau de bord pour services de developpement")],
    },
    "it": {
        "profile_title": "Profilo Professionale",
        "profile": "Studente di Ingegneria Informatica specializzato nello sviluppo Full-Stack, con focus sull'automazione dei processi e sulla digitalizzazione dei flussi documentali. Ho realizzato sistemi web e desktop per ambienti industriali e remoti che riducono i tempi operativi e il margine di errore umano. Solido nella progettazione e modellazione di database, nelle architetture pulite (Clean Architecture, SOLID) e nella consegna di software orientato a risultati misurabili, con esperienza pratica dell'intero ciclo di sviluppo: dalla raccolta dei requisiti al deploy in produzione.",
        "experience_title": "Esperienza Professionale",
        "experience": [
            ("Sviluppatore Full-Stack - Remoto", "KeoIT - Peru | Marzo 2026 - Luglio 2026", ["Sviluppo di un client multipiattaforma Flutter/Dart per Android, iOS e desktop.", "Implementazione di Clean Architecture con Provider per gestione sessione e ruoli.", "Integrazione di animazioni vettoriali Rive interattive e design Glassmorphism.", "Sviluppo del layer web con Next.js nella soluzione full-stack.", "Gestione dello stato reattivo con architettura disaccoppiata e scalabile."]),
            ("Sviluppatore Full-Stack (Tirocinio professionale)", "Industrias de Alimentos El Trebol | Febbraio 2026 - Agosto 2026", ["LogMaster - Sistema di controllo accessi e gestione visitatori.", "Raccolta requisiti e analisi dei processi operativi per comprendere la logica di business.", "Progettazione di database PostgreSQL con cifratura AES-256-GCM per dati personali sensibili.", "Progettazione e sviluppo di un monorepo Turborepo: backend Express/TypeScript con Sequelize e applicazioni Next.js per amministrazione, audit e chiosco reception.", "Automazione dei processi gestionali con registro digitale completo di visitatori e accessi.", "Integrazione di report PDF ed Excel come evidenza operativa e di audit.", "Riduzione del tempo di esecuzione dei processi da fino a 10 minuti a meno di 1 minuto.", "Implementazione di ruoli differenziati: Amministratore, Guardia e Auditor."]),
        ],
        "skills_title": "Competenze Tecniche",
        "skills": [("Linguaggi", "JavaScript, TypeScript, Go, Python, Rust, Java, Dart, C++"), ("Frontend", "React, Next.js, Vue.js, Angular, Tailwind CSS, Vite, Framer Motion, shadcn/ui, React Flow, Zustand, Leaflet"), ("Backend", "Node.js, Express, NestJS, Spring Boot, Spring Security, Hibernate/JPA, Actix-web"), ("ORM e Database", "Prisma, Sequelize, MongoDB, PostgreSQL, MySQL, SQLite, Redis / BullMQ"), ("DevOps e Cloud", "Docker, GitHub Actions, Nginx, MinIO, AWS, Vercel"), ("Sistemi e Mobile", "Flutter / Dart, Kotlin Multiplatform, TensorFlow (face-api.js), Socket.io"), ("Strumenti", "Git, GitHub, Swagger / OpenAPI, Postman, ESLint, Jest")],
        "education_title": "Formazione",
        "education": "Ingegneria Informatica - Specializzazione in Ingegneria dei Sistemi\nLaurea prevista a meta 2027\nUniversidad Nacional Experimental Romulo Gallegos (UNERG) - Aragua, Venezuela",
        "certifications_title": "Certificazioni",
        "certifications": "Data Science, Prompt Engineering, SQL (Introduzione e Intermedio) - DataCamp<br/>Fondamenti di Java, Java OOP, Spring Boot - TodoCode",
        "languages_title": "Lingue",
        "language_headers": ["Lingua", "Livello"],
        "languages": [("Spagnolo", "Madrelingua"), ("Inglese", "Intermedio-avanzato"), ("Francese", "Intermedio"), ("Italiano", "Intermedio")],
        "projects_title": "Progetti Selezionati",
        "project_headers": ["Progetto", "Tecnologie chiave", "Descrizione"],
        "projects": [("Chiguire", "Go (chi), Next.js, Flutter, PostgreSQL", "ERP multi-tenant offline-first con sincronizzazione PowerSync"), ("E-commerce Platform", "Go (chi, sqlc), Next.js, PostgreSQL", "Negozio e pannello admin; monolite Go che sostituisce 5 microservizi Spring Boot"), ("Habitas", "Express, Sequelize, React/Vite, PostgreSQL", "Piattaforma residenziale con KYC biometrico e transazioni P2P"), ("Hermit", "Rust, FUSE, cgroups/namespaces", "Runtime di container per Linux (progetto educativo di sistemi)"), ("Meden", "Go (Gin), Flutter (GetX), PostgreSQL", "Gestione fiscale, commerciale e operativa per il Messico con integrazione SAT"), ("Myvibesfit", "Go (chi), Flutter (Riverpod), PostgreSQL", "App multi-tenant di allenamento per palestre con motore di progressione e gamification"), ("Ohana", "Express, Sequelize, React/Vite, Flutter", "Piattaforma di noleggio con KYC biometrico, chat live e app mobile"), ("Souvenirs", "NestJS, Prisma, Next.js, Expo", "SaaS multi-tenant per prenotazioni, fatture e pagamenti dei fotografi"), ("TrickReport", "Go (chi), Astro 5, PostgreSQL, WebSockets", "Sistema di ticket IT conforme a ITIL v4 e ISO/IEC 20000-1"), ("LogMaster", "Express, Sequelize, Next.js, Turborepo", "Piattaforma per controllo accessi e visitatori con dati cifrati AES-256-GCM"), ("Libertarian Forum", "Next.js, Drizzle, Tiptap", "CMS bilingue con editor di articoli per un think tank"), ("ZadintsPage", "React 19, Vite, Tailwind CSS", "Sito marketing e dashboard per servizi di sviluppo")],
    },
}


def section_title(text, styles):
    return [Spacer(1, 7), Paragraph(text, styles["section"])]


def bullets(items, styles):
    return [Paragraph(f"• {item}", styles["bullet"]) for item in items]


def build_cv(language, cv):
    output = OUTPUT_DIR / f"curriculum-{language}.pdf"
    document = SimpleDocTemplate(str(output), pagesize=letter, leftMargin=0.36 * inch, rightMargin=0.36 * inch, topMargin=0.36 * inch, bottomMargin=0.34 * inch, title="Gustavo Colina CV", author="Gustavo Colina")
    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle("name", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=17, leading=19, textColor=colors.HexColor("#111827")),
        "contact": ParagraphStyle("contact", parent=base["Normal"], fontSize=8.4, leading=9.8, textColor=colors.HexColor("#374151")),
        "section": ParagraphStyle("section", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=11, leading=13, textColor=colors.HexColor("#111827"), spaceAfter=3),
        "body": ParagraphStyle("body", parent=base["Normal"], alignment=TA_LEFT, fontSize=8.7, leading=10.8, textColor=colors.HexColor("#1F2937")),
        "role": ParagraphStyle("role", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=9.4, leading=11, textColor=colors.HexColor("#111827")),
        "company": ParagraphStyle("company", parent=base["Normal"], fontSize=8.2, leading=9.8, textColor=colors.HexColor("#4B5563")),
        "bullet": ParagraphStyle("bullet", parent=base["Normal"], fontSize=8.1, leading=9.8, leftIndent=8, firstLineIndent=-7, textColor=colors.HexColor("#1F2937"), spaceAfter=1),
        "table": ParagraphStyle("table", parent=base["Normal"], fontSize=7.6, leading=9, textColor=colors.HexColor("#1F2937")),
        "table_head": ParagraphStyle("table_head", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=7.6, leading=9, textColor=colors.white),
    }
    story = [Paragraph("Gustavo Colina", styles["name"]), Spacer(1, 2), Paragraph(CONTACT, styles["contact"])]
    story += section_title(cv["profile_title"], styles)
    story.append(Paragraph(cv["profile"], styles["body"]))
    story += section_title(cv["experience_title"], styles)
    for role, company, items in cv["experience"]:
        story.extend([Paragraph(role, styles["role"]), Paragraph(company, styles["company"])])
        story.extend(bullets(items, styles))
        story.append(Spacer(1, 2))
    story += section_title(cv["skills_title"], styles)
    skills = [[Paragraph(f"<b>{label}</b>", styles["table"]), Paragraph(value, styles["table"])] for label, value in cv["skills"]]
    skills_table = Table(skills, colWidths=[1.28 * inch, PAGE_WIDTH - 1.28 * inch], hAlign="LEFT")
    skills_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.25, colors.HexColor("#D1D5DB")), ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3), ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))
    story.append(skills_table)
    story += section_title(cv["education_title"], styles)
    story.append(Paragraph(cv["education"].replace("\n", "<br/>"), styles["body"]))
    story += section_title(cv["certifications_title"], styles)
    story.append(Paragraph(cv["certifications"], styles["body"]))
    story.append(PageBreak())
    story += [Paragraph("Gustavo Colina", styles["name"]), Spacer(1, 2), Paragraph(CONTACT, styles["contact"])]
    story += section_title(cv["languages_title"], styles)
    language_rows = [[Paragraph(f"<b>{heading}</b>", styles["table_head"]) for heading in cv["language_headers"]]] + [[Paragraph(name, styles["table"]), Paragraph(level, styles["table"])] for name, level in cv["languages"]]
    language_table = Table(language_rows, colWidths=[2.2 * inch, PAGE_WIDTH - 2.2 * inch], hAlign="LEFT")
    language_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#111827")), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#D1D5DB")), ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3)]))
    story.append(language_table)
    story += section_title(cv["projects_title"], styles)
    projects = [[Paragraph(f"<b>{heading}</b>", styles["table_head"]) for heading in cv["project_headers"]]] + [[Paragraph(name, styles["table"]), Paragraph(technology, styles["table"]), Paragraph(description, styles["table"])] for name, technology, description in cv["projects"]]
    projects_table = Table(projects, colWidths=[1.13 * inch, 2.05 * inch, PAGE_WIDTH - 3.18 * inch], repeatRows=1, hAlign="LEFT")
    projects_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#111827")), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#D1D5DB")), ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3), ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))
    story.append(projects_table)
    document.build(story)


def annotate_spanish_cv():
    output = OUTPUT_DIR / "curriculum-es.pdf"
    reader = PdfReader(str(output))
    if "Graduación prevista: mediados de 2027" in "\n".join(page.extract_text() or "" for page in reader.pages):
        return

    overlay_buffer = BytesIO()
    overlay = canvas.Canvas(overlay_buffer, pagesize=letter)
    overlay.setFont("Helvetica", 7.5)
    overlay.setFillColor(colors.HexColor("#374151"))
    overlay.drawRightString(letter[0] - 0.36 * inch, letter[1] - 696, "Graduación prevista: mediados de 2027")
    overlay.save()

    overlay_buffer.seek(0)
    watermark = PdfReader(overlay_buffer).pages[0]
    reader.pages[0].merge_page(watermark)

    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)

    with output.open("wb") as file:
        writer.write(file)


if __name__ == "__main__":
    for language, cv in CVS.items():
        build_cv(language, cv)
        print(f"Generated curriculum-{language}.pdf")
    annotate_spanish_cv()
    print("Updated curriculum-es.pdf")
