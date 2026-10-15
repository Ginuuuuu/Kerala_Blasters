import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import styles from './HeroSection.module.css';
import { Container, Button } from '@/components/ui';
import { heroContent, HeroContent } from '@/content/hero';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface HeroSectionProps {
  content?: HeroContent;
  onScrollToNext?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content = heroContent,
  onScrollToNext,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleScrollCue = () => {
    if (onScrollToNext) {
      onScrollToNext();
      return;
    }

    const nextSection = document.getElementById('what-we-stand-for');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const hasVideo = Boolean(content.media.videoUrl && !prefersReducedMotion);

  return (
    <section className={styles.heroSection} aria-label="Hero Introduction">
      {/* Background Media Slot (Supports Video with Poster Fallback) */}
      <div className={styles.mediaContainer}>
        {hasVideo ? (
          <video
            ref={videoRef}
            src={content.media.videoUrl}
            poster={content.media.poster.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={styles.mediaItem}
            aria-hidden="true"
          />
        ) : (
          <img
            src={content.media.poster.src}
            alt={content.media.poster.alt}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className={styles.mediaItem}
            onError={(e) => {
              e.currentTarget.src = '/images/hero-stadium.svg';
            }}
          />
        )}

        {/* Cinematic Layered Dark Overlays for Text Legibility */}
        <div className={styles.overlayBase} aria-hidden="true" />
        <div className={styles.overlayVignette} aria-hidden="true" />
      </div>

      {/* Hero Content Frame */}
      <div className={styles.contentFrame}>
        <Container>
          <div className={styles.headlineGroup}>
            {/* Eyebrow */}
            <div className={styles.eyebrowTag}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>{content.eyebrow}</span>
            </div>

            {/* Oversized Cinematic Headline */}
            <h1 className={styles.heroTitle}>
              <span>{content.headlineMain}</span>{' '}
              <span className={styles.italicAccent}>{content.headlineItalic}</span>{' '}
              {content.headlineEnd && <span>{content.headlineEnd}</span>}
            </h1>

            {/* Concise Supporting Copy */}
            <p className={styles.subtitle}>{content.subtitle}</p>

            {/* Exactly Two Actions */}
            <div className={styles.actionGroup}>
              <Button href={content.primaryAction.href} variant="accent" size="lg">
                {content.primaryAction.label}
              </Button>
              <Button href={content.secondaryAction.href} variant="outline" size="lg">
                {content.secondaryAction.label}
              </Button>
            </div>
          </div>

          {/* Bottom Bar: Scroll Indicator + Attribution */}
          <div className={styles.bottomBar}>
            <button
              type="button"
              className={styles.scrollCue}
              onClick={handleScrollCue}
              aria-label="Scroll down to next section"
            >
              <span className={styles.scrollIndicatorLine} aria-hidden="true" />
              <span>{content.scrollCueText}</span>
              <ArrowDown size={14} aria-hidden="true" />
            </button>

            {content.media.poster.caption && (
              <span className="text-caption" style={{ opacity: 0.7 }}>
                {content.media.poster.caption}
              </span>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
};
