/* empty css                                 */
import { c as createAstro, a as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_CFDc-_dA.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DR_rWM_A.mjs';
import { $ as $$Navigation, B as Button, b as $$Footer } from '../chunks/toaster_Br8Fs97V.mjs';
import { ArrowLeft, Home, FileText } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://genzen-solutions.com");
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const suggestedPages = [
    { name: "Home", path: "/", icon: Home, description: "Return to the main page" },
    { name: "Reports", path: "/reports", icon: FileText, description: "Browse our detailed reports" }
  ];
  const attemptedPath = Astro2.url.pathname;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "404 - Page Not Found", "description": "The page you are looking for could not be found." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, {})} ${maybeRenderHead()}<div class="min-h-screen pt-24 flex items-center justify-center bg-background"> <div class="max-w-2xl mx-auto px-6 text-center">  <div class="mb-8"> <h1 class="text-8xl lg:text-9xl font-light text-foreground/20 leading-none">
404
</h1> </div>  <div class="mb-12"> <h2 class="text-2xl lg:text-3xl font-light text-foreground mb-4">
Page Not Found
</h2> <p class="text-foreground/70 font-light max-w-md mx-auto">
The page you're looking for doesn't exist or has been moved to a different location.
</p> </div>  <div class="mb-12"> <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8"> ${renderComponent($$result2, "Button", Button, { "asChild": true, "variant": "default", "className": "font-light" }, { "default": ($$result3) => renderTemplate` <a href="/" class="flex items-center"> ${renderComponent($$result3, "ArrowLeft", ArrowLeft, { "className": "mr-2 h-4 w-4" })} Go Home
</a> ` })} ${renderComponent($$result2, "Button", Button, { "asChild": true, "variant": "outline", "className": "font-light" }, { "default": ($$result3) => renderTemplate` <a href="/reports">
View Reports
</a> ` })} </div> </div>  ${suggestedPages.length > 0 && renderTemplate`<div class="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">  ${suggestedPages.map((page) => renderTemplate`<a${addAttribute(page.path, "href")} class="group p-6 border border-foreground/10 rounded-lg hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-300"> <div class="flex flex-col items-center text-center space-y-3"> <span class="h-8 w-8 text-foreground/40 group-hover:text-foreground/60 transition-colors duration-300 flex items-center justify-center"> ${renderComponent($$result2, "page.icon", page.icon, { "className": "h-5 w-5" })} </span> <div> <h3 class="font-light text-foreground group-hover:text-foreground/80 transition-colors duration-300"> ${page.name} </h3> <p class="text-sm text-foreground/50 font-light mt-1"> ${page.description} </p> </div> </div> </a>`)} </div>`}  <div class="mt-16 pt-8 border-t border-foreground/10"> <p class="text-xs text-foreground/30 font-light">
Attempted to access: <span class="font-mono">${attemptedPath}</span> </p> </div> </div> </div> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/404.astro", void 0);

const $$file = "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
