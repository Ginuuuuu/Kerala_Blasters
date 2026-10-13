import React from 'react';
import styles from './Metadata.module.css';
import { cn } from '@/utils/classNames';

export interface MetadataItem {
  icon?: React.ReactNode;
  label?: string;
  value: React.ReactNode;
}

export interface MetadataProps {
  items: MetadataItem[];
  variant?: 'light' | 'dark' | 'muted';
  className?: string;
}

export const Metadata: React.FC<MetadataProps> = ({
  items,
  variant = 'muted',
  className,
}) => {
  return (
    <div className={cn(styles.metadata, styles[`variant-${variant}`], className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className={styles.divider} aria-hidden="true">•</span>}
          <div className={styles.item}>
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            {item.label && <span className={styles.label}>{item.label}:</span>}
            <span className={styles.value}>{item.value}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
