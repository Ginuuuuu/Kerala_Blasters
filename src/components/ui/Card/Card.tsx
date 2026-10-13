import React from 'react';
import styles from './Card.module.css';
import { cn } from '@/utils/classNames';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'dark' | 'soft';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  interactive = false,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles.card,
        styles[`variant-${variant}`],
        styles[`padding-${padding}`],
        interactive && styles.interactive,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
