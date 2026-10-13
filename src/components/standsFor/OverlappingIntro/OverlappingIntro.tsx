import React from 'react';
import styles from './OverlappingIntro.module.css';
import { Container } from '@/components/ui';
import { HorizontalCarousel } from '@/components/carousel';
import { standsForContent } from '@/content/standsFor';

export const OverlappingIntro: React.FC = () => {
  return (
    <section
      id="what-we-stand-for"
      className={styles.overlappingSection}
      aria-label="What Kerala Blasters FC Stands For"
    >
      <div className={styles.curtainIndicator} aria-hidden="true">
        <span className={styles.curtainPill} />
      </div>

      <Container size="wide">
        <HorizontalCarousel content={standsForContent} />
      </Container>
    </section>
  );
};
