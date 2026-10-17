// Built using Hyperiux Vault: https://vault.hyperiux.com
// Pure Typographic Stepped Multidirectional Roadmap — NO CARDS
// Horizontal (2014-2022) -> Straight Downward (2022-2025) -> Straight Sideward (2025-2026+)
// Featuring authentic Malayali supporter football slang & cultural pride
'use client';

import React, {
  type CSSProperties,
  useLayoutEffect,
  useRef,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RoadmapSection.module.css';
import { cn } from '@/utils/classNames';

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

export type SteppedMilestone = {
  id: string;
  year: string;
  month: string;
  title: string;
  slangQuote: string;
  content: string;
  x: number;
  y: number;
  stemDirection: 'up' | 'down' | 'right' | 'left';
  textPlacement: 'above' | 'below' | 'right' | 'left';
  isInitialVisible?: boolean;
};

/* Stepped Multidirectional Milestones — Pure Minimal Typography, No Cards */
const steppedMilestones: SteppedMilestone[] = [
  // 1. Horizontal Phase (2014 - 2022) along Y = 420
  {
    id: 'm-2014',
    year: '2014',
    month: 'May',
    title: 'Founding of the Club',
    slangQuote: '“Aavesham Pirannu — Nammal vannu, pakshe kali ini thudangaan povunnathe ullu!”',
    content: 'Kerala Blasters FC established in Kochi. The floodlights roared to life, sparking an uncontainable yellow revolution.',
    x: 420,
    y: 420,
    stemDirection: 'up',
    textPlacement: 'above',
    isInitialVisible: true,
  },
  {
    id: 'm-2016',
    year: '2016',
    month: 'December',
    title: 'ISL Final & Supporter Surge',
    slangQuote: '“Manjakkadal Aavesham — Kochi muttumbol kadal pole aarthirambunna 65,000 chankukal!”',
    content: 'Over 65,000 yellow sea supporters pack Jawaharlal Nehru Stadium for a historic finale, creating Asian football lore.',
    x: 800,
    y: 420,
    stemDirection: 'down',
    textPlacement: 'below',
    isInitialVisible: true,
  },
  {
    id: 'm-2022',
    year: '2022',
    month: 'March',
    title: 'Modern Tactical Resurgence',
    slangQuote: '“Chankidappu Poru — Tholkkilla makkale, ini angottu nenju virichu poraattam!”',
    content: 'Modern tactical resurgence with dynamic pressing and homegrown Malayali talent storming the ISL final.',
    x: 1200,
    y: 420,
    stemDirection: 'up',
    textPlacement: 'above',
  },

  // 2. Straight Downward Vertical Phase along X = 1200 (Line goes straight down!)
  {
    id: 'm-2023',
    year: '2023',
    month: 'October',
    title: 'Grassroots Explosion',
    slangQuote: '“Muttathe Panthukali — Kavalakal thorum kaliyude perunnal!”',
    content: 'KBFC Young Blasters grassroots academy expansion across all 14 districts of Kerala, scouting grassroots prodigies.',
    x: 1200,
    y: 620,
    stemDirection: 'right',
    textPlacement: 'right',
  },
  {
    id: 'm-2024',
    year: '2024',
    month: 'August',
    title: 'Sports Science Ecosystem',
    slangQuote: '“Kali Vere Level — Data-yum chankum chernna puthiya yugam!”',
    content: 'High-performance sports science, GPS analytics departments, and specialized youth residency programmes statewide.',
    x: 1200,
    y: 800,
    stemDirection: 'left',
    textPlacement: 'left',
  },

  // 3. Straight Sideward Horizontal Phase along Y = 920 (Line goes straight rightward!)
  {
    id: 'm-2025',
    year: '2025',
    month: 'September',
    title: 'Continental Ambition',
    slangQuote: '“Kadal Kadannulla Poru — Asian stage-il nammude kolam parathaan samayamayi!”',
    content: 'Targeting top domestic silverware to secure qualification into prestigious continental AFC tournaments.',
    x: 1700,
    y: 920,
    stemDirection: 'up',
    textPlacement: 'above',
  },
  {
    id: 'm-2026',
    year: '2026',
    month: 'November',
    title: 'Dedicated Training City',
    slangQuote: '“Swantham Nagaram — Swantham mannil swantham thavalam, nithyavum pantaadunna nammude swantham nagaram!”',
    content: 'Strategic vision for a dedicated club-owned world-class training center and community football city in Kerala.',
    x: 2080,
    y: 920,
    stemDirection: 'down',
    textPlacement: 'below',
  },
  {
    id: 'm-2026-plus',
    year: '2026+',
    month: 'Beyond',
    title: 'Forever Kerala Blasters',
    slangQuote: '“Ini Angottu Pokkal Maathram — Nammalude Blasters, Nammalude Chora!”',
    content: 'A generational football legacy built by the people, for the people of Kerala.',
    x: 2460,
    y: 920,
    stemDirection: 'up',
    textPlacement: 'above',
  },
];

export type TimelineProps = {
  introEyebrow?: string;
  introTitle?: string;
  introSubtitle?: string;
  textColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export const RoadmapSection: React.FC<TimelineProps> = ({
  introEyebrow = '',
  introTitle = 'Not just\n90 minutes.',
  introSubtitle = '',
  textColor = 'var(--color-black, #111111)',
  backgroundColor = 'var(--color-white, #ffffff)',
  imageUrl = '/Assets/Hero01.jpg',
  imageAlt = 'Kerala Blasters FC Hero Stadium Atmosphere',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const viewportStageRef = useRef<HTMLDivElement>(null);
  const steppedWorldRef = useRef<HTMLDivElement>(null);
  const pathActiveRef = useRef<SVGPathElement>(null);

  // Straight Orthogonal Path (NO BENDS OR CURVES)
  // M (60,420) -> L (1200,420) -> L (1200,920) -> L (2580,920)
  const svgStraightPath = 'M 60,420 L 1200,420 L 1200,920 L 2580,920';

  useGSAP(() => {
    const section = sectionRef.current;
    const stickyStage = stickyStageRef.current;
    const intro = introOverlayRef.current;
    const viewport = viewportStageRef.current;
    const world = steppedWorldRef.current;
    const pathActive = pathActiveRef.current;

    if (!section || !stickyStage || !intro || !viewport || !world || !pathActive) return;

    const mm = gsap.matchMedia();

    // DESKTOP ONLY: 2D stepped scrubbed orthogonal world with ScrollTrigger Pinning
    mm.add('(min-width: 769px)', () => {
      // Set SVG path length
      const pathLength = pathActive.getTotalLength();
      gsap.set(pathActive, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // 1. Initial visibility states — INTRO OVERLAY IS 100% VISIBLE ON LOAD
      gsap.set(intro, { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(viewport, { autoAlpha: 0, scale: 0.98 });

      // Milestones: Only initial milestones (2014 & 2016) are visible on load.
      steppedMilestones.forEach((m) => {
        if (m.isInitialVisible) {
          gsap.set(`.text-${m.id}`, { autoAlpha: 1, y: 0 });
          gsap.set(`.dot-${m.id}`, { scale: 1 });
          gsap.set(`.stem-${m.id}`, { scaleX: 1, scaleY: 1 });
        } else {
          gsap.set(`.text-${m.id}`, {
            autoAlpha: 0,
            y: m.stemDirection === 'up' ? -16 : 16,
          });
          gsap.set(`.dot-${m.id}`, { scale: 0 });
          if (m.stemDirection === 'up' || m.stemDirection === 'down') {
            gsap.set(`.stem-${m.id}`, { scaleY: 0 });
          } else {
            gsap.set(`.stem-${m.id}`, { scaleX: 0 });
          }
        }
      });

      // 2. Master Unified Scrubbed Scroll Timeline with GSAP Pinning
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyStage,
          anticipatePin: 1,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: 'none',
        },
      });

      masterTl
        // Step A: As user continues scrolling, intro dissolves smoothly and glides upward
        .to(intro, {
          autoAlpha: 0,
          y: -30,
          duration: 1.2,
          ease: 'power1.inOut',
        })

        // Step B: Timeline emerges in place smoothly
        .to(
          viewport,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power1.out',
          },
          '<0.1'
        )

        // Step C: Initial line segment through 2014 & 2016 (both visible)
        .to(
          pathActive,
          {
            strokeDashoffset: pathLength * 0.74,
            duration: 1.2,
          },
          '<'
        )

        // Step D: Slide horizontally to 2022 (Phase 1)
        .to(world, { x: -650, y: 0, duration: 3.5 })
        .to(pathActive, { strokeDashoffset: pathLength * 0.54, duration: 3.5 }, '<')
        // Milestone 2022 stem, dot & text reveal as line reaches 2022
        .to('.dot-m-2022', { scale: 1, duration: 0.35, ease: 'back.out(2)' }, '<2.2')
        .to('.stem-m-2022', { scaleY: 1, duration: 0.35, ease: 'power1.out' }, '<0.05')
        .to('.text-m-2022', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '<0.1')

        // Step E: Straight downward plunge along X = 1200 (Phase 2)
        .to(world, { x: -650, y: -420, duration: 3.5 })
        .to(pathActive, { strokeDashoffset: pathLength * 0.34, duration: 3.5 }, '<')
        // Milestone 2023 (Y = 620) stem, dot & text reveal as line drops past it
        .to('.dot-m-2023', { scale: 1, duration: 0.35, ease: 'back.out(2)' }, '<1.0')
        .to('.stem-m-2023', { scaleX: 1, duration: 0.35, ease: 'power1.out' }, '<0.05')
        .to('.text-m-2023', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '<0.1')
        // Milestone 2024 (Y = 800) stem, dot & text reveal as line reaches bottom of vertical drop
        .to('.dot-m-2024', { scale: 1, duration: 0.35, ease: 'back.out(2)' }, '<1.4')
        .to('.stem-m-2024', { scaleX: 1, duration: 0.35, ease: 'power1.out' }, '<0.05')
        .to('.text-m-2024', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '<0.1')

        // Step F: Straight sideward sweep along Y = 920 (Phase 3)
        .to(world, { x: -1700, y: -480, duration: 4.5 })
        .to(pathActive, { strokeDashoffset: 0, duration: 4.5 }, '<')
        // Milestone 2025 stem, dot & text reveal
        .to('.dot-m-2025', { scale: 1, duration: 0.35, ease: 'back.out(2)' }, '<1.4')
        .to('.stem-m-2025', { scaleY: 1, duration: 0.35, ease: 'power1.out' }, '<0.05')
        .to('.text-m-2025', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '<0.1')
        // Milestone 2026 (Dedicated Training City) stem, dot & text reveal
        .to('.dot-m-2026', { scale: 1, duration: 0.35, ease: 'back.out(2)' }, '<1.4')
        .to('.stem-m-2026', { scaleY: 1, duration: 0.35, ease: 'power1.out' }, '<0.05')
        .to('.text-m-2026', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '<0.1')
        // Milestone 2026+ (Forever Kerala Blasters) stem, dot & text reveal
        .to('.dot-m-2026-plus', { scale: 1, duration: 0.35, ease: 'back.out(2)' }, '<1.2')
        .to('.stem-m-2026-plus', { scaleY: 1, duration: 0.35, ease: 'power1.out' }, '<0.05')
        .to('.text-m-2026-plus', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '<0.1')

        // Step G: Hold the completed timeline and final milestone comfortably in full view
        .to({}, { duration: 2.2 });

      return () => {
        masterTl.kill();
      };
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      data-section="journey"
      className={styles.journeySection}
      style={{ color: textColor, backgroundColor }}
      aria-label="Kerala Blasters FC Multidirectional Roadmap"
    >
      {/* Anchor target for legacy /#journey links */}
      <span id="journey" style={{ position: 'absolute', top: 0, left: 0, opacity: 0, pointerEvents: 'none' }} />

      <div ref={stickyStageRef} className={styles.stickyStage}>
        {/* 1. White-Themed Intro Screen (Held steady, then dissolves slowly on scroll) */}
        <div
          ref={introOverlayRef}
          className={styles.introOverlay}
          aria-label="Roadmap Overview"
        >
          <div className={styles.introContent}>
            {introEyebrow ? <span className={styles.introEyebrow}>{introEyebrow}</span> : null}
            <h2 className={styles.introTitle}>{introTitle}</h2>
            {introSubtitle ? <p className={styles.introSubtitle}>{introSubtitle}</p> : null}
            <div className={styles.introArrow} aria-hidden="true">
              ↓
            </div>
          </div>
        </div>

        {/* 2. Pinned Stepped World Stage (Horizontal -> Straight Downward -> Straight Sideward) */}
        <div ref={viewportStageRef} className={styles.viewportStage}>
          <div ref={steppedWorldRef} className={styles.steppedWorld}>
            {/* SVG Straight Stepped Line Layer (No bends) */}
            <svg className={styles.svgLayer} aria-hidden="true">
              {/* Base Dashed Guide Path */}
              <path
                d={svgStraightPath}
                className={styles.pathBase}
              />
              {/* Active Scrub Path */}
              <path
                ref={pathActiveRef}
                d={svgStraightPath}
                className={styles.pathActive}
              />
            </svg>

            {/* Lead Hero Stadium Card */}
            <div className={styles.leadCard}>
              <img
                src={imageUrl}
                alt={imageAlt}
                draggable={false}
                className={styles.leadImg}
              />
              <div className={styles.leadOverlay} aria-hidden="true">
                <span className={styles.leadPill}>EST. 2014</span>
                <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                    THE JOURNEY
                  </div>
                  <div className={styles.leadHeadline}>
                    From Kochi to Continental Ambition
                  </div>
                </div>
              </div>
            </div>

            {/* Pure Typographic Stepped Milestones (NO CARDS) */}
            {steppedMilestones.map((m) => {
              const stemClass =
                m.stemDirection === 'up'
                  ? styles.stemVerticalUp
                  : m.stemDirection === 'down'
                  ? styles.stemVerticalDown
                  : m.stemDirection === 'right'
                  ? styles.stemHorizontalRight
                  : styles.stemHorizontalLeft;

              const dotClass =
                m.stemDirection === 'up'
                  ? styles.dotTop
                  : m.stemDirection === 'down'
                  ? styles.dotBottom
                  : m.stemDirection === 'right'
                  ? styles.dotRight
                  : styles.dotLeft;

              const textClass =
                m.textPlacement === 'above'
                  ? styles.textAbove
                  : m.textPlacement === 'below'
                  ? styles.textBelow
                  : m.textPlacement === 'right'
                  ? styles.textRight
                  : styles.textLeft;

              return (
                <div
                  key={m.id}
                  className={styles.milestoneAnchor}
                  style={{ left: `${m.x}px`, top: `${m.y}px` }}
                >
                  {/* Straight Connector Stem Line */}
                  <div className={cn(styles.stemLine, stemClass, `stem-${m.id}`)} />

                  {/* Node Dot sitting at the end of the stem right next to the title */}
                  <div className={cn(styles.markerDot, dotClass, `dot-${m.id}`)} />

                  {/* Pure Floating Typography (NO BOX, NO BORDER, NO SHADOW) */}
                  <div className={cn(styles.textGroup, textClass, `text-${m.id}`)}>
                    <h3 className={styles.itemTitle}>
                      {m.year} {m.month}
                    </h3>

                    {/* Authentic Malayali Football Slang Quote */}
                    <div className={styles.itemQuote}>
                      {m.slangQuote}
                    </div>

                    <p className={styles.itemDescription}>
                      {m.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE UI: Dedicated Vertical Timeline Stage (max-width: 768px only) */}
      <div className={styles.mobileTimelineStage}>
        {/* Mobile Intro Header */}
        <div className={styles.mobileIntro}>
          {introEyebrow ? <span className={styles.mobileEyebrow}>{introEyebrow}</span> : <span className={styles.mobileEyebrow}>EST. 2014 • CLUB ROADMAP</span>}
          <h2 className={styles.mobileTitle}>{introTitle}</h2>
          {introSubtitle ? <p className={styles.mobileSubtitle}>{introSubtitle}</p> : null}
          <div className={styles.mobileArrow} aria-hidden="true">↓</div>
        </div>

        {/* Lead Stadium Card */}
        <div className={styles.mobileLeadCard}>
          <img
            src={imageUrl}
            alt={imageAlt}
            draggable={false}
            className={styles.mobileLeadImg}
          />
          <div className={styles.mobileLeadOverlay}>
            <span className={styles.mobileLeadPill}>EST. 2014</span>
            <div>
              <div className={styles.mobileLeadKicker}>THE JOURNEY</div>
              <div className={styles.mobileLeadHeadline}>
                From Kochi to Continental Ambition
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className={styles.mobileTimelineList}>
          <div className={styles.mobileVerticalLine} aria-hidden="true" />
          {steppedMilestones.map((m) => (
            <div key={m.id} className={styles.mobileMilestoneItem}>
              {/* Connector Dot */}
              <div className={styles.mobileMarkerDot} aria-hidden="true" />

              {/* Card Body */}
              <div className={styles.mobileCardContent}>
                <div className={styles.mobileCardMeta}>
                  <span className={styles.mobileYear}>{m.year}</span>
                  <span className={styles.mobileMonth}>{m.month}</span>
                </div>
                <h3 className={styles.mobileMilestoneTitle}>{m.title}</h3>
                <div className={styles.mobileSlangQuote}>{m.slangQuote}</div>
                <p className={styles.mobileMilestoneDesc}>{m.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
export { RoadmapSection as Timeline };
