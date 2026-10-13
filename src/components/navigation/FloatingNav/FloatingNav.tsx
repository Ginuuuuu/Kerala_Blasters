import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import styles from './FloatingNav.module.css';
import { cn } from '@/utils/classNames';
import { navigationContent } from '@/content/navigation';
import { NavPanel } from '../NavPanel/NavPanel';

export const FloatingNav: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <>
      <header className={styles.floatingContainer}>
        <nav className={styles.navPill} aria-label="Main Navigation">
          {/* Brand Wordmark */}
          <Link to="/" className={styles.brandLink} aria-label="Kerala Blasters FC Home">
            <span>{navigationContent.brand.name}</span>
            <span className={styles.brandDot} aria-hidden="true" />
          </Link>

          {/* Quick desktop links */}
          <div className={styles.desktopLinks}>
            {navigationContent.routes.slice(0, 4).map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.id}
                  to={route.path}
                  className={cn(styles.navLink, isActive && styles.navLinkActive)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {route.label}
                </Link>
              );
            })}
          </div>

          {/* Expand Menu Trigger */}
          <button
            ref={triggerRef}
            type="button"
            className={styles.menuTrigger}
            onClick={handleOpenPanel}
            aria-expanded={isPanelOpen}
            aria-haspopup="dialog"
            aria-label="Open full site navigation"
          >
            <span>Menu</span>
            <Menu size={16} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* Expanded Modal Nav Panel */}
      <NavPanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        triggerRef={triggerRef}
      />
    </>
  );
};
