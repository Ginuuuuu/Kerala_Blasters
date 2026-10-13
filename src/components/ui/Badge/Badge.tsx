import React from 'react';
import styles from './Badge.module.css';
import { cn } from '@/utils/classNames';

export interface BadgeProps {
  variant?: 'default' | 'dark' | 'accent' | 'live';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className,
}) => {
  return (
    <span className={cn(styles.badge, styles[`variant-${variant}`], className)}>
      {variant === 'live' && <span className={styles.liveDot} aria-hidden="true" />}
      {children}
    </span>
  );
};
