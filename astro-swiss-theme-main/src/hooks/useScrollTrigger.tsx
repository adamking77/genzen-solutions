import { useState, useEffect, useRef } from 'react';

interface UseScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollTrigger = (options: UseScrollTriggerOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { threshold = 0.3, rootMargin = '0px' } = options;
    
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, hasTriggered]); // Fixed dependencies

  return { ref, isVisible, hasTriggered };
};