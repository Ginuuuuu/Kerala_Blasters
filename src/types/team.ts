import { DataSource, ImageAsset } from './common';

export type PlayerPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists?: number;
  cleanSheets?: number;
  minutesPlayed?: number;
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  number: number;
  position: PlayerPosition;
  nationality: string;
  nationalityCode?: string;
  dateOfBirth?: string;
  joinedYear?: number;
  photo: ImageAsset;
  actionPhoto?: ImageAsset;
  bio: string[];
  stats: PlayerStats;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  dataSource: DataSource;
}
