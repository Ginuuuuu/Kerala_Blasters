import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero03Banner.module.css';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Hero03BannerProps {
  imageUrl?: string;
  imageAlt?: string;
  topLeftText?: string;
  bottomRightText?: string;
}

export const Hero03Banner: React.FC<Hero03BannerProps> = ({
  imageUrl = '/Assets/Hero03.jpg',
  imageAlt = 'Kerala Blasters FC First Team in Sharp Tailored Attire',
  topLeftText = 'KERALA',
  bottomRightText = 'BLASTERS',
}) => {
  const bannerRef = useRef<HTMLElement>(null);
  const keralaRef = useRef<HTMLHeadingElement>(null);
  const bottomLeftAnchorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const banner = bannerRef.current;
    const kerala = keralaRef.current;
    const bottomAnchor = bottomLeftAnchorRef.current;
    if (!banner || !kerala || !bottomAnchor) return;

    if (prefersReducedMotion) {
      gsap.set(kerala, { y: 0 });
      return;
    }

    let targetY = 0;

    const measureDistance = () => {
      const prevTransform = kerala.style.transform;
      kerala.style.transform = 'none';

      const kRect = kerala.getBoundingClientRect();
      const bRect = bottomAnchor.getBoundingClientRect();

      // Straight down translation distance (Y-axis only)
      targetY = bRect.bottom - kRect.bottom;

      kerala.style.transform = prevTransform;
    };

    measureDistance();

    const ctx = gsap.context(() => {
      // Pure vertical translation straight down as the banner scrolls
      gsap.fromTo(
        kerala,
        {
          y: 0,
        },
        {
          y: () => targetY,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: banner,
            start: 'top top',
            end: 'bottom 35%',
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              measureDistance();
            },
          },
        }
      );
    }, bannerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={bannerRef}
      id="squad-banner"
      className={styles.hero03Banner}
      aria-label="Kerala Blasters FC Team Banner"
    >
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className={styles.bannerImage}
          loading="eager"
          decoding="async"
        />
        <div className={styles.cinematicOverlay} aria-hidden="true" />
        <div className={styles.vignetteOverlay} aria-hidden="true" />
      </div>

      {/* Invisible anchor defining the exact bottom baseline on the left */}
      <div
        ref={bottomLeftAnchorRef}
        className={styles.bottomLeftAnchor}
        aria-hidden="true"
      />

      {/* Top Left: KERALA (glides STRAIGHT DOWN to bottom-left on scroll) */}
      <div className={styles.keralaContainer}>
        <h2 ref={keralaRef} className={styles.heroText}>
          {topLeftText}
        </h2>
      </div>

      {/* Bottom Right: BLASTERS (anchored at the bottom-right) */}
      <div className={styles.blastersContainer}>
        <h2 className={styles.heroText}>
          {bottomRightText}
        </h2>
      </div>
    </section>
  );
};

export default Hero03Banner;
