import React, { useState } from 'react';
import styles from './ImageFrame.module.css';
import { cn } from '@/utils/classNames';

export interface ImageFrameProps {
  src: string;
  alt: string;
  aspectRatio?: '1-1' | '4-3' | '3-4' | '16-9' | '3-2' | 'auto';
  overlay?: 'dark' | 'cinematic' | 'subtle' | 'none';
  zoomOnHover?: boolean;
  priority?: boolean;
  caption?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  imageClassName?: string;
}

export const ImageFrame: React.FC<ImageFrameProps> = ({
  src,
  alt,
  aspectRatio = '16-9',
  overlay = 'none',
  zoomOnHover = false,
  priority = false,
  caption,
  borderRadius = 'md',
  className,
  imageClassName,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const radiusStyles: Record<string, string> = {
    none: '0',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
  };

  return (
    <div
      className={cn(
        styles.frame,
        styles[`ratio-${aspectRatio}`],
        zoomOnHover && styles.zoomOnHover,
        className
      )}
      style={{ borderRadius: radiusStyles[borderRadius] }}
    >
      <img
        src={hasError ? '/images/placeholder.jpg' : src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={cn(styles.image, isLoaded && styles.loaded, imageClassName)}
      />

      {overlay !== 'none' && (
        <div className={cn(styles.overlay, styles[`overlay-${overlay}`])} aria-hidden="true" />
      )}

      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  );
};
