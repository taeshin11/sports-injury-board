import { useTranslations } from 'next-intl';
import { Activity } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#1c0010] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-[#be123c]" />
              <span className="font-bold text-lg">SportsInjuryBoard</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Real-time injury reports across NFL, NBA, MLB, and NHL. Updated every 30 minutes from official sources.
            </p>
          </div>

          {/* Sports links */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-300">Sports</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li><a href="/nfl" className="hover:text-white transition-colors">NFL Injury Report</a></li>
              <li><a href="/nba" className="hover:text-white transition-colors">NBA Injury Report</a></li>
              <li><a href="/mlb" className="hover:text-white transition-colors">MLB Injury Report</a></li>
              <li><a href="/nhl" className="hover:text-white transition-colors">NHL Injury Report</a></li>
              <li><a href="/fantasy" className="hover:text-white transition-colors">Fantasy Impact</a></li>
            </ul>
          </div>

          {/* Visitor counter */}
          <div className="text-right">
            <div id="visitor-counter" className="text-xs text-gray-400 space-y-1">
              <div>{t('todayVisits')}: —</div>
              <div>{t('totalVisits')}: —</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
