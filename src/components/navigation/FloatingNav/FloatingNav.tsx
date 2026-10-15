import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import styles from './FloatingNav.module.css';
import { cn } from '@/utils/classNames';

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const NAV_LINKS = [
  { label: 'THE SQUAD', href: '/team' },
  { label: 'MATCH CENTRE', href: '/matches' },
  { label: 'STORIES & NEWS', href: '/news' },
  { label: 'CLUB & HISTORY', href: '/club' },
  { label: 'ROADMAP', href: '/#roadmap' },
  { label: 'TICKETS', href: '/matches' },
  { label: 'CONTACT', href: '/#footer' },
];

export const FloatingNav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  // Dynamic countdown initialized to ~70 days to match the visual reference
  const targetKickoffRef = useRef<number>(
    Date.now() + (70 * 24 * 60 * 60 + 1 * 60 * 60 + 40 * 60 + 36) * 1000
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: '70',
    hours: '01',
    minutes: '40',
    seconds: '36',
  });

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  // Reset video playback when menu card collapses
  useEffect(() => {
    if (!isExpanded) {
      setIsPlayingVideo(false);
    }
  }, [isExpanded]);

  // Dynamic countdown timer ticking every second
  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetKickoffRef.current - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Outside click & Escape key listener to smoothly collapse back into the pill
  useEffect(() => {
    if (!isExpanded) return;

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  const handleOpen = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    triggerRef.current?.focus();
  };

  const handleLinkClick = (href: string) => {
    setIsExpanded(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (pathname === '/') {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  };

  return (
    <header className={styles.navContainer}>
      <nav
        ref={cardRef}
        className={cn(
          styles.navCard,
          isExpanded ? styles.cardExpanded : styles.cardCollapsed
        )}
        aria-label="Main Navigation"
        role={isExpanded ? 'dialog' : 'navigation'}
        aria-modal={isExpanded ? 'true' : undefined}
      >
        {/* Top Header Row (Present in both Collapsed and Expanded states) */}
        <div className={styles.topRow}>
          {/* Brand Wordmark: only the word KERALA */}
          <Link
            to="/"
            onClick={() => handleLinkClick('/')}
            className={styles.brandLink}
            aria-label="Kerala Blasters FC Home"
          >
            <span className={styles.brandOverline} aria-hidden="true" />
            <span className={styles.brandText}>KERALA</span>
          </Link>

          {isExpanded ? (
            /* × Close Icon Button in Expanded State */
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeBtn}
              onClick={handleClose}
              aria-label="Close navigation menu"
            >
              <X size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          ) : (
            /* Stepped 3-Line Hamburger Trigger in Collapsed State */
            <button
              ref={triggerRef}
              type="button"
              className={styles.menuTrigger}
              onClick={handleOpen}
              aria-expanded={false}
              aria-label="Open site navigation menu"
            >
              <span className={styles.menuIcon} aria-hidden="true">
                <span className={styles.menuLineLong} />
                <span className={styles.menuLineShort} />
                <span className={styles.menuLineLong} />
              </span>
            </button>
          )}
        </div>

        {/* Expanded Menu Body (Morphed in-place without background blur) */}
        {isExpanded && (
          <div className={styles.expandedBody}>
            {/* Middle Section: Navigation Links (Left) + Media Preview Card (Right) */}
            <div className={styles.middleSection}>
              <div className={styles.navLinks} role="menu">
                {NAV_LINKS.map((item) => {
                  const isActive =
                    item.href === pathname ||
                    (item.href.startsWith('/#') && pathname === '/');
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={cn(
                        styles.navLinkItem,
                        isActive && styles.navLinkActive
                      )}
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Media Preview Card — Hero01 image, plays Hero02 video inline in place on click */}
              <div
                className={styles.mediaCard}
                onClick={() => {
                  if (!isPlayingVideo) {
                    setIsPlayingVideo(true);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsPlayingVideo(true);
                  }
                }}
                aria-label={isPlayingVideo ? 'Playing Kerala Blasters video' : 'Click to play Kerala Blasters video'}
              >
                {isPlayingVideo ? (
                  <div className={styles.videoPlayerWrapper}>
                    <video
                      ref={inlineVideoRef}
                      src="/Assets/Hero02.mp4"
                      autoPlay
                      controls
                      playsInline
                      className={styles.inlineVideo}
                    />
                    <button
                      type="button"
                      className={styles.closeVideoBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlayingVideo(false);
                      }}
                      aria-label="Return to image"
                      title="Return to image"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src="/Assets/Hero01.jpg"
                      alt="Kerala Blasters FC Stadium & Team"
                      className={styles.mediaImg}
                      loading="eager"
                    />
                    <div className={styles.mediaOverlay}>
                      {/* Centered Hexagonal 6-Dot Indicator */}
                      <div className={styles.dotRingWrapper} aria-hidden="true">
                        <svg
                          className={styles.dotRing}
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <circle cx="18" cy="4" r="2.5" fill="#FFFFFF" />
                          <circle cx="30.1" cy="11" r="2.5" fill="#FFFFFF" />
                          <circle cx="30.1" cy="25" r="2.5" fill="#FFFFFF" />
                          <circle cx="18" cy="32" r="2.5" fill="#FFFFFF" />
                          <circle cx="5.9" cy="25" r="2.5" fill="#FFFFFF" />
                          <circle cx="5.9" cy="11" r="2.5" fill="#FFFFFF" />
                        </svg>
                      </div>
                      <span className={styles.mediaLabel}>Our Story</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Hairline Divider */}
            <div className={styles.divider} aria-hidden="true" />

            {/* Bottom Footer Row */}
            <div className={styles.bottomRow}>
              <div className={styles.tagline}>
                THE PRIDE OF KERALA FOOTBALL.
              </div>

              <div className={styles.countdownWrapper}>
                <div className={styles.statusIndicator}>
                  <span className={styles.pulseDot} aria-hidden="true" />
                  <span className={styles.statusText}>Time Until Launch</span>
                </div>

                <div
                  className={styles.countdownClock}
                  aria-label="Countdown until kickoff"
                >
                  <div className={styles.digitCol}>
                    <span className={styles.num}>{timeLeft.days}</span>
                    <span className={styles.lbl}>DAYS</span>
                  </div>
                  <span className={styles.colon} aria-hidden="true">
                    :
                  </span>
                  <div className={styles.digitCol}>
                    <span className={styles.num}>{timeLeft.hours}</span>
                    <span className={styles.lbl}>HRS</span>
                  </div>
                  <span className={styles.colon} aria-hidden="true">
                    :
                  </span>
                  <div className={styles.digitCol}>
                    <span className={styles.num}>{timeLeft.minutes}</span>
                    <span className={styles.lbl}>MIN</span>
                  </div>
                  <span className={styles.colon} aria-hidden="true">
                    :
                  </span>
                  <div className={styles.digitCol}>
                    <span className={styles.num}>{timeLeft.seconds}</span>
                    <span className={styles.lbl}>SEC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default FloatingNav;
