import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TypographicFooter.module.css';
import { Container } from '@/components/ui';

export const TypographicFooter: React.FC = () => {
  const [time, setTime] = useState(new Date());

  // Dynamic analog clock ticking live in real time
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = (((hours % 12) + minutes / 60) / 12) * 360;

  return (
    <footer id="footer" className={styles.footerRoot} aria-label="Site Footer">
      <Container size="wide">
        {/* Tier 1: Top Disclaimer / Pre-Footer Banner */}
        <div className={styles.preFooterRow}>
          <div className={styles.preFooterCol}>
            <p className={styles.preFooterText}>
              A FEW LINES ABOUT WHAT WE STAND FOR, AND OUR COMMITTED ROADMAP.
              <br />
              FROM THE FIRST MINUTE TO THE FINAL WHISTLE, ONE PASSION.
            </p>
          </div>
          <div className={styles.preFooterCol}>
            <p className={styles.preFooterText}>
              INDEPENDENT DIGITAL CONCEPT EXPERIENCE FOR KERALA BLASTERS FC.
              <br />
              ESTABLISHED IN KOCHI, KERALA • EST. 2014.
            </p>
          </div>
        </div>

        {/* Tier 2: 4-Column Navigation & Live Status Grid */}
        <div className={styles.fourColGrid}>
          {/* Column 1: [INDEX] */}
          <div>
            <span className={styles.colHeader}>[INDEX]</span>
            <ul className={styles.linksList}>
              <li>
                <Link to="/" className={styles.footerLink}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/team" className={styles.footerLink}>
                  THE SQUAD
                </Link>
              </li>
              <li>
                <Link to="/matches" className={styles.footerLink}>
                  MATCH CENTRE
                </Link>
              </li>
              <li>
                <Link to="/news" className={styles.footerLink}>
                  STORIES & NEWS
                </Link>
              </li>
              <li>
                <Link to="/club" className={styles.footerLink}>
                  CLUB & HISTORY
                </Link>
              </li>
              <li>
                <a href="#roadmap" className={styles.footerLink}>
                  ROADMAP
                </a>
              </li>
              <li>
                <a href="#footer" className={styles.footerLink}>
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: [CLUB] */}
          <div>
            <span className={styles.colHeader}>[CLUB]</span>
            <div className={styles.clubInfo}>
              <div>
                <h3 className={styles.clubCity}>KOCHI, KERALA</h3>
                <div className={styles.clubContact}>
                  <a
                    href="mailto:media@keralablasters.in"
                    className={styles.contactEmail}
                  >
                    MEDIA@KERALABLASTERS.IN
                  </a>
                  <span className={styles.contactDetail}>
                    JAWAHARLAL NEHRU STADIUM
                  </span>
                </div>
              </div>
              <div className={styles.clubHours}>
                MATCHDAYS, KALOOR, KOCHI • EST. 2014
              </div>
            </div>
          </div>

          {/* Column 3: [SOCIALS] */}
          <div>
            <span className={styles.colHeader}>[SOCIALS]</span>
            <ul className={styles.socialsList}>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  X (TWITTER)
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  YOUTUBE
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  FACEBOOK
                </a>
              </li>
              <li>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  DRIBBBLE
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: [RIGHT NOW] — Analog Clock & Matchday Status */}
          <div>
            <span className={styles.colHeader}>[RIGHT NOW]</span>
            <div className={styles.clockContainer}>
              {/* Live Analog Clock Face */}
              <svg
                width="76"
                height="76"
                viewBox="0 0 76 76"
                className={styles.clockSvg}
                aria-label="Current time in Kochi"
              >
                {/* Dial boundary */}
                <circle
                  cx="38"
                  cy="38"
                  r="34"
                  fill="none"
                  stroke="#E8E8E8"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />

                {/* 12 dial hour ticks */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 38 + 29 * Math.sin(angle);
                  const y1 = 38 - 29 * Math.cos(angle);
                  const x2 = 38 + 33 * Math.sin(angle);
                  const y2 = 38 - 33 * Math.cos(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={i % 3 === 0 ? '#111111' : '#CCCCCC'}
                      strokeWidth={i % 3 === 0 ? 1.5 : 1}
                    />
                  );
                })}

                {/* Hour hand */}
                <line
                  x1="38"
                  y1="38"
                  x2={38 + 17 * Math.sin((hourDegrees * Math.PI) / 180)}
                  y2={38 - 17 * Math.cos((hourDegrees * Math.PI) / 180)}
                  stroke="#111111"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Minute hand */}
                <line
                  x1="38"
                  y1="38"
                  x2={38 + 24 * Math.sin((minuteDegrees * Math.PI) / 180)}
                  y2={38 - 24 * Math.cos((minuteDegrees * Math.PI) / 180)}
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Second hand */}
                <line
                  x1="38"
                  y1="38"
                  x2={38 + 26 * Math.sin((secondDegrees * Math.PI) / 180)}
                  y2={38 - 26 * Math.cos((secondDegrees * Math.PI) / 180)}
                  stroke="#DDA477"
                  strokeWidth="1"
                  strokeLinecap="round"
                />

                {/* Center pivot */}
                <circle cx="38" cy="38" r="2.5" fill="#111111" />
              </svg>

              {/* Status indicator */}
              <div className={styles.kickoffStatus}>
                <span className={styles.statusPulseDot} aria-hidden="true" />
                <span>NEXT KICKOFF, NOV 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: Giant Monodrift-Style Typographic Wordmark */}
        <div className={styles.giantWordmarkWrapper} aria-hidden="true">
          <div className={styles.giantWordmark}>
            <span>KERALA BLASTERS</span>
            <span className={styles.chevronArrow}>»»</span>
          </div>
        </div>

        {/* Tier 4: Bottom Legal & Copyright Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightText}>
            © {new Date().getFullYear()} KERALA BLASTERS FC — ALL RIGHTS, ALL WORKS.
          </div>

          <div className={styles.legalLinks}>
            <Link to="/club" className={styles.legalLink}>
              TERMS & CONDITIONS
            </Link>
            <Link to="/club" className={styles.legalLink}>
              PRIVACY POLICY
            </Link>
          </div>

          <div className={styles.attribution}>
            CONCEPT EXPERIENCE • KOCHI, INDIA
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default TypographicFooter;
