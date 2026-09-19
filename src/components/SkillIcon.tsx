'use client';

import { 
  SiHtml5, SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiTailwindcss, 
  SiJavascript, SiTypescript, SiFramer, SiNodedotjs, SiMongodb,
  SiPostgresql, SiVercel, SiAnthropic, SiCss,
  SiSpringboot, SiHibernate, SiOpenjdk,
  SiNestjs, SiPrisma, SiNginx,
  SiDocker, SiGithubactions, SiVite, SiLeaflet,
  SiRust, SiFlutter, SiDart,
  SiKotlin, SiElectron, SiTensorflow,
  SiGo, SiPhp, SiPython, SiVitest, SiJest, SiPostman
} from 'react-icons/si';
import { BsStars, BsRobot, BsCloud } from 'react-icons/bs';
import { Code2, Languages, Database, GitBranch, Layers, Cpu, Package, Server, ListChecks, TestTube2, Workflow, Repeat2 } from 'lucide-react';
import { AiFillOpenAI } from 'react-icons/ai';
import type { ReactNode } from 'react';

export function getSkillIcon(skillName: string): ReactNode {
  switch (skillName) {
    case 'HTML & CSS':
      return <div className="flex -space-x-1"><SiHtml5 className="text-[#E34F26]" /><SiCss className="text-[#1572B6]" /></div>;
    case 'JavaScript':
      return <SiJavascript className="text-[#F7DF1E]" />;
    case 'TypeScript':
      return <SiTypescript className="text-[#3178C6]" />;
    case 'React':
      return <SiReact className="text-[#61DAFB]" />;
    case 'Next.js':
      return <SiNextdotjs className="dark:invert" />;
    case 'Vue.js':
      return <SiVuedotjs className="text-[#4FC08D]" />;
    case 'Angular':
      return <SiAngular className="text-[#DD0031]" />;
    case 'Tailwind CSS':
      return <SiTailwindcss className="text-[#06B6D4]" />;
    case 'Framer Motion':
      return <SiFramer className="dark:invert" />;
    case 'shadcn/ui':
      return <Layers size={16} className="text-zinc-700 dark:text-zinc-300" />;
    case 'React Flow':
      return <GitBranch size={16} className="text-purple-500" />;
    case 'Zustand':
      return <Package size={16} className="text-orange-500" />;
    case 'React Query':
      return <Server size={16} className="text-[#FF4154]" />;
    case 'Vite':
      return <SiVite className="text-[#646CFF]" />;
    case 'Leaflet':
      return <SiLeaflet className="text-[#199900]" />;
    case 'Node.js':
      return <SiNodedotjs className="text-[#339933]" />;
    case 'NestJS':
      return <SiNestjs className="text-[#E0234E]" />;
    case 'Java':
      return <SiOpenjdk className="text-[#ea2d2e]" />;
    case 'Go':
      return <SiGo className="text-[#00ADD8]" />;
    case 'PHP':
      return <SiPhp className="text-[#777BB4]" />;
    case 'Python':
      return <SiPython className="text-[#3776AB]" />;
    case 'Spring Boot':
      return <SiSpringboot className="text-[#6db33f]" />;
    case 'Spring Security':
      return <SiSpringboot className="text-[#4f8f2f]" />;
    case 'Hibernate / JPA':
      return <SiHibernate className="text-[#59666C]" />;
    case 'Prisma':
      return <SiPrisma className="dark:invert" />;
    case 'MongoDB':
      return <SiMongodb className="text-[#47A248]" />;
    case 'PostgreSQL':
      return <SiPostgresql className="text-[#4169E1]" />;
    case 'Docker':
      return <SiDocker className="text-[#2496ED]" />;
    case 'GitHub Actions':
      return <SiGithubactions className="dark:invert" />;
    case 'Nginx':
      return <SiNginx className="text-[#009639]" />;
    case 'MinIO':
      return <Database size={16} className="text-[#C72E49]" />;
    case 'Swagger / OpenAPI':
      return <Database size={16} className="text-[#85EA2D]" />;
    case 'AWS':
      return <BsCloud className="text-[#232F3E] dark:invert" />;
    case 'Vercel':
      return <SiVercel className="dark:invert" />;
    case 'Rust':
      return <SiRust className="dark:invert" />;
    case 'C++':
      return <Cpu size={16} className="text-[#00599C]" />;
    case 'Flutter':
      return <SiFlutter className="text-[#02569B]" />;
    case 'Dart':
      return <SiDart className="text-[#0175C2]" />;
    case 'Kotlin':
      return <SiKotlin className="text-[#7F52FF]" />;
    case 'Electron':
      return <SiElectron className="text-[#47848F]" />;
    case 'TensorFlow':
      return <SiTensorflow className="text-[#FF6F00]" />;
    case 'Gemini':
      return <BsStars className="text-blue-500" />;
    case 'Claude Code':
      return <SiAnthropic className="text-[#D97757]" />;
    case 'ChatGPT':
      return <AiFillOpenAI className="text-zinc-900 dark:text-zinc-100" />;
    case 'Codex':
      return <Code2 size={16} className="text-zinc-900 dark:text-zinc-100" />;
    case 'Windsurf':
      return <BsRobot className="text-teal-500" />;
    case 'Gemini CLI':
      return <BsStars className="text-blue-400" />;
    case 'Test Case Design':
      return <ListChecks size={16} className="text-violet-500" />;
    case 'Functional Testing':
      return <TestTube2 size={16} className="text-emerald-500" />;
    case 'E2E Testing':
      return <Workflow size={16} className="text-blue-500" />;
    case 'Regression Testing':
      return <Repeat2 size={16} className="text-amber-500" />;
    case 'Playwright':
      return <TestTube2 size={16} className="text-orange-500" />;
    case 'Vitest':
      return <SiVitest className="text-[#FCC72B]" />;
    case 'Jest':
      return <SiJest className="text-[#C21325]" />;
    case 'API Testing':
      return <Workflow size={16} className="text-cyan-500" />;
    case 'Postman':
      return <SiPostman className="text-[#FF6C37]" />;
    case 'langSpanish':
    case 'langEnglish':
    case 'langFrench':
    case 'langItalian':
      return <Languages size={14} className="text-zinc-500" />;
    default:
      return null;
  }
}
