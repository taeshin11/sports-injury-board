# SportsInjuryBoard — PRD

## Overview

SportsInjuryBoard is a multi-sport injury report and projected lineup dashboard covering NFL, NBA, MLB, and NHL. It surfaces player injury status, expected return dates, fantasy impact ratings, and projected starting lineups. Target queries include "NBA injury report today", "Patrick Mahomes injury status", "fantasy football waiver wire injuries", and "NHL starting lineup tonight". Data is sourced from ESPN public API unofficial endpoints and static fallback JSONs, refreshed multiple times daily via GitHub Actions.

## Target Users & Pain Points

- **Fantasy sports players** checking injury status before making lineup decisions
- **Sports bettors** checking injury news before placing bets (informational only)
- **Sports fans** wanting a clean aggregated injury dashboard vs hunting through ESPN
- **Beat reporters** wanting a quick reference dashboard

Pain points:
- ESPN injury pages are cluttered with ads and hard to filter across sports
- No free tool aggregates NFL + NBA + MLB + NHL injuries in one dashboard
- Fantasy apps (Yahoo, ESPN) don't surface injury impact ratings clearly
- Hard to find projected lineups for tonight's games without an account

## Core Features

### F01 — Multi-Sport Injury Dashboard (Homepage)
- Tab switcher: NFL | NBA | MLB | NHL
- Current injury report: player name, team, injury type, status (Out / Questionable / Doubtful / Day-to-Day / IR)
- Game indicator: "Game today?" badge if player's team plays tonight
- Fantasy impact: color-coded (High / Medium / Low / N/A)
- Filter: by team, status, position
- "Last updated" timestamp per sport

### F02 — Team Page `/teams/[sport]/[team-slug]`
- Full injury report for that team
- Projected starting lineup for next game
- Recent injury history (last 30 days)
- Team injury trend: "injury-heavy" vs "healthy" relative to league average
- Schema.org `SportsTeam` markup

### F03 — Player Page `/players/[sport]/[player-slug]`
- Current injury status and description
- Injury history timeline (all recorded injuries)
- Fantasy impact statement (pre-written per status category)
- Similar players to stream (static suggestion based on position + team)
- Schema.org `Person` + `SportsEvent` markup

### F04 — Games by Date `/games/[date]`
- All games on a given date across all sports
- Per game: injury report summary (X Out, Y Questionable), projected starters
- Sport filter tabs
- Useful for "games tonight injury report" queries

### F05 — Search
- Player or team name search (client-side, debounced)
- Autocomplete from loaded JSON index
- Navigates to `/players/[sport]/[player-slug]` or `/teams/[sport]/[team-slug]`

### F06 — Fantasy Impact Ratings
- Each injured player rated: `High` (starter, no replacement) / `Medium` (flex-worthy) / `Low` (bench/IR player) / `N/A`
- Rating logic: if status is "Out" or "IR" → check if player averages top-24 at position → High
- Pre-computed at build time from ESPN player stats endpoint

### F07 — Data Pipeline
- **Primary**: ESPN public API (unofficial but stable since ~2015)
  - Injuries: `https://site.api.espn.com/apis/site/v2/sports/{sport}/injuries`
  - Scoreboard: `https://site.api.espn.com/apis/site/v2/sports/{sport}/scoreboard`
  - Roster/lineup: `https://site.api.espn.com/apis/site/v2/sports/{sport}/teams/{teamId}/roster`
- **Schedule**: ESPN schedule endpoint per sport
- **Fallback**: Static `public/data/{sport}/injuries.json` cached from last successful fetch
- GitHub Actions: refresh every 2 hours for in-season sports (08:00–22:00 UTC)
- ISR: `revalidate: 1800` (30 minutes) on injury/game pages

### F08 — Sport Detection & Season Awareness
- Determine active seasons per sport based on date (precomputed `seasons.json`)
- NFL: Sep–Feb; NBA: Oct–Jun; MLB: Mar–Oct; NHL: Oct–Jun
- Off-season pages: "NBA offseason — check back in October" friendly message
- Still serve static historical injury data for SEO during offseason

### F09 — Visitor Counter
- Upstash Redis: `sportsinjuryboard:visits:total`, `sportsinjuryboard:visits:YYYY-MM-DD`
- `/api/visits` route
- Footer: "Today: X | Total: Y"

