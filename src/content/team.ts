import { Player } from '@/types/team';

export const squadDemoData: Player[] = [
  {
    id: 'kbfc-01',
    slug: 'adrian-luna',
    name: 'Adrián Luna',
    shortName: 'A. Luna',
    number: 10,
    position: 'Midfielder',
    nationality: 'Uruguay',
    nationalityCode: 'UY',
    isCaptain: true,
    photo: {
      src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      alt: 'Adrián Luna portrait during training',
      caption: 'Demo asset • Midfielder',
    },
    actionPhoto: {
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
      alt: 'Match action in Kochi',
    },
    bio: [
      'Playmaker and team captain, commanding the midfield engine with vision and relentless tactical work rate.',
      'A fan favourite at the Jawaharlal Nehru Stadium, leading the squad with composure under intense pressure.'
    ],
    stats: {
      appearances: 54,
      goals: 14,
      assists: 17,
      minutesPlayed: 4620,
    },
    joinedYear: 2021,
    dataSource: 'demo',
  },
  {
    id: 'kbfc-02',
    slug: 'noah-sadaoui',
    name: 'Noah Sadaoui',
    shortName: 'N. Sadaoui',
    number: 7,
    position: 'Forward',
    nationality: 'Morocco',
    nationalityCode: 'MA',
    photo: {
      src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
      alt: 'Noah Sadaoui portrait',
      caption: 'Demo asset • Forward',
    },
    bio: [
      'Explosive wide forward with exceptional one-on-one dribbling capability and clinical finishing in the final third.',
      'Brings speed and tactical flexibility across the front three.'
    ],
    stats: {
      appearances: 22,
      goals: 11,
      assists: 6,
      minutesPlayed: 1840,
    },
    joinedYear: 2024,
    dataSource: 'demo',
  },
  {
    id: 'kbfc-03',
    slug: 'jesus-jimenez',
    name: 'Jesús Jiménez',
    shortName: 'J. Jiménez',
    number: 9,
    position: 'Forward',
    nationality: 'Spain',
    nationalityCode: 'ES',
    photo: {
      src: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
      alt: 'Jesús Jiménez in training kit',
      caption: 'Demo asset • Forward',
    },
    bio: [
      'Dynamic center forward with European league pedigree, sharp positional instinct, and aerial presence.',
      'Target man who creates passing channels and converts critical chances.'
    ],
    stats: {
      appearances: 18,
      goals: 8,
      assists: 3,
      minutesPlayed: 1420,
    },
    joinedYear: 2024,
    dataSource: 'demo',
  },
  {
    id: 'kbfc-04',
    slug: 'prabir-das',
    name: 'Prabir Das',
    shortName: 'P. Das',
    number: 33,
    position: 'Defender',
    nationality: 'India',
    nationalityCode: 'IN',
    photo: {
      src: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=800&q=80',
      alt: 'Prabir Das running drills',
      caption: 'Demo asset • Defender',
    },
    bio: [
      'Tenacious full-back delivering energetic overlapping runs, aggressive recovery tackles, and pinpoint crosses into the penalty box.'
    ],
    stats: {
      appearances: 35,
      goals: 1,
      assists: 5,
      cleanSheets: 9,
      minutesPlayed: 2890,
    },
    joinedYear: 2023,
    dataSource: 'demo',
  },
  {
    id: 'kbfc-05',
    slug: 'sachin-suresh',
    name: 'Sachin Suresh',
    shortName: 'S. Suresh',
    number: 1,
    position: 'Goalkeeper',
    nationality: 'India',
    nationalityCode: 'IN',
    photo: {
      src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      alt: 'Sachin Suresh in goalkeeper gloves',
      caption: 'Demo asset • Goalkeeper',
    },
    bio: [
      'Young homegrown shot-stopper known for sharp reflexes on the goal line, penalty-saving composure, and distribution.'
    ],
    stats: {
      appearances: 28,
      goals: 0,
      cleanSheets: 8,
      minutesPlayed: 2520,
    },
    joinedYear: 2020,
    dataSource: 'demo',
  },
  {
    id: 'kbfc-06',
    slug: 'vibin-mohanan',
    name: 'Vibin Mohanan',
    shortName: 'V. Mohanan',
    number: 8,
    position: 'Midfielder',
    nationality: 'India',
    nationalityCode: 'IN',
    photo: {
      src: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80',
      alt: 'Vibin Mohanan in training',
      caption: 'Demo asset • Midfielder',
    },
    bio: [
      'Academy graduate who has established himself in the first team through tactical discipline and progressive passing range.'
    ],
    stats: {
      appearances: 31,
      goals: 2,
      assists: 4,
      minutesPlayed: 2150,
    },
    joinedYear: 2022,
    dataSource: 'demo',
  },
  {
    id: 'kbfc-07',
    slug: 'milos-drincic',
    name: 'Miloš Drinčić',
    shortName: 'M. Drinčić',
    number: 4,
    position: 'Defender',
    nationality: 'Montenegro',
    nationalityCode: 'ME',
    photo: {
      src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      alt: 'Miloš Drinčić center-back stance',
      caption: 'Demo asset • Center Back',
    },
    bio: [
      'Commanding central defender known for physical dominance in aerial duels and decisive penalty box clearances.'
    ],
    stats: {
      appearances: 24,
      goals: 2,
      cleanSheets: 7,
      minutesPlayed: 2160,
    },
    joinedYear: 2023,
    dataSource: 'demo',
  },
  {
    id: 'kbfc-08',
    slug: 'rahul-kp',
    name: 'Rahul KP',
    shortName: 'Rahul KP',
    number: 17,
    position: 'Forward',
    nationality: 'India',
    nationalityCode: 'IN',
    photo: {
      src: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=800&q=80',
      alt: 'Rahul KP sprinting down the wing',
      caption: 'Demo asset • Winger',
    },
    bio: [
      'Thrissur-born speedster offering direct running, tireless wing pressing, and passionate connection with the Kochi crowd.'
    ],
    stats: {
      appearances: 64,
      goals: 9,
      assists: 8,
      minutesPlayed: 4120,
    },
    joinedYear: 2019,
    dataSource: 'demo',
  },
];
