import { Honour, ClubPillar, ClubFact } from '@/types/club';

export const clubHonours: Honour[] = [
  {
    id: 'honour-2014',
    competition: 'Indian Super League',
    seasonOrYear: '2014',
    achievement: 'Runners-up',
    detail: 'Inaugural season final',
    dataSource: 'verified',
  },
  {
    id: 'honour-2016',
    competition: 'Indian Super League',
    seasonOrYear: '2016',
    achievement: 'Runners-up',
    detail: 'Final hosted in Kochi before 65,000 fans',
    dataSource: 'verified',
  },
  {
    id: 'honour-2022',
    competition: 'Indian Super League',
    seasonOrYear: '2021-22',
    achievement: 'Runners-up',
    detail: 'Penalties shootout in Goa final',
    dataSource: 'verified',
  },
  {
    id: 'honour-durand-2021',
    competition: 'Durand Cup',
    seasonOrYear: '2021',
    achievement: 'Semi-finalists',
    detail: 'Historic national cup campaign',
    dataSource: 'verified',
  },
];

export const clubFacts: ClubFact[] = [
  { label: 'Founded', value: '2014', subtext: 'Inaugural ISL Member' },
  { label: 'Home Stadium', value: 'Jawaharlal Nehru Stadium', subtext: 'Kaloor, Kochi (Capacity ~40,000)' },
  { label: 'Primary Identity', value: 'The Yellow Army / Tuskers', subtext: 'Yellow & Navy Blue' },
  { label: 'Supporters Group', value: 'Manjappada', subtext: 'One of the largest organized fanbases in Asia' },
];

export const clubPillars: ClubPillar[] = [
  {
    id: 'pillar-identity',
    title: 'Identity',
    eyebrow: 'PILLAR 01',
    summary: 'Forged in Kerala football culture—deeply communal, relentlessly passionate, and unmistakably distinct.',
  },
  {
    id: 'pillar-ambition',
    title: 'Ambition',
    eyebrow: 'PILLAR 02',
    summary: 'A continuous pursuit of sporting excellence through modern sports science, relentless tactical discipline, and silverware.',
  },
  {
    id: 'pillar-fans',
    title: 'The Fans',
    eyebrow: 'PILLAR 03',
    summary: 'The emotional engine of the club. More than spectators: an unbroken sea of yellow whose energy vibrates through every pitch.',
  },
];
