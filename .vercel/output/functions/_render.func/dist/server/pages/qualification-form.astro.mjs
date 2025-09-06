/* empty css                                 */
import { c as createAstro, a as createComponent, d as renderTemplate, r as renderComponent, f as renderHead, b as addAttribute, e as renderSlot, m as maybeRenderHead } from '../chunks/astro/server_Co88VAjz.mjs';
import 'kleur/colors';
/* empty css                                 */
import { jsx } from 'react/jsx-runtime';
import { createContext, useState, useEffect } from 'react';
import { a as $$Navigation, T as Toaster, S as ScrollToTop, $ as $$Footer } from '../chunks/toaster_CUOm5jLy.mjs';
import { G as GZSIntakeForm } from '../chunks/GZSIntakeForm_D_M8ahL2.mjs';
export { renderers } from '../renderers.mjs';

const defaultContextState = {
  theme: "system",
  actualTheme: "light",
  setTheme: () => {
  }
};
const ThemeProviderContext = createContext(defaultContextState);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "astro-ui-theme"
}) {
  const [theme, setThemeState] = useState(defaultTheme);
  const [actualTheme, setActualTheme] = useState("light");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      const storedTheme = stored || defaultTheme;
      setThemeState(storedTheme);
      let initialActual;
      if (storedTheme === "system") {
        initialActual = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } else {
        initialActual = storedTheme;
      }
      setActualTheme(initialActual);
    }
  }, [defaultTheme, storageKey]);
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newTheme);
    }
  };
  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateActualTheme = () => {
      let newActualTheme;
      if (theme === "system") {
        newActualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } else {
        newActualTheme = theme;
      }
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newActualTheme);
      root.setAttribute("data-theme", newActualTheme);
      setActualTheme(newActualTheme);
    };
    updateActualTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "system") {
        updateActualTheme();
      }
    };
    if (theme === "system") {
      mediaQuery.addEventListener("change", handleSystemChange);
      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }
  }, [theme]);
  const contextValue = {
    theme,
    actualTheme,
    setTheme
  };
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { value: contextValue, children });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://genzen-solutions.com");
const $$FormLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormLayout;
  const {
    title = "Default Title",
    description = "Default description"
  } = Astro2.props;
  Astro2.request.headers.get("cookie")?.includes("astro-ui-theme=dark") ? "dark" : "light";
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', `><link rel="icon" type="image/svg+xml" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"><script>
      (function() {
        const storageKey = 'astro-ui-theme';
        const getThemePreference = () => {
          if (typeof localStorage !== 'undefined' && localStorage.getItem(storageKey)) {
            return localStorage.getItem(storageKey);
          }
          return 'system';
        };
        
        const isDark = () => {
          const themePreference = getThemePreference();
          if (themePreference === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
          }
          return themePreference === 'dark';
        };
        
        const theme = isDark() ? 'dark' : 'light';
        document.documentElement.classList.add(theme);
        document.documentElement.setAttribute('data-theme', theme);
        console.log('[BaseLayout] Theme applied:', theme);
      })();
    <\/script>`, '</head> <body class="min-h-screen bg-background font-sans antialiased overflow-x-hidden"> ', " </body></html>"])), title, addAttribute(description, "content"), renderHead(), renderComponent($$result, "ThemeProvider", ThemeProvider, { "client:load": true, "defaultTheme": "system", "storageKey": "astro-ui-theme", "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/ThemeProvider.tsx", "client:component-export": "ThemeProvider" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, {})} <main class="flex-1 pt-16 sm:pt-18 lg:pt-20"> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Toaster", Toaster, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/ui/toaster.tsx", "client:component-export": "Toaster" })} ${renderComponent($$result2, "ScrollToTop", ScrollToTop, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollToTop.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` }));
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/layouts/FormLayout.astro", void 0);

const $$QualificationForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "FormLayout", $$FormLayout, { "title": "Legacy Ecosystem Analysis Application" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-4"> ${renderComponent($$result2, "GZSIntakeForm", GZSIntakeForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/GZSIntakeForm", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/qualification-form.astro", void 0);

const $$file = "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/qualification-form.astro";
const $$url = "/qualification-form";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$QualificationForm,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
