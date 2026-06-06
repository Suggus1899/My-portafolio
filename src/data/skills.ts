export type Skill = {
  name: string;
};

export type SkillCategory = {
  titleKey: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    titleKey: 'catFrontend',
    skills: [
      { name: 'HTML & CSS' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Vue.js' },
      { name: 'Angular' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'shadcn/ui' },
      { name: 'React Flow' },
      { name: 'Zustand' },
      { name: 'React Query' },
      { name: 'Vite' },
      { name: 'Leaflet' },
    ],
  },
  {
    titleKey: 'catBackend',
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'NestJS' },
      { name: 'Java' },
      { name: 'Spring Boot' },
      { name: 'Spring Security' },
      { name: 'Hibernate / JPA' },
      { name: 'Maven' },
      { name: 'Prisma' },
      { name: 'Sequelize' },
      { name: 'MongoDB' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'SQLite' },
      { name: 'Redis / BullMQ' },
      { name: 'Socket.io' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'Nginx' },
      { name: 'MinIO' },
      { name: 'Swagger / OpenAPI' },
      { name: 'AWS' },
      { name: 'Vercel' },
    ],
  },
  {
    titleKey: 'catSystems',
    skills: [
      { name: 'Rust' },
      { name: 'C++' },
      { name: 'Flutter' },
      { name: 'Dart' },
      { name: 'Kotlin' },
      { name: 'Electron' },
      { name: 'TensorFlow' },
    ],
  },
  {
    titleKey: 'catAI',
    skills: [
      { name: 'Gemini' },
      { name: 'Claude Code' },
      { name: 'Copilot Pro' },
      { name: 'Windsurf' },
      { name: 'Gemini CLI' },
      { name: 'Copilot CLI' },
    ],
  },
  {
    titleKey: 'catLanguages',
    skills: [
      { name: 'langSpanish' },
      { name: 'langEnglish' },
      { name: 'langFrench' },
      { name: 'langItalian' },
    ],
  },
];

