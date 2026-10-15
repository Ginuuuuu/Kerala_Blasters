import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RoadmapSection.module.css';
import { Container, Badge } from '@/components/ui';
import { roadmapDemoData } from '@/content/roadmap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/classNames';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const RoadmapSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const spineActiveRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeProgress, setActiveProgress] = useState(0);

  useEffect(() => {
    // If user prefers reduced motion or window is mobile width, avoid pinning
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Check if desktop viewport (>900px)
    if (window.innerWidth <= 900) return;

    // Create GSAP context for strict React 18 cleanup
    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        return track.scrollWidth - track.clientWidth + 120;
      };

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollDistance() * 1.2}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setActiveProgress(self.progress);
            if (spineActiveRef.current) {
              spineActiveRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      return () => {
        horizontalTween.kill();
      };
    }, containerRef);

    // Refresh ScrollTrigger after any layout paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className={styles.roadmapWrapper}
      aria-label="Club Heritage and Future Roadmap"
    >
      <div className={styles.pinContainer}>
        {/* Header Bar */}
        <Container size="wide">
          <div className={styles.headerBar}>
            <div className={styles.headingGroup}>
              <div className="text-eyebrow text-eyebrow-accent" style={{ marginBottom: '0.5rem' }}>
                CLUB HERITAGE & VISION
              </div>
              <h2 className="text-display-section">
                The Road <span className="text-editorial-italic">Ahead</span>
              </h2>
            </div>
            <div className={styles.dateBadge}>
              <span>2014 — 2026+</span>
            </div>
          </div>
        </Container>

        {/* Horizontal Track Wrapper */}
        <div className={styles.timelineTrackWrapper}>
          <div ref={trackRef} className={styles.timelineTrack}>
            {/* Visual Timeline Spine */}
            <div className={styles.timelineSpineBase} aria-hidden="true" />
            <div ref={spineActiveRef} className={styles.timelineSpineActive} aria-hidden="true" />

            {/* Left Feature Lead Card */}
            <div className={styles.featureLeadCard}>
              <img
                src="/images/hero-stadium.svg"
                alt="Jawaharlal Nehru Stadium floodlights"
                className={styles.featureImage}
              />
              <div className={styles.featureOverlay} aria-hidden="true" />
              <div className={styles.featureContent}>
                <Badge variant="accent">EST. 2014</Badge>
                <div>
                  <span className="text-eyebrow" style={{ color: 'var(--color-orange-contrast)' }}>
                    THE JOURNEY
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem' }}>
                    From Kochi to Continental Ambition
                  </h3>
                </div>
              </div>
            </div>

            {/* Alternating Milestone Nodes */}
            {roadmapDemoData.map((milestone, index) => {
              const isTop = index % 2 === 0;
              const isReached = (index / (roadmapDemoData.length - 1)) <= (activeProgress + 0.1);

              return (
                <div
                  key={milestone.id}
                  className={cn(
                    styles.milestoneNode,
                    isTop ? styles.nodeTop : styles.nodeBottom
                  )}
                >
                  {/* Central Marker Dot */}
                  <div
                    className={cn(
                      styles.markerWrapper,
                      isTop ? styles.markerWrapperTop : styles.markerWrapperBottom
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        styles.markerDot,
                        isReached && styles.markerDotActive
                      )}
                    />
                  </div>

                  {/* Milestone Card Surface */}
                  <article
                    className={cn(
                      styles.milestoneCard,
                      isReached && styles.milestoneCardActive
                    )}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.yearText}>{milestone.year}</span>
                      <span className={styles.categoryTag}>{milestone.category}</span>
                    </div>

                    <h4 className={styles.milestoneTitle}>{milestone.title}</h4>
                    <p className={styles.milestoneDesc}>{milestone.description}</p>

                    {milestone.highlightNumber && (
                      <div className={styles.milestoneStat}>
                        <span className={styles.statValue}>{milestone.highlightNumber}</span>
                        <span className={styles.statLabel}>{milestone.highlightLabel}</span>
                      </div>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
