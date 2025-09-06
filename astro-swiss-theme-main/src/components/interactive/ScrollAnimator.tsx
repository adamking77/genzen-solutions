import React, { type PropsWithChildren, useEffect, useState } from 'react';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';

interface ScrollAnimatorProps extends PropsWithChildren {
  threshold?: number;
  rootMargin?: string;
  initialState?: 'fadeUp' | 'fadeDown' | 'fade';
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export function ScrollAnimator({
  children,
  threshold = 0.2,
  rootMargin = '0px',
  initialState = 'fadeUp',
  duration = 1000,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 100
}: ScrollAnimatorProps) {
  const { ref, isVisible } = useScrollTrigger({ threshold, rootMargin });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getAnimationClasses = () => {
    // If user prefers reduced motion, show content immediately without animation
    if (prefersReducedMotion) {
      return 'opacity-100 translate-y-0';
    }
    
    // Use proper Tailwind classes that exist
    let durationClass = 'duration-700'; // Default to existing 700ms
    if (duration === 800) durationClass = 'duration-800'; // Now available
    else if (duration === 1000) durationClass = 'duration-1000'; // Already exists
    else if (duration === 1200) durationClass = 'duration-1200'; // Now available
    
    const base = `transition-all ${durationClass} ease-out`;
    
    if (isVisible) {
      return `${base} opacity-100 translate-y-0`;
    }
    
    switch (initialState) {
      case 'fadeUp':
        return `${base} opacity-0 translate-y-10`;
      case 'fadeDown':
        return `${base} opacity-0 -translate-y-10`;
      case 'fade':
        return `${base} opacity-0`;
      default:
        return `${base} opacity-0 translate-y-10`;
    }
  };

  const style = (delay > 0 && !prefersReducedMotion) ? {
    transitionDelay: isVisible ? `${delay}ms` : '0ms'
  } : undefined;

  // Handle staggered children
  if (staggerChildren && React.Children.count(children) > 1) {
    return (
      <div ref={ref}>
        {React.Children.map(children, (child, index) => (
          <div 
            key={index}
            className={getAnimationClasses()}
            style={!prefersReducedMotion ? {
              transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
            } : undefined}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={getAnimationClasses()} style={style}>
      {children}
    </div>
  );
}

export default ScrollAnimator;