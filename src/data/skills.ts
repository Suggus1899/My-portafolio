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
      { name: 'Astro' },
      { name: 'Tailwind CSS' },
      { name: 'React Flow' },
      { name: 'Vite' },
    ],
  },
  {
    titleKey: 'catBackend',
    skills: [
      { name: 'Go' },
      { name: 'Node.js' },
      { name: 'NestJS' },
      { name: 'Express' },
      { name: 'Java' },
      { name: 'Python' },
      { name: 'Spring Boot' },
      { name: 'Prisma' },
      { name: 'MongoDB' },
      { name: 'PostgreSQL' },
      { name: 'Docker' },
    ],
  },
  {
    titleKey: 'catSystems',
    skills: [
      { name: 'Flutter' },
      { name: 'Dart' },
      { name: 'Electron' },
      { name: 'SQLite' },
      { name: 'Chrome Extensions' },
    ],
  },
  {
    titleKey: 'catQA',
    skills: [
      { name: 'API Testing' },
      { name: 'Playwright' },
      { name: 'Vitest' },
      { name: 'Jest' },
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

