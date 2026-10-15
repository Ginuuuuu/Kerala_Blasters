import React from 'react';
import styles from './Hero03Banner.module.css';

export interface Hero03BannerProps {
  imageUrl?: string;
  imageAlt?: string;
  topLeftText?: string;
  bottomRightText?: string;
}

export const Hero03Banner: React.FC<Hero03BannerProps> = ({
  imageUrl = '/Assets/Hero03.jpg',
  imageAlt = 'Kerala Blasters FC First Team in Sharp Tailored Attire',
  topLeftText = 'KERALA',
  bottomRightText = 'BLASTERS',
}) => {
  return (
    <section
      id="squad-banner"
      className={styles.hero03Banner}
      aria-label="Kerala Blasters FC Team Banner"
    >
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className={styles.bannerImage}
          loading="eager"
          decoding="async"
        />
        <div className={styles.cinematicOverlay} aria-hidden="true" />
        <div className={styles.vignetteOverlay} aria-hidden="true" />
      </div>

      {/* Top Left: KERALA */}
      <div className={styles.topLeftCorner}>
        <h2 className={styles.cornerText}>{topLeftText}</h2>
      </div>

      {/* Bottom Right: BLASTERS */}
      <div className={styles.bottomRightCorner}>
        <h2 className={styles.cornerText}>{bottomRightText}</h2>
      </div>
    </section>
  );
};

export default Hero03Banner;
