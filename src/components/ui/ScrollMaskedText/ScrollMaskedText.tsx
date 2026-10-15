import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollMaskedText.module.css';
import { cn } from '@/utils/classNames';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollMaskedTextProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light';
  accentDot?: boolean;
  accentDotChar?: string;
  showHairline?: boolean;
}

export const ScrollMaskedText: React.FC<ScrollMaskedTextProps> = ({
  children,
  className,
  theme = 'dark',
  accentDot = false,
  accentDotChar = '.',
  showHairline = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const ctx = gsap.context(() => {
      // Scroll-driven text transition: rises into view and transitions across the top hairline mask
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 20%',
          scrub: 0.8,
        },
      });

      tl.fromTo(
        content,
        { y: '75%', opacity: 0.25 },
        { y: '0%', opacity: 1, ease: 'power1.out', duration: 1 }
      ).to(
        content,
        { y: '-75%', opacity: 0.25, ease: 'power1.in', duration: 1 },
        '+=0.6' // Holding in clear center view
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(styles.maskContainer, className)}
    >
      {showHairline && (
        <div
          ref={hairlineRef}
          className={cn(
            styles.maskHairline,
            theme === 'light' && styles.hairlineLight
          )}
          aria-hidden="true"
        />
      )}

      <div ref={contentRef} className={styles.maskContent}>
        {children}
        {accentDot && (
          <span className={styles.accentDot} aria-hidden="true">
            {accentDotChar}
          </span>
        )}
      </div>
    </div>
  );
};

export default ScrollMaskedText;
