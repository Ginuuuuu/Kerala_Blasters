import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Container } from '@/components/ui';
import { FloatingNav } from '@/components/navigation';
import { navigationContent } from '@/content/navigation';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.shell}>
      {/* Accessible skip link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* Floating Pill Navigation */}
      <FloatingNav />

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
