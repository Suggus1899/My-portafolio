import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { blogPosts } from '@/data/blogPosts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gustavocolina.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of routing.locales) {
    // Página principal - máxima prioridad
    urls.push({
      url: `${siteUrl}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    });

    // Páginas de sección principales
    urls.push(
      {
        url: `${siteUrl}/${locale}/now`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: `${siteUrl}/${locale}/blog`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9
      },
      {
        url: `${siteUrl}/${locale}/projects`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9
      },
      {
        url: `${siteUrl}/${locale}/services`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7
      },
      {
        url: `${siteUrl}/${locale}/privacy`,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.3
      }
    );

    // Posts del blog
    for (const post of blogPosts) {
      urls.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7
      });
    }
  }

  return urls;
}
