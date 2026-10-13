import { DataSource } from './common';

export type MatchStatus = 'upcoming' | 'live' | 'completed' | 'postponed';
export type Competition = 'Indian Super League' | 'Super Cup' | 'Durand Cup' | 'Pre-Season Friendly';

export interface MatchScore {
  home: number;
  away: number;
  penalties?: {
    home: number;
    away: number;
  };
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub';
  player: string;
  team: 'home' | 'away';
  detail?: string;
}

export interface Match {
  id: string;
  competition: Competition;
  season: string;
  matchday?: number;
  date: string; // ISO 8601 string
  kickoffTime: string; // e.g. "19:30 IST"
  venue: string;
  city: string;
  homeTeam: {
    name: string;
    shortName: string;
    isKBFC: boolean;
  };
  awayTeam: {
    name: string;
    shortName: string;
    isKBFC: boolean;
  };
  status: MatchStatus;
  score?: MatchScore;
  events?: MatchEvent[];
  recapSummary?: string;
  dataSource: DataSource;
}
