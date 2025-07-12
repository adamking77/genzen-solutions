import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import { c as createAstro, a as createComponent, m as maybeRenderHead, b as renderComponent, n as renderScript, e as addAttribute, r as renderTemplate, u as unescapeHTML } from './astro/server_CFDc-_dA.mjs';
import 'kleur/colors';
import { Sun, Moon, ArrowUp, X } from 'lucide-react';
import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { twMerge } from 'tailwind-merge';

const defaultContextState = {
  theme: "system"
};
const ThemeProviderContext = createContext(defaultContextState);
const THEME_CHANGE_REQUEST_EVENT$1 = "theme-change-request";
const THEME_ACTUALLY_CHANGED_EVENT$1 = "theme-actually-changed";
function ThemeProvider({ children, defaultTheme = "system", storageKey = "astro-ui-theme" }) {
  const [themePreference, setThemePreference] = useState(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(storageKey) || defaultTheme;
    }
    return defaultTheme;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    let actualThemeToApply;
    if (themePreference === "system") {
      actualThemeToApply = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      actualThemeToApply = themePreference;
    }
    root.classList.remove("light", "dark");
    root.classList.add(actualThemeToApply);
    localStorage.setItem(storageKey, themePreference);
    document.dispatchEvent(new CustomEvent(THEME_ACTUALLY_CHANGED_EVENT$1, { detail: { actualTheme: actualThemeToApply, preference: themePreference } }));
  }, [themePreference, storageKey]);
  useEffect(() => {
    const handleThemeChangeRequest = (event) => {
      const newPreference = event.detail.theme;
      setThemePreference(newPreference);
    };
    document.addEventListener(THEME_CHANGE_REQUEST_EVENT$1, handleThemeChangeRequest);
    return () => {
      document.removeEventListener(THEME_CHANGE_REQUEST_EVENT$1, handleThemeChangeRequest);
    };
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e) => {
      if (themePreference === "system") {
        setThemePreference("system");
      }
    };
    if (themePreference === "system") {
      mediaQuery.addEventListener("change", handleSystemChange);
    }
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [themePreference]);
  const contextValue = {
    theme: themePreference
  };
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { value: contextValue, children });
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const THEME_CHANGE_REQUEST_EVENT = "theme-change-request";
const THEME_ACTUALLY_CHANGED_EVENT = "theme-actually-changed";
function ThemeToggle() {
  const [currentActualTheme, setCurrentActualTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });
  useEffect(() => {
    const handleActualThemeChange = (event) => {
      const { actualTheme } = event.detail;
      setCurrentActualTheme(actualTheme);
    };
    document.addEventListener(THEME_ACTUALLY_CHANGED_EVENT, handleActualThemeChange);
    const root = window.document.documentElement;
    const observerCallback = () => {
      const newActual = root.classList.contains("dark") ? "dark" : "light";
      if (newActual !== currentActualTheme) {
        setCurrentActualTheme(newActual);
      }
    };
    const observer = new MutationObserver(observerCallback);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    observerCallback();
    return () => {
      document.removeEventListener(THEME_ACTUALLY_CHANGED_EVENT, handleActualThemeChange);
      observer.disconnect();
    };
  }, []);
  const isActuallyDark = currentActualTheme === "dark";
  const handleToggle = useCallback(() => {
    const newPreference = isActuallyDark ? "light" : "dark";
    document.dispatchEvent(new CustomEvent(THEME_CHANGE_REQUEST_EVENT, { detail: { theme: newPreference } }));
  }, [isActuallyDark]);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": isActuallyDark,
      onClick: handleToggle,
      className: cn(
        "relative inline-flex items-center justify-center w-[50px] h-[26px] rounded-full p-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActuallyDark ? "bg-slate-700" : "bg-slate-200"
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: cn(
          "absolute left-[4px] transition-opacity duration-300 ease-in-out",
          isActuallyDark ? "opacity-50" : "opacity-100"
        ), children: /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4 text-slate-800 dark:text-slate-300" }) }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: cn(
          "absolute right-[4px] transition-opacity duration-300 ease-in-out",
          isActuallyDark ? "opacity-100" : "opacity-50"
        ), children: /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4 text-slate-800 dark:text-slate-300" }) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "pointer-events-none inline-block w-[20px] h-[20px] transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out",
              isActuallyDark ? "translate-x-[12px]" : "translate-x-[-12px]"
            )
          }
        )
      ]
    }
  );
}

