import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'accent' | 'muted';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'primary',
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const variantClasses = {
    primary: 'border-primary border-t-transparent',
    accent: 'border-primary/30 border-t-primary',
    muted: 'border-foreground/20 border-t-foreground/60'
  };

  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-2',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label="Loading"
    />
  );
}

interface LoadingDotsProps {
  variant?: 'primary' | 'accent' | 'muted';
  className?: string;
}

export function LoadingDots({ variant = 'primary', className }: LoadingDotsProps) {
  const variantClasses = {
    primary: 'bg-primary',
    accent: 'bg-primary/60',
    muted: 'bg-foreground/40'
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            'h-2 w-2 rounded-full animate-pulse',
            variantClasses[variant]
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  );
}

interface LoadingBarProps {
  progress?: number;
  variant?: 'primary' | 'accent';
  className?: string;
  animated?: boolean;
}

export function LoadingBar({ 
  progress, 
  variant = 'primary',
  className,
  animated = true
}: LoadingBarProps) {
  const variantClasses = {
    primary: 'bg-primary',
    accent: 'bg-primary/70'
  };

  return (
    <div className={cn('w-full bg-foreground/10 rounded-full h-1', className)}>
      <div
        className={cn(
          'h-1 rounded-full transition-all duration-500 ease-out',
          variantClasses[variant],
          animated && 'animate-pulse'
        )}
        style={{ width: progress ? `${progress}%` : '100%' }}
      />
    </div>
  );
}

interface LoadingPulseProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'muted';
  className?: string;
}

export function LoadingPulse({ 
  children, 
  variant = 'primary',
  className 
}: LoadingPulseProps) {
  const variantClasses = {
    primary: 'shadow-primary/20',
    accent: 'shadow-primary/10',
    muted: 'shadow-foreground/10'
  };

  return (
    <div 
      className={cn(
        'animate-pulse transition-all duration-1000',
        variantClasses[variant],
        className
      )}
      style={{
        animationDuration: '2s',
        animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)'
      }}
    >
      {children}
    </div>
  );
}