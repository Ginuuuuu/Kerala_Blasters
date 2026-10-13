import { Article } from '@/types/news';

export const newsDemoData: Article[] = [
  {
    id: 'story-01',
    slug: 'fortress-kochi-derby-tactics',
    title: 'Fortress Kochi: Tactical Blueprint for the High-Press Engine',
    subtitle: 'An analytical breakdown of territorial dominance and high transition velocity.',
    category: 'Match Report',
    publishedAt: '2025-02-23T10:00:00+05:30',
    readTime: '4 min read',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      alt: 'Tactical briefing on the pitch',
      caption: 'Demo asset • Tactical Analysis',
    },
    author: {
      name: 'Editorial Desk',
      role: 'Tactical Analyst',
    },
    excerpt: 'How intense positional structure and wing overload disrupted the opposition in the dying minutes.',
    content: [
      'In modern football, space is an elusive currency. Under the floodlights of the Jawaharlal Nehru Stadium, Kerala Blasters demonstrated an unwavering commitment to compact spatial geometry.',
      'The initial forty-five minutes demanded immense defensive focus. Operating in a flexible 4-2-3-1 that transitioned into a 3-2-5 in possession, the midfield pivot controlled the tempo with precision.',
      'The turning point arrived with rapid switches of play into the wide half-spaces, exploiting fatigued defensive blocks and igniting the decisive breakthrough.'
    ],
    tags: ['Tactics', 'Analysis', 'First Team', 'ISL'],
    isFeatured: true,
    dataSource: 'demo',
  },
  {
    id: 'story-02',
    slug: 'next-generation-academy-pathway',
    title: 'The Young Sailors: Building the Grassroots Pathway in Malabar',
    subtitle: 'Inside the scouting network developing Kerala football talent.',
    category: 'Academy',
    publishedAt: '2025-02-18T14:30:00+05:30',
    readTime: '3 min read',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Young footballers in training drills',
      caption: 'Demo asset • Academy Development',
    },
    author: {
      name: 'Youth Development',
      role: 'Academy Correspondent',
    },
    excerpt: 'A structured scouting initiative across 14 districts looking for modern tactical literacy and raw athletic potential.',
    content: [
      'Football in Kerala is not simply a weekend activity—it is ingrained in regional identity. The academy framework places equal emphasis on technical conditioning and emotional resilience.',
      'Through state-of-the-art sports science and licensed coaching staff, youngsters transition seamlessly from regional tournaments to the senior squad.'
    ],
    tags: ['Academy', 'Youth', 'Kerala Football'],
    isFeatured: false,
    dataSource: 'demo',
  },
  {
    id: 'story-03',
    slug: 'ninety-minutes-unbroken-roar',
    title: 'Ninety Minutes: The Unbroken Roar of the Yellow Army',
    subtitle: 'Behind the decibels that turn Kochi into one of Asia’s most formidable venues.',
    category: 'Club News',
    publishedAt: '2025-02-10T11:15:00+05:30',
    readTime: '3 min read',
    coverImage: {
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
      alt: 'Fans waving banners in the stadium',
      caption: 'Demo asset • Supporter Culture',
    },
    author: {
      name: 'Supporters Desk',
      role: 'Features Writer',
    },
    excerpt: 'The choreography, the banners, and the thunderous unison that redefine matchday experience in India.',
    content: [
      'Hours before the first whistle, the concourse reverberates. Flags that stretch across tiers, synchronized chanting, and an ocean of yellow create an atmosphere admired across the continent.',
      'For visiting squads, the sheer acoustic weight is relentless. For the players in yellow, it is fuel for the final sprint.'
    ],
    tags: ['Supporters', 'Manjappada', 'Culture', 'Matchday'],
    isFeatured: false,
    dataSource: 'demo',
  },
];