const $$Astro = createAstro("https://genzen-solutions.com");
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { pathname } = Astro2.url;
  const isHome = pathname === "/";
  const navLinksConfig = {
    home: [
      { id: "intelligence", label: "Intelligence" },
      { id: "services", label: "Services" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" }
    ],
    other: [
      { href: "/", label: "Home" }
    ],
    common: []
  };
  const desktopNavLinks = isHome ? navLinksConfig.home : navLinksConfig.other;
  const mobileNavLinks = isHome ? navLinksConfig.home : navLinksConfig.other;
  return renderTemplate`${maybeRenderHead()}<nav id="main-nav" class="fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-in-out bg-transparent"> <div class="max-w-6xl mx-auto px-6 lg:px-8"> <div id="nav-content-container" class="flex items-center justify-between transition-[height] duration-300 ease-in-out h-16 sm:h-18 lg:h-20"> <a href="/" id="nav-logo" class="font-light tracking-wide text-foreground transition-[color,font-size] duration-300 ease-in-out text-lg">
GenZen Solutions
</a>  <div class="hidden lg:flex items-center space-x-8"> ${desktopNavLinks.map((link) => "id" in link ? renderTemplate`<button${addAttribute(link.id, "data-scroll-to")} class="nav-link font-light tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-300 ease-in-out text-sm"> ${link.label} </button>` : renderTemplate`<a${addAttribute(link.href, "href")} class="nav-link font-light tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-300 ease-in-out text-sm"> ${link.label} </a>`)} ${navLinksConfig.common.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="nav-link font-light tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-300 ease-in-out text-sm"> ${link.label} </a>`)} <div class="pl-4 border-l border-foreground/10"> <div id="theme-toggle-desktop-container" class="transition-transform duration-300 ease-in-out scale-100"> ${renderComponent($$result, "ThemeToggle", ThemeToggle, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/ThemeToggle.tsx", "client:component-export": "ThemeToggle" })} </div> </div> </div>  <button id="mobile-menu-button" aria-label="Toggle mobile menu" class="lg:hidden p-3 min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-background/10 rounded-lg transition-colors duration-200"> <svg id="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-foreground transition-[color,width,height] duration-300 ease-in-out h-5 w-5"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> <svg id="x-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-foreground transition-[color,width,height] duration-300 ease-in-out h-5 w-5 hidden"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div>  <div id="mobile-menu" class="hidden lg:hidden bg-background border-t border-foreground/10"> <div class="px-2 pt-4 pb-6 space-y-4"> ${mobileNavLinks.map((link) => "id" in link ? renderTemplate`<button${addAttribute(link.id, "data-scroll-to")} class="mobile-nav-link block w-full text-left px-3 py-2 text-sm font-light tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-300 ease-in-out"> ${link.label} </button>` : renderTemplate`<a${addAttribute(link.href, "href")} class="mobile-nav-link block w-full text-left px-3 py-2 text-sm font-light tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-300 ease-in-out"> ${link.label} </a>`)} ${navLinksConfig.common.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="mobile-nav-link block w-full text-left px-3 py-2 text-sm font-light tracking-wide text-foreground/70 hover:text-foreground transition-colors"> ${link.label} </a>`)} <div class="px-3 py-2 border-t border-foreground/10 pt-4"> ${renderComponent($$result, "ThemeToggle", ThemeToggle, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/ThemeToggle.tsx", "client:component-export": "ThemeToggle" })} </div> </div> </div> </nav> ${renderScript($$result, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/Navigation.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  (/* @__PURE__ */ new Date()).getFullYear();
  const LinkedinIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
`;
  return renderTemplate`${maybeRenderHead()}<footer class="py-16 border-t border-foreground/10"> <div class="max-w-7xl mx-auto px-6 lg:px-8"> <div class="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"> <div class="text-center md:text-left"> <div class="text-sm font-light text-foreground/50">
© 2025 <a href="https://genzenhq.com" target="_blank" rel="noopener noreferrer" class="hover:text-foreground/70 transition-colors">GenZen HQ</a> All Rights Reserved
</div> </div> <div class="flex items-center space-x-6"> <a href="https://www.linkedin.com/in/-adamking" target="_blank" rel="noopener noreferrer" class="text-foreground/40 hover:text-foreground/70 transition-colors" aria-label="LinkedIn">${unescapeHTML(LinkedinIcon)}</a> </div> </div> </div> </footer>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/sections/Footer.astro", void 0);

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-foreground/20 bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-12 px-5 py-3",
        sm: "h-11 rounded-md px-4",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      size: "icon",
      className: cn(
        "fixed bottom-4 right-4 z-50 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      ),
      onClick: scrollToTop,
      "aria-label": "Scroll to top",
      children: /* @__PURE__ */ jsx(ArrowUp, { className: "h-5 w-5" })
    }
  );
};

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}

export { $$Navigation as $, Button as B, ScrollToTop as S, ThemeProvider as T, Toaster as a, $$Footer as b, cn as c };
