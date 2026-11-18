'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { experiences } from '@/data/experience';
import { skillCategories } from '@/data/skills';
import type { ServiceCategory } from '@/types';
import { EMAIL, WHATSAPP_NUMBER } from '@/config/constants';
import { stackItems } from './FavoriteStackSection';
import ServicesSection from './ServicesSection';
import ContactSection from './ContactSection';

export type MagazinePage = { id: string; title: string; content: ReactNode };

function splitText(text: string, limit = 220): string[] {
  const chunks: string[] = [];
  let current = '';
  const sentences = text.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g) ?? [text];
  for (const sentence of sentences.map((item) => item.trim()).filter(Boolean)) {
    if (sentence.length <= limit) {
      if (current && current.length + sentence.length + 1 > limit) { chunks.push(current); current = ''; }
      current = current ? `${current} ${sentence}` : sentence;
      continue;
    }
    if (current) { chunks.push(current); current = ''; }
    const target = Math.ceil(sentence.length / Math.ceil(sentence.length / limit));
    for (const word of sentence.split(/\s+/)) {
      if (current && current.length + word.length + 1 > target) { chunks.push(current); current = ''; }
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

export function useMagazineChapters(projectPages: MagazinePage[]): MagazinePage[] {
  const profile = useTranslations('Curriculum');
  const experience = useTranslations('Experience');
  const education = useTranslations('Education');
  const stack = useTranslations('FavoriteStack');
  const skills = useTranslations('Skills');
  const services = useTranslations('Services');
  const availability = useTranslations('Availability');
  const contact = useTranslations('Contact');
  const now = useTranslations('Now');
  const privacy = useTranslations('Privacy');
  const categories = services.raw('categories') as ServiceCategory[];

  const career: MagazinePage[] = experiences.flatMap((item, index) => [
    ...splitText(experience(item.descriptionKey)).map((text, part) => ({
      id: index === 0 && part === 0 ? 'experience' : `experience-${index + 1}-part-${part + 1}`,
      title: experience(item.roleKey),
      content: <article><p className="magazine-page-kicker">{experience(item.periodKey)}</p><h2>{experience(item.roleKey)}</h2><h3>{experience(item.companyKey)}</h3><p>{text}</p></article>,
    })),
    { id: `experience-${index + 1}-achievements`, title: experience(item.roleKey), content: <article>
      <p className="magazine-page-kicker">{experience(item.companyKey)}</p><h2>{experience(item.roleKey)}</h2>
      <ul>{item.achievementsKeys.map((key) => <li key={key}>{experience(key)}</li>)}</ul>
      <p className="magazine-page-tags">{experience(item.technologiesKey)}</p>
      {item.roleKey === 'exp2Role' && <a href="?page=article-caso-de-estudio-logmaster">LogMaster ↗</a>}
    </article> },
  ]);

  const stackPages: MagazinePage[] = stackItems.map((item, part) => ({
    id: part === 0 ? 'favorite-stack' : `favorite-stack-${part + 1}`,
    title: stack('title'),
    content: <article><p className="magazine-page-kicker">{stack('subtitle')}</p><h2>{stack('title')}</h2>
      <section><h3>{item.name}</h3><p>{stack(item.detailKey)}</p></section>
    </article>,
  }));

  const skillPages: MagazinePage[] = skillCategories.map((category, index) => ({
    id: index === 0 ? 'skills' : `skills-${index + 1}`,
    title: skills(category.titleKey),
    content: <article><p className="magazine-page-kicker">{skills('title')}</p><h2>{skills(category.titleKey)}</h2>
      <ul className="magazine-page-skill-list">{category.skills.map((skill) => <li key={skill.name}>{skill.name.startsWith('lang') ? skills(skill.name) : skill.name}</li>)}</ul>
    </article>,
  }));

  const servicePages: MagazinePage[] = categories.flatMap((category) =>
    category.services.map((service) => ({
      id: `service-${category.id}-${service.id}`,
      title: category.name,
      content: <ServicesSection compact categoryId={category.id} serviceIds={[service.id]} />,
    }))
  );

  const nowGroups = [
    { title: 'buildingTitle', items: ['building1', 'building2', 'building3', 'building4'] },
    { title: 'learningTitle', items: ['learning1', 'learning2', 'learning3', 'learning4'] },
    { title: 'shippingTitle', items: ['shipping1', 'shipping2', 'shipping3'] },
    { title: 'nextTitle', items: ['next1', 'next2', 'next3'] },
  ];

  return [
    ...splitText(profile('summary')).map((text, part) => ({ id: part === 0 ? 'profile' : `profile-${part + 1}`, title: profile('pdfProfileTitle'), content: <article><p className="magazine-page-kicker">{profile('kicker')}</p><h2>{profile('title')}</h2><p>{text}</p></article> })),
    { id: 'profile-highlights', title: profile('pdfProfileTitle'), content: <article><p className="magazine-page-kicker">{profile('kicker')}</p><h2>{profile('pdfProfileTitle')}</h2><ul>{(['highlight1', 'highlight2', 'highlight3'] as const).map((key) => <li key={key}>{profile(key)}</li>)}</ul></article> },
    ...career,
    { id: 'education', title: education('university'), content: <article><p className="magazine-page-kicker">{education('title')}</p><h2>{education('university')}</h2><h3>{education('universityTitle')}</h3><p>{education('universitySubtitle')}</p><p>{education('universityEntity')}</p></article> },
    { id: 'certifications', title: education('certifications'), content: <article><p className="magazine-page-kicker">{education('title')}</p><h2>{education('certifications')}</h2>{(['DataScience', 'Java', 'Cisco'] as const).map((name) => <section key={name}><h3>{education(`cert${name}Title`)}</h3><p>{education(`cert${name}Entity`)}</p></section>)}</article> },
    ...stackPages,
    ...skillPages,
    ...projectPages,
    { id: 'services', title: services('title'), content: <article><h2>{services('title')}</h2><p>{services('subtitle')}</p><h3>{services('terms.infrastructureTitle')}</h3><p>{services('terms.providers')}</p><p>{services('terms.externalCosts')}</p></article> },
    ...servicePages,
    { id: 'now', title: now('title'), content: <article><p className="magazine-page-kicker">{now('kicker')}</p><h2>{now('title')}</h2><p>{now('intro')}</p><p>{now('currentFocus')}</p></article> },
    ...nowGroups.map((group, index) => ({ id: `now-${index + 1}`, title: now(group.title), content: <article><p className="magazine-page-kicker">{now('title')}</p><h2>{now(group.title)}</h2><ul>{group.items.map((item) => <li key={item}>{now(item)}</li>)}</ul></article> })),
    { id: 'availability', title: availability('title'), content: <article><p className="magazine-page-kicker">{availability('badge')}</p><h2>{availability('title')}</h2><p>{availability('description')}</p><dl>{(['modality', 'contract', 'timezone'] as const).map((key) => <div key={key}><dt>{availability(`${key}Label`)}</dt><dd>{availability(key)}</dd></div>)}</dl><p><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(availability('whatsappMessage'))}`} target="_blank" rel="noopener noreferrer">{availability('ctaWhatsapp')} ↗</a></p><p><a href={`mailto:${EMAIL}?subject=${encodeURIComponent(availability('emailSubject'))}`}>{availability('ctaEmail')} ↗</a></p></article> },
    { id: 'privacy', title: privacy('title'), content: <article><p className="magazine-page-kicker">{privacy('lastUpdated')}</p><h2>{privacy('title')}</h2><p>{privacy('intro')}</p><h3>{privacy('dataTitle')}</h3><ul><li>{privacy('dataForm')}</li><li>{privacy('dataAnalytics')}</li></ul></article> },
    { id: 'privacy-2', title: privacy('title'), content: <article><h2>{privacy('thirdPartiesTitle')}</h2><p>{privacy('thirdParties')}</p><h3>{privacy('rightsTitle')}</h3><p>{privacy('rights')}</p><h3>{privacy('contactTitle')}</h3><p>{privacy('contact')} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p></article> },
    { id: 'contact', title: contact('title'), content: <ContactSection compact /> },
  ];
}
