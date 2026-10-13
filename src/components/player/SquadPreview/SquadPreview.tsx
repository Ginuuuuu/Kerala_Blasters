import React, { useState } from 'react';
import styles from './SquadPreview.module.css';
import { Container, Button } from '@/components/ui';
import { PlayerCard } from '../PlayerCard/PlayerCard';
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

export const SquadPreview: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<'All' | PlayerPosition>('All');

  const filteredPlayers = squadDemoData.filter((player) => {
    if (selectedPosition === 'All') return true;
    return player.position === selectedPosition;
  });

  return (
    <section className={styles.squadSection} aria-label="First Team Squad">
      <Container size="wide">
        {/* Header Bar */}
        <div className={styles.headerBar}>
          <div>
            <div className="text-eyebrow text-eyebrow-accent" style={{ marginBottom: '0.5rem' }}>
              FIRST TEAM • 2024–25
            </div>
            <h2 className="text-display-section">
              The <span className="text-editorial-italic">Squad</span>
            </h2>
            <p className="text-body" style={{ color: 'var(--color-grey-medium)', marginTop: '0.5rem', maxWidth: '52ch' }}>
              High press, tactical cohesion, and unwavering commitment to the crest on the chest.
            </p>
          </div>

          {/* Position Filter Pills */}
          <div className={styles.filterTabs} role="tablist" aria-label="Filter squad by position">
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
        </div>

        {/* Squad Grid */}
        <div className={styles.squadGrid}>
          {filteredPlayers.slice(0, 8).map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {/* View All Roster CTA */}
        <div className={styles.footerBar}>
          <Button href="/team" variant="primary" size="lg">
            Explore Complete Roster
          </Button>
        </div>
      </Container>
    </section>
  );
};
