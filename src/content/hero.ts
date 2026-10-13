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
      src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=2400&q=85',
      alt: 'Kerala Blasters match atmosphere under stadium floodlights',
      caption: 'Demo asset • High-res editorial football scene',
    },
    // Optional video slot prepared without requiring an invented asset
    videoUrl: undefined,
  },
  scrollCueText: 'Scroll to explore',
};
