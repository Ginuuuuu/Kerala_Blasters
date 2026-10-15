import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';
import { Container, Button } from '@/components/ui';
import { heroContent, HeroContent } from '@/content/hero';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === 'object' && 'current' in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === 'function' ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export interface HeroSectionProps {
  content?: HeroContent;
  onScrollToNext?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content = heroContent,
  onScrollToNext,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const bootcampRef = useRef<HTMLDivElement>(null);
  const bannerContentRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtextRef = useRef<HTMLDivElement>(null);

  // Autoplay video muted in background loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay may be restricted by browser until user gesture
        console.warn('Hero video autoplay notice:', err);
      });
    }
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stickyStage = stickyStageRef.current;
      const bannerContent = bannerContentRef.current;
      const heroTitle = heroTitleRef.current;
      const heroSubtext = heroSubtextRef.current;
      const bootcamp = bootcampRef.current;
      const imageLayer = imageLayerRef.current;
      const video = videoRef.current;

      if (!section || !stickyStage || !bannerContent || !heroTitle || !heroSubtext || !bootcamp || !imageLayer) return;

      if (video) {
        video.muted = true;
        video.play().catch(() => {});
      }

      if (prefersReducedMotion) {
        gsap.set(bannerContent, { autoAlpha: 1 });
        gsap.set(heroTitle, { yPercent: 0 });
        gsap.set(heroSubtext, { yPercent: 0 });
        gsap.set(bootcamp, { autoAlpha: 0 });
        gsap.set(imageLayer, { autoAlpha: 1 });
        return;
      }

      // Initial visual states
      gsap.set(bannerContent, { autoAlpha: 1 });
      gsap.set(heroTitle, { yPercent: 0 });
      gsap.set(heroSubtext, { yPercent: 0, autoAlpha: 1 });
      gsap.set(bootcamp, { autoAlpha: 0, scale: 0.9, y: 30 });
      gsap.set(imageLayer, { autoAlpha: 1 });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          pin: stickyStage,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: 'power2.inOut',
        },
      });

      masterTl
        // Step 1: Initial resting phase — first banner text readable on load
        .to(bannerContent, { autoAlpha: 1, duration: 1.0 })

        // Step 2: On scroll: hero card text translates UP through mask boundary, slicing horizontally exactly like reference
        .to(heroTitle, {
          yPercent: -105,
          duration: 2.2,
          ease: 'power2.inOut',
        })
        .to(
          heroSubtext,
          {
            yPercent: -105,
            autoAlpha: 0,
            duration: 1.8,
            ease: 'power2.inOut',
          },
          '<0.1'
        )
        .to(
          bannerContent,
          {
            autoAlpha: 0,
            duration: 0.4,
          },
          '>-0.4'
        )

        // Step 3: In the centre the word BOOT CAMP comes in
        .to(
          bootcamp,
          {
            autoAlpha: 1,
            scale: 1.0,
            y: 0,
            duration: 2.2,
            ease: 'power2.out',
          },
          '-=0.8'
        )

        // Step 4: Hold BOOT CAMP centered and readable
        .to(bootcamp, {
          duration: 2.0,
        })

        // Step 5: Based on continued scroll: BOOT CAMP and initial background disappear
        .to(bootcamp, {
          autoAlpha: 0,
          scale: 1.06,
          y: -25,
          duration: 2.0,
        })
        .to(
          imageLayer,
          {
            autoAlpha: 0,
            duration: 2.2,
          },
          '<'
        )

        // Step 6: Hero02 video is revealed and plays in loop till user scrolls past
        .to({}, { duration: 3.2 });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={styles.heroSection}
      aria-label="Hero Introduction"
    >
      <div ref={stickyStageRef} className={styles.stickyStage}>
        {/* 1. Underlying Video Layer: Hero02.mp4 (Plays continuously in loop) */}
        <div ref={videoContainerRef} className={styles.videoContainer}>
          <video
            ref={videoRef}
            src="/Assets/Hero02.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={styles.heroVideo}
            aria-label="Kerala Blasters training session"
          />
          {/* Subtle Cinematic Vignette over Video */}
          <div className={styles.videoOverlay} aria-hidden="true" />
        </div>

        {/* 2. Initial Image Background Layer: Hero01.jpg (Fades out in Phase 3) */}
        <div ref={imageLayerRef} className={styles.imageLayer}>
          <img
            src={content.media.poster.src || '/Assets/Hero01.jpg'}
            alt={content.media.poster.alt || 'Kerala Blasters match atmosphere'}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className={styles.heroImage}
            onError={(e) => {
              e.currentTarget.src = '/Assets/Hero01.jpg';
            }}
          />
          {/* Layered Cinematic Overlays for Text Legibility */}
          <div className={styles.overlayBase} aria-hidden="true" />
          <div className={styles.overlayVignette} aria-hidden="true" />
        </div>

        {/* 3. Centered "BOOT CAMP" Typography Stage (Hidden initially, emerges in Phase 2, fades in Phase 3) */}
        <div ref={bootcampRef} className={styles.bootcampStage} aria-hidden="true">
          <h2 className={styles.bootcampTitle}>BOOT CAMP</h2>
        </div>

        {/* 4. First Banner Text Content Frame (Visible on load, fades out on initial scroll in Phase 1) */}
        <div ref={bannerContentRef} className={styles.contentFrame}>
          <Container>
            <div className={styles.headlineGroup}>
              {/* Mask container: Headline slices cleanly across horizontal cut line */}
              <div className={styles.titleMaskWrapper}>
                <h1 ref={heroTitleRef} className={styles.heroTitle}>
                  <span>{content.headlineMain}</span>{' '}
                  <span className={styles.italicAccent}>{content.headlineItalic}</span>{' '}
                  {content.headlineEnd && <span>{content.headlineEnd}</span>}
                </h1>
              </div>

              {/* Mask container: Subtitle and Actions slide up and disappear */}
              <div className={styles.subtextMaskWrapper}>
                <div ref={heroSubtextRef} className={styles.subtextInner}>
                  <p className={styles.subtitle}>{content.subtitle}</p>

                  <div className={styles.actionGroup}>
                    <Button href={content.primaryAction.href} variant="accent" size="lg">
                      {content.primaryAction.label}
                    </Button>
                    <Button href={content.secondaryAction.href} variant="outline" size="lg">
                      {content.secondaryAction.label}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};
