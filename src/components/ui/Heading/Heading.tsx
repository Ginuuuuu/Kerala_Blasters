import React from 'react';
import styles from './Heading.module.css';
import { cn } from '@/utils/classNames';

export interface HeadingProps {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  displayStyle?: 'hero' | 'section' | 'subheading' | 'quote' | 'standard';
  eyebrow?: string;
  eyebrowDot?: boolean;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  displayStyle = 'standard',
  eyebrow,
  eyebrowDot = true,
  subtitle,
  align = 'left',
  className,
  children,
}) => {
  const Tag = level as React.ElementType;

  const displayClass =
    displayStyle === 'hero'
      ? 'text-display-hero'
      : displayStyle === 'section'
      ? 'text-display-section'
      : displayStyle === 'quote'
      ? 'text-quote-editorial'
      : displayStyle === 'subheading'
      ? 'h3'
      : undefined;

  return (
    <div className={cn(styles.wrapper, styles[`align-${align}`], className)}>
      {eyebrow && (
        <div className={cn(styles.eyebrow, 'text-eyebrow')}>
          {eyebrowDot && <span className={styles.eyebrowDot} aria-hidden="true" />}
          <span>{eyebrow}</span>
        </div>
      )}
      <Tag className={displayClass}>{children}</Tag>
      {subtitle && <p className={cn(styles.subtitle, 'text-body')}>{subtitle}</p>}
    </div>
  );
};
