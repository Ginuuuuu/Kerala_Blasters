import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { FloatingNav } from '@/components/navigation';
import { TypographicFooter } from '@/components/footer';

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

      {/* Large Typographic Football Footer */}
      <TypographicFooter />
    </div>
  );
};
