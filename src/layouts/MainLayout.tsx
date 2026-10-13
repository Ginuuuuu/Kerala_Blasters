import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Container } from '@/components/ui';
import { navigationContent } from '@/content/navigation';

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.shell}>
      {/* Accessible skip link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* Floating Nav Shell (Foundation for Phase 2 full implementation) */}
      <header className={styles.headerPlaceholder}>
        <nav className={styles.navPillPreview} aria-label="Main Navigation">
          <Link to="/" className={styles.navBrand}>
            <span>{navigationContent.brand.name}</span>
            <span className={styles.navBrandDot} aria-hidden="true" />
          </Link>
          <div className={styles.navLinksPreview}>
            {navigationContent.routes.map((route) => (
              <Link
                key={route.id}
                to={route.path}
                style={{
                  color: pathname === route.path ? 'var(--color-orange-contrast)' : undefined,
                  fontWeight: pathname === route.path ? 600 : 400,
                }}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Main page content landmark */}
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>

      {/* Footer foundation (Placeholder for Phase 11 typographic footer) */}
      <footer className={styles.footerStub}>
        <Container>
          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} Kerala Blasters FC Concept Experience.</p>
            <p>{navigationContent.legalNotice}</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};
