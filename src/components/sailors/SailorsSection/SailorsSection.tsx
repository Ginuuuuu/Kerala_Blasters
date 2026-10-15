import React from 'react';
import styles from './SailorsSection.module.css';

export interface SailorsSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}

export const SailorsSection: React.FC<SailorsSectionProps> = ({
  title = 'SAILORS',
  subtitle = 'The Sailors',
  badge = '[ SAILORS ]',
  children,
}) => {
  return (
    <section
      id="sailors-section"
      className={styles.sailorsSection}
      aria-label="Kerala Blasters FC Sailors"
    >
      <div className={styles.pageContainer}>
        {/* Header: Title and Sailors */}
        <header className={styles.sectionHeader}>
          <div className={styles.metaRow}>
            <span className={styles.badge}>{badge}</span>
            <span className={styles.kicker}>KERALA BLASTERS FC</span>
          </div>

          <div className={styles.titleGroup}>
            <h2 className={styles.mainTitle}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </header>

        {/* Complete page left empty, reserving full flexible space for upcoming content */}
        <div className={styles.contentStage} aria-label="Reserved content area">
          {children ? (
            children
          ) : (
            <div className={styles.emptyContentSpace} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SailorsSection;
