import { c as createAstro, a as createComponent, b as renderTemplate, r as renderComponent, e as renderHead, d as addAttribute, f as renderSlot } from './astro/server_iUh9UfrQ.mjs';
import 'kleur/colors';
/* empty css                         */
import { T as ThemeProvider, $ as $$Navigation, b as Toaster, S as ScrollToTop, a as $$Footer } from './toaster_C0KPcJBy.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://genzen-solutions.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "Default Title",
    description = "Default description"
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', `><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="shortcut icon" href="/favicon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#1d2739"><meta name="msapplication-TileColor" content="#1d2739"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><script>
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
      })();
    <\/script>`, '</head> <body class="min-h-screen bg-background font-sans antialiased overflow-x-hidden"> ', " </body></html>"])), title, addAttribute(description, "content"), renderHead(), renderComponent($$result, "ThemeProvider", ThemeProvider, { "client:idle": true, "defaultTheme": "system", "storageKey": "astro-ui-theme", "client:component-hydration": "idle", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/ThemeProvider.tsx", "client:component-export": "ThemeProvider" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, {})} <main class="flex-1 pt-16 sm:pt-18 lg:pt-20"> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Toaster", Toaster, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/ui/toaster.tsx", "client:component-export": "Toaster" })} ${renderComponent($$result2, "ScrollToTop", ScrollToTop, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/interactive/ScrollToTop.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` }));
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
