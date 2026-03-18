import { useTranslations } from 'next-intl';
import { 
  SiHtml5, SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiTailwindcss, 
  SiJavascript, SiTypescript, SiFramer, SiNodedotjs, SiExpress, SiMongodb, 
  SiPostgresql, SiVercel, SiAnthropic, SiGithubcopilot, SiCss, SiMysql,
  SiSpringboot, SiHibernate, SiApachemaven, SiOpenjdk
} from 'react-icons/si';
import { BsStars, BsRobot, BsCloud } from 'react-icons/bs';
import { Languages, Database } from 'lucide-react';

export default function SkillsSection() {
  const t = useTranslations('Skills');

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML & CSS', icon: <div className="flex -space-x-1"><SiHtml5 className="text-[#E34F26]" /><SiCss className="text-[#1572B6]" /></div> },
        { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" /> },
        { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: 'React', icon: <SiReact className="text-[#61DAFB]" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="dark:invert" /> },
        { name: 'Vue.js', icon: <SiVuedotjs className="text-[#4FC08D]" /> },
        { name: 'Angular', icon: <SiAngular className="text-[#DD0031]" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: 'Framer Motion', icon: <SiFramer className="dark:invert" /> },
      ],
    },
    {
      title: 'Backend & Cloud',
      skills: [
        { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933]" /> },
        { name: 'Express', icon: <SiExpress className="dark:invert" /> },
        { name: 'Java', icon: <SiOpenjdk className="text-[#ea2d2e]" /> },
        { name: 'Spring Boot', icon: <SiSpringboot className="text-[#6db33f]" /> },
        { name: 'Spring Security', icon: <SiSpringboot className="text-[#4f8f2f]" /> },
        { name: 'Hibernate / JPA', icon: <SiHibernate className="text-[#59666C]" /> },
        { name: 'Maven', icon: <SiApachemaven className="text-[#C71A36]" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#4169E1]" /> },
        { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
        { name: 'SQLite', icon: <Database size={16} className="text-zinc-600 dark:text-zinc-300" /> },
        { name: 'AWS', icon: <BsCloud className="text-[#232F3E] dark:invert" /> },
        { name: 'Vercel', icon: <SiVercel className="dark:invert" /> },
      ],
    },
    {
      title: 'AI Engineering & Tools',
      skills: [
        { name: 'Gemini', icon: <BsStars className="text-blue-500" /> },
        { name: 'Claude Code', icon: <SiAnthropic className="text-[#D97757]" /> },
        { name: 'Copilot Pro', icon: <SiGithubcopilot className="text-black dark:text-white" /> },
        { name: 'Windsurf', icon: <BsRobot className="text-teal-500" /> },
        { name: 'Gemini CLI', icon: <BsStars className="text-blue-400" /> },
        { name: 'Copilot CLI', icon: <SiGithubcopilot className="text-black dark:text-gray-300" /> },
      ],
    },
    {
      title: 'Languages (Spoken)',
      skills: [
        { name: 'Spanish (Native)', icon: <Languages size={14} className="text-zinc-500" /> },
        { name: 'English', icon: <Languages size={14} className="text-zinc-500" /> },
        { name: 'French', icon: <Languages size={14} className="text-zinc-500" /> },
        { name: 'Italian', icon: <Languages size={14} className="text-zinc-500" /> },
      ],
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 max-w-4xl mx-auto mb-24 w-full">
      <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight">{t('title')}</h2>
      <div className="mb-10 h-[2px] w-36 bg-zinc-900/85 dark:bg-zinc-100/85" />
      
      <div className="space-y-12 w-full">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-8 border-2 border-zinc-900 dark:border-zinc-100 p-6 bg-white/95 dark:bg-zinc-950/95">
            <h3 className="md:w-1/4 font-space font-black uppercase text-zinc-900 dark:text-zinc-100">
              {category.title}
            </h3>
            <div className="md:w-3/4 flex flex-wrap gap-3">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-sm font-medium border border-zinc-900 dark:border-zinc-100 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-lg flex items-center">{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
