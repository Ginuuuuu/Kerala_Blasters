import React from 'react';
import { cn } from '@/utils/classNames';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'standard' | 'wide' | 'fluid';
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'standard',
  children,
  className,
  ...props
}) => {
  const containerClass =
    size === 'wide'
      ? 'site-container-wide'
      : size === 'fluid'
      ? 'site-container-fluid'
      : 'site-container';

  return (
    <div className={cn(containerClass, className)} {...props}>
      {children}
    </div>
  );
};
