import injuriesData from '../data/injuries-fallback.json';
import teamsData from '../data/teams-fallback.json';
import sportsData from '../data/sports-fallback.json';

export type InjuryStatus = 'Out' | 'Questionable' | 'Probable' | 'Day-to-Day' | 'IR' | 'Healthy';
export type FantasyImpact = 'High' | 'Medium' | 'Low';
export type Sport = 'NFL' | 'NBA' | 'MLB' | 'NHL';

export interface Player {
  id: string;
  playerName: string;
  slug: string;
  team: string;
  teamSlug: string;
  sport: Sport;
  position: string;
  injury: string | null;
  status: InjuryStatus;
  returnDate: string | null;
  fantasyImpact: FantasyImpact;
  lastUpdated: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  sport: Sport;
  city: string;
  abbreviation: string;
}

export interface SportMeta {
  id: string;
  name: string;
  fullName: string;
  sport: string;
  season: { start: string; end: string };
  color: string;
  icon: string;
}

export const allInjuries: Player[] = injuriesData as Player[];
export const allTeams: Record<Sport, Team[]> = teamsData as Record<Sport, Team[]>;
export const allSports: SportMeta[] = sportsData as SportMeta[];

export function getInjuriesBySport(sport: Sport): Player[] {
  return allInjuries.filter(p => p.sport === sport);
}

export function getPlayerBySlug(slug: string): Player | undefined {
  return allInjuries.find(p => p.slug === slug);
}

export function getTeamBySportAndSlug(sport: Sport, slug: string): Team | undefined {
  return (allTeams[sport] || []).find(t => t.slug === slug);
}

export function getPlayersByTeam(sport: Sport, teamSlug: string): Player[] {
  return allInjuries.filter(p => p.sport === sport && p.teamSlug === teamSlug);
}

export function getAllSlugs(): { sport: string; slug: string }[] {
  return allInjuries.map(p => ({ sport: p.sport.toLowerCase(), slug: p.slug }));
}

export function isInSeason(sport: SportMeta): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const mmdd = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const { start, end } = sport.season;
  if (start <= end) {
    return mmdd >= start && mmdd <= end;
  }
  return mmdd >= start || mmdd <= end;
}

export function getSportMeta(sportId: string): SportMeta | undefined {
  return allSports.find(s => s.id === sportId.toLowerCase());
}

export const SPORT_COLORS: Record<Sport, string> = {
  NFL: '#0B6623',
  NBA: '#C9082A',
  MLB: '#002D72',
  NHL: '#00539B'
};
