import { ImageAsset, DataSource } from '@/types/common';

export interface StandForCard {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  image: ImageAsset;
  stat?: {
    value: string;
    label: string;
  };
  dataSource: DataSource;
}

export interface StandsForContent {
  eyebrow: string;
  titleMain: string;
  titleItalic: string;
  subtitle: string;
  cards: StandForCard[];
}

export const standsForContent: StandsForContent = {
  eyebrow: '01 / PHILOSOPHY & CULTURE',
  titleMain: 'What we',
  titleItalic: 'stand for.',
  subtitle: 'Football in Kerala is not observed from a distance. It is lived, inherited, and roared from the first minute to the final whistle.',
  cards: [
    {
      id: 'stand-01',
      index: '01',
      category: 'SUPPORTERS',
      title: 'The Yellow Army',
      description: 'An acoustic sea of thirty-five thousand voices vibrating through Kaloor every matchday.',
      image: {
        src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
        alt: 'Fans waving banners and chanting in the stadium',
        caption: 'Demo asset • Manjappada support',
      },
      stat: {
        value: '35,000+',
        label: 'Matchday Attendance',
      },
      dataSource: 'demo',
    },
    {
      id: 'stand-02',
      index: '02',
      category: 'MATCHDAY',
      title: 'Under the Floodlights',
      description: 'Intense tactical discipline, relentless pressing, and uncompromising determination on the pitch.',
      image: {
        src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
        alt: 'Football match action under night stadium lights',
        caption: 'Demo asset • High tempo match action',
      },
      stat: {
        value: '90 MIN',
        label: 'Relentless Engine',
      },
      dataSource: 'demo',
    },
    {
      id: 'stand-03',
      index: '03',
      category: 'THE FORTRESS',
      title: 'Jawaharlal Nehru Stadium',
      description: 'Our home ground in Kochi. A legendary cathedral where visiting opponents face relentless pressure.',
      image: {
        src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1000&q=80',
        alt: 'Kerala stadium floodlights and pitch',
        caption: 'Demo asset • Kochi Fortress',
      },
      stat: {
        value: 'KOCHI',
        label: 'Home of Football',
      },
      dataSource: 'demo',
    },
    {
      id: 'stand-04',
      index: '04',
      category: 'THE SQUAD',
      title: 'Playing for the Crest',
      description: 'Technical composure fused with raw athletic resilience. Every ball fought for until the final second.',
      image: {
        src: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80',
        alt: 'Footballer preparing for a set piece',
        caption: 'Demo asset • Technical focus',
      },
      stat: {
        value: '100%',
        label: 'Commitment',
      },
      dataSource: 'demo',
    },
    {
      id: 'stand-05',
      index: '05',
      category: 'GRASSROOTS',
      title: 'The Pathway',
      description: 'Scouting and nurturing the next generation of football literacy across all fourteen districts of Kerala.',
      image: {
        src: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1000&q=80',
        alt: 'Young footballers in high-performance training',
        caption: 'Demo asset • Academy development',
      },
      stat: {
        value: '14',
        label: 'Districts Reached',
      },
      dataSource: 'demo',
    },
  ],
};
