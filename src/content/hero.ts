import { ImageAsset } from '@/types/common';

export interface HeroContent {
  eyebrow: string;
  headlineMain: string;
  headlineItalic: string;
  headlineEnd?: string;
  subtitle: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
  media: {
    type: 'image' | 'video';
    poster: ImageAsset;
    videoUrl?: string; // Optional ~10s ambient loop for future drop-in
  };
  scrollCueText: string;
}

export const heroContent: HeroContent = {
  eyebrow: 'KERALA BLASTERS FC • KOCHI',
  headlineMain: 'NO EXCUSES.',
  headlineItalic: 'JUST',
  headlineEnd: 'FOOTBALL.',
  subtitle: 'Forged under the floodlights of Jawaharlal Nehru Stadium. Powered by thirty-five thousand voices in unison.',
  primaryAction: {
    label: 'The Squad',
    href: '/team',
  },
  secondaryAction: {
    label: 'Match Centre',
    href: '/matches',
  },
  media: {
    type: 'image',
    poster: {
      src: '/Assets/Hero01.jpg',
      alt: 'Kerala Blasters match atmosphere under stadium floodlights',
      caption: 'Kerala Blasters FC • Editorial matchday visual',
    },
    // Hero02 background video loop
    videoUrl: '/Assets/Hero02.mp4',
  },
  scrollCueText: 'Scroll to explore',
};
