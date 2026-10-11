import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { blogPosts } from '@/data/blogPosts';
import { SITE_URL } from '@/config/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of routing.locales) {
    // Página principal - máxima prioridad
    urls.push({
      url: `${SITE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    });

    // Páginas de sección principales
    urls.push(
      {
        url: `${SITE_URL}/${locale}/now`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: `${SITE_URL}/${locale}/blog`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9
      },
      {
        url: `${SITE_URL}/${locale}/projects`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9
      },
      {
        url: `${SITE_URL}/${locale}/services`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7
      },
      {
        url: `${SITE_URL}/${locale}/privacy`,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.3
      }
    );

    // Posts del blog
    for (const post of blogPosts) {
      urls.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7
      });
    }
  }

  return urls;
}
