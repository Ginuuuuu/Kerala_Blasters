import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import styles from './NavPanel.module.css';
import { cn } from '@/utils/classNames';
import { navigationContent } from '@/content/navigation';
import { useScrollLock } from '@/hooks/useScrollLock';

export interface NavPanelProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

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
      // Return focus to trigger button
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

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
        className={cn(styles.panel, isOpen && styles.panelOpen)}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.brand}>
            <span>{navigationContent.brand.name}</span>
            <span className={styles.brandDot} aria-hidden="true" />
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <span>Close</span>
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Main Links */}
          <nav className={styles.routesList} aria-label="Expanded Navigation">
            {navigationContent.routes.map((route, index) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.id}
                  to={route.path}
                  onClick={onClose}
                  className={cn(styles.routeItem, isActive && styles.routeActive)}
                >
                  <span className={styles.routeNumber}>
                    {route.eyebrow || `0${index + 1}`}
                  </span>
                  <span className={styles.routeLabel}>{route.label}</span>
                  {route.badge && (
                    <span className={styles.routeBadge}>{route.badge}</span>
                  )}
                  <ArrowRight
                    size={20}
                    style={{
                      marginLeft: 'auto',
                      opacity: isActive ? 1 : 0.4,
                      color: isActive ? 'var(--color-orange-contrast)' : 'inherit',
                    }}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Highlight */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarEyebrow}>Next Matchday</div>
              <div className={styles.sidebarTitle}>KBFC vs Bengaluru FC</div>
              <div className={styles.sidebarDetail}>
                Jawaharlal Nehru Stadium, Kochi • Sunday 19:30 IST
              </div>
              <Link
                to="/matches"
                onClick={onClose}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8125rem',
                  color: 'var(--color-orange-contrast)',
                  fontWeight: 600,
                  marginTop: '0.75rem',
                }}
              >
                <span>View Match Centre</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div className={styles.socialSection}>
              <span className={styles.socialLabel}>Follow the Yellow Army</span>
              <div className={styles.socialLinks}>
                {navigationContent.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialButton}
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span>{navigationContent.brand.subtext}</span>
          <span>{navigationContent.legalNotice}</span>
        </div>
      </div>
    </div>
  );
};