### F10 — Google Sheets Webhook
- Events: `sport_tab`, `team_view`, `player_view`, `date_view`, `search`, `filter_apply`
- Payload: `{ event, sport, team?, player?, date?, timestamp, lang }`
- Fire-and-forget

### F11 — i18n (8 Languages)
- next-intl, locale prefix routing
- All UI labels translated
- Languages: en, ko, ja, zh, es, fr, de, pt
- hreflang on all pages

### F12 — Adsterra Ad Slots
- Social Bar in `<head>` (TODO placeholder)
- Native Banner below hero dashboard tabs
- Display Banner mid-page on team/player detail pages

### F13 — Research History Logging
- `research_history/` folder, milestone logs after each milestone

## Tech Stack

- **Framework**: Next.js 14 (App Router, ISR with `revalidate: 1800`)
- **Styling**: Tailwind CSS v3
- **Charts**: Chart.js v4 via `react-chartjs-2` (injury history timeline, team comparison)
- **i18n**: next-intl
- **Data**: ESPN public API (unofficial), static JSON fallback
- **Caching/Visits**: Upstash Redis free tier
- **Hosting**: Vercel free tier
- **Repo**: GitHub → `taeshin11/sports-injury-board`
- **CI**: GitHub Actions (every 2 hours in-season, daily offseason)

## Data Sources (Free Only)

| Source | Endpoint | Rate Limit | Notes |
|--------|---------|------------|-------|
| ESPN NFL | `site.api.espn.com/apis/site/v2/sports/football/nfl/injuries` | None stated | Public, no auth |
| ESPN NBA | `site.api.espn.com/apis/site/v2/sports/basketball/nba/injuries` | None stated | Public, no auth |
| ESPN MLB | `site.api.espn.com/apis/site/v2/sports/baseball/mlb/injuries` | None stated | Public, no auth |
| ESPN NHL | `site.api.espn.com/apis/site/v2/sports/hockey/nhl/injuries` | None stated | Public, no auth |
| ESPN Scoreboard | `site.api.espn.com/apis/site/v2/sports/{sport}/scoreboard` | None stated | Today's games |
| ESPN Roster | `site.api.espn.com/apis/site/v2/sports/{sport}/teams/{id}/roster` | None stated | Projected lineups |
| ESPN Athletes | `site.api.espn.com/apis/site/v2/sports/{sport}/athletes/{id}` | None stated | Player profiles |

### ESPN API Notes
- All endpoints return JSON without authentication
- Rate limit not officially stated; respect with 1 req/sec in scripts
- Add `User-Agent: Mozilla/5.0` header to avoid 403s
- Cache all responses — do not call live from Next.js server functions; use pre-fetched JSON

## Page Structure & SEO

```
/                                          → Homepage (ISR, revalidate 1800)
/teams/[sport]/[team-slug]                 → Team injuries + lineup (ISR, revalidate 1800)
/players/[sport]/[player-slug]             → Player injury detail (ISR, revalidate 1800)
/games/[date]                              → Games by date (ISR, revalidate 1800)
/sitemap.xml                               → Auto-generated
/robots.txt                                → Static
```

### Meta Tag Templates

**Homepage:**
```
title: "NFL NBA MLB NHL Injury Report Today — Live Updates | SportsInjuryBoard"
description: "Live injury report across NFL, NBA, MLB, and NHL. Updated every 30 minutes. See who's out, questionable, and today's projected starters."
```

**Team page:**
```
title: "{Team} Injury Report Today — {Sport} Lineup & Status | SportsInjuryBoard"
description: "{Team} current injuries: {N} players listed. Projected starters for {nextGame}. Updated {timestamp}."
```

**Player page:**
```
title: "{Player} Injury Status — {Sport} | SportsInjuryBoard"
description: "{Player} is currently {status} with {injury}. Fantasy impact: {impact}. Expected return: {return}."
```

**Date page:**
```
title: "{Sport} Games on {Date} — Injury Reports & Lineups | SportsInjuryBoard"
description: "{N} {sport} games on {date}. See injury reports and projected starters for all matchups."
```

### Schema.org

