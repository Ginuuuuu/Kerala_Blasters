import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import styles from './NavPanel.module.css';
import { cn } from '@/utils/classNames';
import { useScrollLock } from '@/hooks/useScrollLock';

export interface NavPanelProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// Uppercase concise navigation links matching reference layout
const NAV_LINKS = [
  { label: 'THE SQUAD', href: '/team' },
  { label: 'MATCH CENTRE', href: '/matches' },
  { label: 'STORIES & NEWS', href: '/news' },
  { label: 'CLUB & HISTORY', href: '/club' },
  { label: 'ROADMAP', href: '/#roadmap' },
  { label: 'TICKETS', href: '/matches' },
  { label: 'CONTACT', href: '/#footer' },
];

export const NavPanel: React.FC<NavPanelProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when panel is open
  useScrollLock(isOpen);

  // Dynamic countdown initialized to match the visual reference (~70 days)
  const targetKickoffRef = useRef<number>(
    Date.now() + (70 * 24 * 60 * 60 + 1 * 60 * 60 + 53 * 60 + 2) * 1000
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: '70',
    hours: '01',
    minutes: '53',
    seconds: '02',
  });

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  // Reset video when panel closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlayingVideo(false);
    }
  }, [isOpen]);

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

  // Keyboard navigation & Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      // Trap focus inside modal
      if (event.key === 'Tab' && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  const handleLinkClick = (href: string) => {
    onClose();
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
    <div
      className={cn(styles.backdrop, isOpen && styles.backdropOpen)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!isOpen}
    >
      <div
        ref={panelRef}
        className={cn(styles.card, isOpen && styles.cardOpen)}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
      >
        {/* Top Header: Wordmark Logo + Clean Close Icon */}
        <div className={styles.topRow}>
          <Link
            to="/"
            onClick={() => handleLinkClick('/')}
            className={styles.logoLink}
            aria-label="Kerala Blasters FC Home"
          >
            <span className={styles.logoText}>kbfc</span>
            <span className={styles.logoDegree}>°</span>
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Middle Body: Left Navigation Links + Right Media Card */}
        <div className={styles.middleSection}>
          {/* Left Column: Uppercase Navigation Links */}
          <nav className={styles.navLinks} aria-label="Site navigation links">
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
                    isActive && pathname === item.href && styles.navLinkActive
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Column: Media Preview Card — Hero01 image, plays Hero02 video inline in place on click */}
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

        {/* Hairline Divider Line */}
        <div className={styles.divider} />

        {/* Bottom Footer Row: Tagline + Status & Live Countdown Clock */}
        <div className={styles.bottomRow}>
          <div className={styles.tagline}>
            THE PRIDE OF KERALA FOOTBALL.
          </div>

          <div className={styles.countdownWrapper}>
            <div className={styles.statusIndicator}>
              <span className={styles.pulseDot} aria-hidden="true" />
              <span className={styles.statusText}>Time Until Kickoff</span>
            </div>

            <div
              className={styles.countdownClock}
              aria-label="Countdown until next kickoff"
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
    </div>
  );
};
