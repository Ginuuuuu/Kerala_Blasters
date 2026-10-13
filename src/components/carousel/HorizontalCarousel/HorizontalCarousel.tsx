import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HorizontalCarousel.module.css';
import { cn } from '@/utils/classNames';
import { standsForContent, StandsForContent } from '@/content/standsFor';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface HorizontalCarouselProps {
  content?: StandsForContent;
  className?: string;
}

export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  content = standsForContent,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Update scroll boundaries and active slide index
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active card index
    const cardWidth = el.firstElementChild?.clientWidth || 320;
    const gap = 24;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(0, index), content.cards.length - 1));
  }, [content.cards.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Scroll to index
  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(`.${styles.cardItem}`);
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      el.scrollTo({
        left: card.offsetLeft - el.offsetLeft,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(content.cards.length - 1, activeIndex + 1);
    scrollToIndex(nextIdx);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      className={cn(styles.carouselRoot, className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="What Kerala Blasters FC stands for"
    >
      {/* Header controls: indicators + arrow buttons */}
      <div className={styles.headerControls}>
        <div className={styles.headingWrapper}>
          <div className="text-eyebrow text-eyebrow-accent" style={{ marginBottom: '0.5rem' }}>
            {content.eyebrow}
          </div>
          <h2 className="text-display-section" style={{ color: 'var(--color-black)' }}>
            {content.titleMain}{' '}
            <span className="text-editorial-italic">{content.titleItalic}</span>
          </h2>
          <p className="text-body" style={{ color: 'var(--color-grey-medium)', marginTop: '0.75rem' }}>
            {content.subtitle}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className={styles.controlsGroup}>
          {/* Indicator Pills */}
          <div className={styles.indicators} aria-hidden="true">
            {content.cards.map((card, i) => (
              <button
                key={card.id}
                type="button"
                className={cn(
                  styles.indicatorDot,
                  i === activeIndex && styles.indicatorDotActive
                )}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Previous / Next buttons */}
          <div className={styles.arrowButtons}>
            <button
              type="button"
              className={styles.navButton}
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.navButton}
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next slide"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className={styles.scrollTrack}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Swipeable cards track. Use arrow keys to navigate."
      >
        {content.cards.map((card, index) => (
          <article
            key={card.id}
            className={styles.cardItem}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${content.cards.length}: ${card.title}`}
          >
            {/* Background Image */}
            <div className={styles.cardImageWrapper}>
              <img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                decoding="async"
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay} aria-hidden="true" />
            </div>

            {/* Card Content Overlay */}
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <span className={styles.cardBadge}>{card.category}</span>
                <span className={styles.cardNumber}>{card.index}</span>
              </div>

              <div className={styles.cardBottom}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>

                {card.stat && (
                  <div className={styles.cardStat}>
                    <span className={styles.cardStatValue}>{card.stat.value}</span>
                    <span className={styles.cardStatLabel}>{card.stat.label}</span>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