**Team page:**
```json
{
  "@type": "SportsTeam",
  "name": "Los Angeles Lakers",
  "sport": "Basketball",
  "memberOf": {
    "@type": "SportsOrganization",
    "name": "NBA"
  }
}
```

**Player page:**
```json
{
  "@type": "Person",
  "name": "LeBron James",
  "jobTitle": "Professional Basketball Player",
  "memberOf": {
    "@type": "SportsTeam",
    "name": "Los Angeles Lakers"
  }
}
```

## UI/UX Guidelines

- **Color palette**: Soft lavender/purple background `#FAF5FF`, white cards, violet accents `#7C3AED`
- **Sport tab accents**:
  - NFL: `#0B6623` (dark green)
  - NBA: `#C9082A` (NBA red)
  - MLB: `#002D72` (navy blue)
  - NHL: `#00539B` (NHL blue)
- **Status badges**:
  - Out: `bg-red-100 text-red-800`
  - Questionable: `bg-amber-100 text-amber-800`
  - Doubtful: `bg-orange-100 text-orange-800`
  - Day-to-Day: `bg-yellow-100 text-yellow-800`
  - IR: `bg-red-200 text-red-900`
  - Active: `bg-emerald-100 text-emerald-800`
- **Fantasy impact badges**:
  - High: pulsing red dot + "High Impact"
  - Medium: amber dot + "Medium Impact"
  - Low: gray dot + "Low Impact"
- **Font**: Inter (Google Fonts, self-hosted)
- **Sport tabs**: Sticky below header, scrollable on mobile
- **Cards**: Rounded-xl, subtle border-l-4 colored by status
- **Mobile-first**: Single column on mobile, 2-col on md+, 3-col on xl+
- **Game today badge**: pulsing green dot on player/team cards when game is today
- **Loading**: Skeleton shimmer per card row

## i18n Requirements

### Translation Keys (minimum required)
- `nav.home`, `nav.teams`, `nav.players`, `nav.games`, `nav.search`
- `hero.title`, `hero.subtitle`, `hero.lastUpdated`
- `sport.nfl`, `sport.nba`, `sport.mlb`, `sport.nhl`
- `status.out`, `status.questionable`, `status.doubtful`, `status.dayToDay`, `status.ir`, `status.active`
- `impact.high`, `impact.medium`, `impact.low`, `impact.na`
- `player.currentStatus`, `player.injuryHistory`, `player.fantasyImpact`, `player.expectedReturn`
- `team.injuryReport`, `team.projectedLineup`, `team.nextGame`, `team.injuryTrend`
- `games.today`, `games.bmo`, `games.injurySummary`, `games.projectedStarters`
- `filter.team`, `filter.status`, `filter.position`, `filter.clear`
- `footer.todayVisits`, `footer.totalVisits`, `footer.copyright`
- `common.loading`, `common.noData`, `common.gameToday`, `common.updated`, `common.offseason`

### hreflang
```html
<link rel="alternate" hreflang="en" href="https://sportsinjuryboard.com/" />
<link rel="alternate" hreflang="ko" href="https://sportsinjuryboard.com/ko/" />
<!-- all 8 + x-default -->
```

## Ad Integration (Adsterra)

### Social Bar (`<head>`)
```html
<!-- TODO: Adsterra Social Bar — insert script tag when key is available -->
<!-- <script async src="//ADSTERRA_SOCIAL_BAR_URL"></script> -->
```

### Native Banner (below sport tab switcher)
```html
<!-- TODO: Adsterra Native Banner -->
<div id="adsterra-native-banner" class="w-full my-4 min-h-[90px] rounded-xl bg-gray-50">
  <!-- Native Banner Ad Placeholder -->
</div>
```

### Display Banner (mid-page, after first 6 injury cards)
```html
<!-- TODO: Adsterra Display Banner (728x90 / 320x50 mobile) -->
<div id="adsterra-display-banner" class="flex justify-center my-6">
  <!-- Display Banner Ad Placeholder -->
</div>
```

## Google Sheets Webhook

### Sheet: "SportsInjuryBoard Analytics"
Columns: `timestamp | event | sport | team | player | date | lang | path`

