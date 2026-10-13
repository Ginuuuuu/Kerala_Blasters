import { DataSource, ImageAsset } from './common';

export interface Honour {
  id: string;
  competition: string;
  seasonOrYear: string;
  achievement: 'Champions' | 'Runners-up' | 'Finalists' | 'Semi-finalists';
  detail?: string;
  dataSource: DataSource;
}

export interface ClubPillar {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  image?: ImageAsset;
}

export interface ClubFact {
  label: string;
  value: string;
  subtext?: string;
}
