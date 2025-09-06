import { c as createAstro, a as createComponent, d as renderTemplate, r as renderComponent, e as renderSlot, f as renderHead, b as addAttribute } from './astro/server_Co88VAjz.mjs';
import 'kleur/colors';
/* empty css                         */
import { $ as $$Footer, S as ScrollToTop, T as Toaster, a as $$Navigation } from './toaster_CUOm5jLy.mjs';

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
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', `><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="shortcut icon" href="/favicon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#1d2739"><meta name="msapplication-TileColor" content="#1d2739"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><!-- Enhanced Theme Detection Script - Inline for Performance --><script>
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
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        document.documentElement.setAttribute('data-theme', theme);
      })();
    <\/script>`, '</head> <body class="min-h-screen bg-background font-sans antialiased overflow-x-hidden"> ', ' <main class="flex-1 pt-16 sm:pt-18 lg:pt-20"> ', " </main> ", " ", " ", " </body></html>"])), title, addAttribute(description, "content"), renderHead(), renderComponent($$result, "Navigation", $$Navigation, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Toaster", Toaster, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/ui/toaster.tsx", "client:component-export": "Toaster" }), renderComponent($$result, "ScrollToTop", ScrollToTop, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollToTop.tsx", "client:component-export": "default" }), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
