import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PlayerPage.module.css';
import { Container, Button, Badge } from '@/components/ui';
import { squadDemoData } from '@/content/team';

export const PlayerPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const currentIndex = squadDemoData.findIndex((p) => p.slug === slug);
  const player = squadDemoData[currentIndex];

  if (!player) {
    return (
      <div className={styles.pageRoot}>
        <Container>
          <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
            <span className="text-eyebrow text-eyebrow-accent">Roster Lookup</span>
            <h1 className="h1" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              Player Not Found
            </h1>
            <p className="text-body" style={{ color: 'var(--color-grey-medium)', marginBottom: '2rem' }}>
              The squad member profile you are looking for is not listed in the active campaign roster.
            </p>
            <Button href="/team" variant="primary" size="lg">
              Return to The Squad
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Prev / Next player links
  const prevPlayer = currentIndex > 0 ? squadDemoData[currentIndex - 1] : squadDemoData[squadDemoData.length - 1];
  const nextPlayer = currentIndex < squadDemoData.length - 1 ? squadDemoData[currentIndex + 1] : squadDemoData[0];

  return (
    <div className={styles.pageRoot}>
      <Container size="wide">
        {/* Top Navigation Bar */}
        <div className={styles.topNavigation}>
          <Link to="/team" className={styles.backLink}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to The Squad</span>
          </Link>

          <div className={styles.playerNavButtons}>
            <Link
              to={`/team/${prevPlayer.slug}`}
              className={styles.playerNavBtn}
              aria-label={`Previous player: ${prevPlayer.name}`}
              title={`Previous: ${prevPlayer.name}`}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </Link>
            <Link
              to={`/team/${nextPlayer.slug}`}
              className={styles.playerNavBtn}
              aria-label={`Next player: ${nextPlayer.name}`}
              title={`Next: ${nextPlayer.name}`}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Profile Grid */}
        <div className={styles.profileGrid}>
          {/* Left Column: Portrait Card */}
          <div className={styles.imageCard}>
            <img
              src={player.photo.src}
              alt={player.photo.alt}
              loading="eager"
              decoding="async"
              className={styles.playerImage}
            />
            <span className={styles.shirtNumberWatermark} aria-hidden="true">
              #{player.number}
            </span>
          </div>

          {/* Right Column: Player Profile Details */}
          <div className={styles.infoColumn}>
            {/* Badges Header */}
            <div className={styles.badgeHeader}>
              <Badge variant="dark">#{player.number}</Badge>
              <Badge variant="default">{player.position}</Badge>
              {player.isCaptain && <Badge variant="accent">Captain</Badge>}
              {player.isViceCaptain && <Badge variant="accent">Vice Captain</Badge>}
            </div>

            {/* Name */}
            <div>
              <div className="text-eyebrow text-eyebrow-accent" style={{ marginBottom: '0.25rem' }}>
                {player.nationality}
              </div>
              <h1 className={styles.playerHeading}>{player.name}</h1>
            </div>

            {/* Factual Profile Bio */}
            <div className={styles.bioBlock}>
              {player.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Verified / Demo Stats Box */}
            <div className={styles.statsSection}>
              <div className={styles.statsHeader}>
                <span className={styles.statsTitle}>Campaign Metrics</span>
                <Badge variant="accent">Demo Stats</Badge>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{player.stats.appearances}</span>
                  <span className={styles.statLabel}>Appearances</span>
                </div>

                <div className={styles.statItem}>
                  <span className={styles.statValue}>{player.stats.goals}</span>
                  <span className={styles.statLabel}>Goals</span>
                </div>

                {player.stats.assists !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{player.stats.assists}</span>
                    <span className={styles.statLabel}>Assists</span>
                  </div>
                )}

                {player.stats.cleanSheets !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{player.stats.cleanSheets}</span>
                    <span className={styles.statLabel}>Clean Sheets</span>
                  </div>
                )}

                {player.stats.minutesPlayed !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{player.stats.minutesPlayed.toLocaleString()}</span>
                    <span className={styles.statLabel}>Minutes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Player Facts */}
            <div className={styles.factsGrid}>
              <div className={styles.factItem}>
                <span className={styles.factLabel}>Nationality</span>
                <span className={styles.factValue}>{player.nationality}</span>
              </div>

              <div className={styles.factItem}>
                <span className={styles.factLabel}>Position</span>
                <span className={styles.factValue}>{player.position}</span>
              </div>

              {player.joinedYear && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Joined Club</span>
                  <span className={styles.factValue}>{player.joinedYear}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
