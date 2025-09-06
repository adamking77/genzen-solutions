/* empty css                                 */
import { a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Co88VAjz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C47Iay-C.mjs';
import { R as ReportsFilter } from '../chunks/ReportsFilter_DwTbAxUN.mjs';
import { g as getCollection } from '../chunks/_astro_content_BLDB1CuZ.mjs';
export { renderers } from '../renderers.mjs';

const $$Insights = createComponent(async ($$result, $$props, $$slots) => {
  const insights = await getCollection("insights");
  const insightsData = insights.map((entry) => entry.data);
  insightsData.filter((insight) => insight.featured);
  insightsData.filter((insight) => !insight.featured);
  const categories = Array.from(new Set(insightsData.map((insight) => insight.category)));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Insights Archive | Strategic Intelligence & Market Analysis", "description": "Comprehensive collection of strategic reports, market analysis, and performance insights that drive informed decision-making across global markets." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-24 lg:py-32"> <div class="max-w-7xl mx-auto px-6 lg:px-8"> <!-- Header --> <div class="space-y-12 mb-20"> <div class="space-y-8"> <div class="text-sm font-medium tracking-widest text-foreground/60 uppercase">
INSIGHTS ARCHIVE
</div> <h1 class="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight max-w-4xl text-foreground">
Strategic Intelligence
<br>
& Market Analysis
</h1> <p class="text-lg font-light text-foreground/70 leading-relaxed max-w-2xl">
Comprehensive collection of strategic reports, market analysis, and performance insights 
            that drive informed decision-making across global markets.
</p> </div> </div> <!-- Interactive Insights with Search/Filter --> ${renderComponent($$result2, "InsightsFilter", ReportsFilter, { "client:load": true, "reports": insightsData, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ReportsFilter.tsx", "client:component-export": "default" })} </div> <!-- Stats --> <div class="grid grid-cols-3 gap-8 pt-20 mt-20 border-t border-foreground/10"> <div class="text-center space-y-2"> <div class="text-3xl font-light text-foreground">${insightsData.length}</div> <div class="text-sm font-light text-foreground/60 tracking-wider">TOTAL INSIGHTS</div> </div> <div class="text-center space-y-2"> <div class="text-3xl font-light text-foreground">${categories.length}</div> <div class="text-sm font-light text-foreground/60 tracking-wider">CATEGORIES</div> </div> <div class="text-center space-y-2"> <div class="text-3xl font-light text-foreground">2024</div> <div class="text-sm font-light text-foreground/60 tracking-wider">LATEST YEAR</div> </div> </div> </section> ` })}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/insights.astro", void 0);

const $$file = "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/insights.astro";
const $$url = "/insights";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Insights,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
