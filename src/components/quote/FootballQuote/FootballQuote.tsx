import React from 'react';
import styles from './FootballQuote.module.css';
import { Container } from '@/components/ui';
import { footballQuoteContent, QuoteContent } from '@/content/quote';

export interface FootballQuoteProps {
  content?: QuoteContent;
}

export const FootballQuote: React.FC<FootballQuoteProps> = ({
  content = footballQuoteContent,
}) => {
  return (
    <section className={styles.quoteSection} aria-label="Club Creed Statement">
      {/* Background Graphic Watermark */}
      <div className={styles.watermarkGraphic} aria-hidden="true">
        90’
      </div>

      <Container size="wide">
        <div className={styles.innerFrame}>
          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span>{content.eyebrow}</span>
          </div>

          {/* Statement Headline */}
          <blockquote className={styles.statement}>
            <span className={styles.leadText}>{content.statementLead}</span>
            <span className={styles.emphasisText}>{content.statementEmphasis}</span>
          </blockquote>

          {/* Supporting Copy */}
          {content.supportingText && (
            <p className={styles.supporting}>{content.supportingText}</p>
          )}
        </div>
      </Container>
    </section>
  );
};
