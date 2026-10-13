import { NavigationContent } from '@/types/navigation';

export const navigationContent: NavigationContent = {
  brand: {
    name: 'KERALA BLASTERS FC',
    subtext: 'Kochi • Est. 2014',
    founded: 2014,
    homeCity: 'Kochi, Kerala',
  },
  routes: [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      eyebrow: '01',
    },
    {
      id: 'team',
      label: 'The Squad',
      path: '/team',
      eyebrow: '02',
      badge: 'First Team',
    },
    {
      id: 'matches',
      label: 'Match Centre',
      path: '/matches',
      eyebrow: '03',
      badge: 'Fixtures & Results',
    },
    {
      id: 'news',
      label: 'Stories & News',
      path: '/news',
      eyebrow: '04',
    },
    {
      id: 'club',
      label: 'Club & History',
      path: '/club',
      eyebrow: '05',
    },
  ],
  socials: [
    {
      platform: 'Instagram',
      label: '@keralablasters',
      url: 'https://instagram.com',
    },
    {
      platform: 'X (Twitter)',
      label: '@KeralaBlasters',
      url: 'https://twitter.com',
    },
    {
      platform: 'YouTube',
      label: 'Kerala Blasters FC',
      url: 'https://youtube.com',
    },
  ],
  legalNotice: 'Independent digital concept website. Not officially endorsed or authorized by Kerala Blasters FC.',
};
