import React from 'react';
import styles from './HomePage.module.css';
import { HeroSection } from '@/components/hero';
import { OverlappingIntro } from '@/components/standsFor';
import { Hero03Banner } from '@/components/hero/Hero03Banner/Hero03Banner';
import { SailorsSection } from '@/components/sailors';
import { FootballQuote } from '@/components/quote';
import { RoadmapSection } from '@/components/roadmap';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homeRoot}>
      {/* 1. First Banner: Sticky Hero (Hero01 -> Boot Camp -> Hero02 Video) */}
      <div className={styles.heroStickyWrapper}>
        <HeroSection />
      </div>

      {/* 2. Second Banner: Overlapping Intro ("QUIETLY COOKED" + Honours)
          Slides up over Hero02 banner while scrolling */}
      <div className={styles.standForBannerLayer}>
        <div className={styles.standForStickyStage}>
          <OverlappingIntro />
        </div>
      </div>

      {/* 3. Third Banner: Hero03 Banner
          Slides up over previous section (OverlappingIntro) while scrolling */}
      <div className={styles.hero03BannerLayer}>
        <div className={styles.hero03StickyStage}>
          <Hero03Banner />
        </div>
      </div>

      {/* 4. Fourth Banner: White Page with Title & Sailors (Reserved Content Stage)
          Slides up over Hero03 banner while scrolling */}
      <div className={styles.sailorsBannerLayer}>
        <div className={styles.sailorsStickyStage}>
          <SailorsSection />
        </div>
      </div>

      {/* 5. Subsequent Content Surface
          Slides up over Sailors banner while scrolling */}
      <div className={styles.subsequentSurface}>
        {/* Phase 5: Club Creed Statement */}
        <FootballQuote />

        {/* Phase 6: Overlapping Scroll-Animated Club Roadmap Timeline */}
        <RoadmapSection />
      </div>
    </div>
  );
};

export default HomePage;
