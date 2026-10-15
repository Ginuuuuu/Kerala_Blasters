import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PlayerCard.module.css';
import { cn } from '@/utils/classNames';
import { Player } from '@/types/team';

export interface PlayerCardProps {
  player: Player;
  className?: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, className }) => {
  return (
    <Link
      to={`/team/${player.slug}`}
      className={cn(styles.card, className)}
      aria-label={`View profile for ${player.name}, #${player.number}, ${player.position}`}
    >
      {/* Background Image */}
      <div className={styles.imageWrapper}>
        <img
          src={player.photo.src}
          alt={player.photo.alt}
          loading="lazy"
          decoding="async"
          className={styles.image}
          onError={(e) => {
            e.currentTarget.src = '/images/player-placeholder.svg';
          }}
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      {/* Watermark Shirt Number */}
      <span className={styles.numberWatermark} aria-hidden="true">
        #{player.number}
      </span>

      {/* Content Frame */}
      <div className={styles.content}>
        <div className={styles.badgeRow}>
          <span className={styles.positionBadge}>{player.position}</span>
          {player.isCaptain && <span className={styles.captainBadge}>Captain</span>}
        </div>

        <h3 className={styles.playerName}>{player.name}</h3>

        <div className={styles.playerMeta}>
          <span>{player.nationality}</span>
          <span className={styles.metaDivider}>•</span>
          <span>{player.stats.appearances} Apps</span>
          {player.stats.goals > 0 && (
            <>
              <span className={styles.metaDivider}>•</span>
              <span>{player.stats.goals} Goals</span>
            </>
          )}
        </div>
      </div>

      {/* Hover Accent Underline */}
      <div className={styles.accentLine} aria-hidden="true" />
    </Link>
  );
};
