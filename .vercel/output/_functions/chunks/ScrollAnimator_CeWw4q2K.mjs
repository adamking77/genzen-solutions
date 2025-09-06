import { jsx } from 'react/jsx-runtime';
import React__default, { useState, useRef, useEffect } from 'react';

const useScrollTrigger = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const { threshold = 0.3, rootMargin = "0px" } = options;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasTriggered]);
  return { ref, isVisible, hasTriggered };
};

function ScrollAnimator({
  children,
  threshold = 0.2,
  rootMargin = "0px",
  initialState = "fadeUp",
  duration = 1e3,
  delay = 0,
  staggerChildren = false,
  easing = "ease-in-out",
  brandEffect = false
}) {
  const { ref, isVisible } = useScrollTrigger({ threshold, rootMargin });
  const getAnimationClasses = () => {
    const getDurationClass = (dur) => {
      if (dur <= 200) return "duration-200";
      if (dur <= 300) return "duration-300";
      if (dur <= 500) return "duration-500";
      if (dur <= 700) return "duration-700";
      if (dur <= 800) return "duration-800";
      if (dur <= 1e3) return "duration-1000";
      return "duration-1000";
    };
    const durationClass = getDurationClass(duration);
    const easingClass = `ease-${easing}`;
    const transitionProps = brandEffect ? "transition-[opacity,transform,box-shadow,border-color]" : "transition-[opacity,transform]";
    const base = `${transitionProps} ${durationClass} ${easingClass}`;
    if (isVisible) {
      const brandGlow = brandEffect ? "shadow-lg shadow-primary/10 border-primary/20" : "";
      return `${base} opacity-100 translate-y-0 scale-100 translate-x-0 ${brandGlow}`;
    }
    switch (initialState) {
      case "fadeUp":
        return `${base} opacity-0 translate-y-10 scale-95`;
      case "fadeDown":
        return `${base} opacity-0 -translate-y-10 scale-95`;
      case "fade":
        return `${base} opacity-0 scale-95`;
      case "slideLeft":
        return `${base} opacity-0 translate-x-10 scale-95`;
      case "slideRight":
        return `${base} opacity-0 -translate-x-10 scale-95`;
      case "scale":
        return `${base} opacity-0 scale-75`;
      case "brandGlow":
        return `${base} opacity-0 translate-y-8 scale-90 shadow-none`;
      default:
        return `${base} opacity-0 translate-y-10 scale-95`;
    }
  };
  const style = delay > 0 ? {
    transitionDelay: isVisible ? `${delay}ms` : "0ms"
  } : void 0;
  if (staggerChildren && React__default.Children.count(children) > 1) {
    const staggerDelay = typeof staggerChildren === "number" ? staggerChildren : 100;
    return /* @__PURE__ */ jsx("div", { ref, children: React__default.Children.map(children, (child, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: getAnimationClasses(),
        style: {
          transitionDelay: isVisible ? `${(delay || 0) + index * staggerDelay}ms` : "0ms"
        },
        children: child
      },
      index
    )) });
  }
  return /* @__PURE__ */ jsx("div", { ref, className: getAnimationClasses(), style, children });
}

export { ScrollAnimator as S };
