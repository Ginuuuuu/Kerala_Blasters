import React, { useState } from 'react';
import styles from './TeamPage.module.css';
import { Container, Heading, Badge } from '@/components/ui';
import { PlayerCard } from '@/components/player';
import { squadDemoData } from '@/content/team';
import { PlayerPosition } from '@/types/team';
import { cn } from '@/utils/classNames';

const POSITIONS: Array<'All' | PlayerPosition> = [
  'All',
  'Forward',
  'Midfielder',
  'Defender',
  'Goalkeeper',
];

export const TeamPage: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<'All' | PlayerPosition>('All');

  const filteredPlayers = squadDemoData.filter((player) => {
    if (selectedPosition === 'All') return true;
    return player.position === selectedPosition;
  });

  return (
    <div className={styles.pageRoot}>
      {/* Editorial Header */}
      <section className={styles.headerSection}>
        <Container size="wide">
          <div className={styles.headerTop}>
            <div className="text-eyebrow text-eyebrow-accent">
              KERALA BLASTERS FC • FIRST TEAM
            </div>
            <Badge variant="accent">Season 2024–25</Badge>
          </div>

          <Heading
            level="h1"
            displayStyle="hero"
            subtitle="The complete first-team roster representing Kerala Blasters FC in national and continental football."
          >
            The <span className="text-editorial-italic">Squad.</span>
          </Heading>

          {/* Position Filters & Count */}
          <div className={styles.filterBar}>
            <div className={styles.filterPills} role="tablist" aria-label="Filter squad roster">
              {POSITIONS.map((pos) => {
                const isActive = selectedPosition === pos;
                return (
                  <button
                    key={pos}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={cn(styles.filterPill, isActive && styles.filterPillActive)}
                    onClick={() => setSelectedPosition(pos)}
                  >
                    {pos === 'All' ? 'All Positions' : `${pos}s`}
                  </button>
                );
              })}
            </div>

            <div className={styles.rosterCount}>
              Showing <strong>{filteredPlayers.length}</strong> players
            </div>
          </div>
        </Container>
      </section>

      {/* Squad Grid */}
      <section className={styles.gridSection}>
        <Container size="wide">
          <div className={styles.rosterGrid}>
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>

          {/* Demo Data Disclaimer */}
          <div className={styles.demoDisclaimer}>
            <Badge variant="default">Demo Content Layer</Badge>
            <p className="text-caption">
              Player metrics and media shown during development are curated concept representations. Official verified profiles will connect via the club CMS.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};
