/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, d as renderHead, e as addAttribute, f as renderSlot, m as maybeRenderHead } from '../chunks/astro/server_CFDc-_dA.mjs';
import 'kleur/colors';
import { T as ThemeProvider, $ as $$Navigation, a as Toaster, S as ScrollToTop, b as $$Footer } from '../chunks/toaster_BasIGqIJ.mjs';
import { G as GZSIntakeForm } from '../chunks/GZSIntakeForm_B0ZvuW86.mjs';
export { renderers } from '../renderers.mjs';

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