### Events Tracked
| Event | Trigger |
|-------|---------|
| `sport_tab` | Switching between NFL/NBA/MLB/NHL tabs |
| `team_view` | Team page load |
| `player_view` | Player page load |
| `date_view` | Games by date page load |
| `search` | Search submitted |
| `filter_apply` | Filter chip clicked |

## Visitor Counter

- **Keys**: `sportsinjuryboard:visits:total`, `sportsinjuryboard:visits:YYYY-MM-DD`
- **Route**: `GET /api/visits`
- **Footer**: Bottom-right, "Today: 1,204 | Total: 88,312", `text-xs text-gray-400`

## Milestones

### M1 — Scaffold & Data Pipeline
**Tasks:**
1. `init.sh`: scaffold Next.js 14, install deps
2. Write `scripts/fetch-espn.js` — fetch all 4 sports injury feeds → `public/data/{sport}/injuries.json`
3. Write `scripts/fetch-scoreboard.js` — today's games per sport
4. Create `seasons.json` — active season date ranges
5. Create `feature_list.json`, `claude-progress.txt`
6. `gh repo create taeshin11/sports-injury-board --public`
7. Initial commit + push
8. Log `research_history/milestone-M1.md`

**Commit:** `M1: scaffold, ESPN API data pipeline, seed data`

### M2 — Homepage Dashboard & UI
**Tasks:**
1. Tailwind lavender/violet theme, sport color tokens
2. Homepage: sport tab switcher, injury card grid, status badges, fantasy impact badges
3. Filter chips: team, status, position
4. "Game today" badge (computed from scoreboard)
5. Sticky header + search bar, Adsterra placeholders
6. Footer with visitor counter placeholder
7. Commit + push

**Commit:** `M2: homepage dashboard, tabs, status badges, filters`

### M3 — Team Pages
**Tasks:**
1. `/teams/[sport]/[team-slug]`: full injury report, projected lineup section, recent history
2. `generateStaticParams` for all teams (32 NFL, 30 NBA, 30 MLB, 32 NHL)
3. Schema.org SportsTeam markup
4. Open Graph meta
5. Commit + push

**Commit:** `M3: team pages, projected lineups, schema.org, OG meta`

### M4 — Player Pages & Date Pages
**Tasks:**
1. `/players/[sport]/[player-slug]`: injury detail, history timeline, fantasy impact, similar players
2. `/games/[date]`: all games grouped by sport, injury summary per game
3. `generateStaticParams` for top 500 players per sport + next 60 dates
4. Schema.org Person markup
5. hreflang alternate links
6. i18n scaffold (next-intl + 8 locale JSON stubs)
7. Commit + push

**Commit:** `M4: player pages, date pages, hreflang, i18n scaffold`

### M5 — Visitor Counter, Webhook, Sitemap
**Tasks:**
1. Upstash Redis `/api/visits`
2. Google Sheets analytics webhook
3. `app/sitemap.ts` auto-generation
4. `/robots.txt`
5. Commit + push

**Commit:** `M5: visitor counter, analytics webhook, sitemap`

### M6 — Full i18n & SEO Polish
**Tasks:**
1. Complete translations all 8 languages
2. Language switcher in header
3. Offseason handling (friendly messages + static historical data)
4. Lighthouse ≥ 90 audit
5. Commit + push

**Commit:** `M6: full i18n, SEO polish, offseason handling`

### M7 — Deploy & GitHub Actions
**Tasks:**
1. `npx vercel --prod`
2. GitHub Actions: refresh every 2 hours during in-season (cron `0 8-22/2 * * *`), daily offseason
3. Set Vercel env vars: `UPSTASH_REDIS_REST_URL`, `NEXT_PUBLIC_WEBHOOK_URL`
4. Verify production renders all sports
5. Final commit + push
6. Log `research_history/milestone-M7.md`

**Commit:** `M7: production deploy, GitHub Actions 2h refresh`

## File Structure

