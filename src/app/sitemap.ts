import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { blogPosts } from '@/data/blogPosts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    urls.push(
      {
        url: `${siteUrl}/${locale}`,
        changeFrequency: 'weekly',
        priority: 1
      },
      {
        url: `${siteUrl}/${locale}/now`,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: `${siteUrl}/${locale}/blog`,
        changeFrequency: 'weekly',
        priority: 0.9
      }
    );

    for (const post of blogPosts) {
      urls.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        changeFrequency: 'monthly',
        priority: 0.7
      });
    }
  }

  return urls;
}
