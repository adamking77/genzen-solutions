import React, { type PropsWithChildren } from 'react';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';

interface ScrollAnimatorProps extends PropsWithChildren {
  threshold?: number;
  rootMargin?: string;
  initialState?: 'fadeUp' | 'fadeDown' | 'fade';
  duration?: number;
  delay?: number;
  staggerChildren?: number | boolean; // Now accepts number for stagger delay
  easing?: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

export function ScrollAnimator({
  children,
  threshold = 0.2,
  rootMargin = '0px',
  initialState = 'fadeUp',
  duration = 1000,
  delay = 0,
  staggerChildren = false,
  easing = 'ease-in-out'
}: ScrollAnimatorProps) {
  const { ref, isVisible } = useScrollTrigger({ threshold, rootMargin });

  const getAnimationClasses = () => {
    // Support flexible duration values
    const getDurationClass = (dur: number) => {
      if (dur <= 200) return 'duration-200';
      if (dur <= 300) return 'duration-300';
      if (dur <= 500) return 'duration-500';
      if (dur <= 700) return 'duration-700';
      if (dur <= 800) return 'duration-800';
      if (dur <= 1000) return 'duration-1000';
      return 'duration-1000'; // fallback
    };

    const durationClass = getDurationClass(duration);
    const easingClass = `ease-${easing}`;
    const base = `transition-[opacity,transform] ${durationClass} ${easingClass}`;
    
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

  const style = delay > 0 ? {
    transitionDelay: isVisible ? `${delay}ms` : '0ms'
  } : undefined;

  // Handle staggered children
  if (staggerChildren && React.Children.count(children) > 1) {
    const staggerDelay = typeof staggerChildren === 'number' ? staggerChildren : 100;
    return (
      <div ref={ref}>
        {React.Children.map(children, (child, index) => (
          <div 
            key={index}
            className={getAnimationClasses()}
            style={{
              transitionDelay: isVisible ? `${(delay || 0) + (index * staggerDelay)}ms` : '0ms'
            }}
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