```
sports-injury-board/
├── init.sh
├── feature_list.json
├── claude-progress.txt
├── research_history/
│   └── milestone-M1.md
├── scripts/
│   ├── fetch-espn.js              # ESPN injury feed fetcher (all 4 sports)
│   ├── fetch-scoreboard.js        # Today's games
│   ├── fetch-rosters.js           # Projected lineups
│   └── validate-data.js
├── public/
│   └── data/
│       ├── seasons.json           # Active season date ranges
│       ├── nfl/
│       │   ├── injuries.json
│       │   ├── teams.json
│       │   ├── players.json
│       │   └── scoreboard.json
│       ├── nba/
│       │   ├── injuries.json
│       │   ├── teams.json
│       │   ├── players.json
│       │   └── scoreboard.json
│       ├── mlb/
│       │   ├── injuries.json
│       │   ├── teams.json
│       │   ├── players.json
│       │   └── scoreboard.json
│       └── nhl/
│           ├── injuries.json
│           ├── teams.json
│           ├── players.json
│           └── scoreboard.json
├── messages/
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   ├── zh.json
│   ├── es.json
│   ├── fr.json
│   ├── de.json
│   └── pt.json
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Homepage multi-sport dashboard
│   │   ├── teams/[sport]/[team-slug]/page.tsx
│   │   ├── players/[sport]/[player-slug]/page.tsx
│   │   └── games/[date]/page.tsx
│   ├── api/
│   │   └── visits/route.ts
│   └── sitemap.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SportTabs.tsx
│   ├── InjuryFeed.tsx
│   ├── InjuryCard.tsx
│   ├── StatusBadge.tsx
│   ├── FantasyImpactBadge.tsx
│   ├── GameTodayBadge.tsx
│   ├── FilterChips.tsx
│   ├── ProjectedLineup.tsx
│   ├── InjuryTimeline.tsx
│   ├── SearchBar.tsx
│   ├── AdSlot.tsx
│   └── VisitorCounter.tsx
├── lib/
│   ├── data.ts
│   ├── redis.ts
│   ├── webhook.ts
│   ├── fantasy-impact.ts          # Impact rating logic
│   ├── seasons.ts                 # Season detection helpers
│   └── i18n.ts
├── tailwind.config.ts
├── next.config.ts
└── .github/
    └── workflows/
        ├── refresh-injuries.yml   # Every 2h in-season
        └── refresh-offseason.yml  # Daily offseason
```

## Harness Files Spec

### `feature_list.json`
```json
{
  "project": "sports-injury-board",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "Multi-Sport Injury Dashboard", "status": "pending" },
    { "id": "F02", "name": "Team Page", "status": "pending" },
    { "id": "F03", "name": "Player Page", "status": "pending" },
    { "id": "F04", "name": "Games by Date", "status": "pending" },
    { "id": "F05", "name": "Search", "status": "pending" },
    { "id": "F06", "name": "Fantasy Impact Ratings", "status": "pending" },
    { "id": "F07", "name": "Data Pipeline (ESPN)", "status": "pending" },
    { "id": "F08", "name": "Season Awareness", "status": "pending" },
    { "id": "F09", "name": "Visitor Counter", "status": "pending" },
    { "id": "F10", "name": "Google Sheets Webhook", "status": "pending" },
    { "id": "F11", "name": "i18n 8 Languages", "status": "pending" },
    { "id": "F12", "name": "Adsterra Ad Slots", "status": "pending" },
    { "id": "F13", "name": "Research History Logging", "status": "pending" }
  ]
}
```

### `claude-progress.txt`
```
PROJECT: sports-injury-board
STARTED: [date]
CURRENT_MILESTONE: M1
STATUS: in_progress

COMPLETED:
- (none yet)

IN_PROGRESS:
- M1: Scaffold and ESPN data pipeline

BLOCKED:
- (none)
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -e

PROJECT="sports-injury-board"
GITHUB_USER="taeshin11"

echo "=== Initializing $PROJECT ==="

npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes

npm install next-intl chart.js react-chartjs-2 @upstash/redis next-sitemap

mkdir -p scripts \
  public/data/nfl public/data/nba public/data/mlb public/data/nhl \
  messages research_history components lib \
  app/api/visits .github/workflows

echo "PROJECT: $PROJECT" > claude-progress.txt
echo "STARTED: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> claude-progress.txt
echo "CURRENT_MILESTONE: M1" >> claude-progress.txt
echo "STATUS: in_progress" >> claude-progress.txt

git init
gh repo create "$GITHUB_USER/$PROJECT" --public --source=. --remote=origin

echo "=== $PROJECT initialized ==="
```
