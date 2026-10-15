import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import styles from './TypographicFooter.module.css';
import { Container } from '@/components/ui';
import { navigationContent } from '@/content/navigation';

export const TypographicFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footerRoot} aria-label="Site Footer">
      <Container size="wide">
        {/* Large Typographic Wordmark */}
        <div className={styles.giantWordmarkWrapper} aria-hidden="true">
          <div className={styles.giantWordmark}>FOOTBALL</div>
        </div>

        {/* Structured Footer Content Grid */}
        <div className={styles.footerGrid}>
          {/* Identity & Legal Disclaimer */}
          <div className={styles.brandColumn}>
            <div className={styles.brandHeading}>
              <span>{navigationContent.brand.name}</span>
              <span className={styles.brandDot} aria-hidden="true" />
            </div>
            <div className={styles.brandLocation}>
              Jawaharlal Nehru Stadium, Kaloor, Kochi
              <br />
              Kerala, India • Established {navigationContent.brand.founded}
            </div>
            <p className={styles.conceptNotice}>
              {navigationContent.legalNotice}
            </p>
          </div>

          {/* Primary Navigation */}
          <div className={styles.navColumn}>
            <span className={styles.columnTitle}>Club</span>
            <ul className={styles.linkList}>
              <li>
                <Link to="/team" className={styles.footerLink}>
                  The Squad
                </Link>
              </li>
              <li>
                <Link to="/matches" className={styles.footerLink}>
                  Match Centre
                </Link>
              </li>
              <li>
                <Link to="/news" className={styles.footerLink}>
                  Stories & News
                </Link>
              </li>
              <li>
                <Link to="/club" className={styles.footerLink}>
                  Club & History
                </Link>
              </li>
            </ul>
          </div>

          {/* Matchday Information */}
          <div className={styles.navColumn}>
            <span className={styles.columnTitle}>Matchday</span>
            <ul className={styles.linkList}>
              <li>
                <Link to="/matches" className={styles.footerLink}>
                  Upcoming Fixtures
                </Link>
              </li>
              <li>
                <Link to="/matches" className={styles.footerLink}>
                  Recent Results
                </Link>
              </li>
              <li>
                <Link to="/club" className={styles.footerLink}>
                  Kochi Fortress Guide
                </Link>
              </li>
              <li>
                <Link to="/club" className={styles.footerLink}>
                  Honours Cabinet
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className={styles.navColumn}>
            <span className={styles.columnTitle}>Yellow Army</span>
            <div className={styles.socialList}>
              {navigationContent.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialPill}
                  aria-label={`Official ${social.platform} channel (opens in new tab)`}
                >
                  <span>{social.platform}</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightText}>
            © {new Date().getFullYear()} Kerala Blasters FC Concept Experience. All rights reserved.
          </div>

          <button
            type="button"
            className={styles.backToTopButton}
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  );
};
