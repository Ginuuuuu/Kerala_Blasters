import React from 'react';
import styles from './SectionWrapper.module.css';
import { cn } from '@/utils/classNames';

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'main';
  bg?: 'white' | 'soft' | 'black';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  borderTop?: boolean;
  borderBottom?: boolean;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  as = 'section',
  bg = 'white',
  padding = 'md',
  borderTop = false,
  borderBottom = false,
  children,
  className,
  ...props
}) => {
  const Component = as as React.ElementType;

  return (
    <Component
      className={cn(
        styles.section,
        styles[`bg-${bg}`],
        styles[`padding-${padding}`],
        borderTop && styles['border-top'],
        borderBottom && styles['border-bottom'],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
