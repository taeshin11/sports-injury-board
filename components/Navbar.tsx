'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Activity, Search, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import injuriesData from '@/data/injuries-fallback.json';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ko', label: 'KO' },
  { code: 'ja', label: 'JA' },
  { code: 'zh', label: 'ZH' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'pt', label: 'PT' },
];

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof injuriesData>([]);
  const [showSearch, setShowSearch] = useState(false);

  const basePath = locale === 'en' ? '' : `/${locale}`;

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.length < 2) {
      setSearchResults([]);
      return;
    }
    const results = injuriesData
      .filter(p => p.playerName.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 6);
    setSearchResults(results);
  };

  const handleSelectPlayer = (slug: string) => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
    router.push(`${basePath}/players/${slug}`);
  };

  return (
    <nav className="bg-white border-b border-rose-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`${basePath}/`} className="flex items-center gap-2 font-bold text-xl text-[#1c0010]">
            <Activity className="w-6 h-6 text-[#be123c]" />
            <span>SportsInjuryBoard</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href={`${basePath}/`} className="hover:text-[#be123c] transition-colors">{t('home')}</Link>
            <Link href={`${basePath}/nfl`} className="hover:text-[#be123c] transition-colors">NFL</Link>
            <Link href={`${basePath}/nba`} className="hover:text-[#be123c] transition-colors">NBA</Link>
            <Link href={`${basePath}/mlb`} className="hover:text-[#be123c] transition-colors">MLB</Link>
            <Link href={`${basePath}/nhl`} className="hover:text-[#be123c] transition-colors">NHL</Link>
            <Link href={`${basePath}/fantasy`} className="hover:text-[#be123c] transition-colors">{t('fantasy')}</Link>
          </div>

          {/* Search + locale */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg text-gray-500 hover:text-[#be123c] hover:bg-rose-50 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              {showSearch && (
                <div className="absolute right-0 top-10 w-72 bg-white rounded-xl shadow-lg border border-rose-100 p-2 z-50">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => handleSearch(e.target.value)}
                    placeholder={t('search')}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be123c]/30"
                  />
                  {searchResults.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {searchResults.map(p => (
                        <li key={p.id}>
                          <button
                            onClick={() => handleSelectPlayer(p.slug)}
                            className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-rose-50 flex items-center justify-between"
                          >
                            <span className="font-medium text-[#1c0010]">{p.playerName}</span>
                            <span className="text-xs text-gray-400">{p.sport} · {p.team}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Language switcher */}
            <select
              value={locale}
              onChange={e => router.push(`/${e.target.value}`)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#be123c]/30 bg-white text-gray-700"
            >
              {LOCALES.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-[#be123c]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-rose-50 space-y-2">
            {[
              { href: `${basePath}/`, label: t('home') },
              { href: `${basePath}/nfl`, label: 'NFL' },
              { href: `${basePath}/nba`, label: 'NBA' },
              { href: `${basePath}/mlb`, label: 'MLB' },
              { href: `${basePath}/nhl`, label: 'NHL' },
              { href: `${basePath}/fantasy`, label: t('fantasy') },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-[#be123c]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 px-3">
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder={t('search')}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be123c]/30"
              />
              {searchResults.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {searchResults.map(p => (
                    <li key={p.id}>
                      <button
                        onClick={() => handleSelectPlayer(p.slug)}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-rose-50"
                      >
                        {p.playerName} — {p.sport}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
