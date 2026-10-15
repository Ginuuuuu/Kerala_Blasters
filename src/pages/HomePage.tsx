import React from 'react';
import styles from './HomePage.module.css';
import { HeroSection } from '@/components/hero';
import { OverlappingIntro } from '@/components/standsFor';
import { SquadPreview } from '@/components/player';
import { FootballQuote } from '@/components/quote';
import { RoadmapSection } from '@/components/roadmap';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homeRoot}>
      {/* Sticky Hero Container — strictly isolated to viewport height */}
      <div className={styles.heroStickyWrapper}>
        <HeroSection />
      </div>

      {/* Opaque Content Surface that slides over the sticky hero on scroll */}
      <div className={styles.contentSurface}>
        {/* Phase 3: Overlapping Intro & Horizontal Carousel */}
        <OverlappingIntro />

        {/* Phase 4: First Team / The Squad */}
        <SquadPreview />

        {/* Phase 5: Short Football Quote */}
        <FootballQuote />

        {/* Overlapping Scroll-Animated Club Roadmap Timeline */}
        <RoadmapSection />
      </div>
    </div>
  );
};
