import { MetadataRoute } from 'next';
import { allInjuries, allTeams } from '@/lib/data';

const BASE_URL = 'https://sports-injury-board.vercel.app';
const LOCALES = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const SPORTS = ['nfl', 'nba', 'mlb', 'nhl'];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Homepage
  for (const locale of LOCALES) {
    urls.push({
      url: locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    });
  }

  // Sport pages
  for (const sport of SPORTS) {
    for (const locale of LOCALES) {
      const localePath = locale === 'en' ? '' : `/${locale}`;
      urls.push({
        url: `${BASE_URL}${localePath}/${sport}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9,
      });
    }
  }

  // Fantasy page
  for (const locale of LOCALES) {
    const localePath = locale === 'en' ? '' : `/${locale}`;
    urls.push({
      url: `${BASE_URL}${localePath}/fantasy`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    });
  }

  // Content pages
  const contentPages = ['about', 'how-to-use', 'privacy', 'terms'];
  for (const page of contentPages) {
    for (const locale of LOCALES) {
      const localePath = locale === 'en' ? '' : `/${locale}`;
      urls.push({
        url: `${BASE_URL}${localePath}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  // Player pages
  for (const player of allInjuries) {
    urls.push({
      url: `${BASE_URL}/players/${player.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    });
  }

  // Team pages
  for (const [sport, teams] of Object.entries(allTeams)) {
    for (const team of teams) {
      urls.push({
        url: `${BASE_URL}/teams/${sport.toLowerCase()}/${team.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      });
    }
  }

  return urls;
}
