import React from 'react';
import styles from './OverlappingIntro.module.css';

interface RunnerUpHonour {
  number: string;
  season: string;
  year: string;
  title: string;
  venue: string;
  detail: string;
}

const islRunnersUp: RunnerUpHonour[] = [
  {
    number: '1.',
    season: 'SEASON 01',
    year: '2014',
    title: 'ISL RUNNERS-UP',
    venue: 'DY Patil Stadium',
    detail: 'Inaugural ISL Finalists after an electric playoff charge.',
  },
  {
    number: '2.',
    season: 'SEASON 03',
    year: '2016',
    title: 'ISL RUNNERS-UP',
    venue: 'JLN Stadium, Kochi',
    detail: 'Historic Kochi final roared on by 65,000 yellow sea supporters.',
  },
  {
    number: '3.',
    season: 'SEASON 07',
    year: '2021',
    title: 'ISL RUNNERS-UP',
    venue: 'Fatorda Stadium',
    detail: 'Resilient campaign and heroic playoff surge in Goa.',
  },
  {
    number: '4.',
    season: 'SEASON 08',
    year: '2022',
    title: 'ISL RUNNERS-UP',
    venue: 'Fatorda Stadium, Goa',
    detail: 'Modern tactical masterclass settled on penalty shootout heartbreak.',
  },
];

export const OverlappingIntro: React.FC = () => {
  return (
    <section
      id="what-we-stand-for"
      className={styles.overlappingSection}
      aria-label="Kerala Blasters FC Honours"
    >
      <div className={styles.standForWrapper}>
        {/* Big Text: QUIETLY COOKED spanning edge to edge in footer grey */}
        <h2 className={styles.standForTitle}>QUIETLY COOKED</h2>

        {/* Downward List of Achievements: 1. 2. 3. 4. */}
        <div className={styles.honoursContainer}>
          <div className={styles.honoursHeader}>
            <span className={styles.honoursSub}>[INDIAN SUPER LEAGUE]</span>
            <span className={styles.honoursBadge}>RUNNERS-UP HONOURS</span>
          </div>

          <div className={styles.honoursList}>
            {islRunnersUp.map((item) => (
              <div key={item.year} className={styles.honourRow}>
                <div className={styles.numCol}>
                  <span className={styles.itemNumber}>{item.number}</span>
                </div>

                <div className={styles.yearCol}>
                  <span className={styles.itemYear}>{item.year}</span>
                  <span className={styles.itemSeason}>{item.season}</span>
                </div>

                <div className={styles.contentCol}>
                  <div className={styles.titleLine}>
                    <span className={styles.itemTitle}>{item.title}</span>
                  </div>
                  <p className={styles.itemDetail}>{item.detail}</p>
                </div>

                <div className={styles.venueCol}>
                  <span className={styles.venueLabel}>FINAL VENUE</span>
                  <span className={styles.itemVenue}>{item.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverlappingIntro;

