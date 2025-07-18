import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, b as renderComponent, r as renderTemplate } from './astro/server_CFDc-_dA.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React__default, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { G as GZSIntakeForm } from './GZSIntakeForm_B0ZvuW86.mjs';
import { B as Button } from './toaster_BasIGqIJ.mjs';
import 'clsx';

const IntakeFormModal = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal();
    }
  };
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const trigger = /* @__PURE__ */ jsx(
    "div",
    {
      role: "button",
      tabIndex: 0,
      ref: triggerRef,
      onClick: openModal,
      onKeyDown: handleKeyDown,
      className,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpen,
      children
    }
  );
  const modalContent = /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-hidden",
      onClick: handleBackdropClick,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "modal-title",
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 20 },
          transition: { duration: 0.4, ease: "easeOut" },
          className: "relative w-[95vw] max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] overflow-hidden bg-background border border-foreground/20 rounded-xl shadow-2xl",
          children: [
            /* @__PURE__ */ jsx("h2", { id: "modal-title", className: "sr-only", children: "Intake Form" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                ref: closeButtonRef,
                onClick: closeModal,
                className: "absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background border-2 border-foreground/30 hover:bg-primary/5 hover:border-primary/40 hover:scale-105 hover:neumorphic-hover-subtle hover:dark:neumorphic-hover-subtle-dark transition-all duration-300 flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "aria-label": "Close modal",
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-4 h-4 sm:w-5 sm:h-5 text-foreground/60 group-hover:text-primary transition-colors duration-200",
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "1.5",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /* @__PURE__ */ jsx("path", { d: "M6 6l12 12M6 18L18 6" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "max-h-[95vh] overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "p-0", children: /* @__PURE__ */ jsx(GZSIntakeForm, { onComplete: closeModal, isModal: true }) }) })
          ]
        }
      )
    }
  ) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    trigger,
    isMounted ? createPortal(modalContent, document.body) : null
  ] });
};

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

const $$Astro$1 = createAstro("https://genzen-solutions.com");
const $$CTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CTA;
  const {
    headline = "Ready to get started?",
    leftText = "Let's discuss how we can help transform your business.",
    rightText = ["We provide strategic insights and innovative solutions tailored to your specific needs."],
    buttonText = "Start a Conversation",
    buttonLink = "#contact",
    // Default link, can be overridden
    sectionId
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-16 sm:py-20 lg:py-24"${addAttribute(sectionId, "id")}> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"> <div class="col-span-12 lg:col-span-5"> ${renderComponent($$result, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.2, "duration": 1e3, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <div class="space-y-8"> ${headline && renderTemplate`<h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground"> ${headline} </h2>`} ${leftText && renderTemplate`<p class="text-lg font-light text-foreground/70 leading-relaxed"> ${leftText} </p>`} </div> ` })} </div> <div class="col-span-12 lg:col-span-6 lg:col-start-7"> ${renderComponent($$result, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.2, "duration": 1e3, "delay": 200, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <div class="space-y-8"> ${rightText && rightText.map((paragraph) => renderTemplate`<p class="text-lg font-light text-foreground/70 leading-relaxed"> ${paragraph} </p>`)} ${buttonText && renderTemplate`<div> ${renderComponent($$result2, "IntakeFormModal", IntakeFormModal, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/modals/IntakeFormModal.tsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "size": "lg", "className": "font-light text-base px-12 py-3 h-auto border-2 border-foreground/20 bg-transparent text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-[border-color,background-color,color,transform] duration-300 ease-in-out rounded-full" }, { "default": ($$result4) => renderTemplate`${buttonText}` })} ` })} </div>`} </div> ` })} </div> </div> </div> </section>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/sections/CTA.astro", void 0);

const $$Astro = createAstro("https://genzen-solutions.com");
const $$ClientInsights = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClientInsights;
  const { title, subtitle, insights = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-16 sm:py-20 lg:py-24 bg-background"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid lg:grid-cols-12 gap-8 lg:gap-12"> <div class="lg:col-span-4 lg:col-start-2"> <div class="space-y-8">  <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground"> ${title} </h2> <div class="w-12 h-px bg-foreground/20"></div> <p class="text-base font-light text-foreground/70 leading-relaxed"> ${subtitle} </p> </div> </div> <div class="lg:col-span-7 lg:col-start-6"> <div class="space-y-12 sm:space-y-16 lg:space-y-20"> ${insights.map((insight, index) => (
    // Removed animate-fade-in class and style attribute for animationDelay
    renderTemplate`<div class="relative group cursor-pointer hover:scale-105 transition-all duration-300"> <div class="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 rounded-lg hover:bg-foreground/5 transition-colors duration-300"> <div class="space-y-3"> <h3 class="text-xl font-light text-foreground group-hover:text-foreground/80 transition-colors duration-300"> ${insight.category} </h3> <div class="flex items-baseline space-x-2"> <span class="text-2xl font-light text-foreground"> ${insight.score} </span> <span class="text-sm font-light text-foreground/60"> ${insight.statistic} </span> </div> </div> <p class="text-base font-light text-foreground/70 leading-relaxed group-hover:text-foreground transition-colors duration-300"> ${insight.feedback} </p> </div> ${index < insights.length - 1 && renderTemplate`<div class="w-full h-px bg-foreground/10 mt-8 sm:mt-10 lg:mt-14 transition-all duration-300 group-hover:bg-foreground/20"></div>`} </div>`
  ))} </div> </div> </div> </div> </section>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/ClientInsights.astro", void 0);

export { $$ClientInsights as $, IntakeFormModal as I, ScrollAnimator as S, $$CTA as a };
