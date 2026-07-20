'use client';

import { 
  SiHtml5, SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiTailwindcss, 
  SiJavascript, SiTypescript, SiFramer, SiNodedotjs, SiExpress, SiMongodb, 
  SiPostgresql, SiVercel, SiAnthropic, SiGithubcopilot, SiCss, SiMysql,
  SiSpringboot, SiHibernate, SiApachemaven, SiOpenjdk,
  SiNestjs, SiPrisma, SiSequelize, SiRedis, SiSocketdotio, SiNginx,
  SiDocker, SiGithubactions, SiVite, SiLeaflet,
  SiRust, SiFlutter, SiDart,
  SiKotlin, SiElectron, SiTensorflow,
  SiGo, SiPhp, SiPython
} from 'react-icons/si';
import { BsStars, BsRobot, BsCloud } from 'react-icons/bs';
import { Languages, Database, GitBranch, Layers, Cpu, Package, Server } from 'lucide-react';
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
    case 'Express':
      return <SiExpress className="dark:invert" />;
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
    case 'Maven':
      return <SiApachemaven className="text-[#C71A36]" />;
    case 'Prisma':
      return <SiPrisma className="dark:invert" />;
    case 'Sequelize':
      return <SiSequelize className="text-[#52B0E7]" />;
    case 'MongoDB':
      return <SiMongodb className="text-[#47A248]" />;
    case 'PostgreSQL':
      return <SiPostgresql className="text-[#4169E1]" />;
    case 'MySQL':
      return <SiMysql className="text-[#4479A1]" />;
    case 'SQLite':
      return <Database size={16} className="text-zinc-600 dark:text-zinc-300" />;
    case 'Redis / BullMQ':
      return <SiRedis className="text-[#DC382D]" />;
    case 'Socket.io':
      return <SiSocketdotio className="dark:invert" />;
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
    case 'Copilot Pro':
      return <SiGithubcopilot className="text-black dark:text-white" />;
    case 'Windsurf':
      return <BsRobot className="text-teal-500" />;
    case 'Gemini CLI':
      return <BsStars className="text-blue-400" />;
    case 'Copilot CLI':
      return <SiGithubcopilot className="text-black dark:text-gray-300" />;
    case 'langSpanish':
    case 'langEnglish':
    case 'langFrench':
    case 'langItalian':
      return <Languages size={14} className="text-zinc-500" />;
    default:
      return null;
  }
}
