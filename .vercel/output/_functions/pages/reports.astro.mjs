/* empty css                                 */
import { a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Co88VAjz.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C47Iay-C.mjs';
import { $ as $$ReportCard } from '../chunks/ReportCard_BtUhIAXM.mjs';
import { R as ReportsFilter } from '../chunks/ReportsFilter_DwTbAxUN.mjs';
import { g as getCollection } from '../chunks/_astro_content_BLDB1CuZ.mjs';
import { S as ScrollAnimator } from '../chunks/ScrollAnimator_CeWw4q2K.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Reports = createComponent(async ($$result, $$props, $$slots) => {
  const reports = await getCollection("reports");
  const reportsData = reports.map((entry) => ({
    id: entry.id,
    ...entry.data || {},
    slug: entry.slug
  }));
  const featuredReports = reportsData.filter((report) => report.featured);
  reportsData.filter((report) => !report.featured);
  const categories = Array.from(new Set(reportsData.map((report) => report.category)));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Reports Archive | Strategic Intelligence & Market Analysis", "description": "Comprehensive collection of strategic reports, market analysis, and performance insights that drive informed decision-making across global markets.", "data-astro-cid-k5zskagf": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-24 lg:py-32" data-astro-cid-k5zskagf> <div class="max-w-7xl mx-auto px-6 lg:px-8" data-astro-cid-k5zskagf> <!-- Header --> ${renderComponent($$result2, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.1, "duration": 1e3, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default", "data-astro-cid-k5zskagf": true }, { "default": async ($$result3) => renderTemplate` <div class="space-y-12 mb-20" data-astro-cid-k5zskagf> <div class="space-y-8" data-astro-cid-k5zskagf> <div class="text-sm font-medium tracking-widest text-foreground/60 uppercase" data-astro-cid-k5zskagf>
REPORTS ARCHIVE
</div> <h1 class="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight max-w-4xl text-foreground" data-astro-cid-k5zskagf>
Strategic Intelligence
<br data-astro-cid-k5zskagf>
& Market Analysis
</h1> <p class="text-lg font-light text-foreground/70 leading-relaxed max-w-2xl" data-astro-cid-k5zskagf>
Comprehensive collection of strategic reports, market analysis, and performance insights that drive informed decision-making across global markets.
</p> </div> <!-- Interactive Filter --> <div class="mt-16" data-astro-cid-k5zskagf> ${renderComponent($$result3, "ReportsFilter", ReportsFilter, { "client:load": true, "reports": reportsData, "categories": categories, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ReportsFilter.tsx", "client:component-export": "default", "data-astro-cid-k5zskagf": true })} </div> </div> ` })} <!-- Stats Section --> ${renderComponent($$result2, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.1, "duration": 800, "delay": 200, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default", "data-astro-cid-k5zskagf": true }, { "default": async ($$result3) => renderTemplate` <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 p-8 bg-accent/5 rounded-2xl" data-astro-cid-k5zskagf> <div class="text-center" data-astro-cid-k5zskagf> <div class="text-2xl md:text-3xl font-light text-foreground mb-2" data-astro-cid-k5zskagf> ${reportsData.length} </div> <div class="text-sm font-medium tracking-wider text-foreground/60 uppercase" data-astro-cid-k5zskagf>
Total Reports
</div> </div> <div class="text-center" data-astro-cid-k5zskagf> <div class="text-2xl md:text-3xl font-light text-foreground mb-2" data-astro-cid-k5zskagf> ${categories.length} </div> <div class="text-sm font-medium tracking-wider text-foreground/60 uppercase" data-astro-cid-k5zskagf>
Report Categories
</div> </div> <div class="text-center" data-astro-cid-k5zskagf> <div class="text-2xl md:text-3xl font-light text-foreground mb-2" data-astro-cid-k5zskagf>
2025
</div> <div class="text-sm font-medium tracking-wider text-foreground/60 uppercase" data-astro-cid-k5zskagf>
Current Year
</div> </div> </div> ` })} <!-- Featured Reports --> ${featuredReports.length > 0 && renderTemplate`${renderComponent($$result2, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.1, "duration": 800, "delay": 400, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default", "data-astro-cid-k5zskagf": true }, { "default": async ($$result3) => renderTemplate` <div class="mb-20" data-astro-cid-k5zskagf> <div class="flex items-center justify-between mb-12" data-astro-cid-k5zskagf> <h2 class="text-xl md:text-2xl font-light tracking-tight text-foreground" data-astro-cid-k5zskagf>
Featured Reports
</h2> <div class="h-px bg-gradient-to-r from-foreground/20 to-transparent flex-1 ml-8" data-astro-cid-k5zskagf></div> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8" data-astro-cid-k5zskagf> ${featuredReports.map((report) => renderTemplate`${renderComponent($$result3, "ReportCard", $$ReportCard, { "id": report.id, "title": report.title, "description": report.description, "category": report.category, "publishDate": report.publishDate, "readTime": report.readTime, "slug": report.slug, "featured": true, "tags": report.tags, "data-astro-cid-k5zskagf": true })}`)} </div> </div> ` })}`} <!-- All Reports --> ${renderComponent($$result2, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.1, "duration": 800, "delay": 600, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default", "data-astro-cid-k5zskagf": true }, { "default": async ($$result3) => renderTemplate` <div id="reports-grid" data-astro-cid-k5zskagf> <div class="flex items-center justify-between mb-12" data-astro-cid-k5zskagf> <h2 class="text-xl md:text-2xl font-light tracking-tight text-foreground" data-astro-cid-k5zskagf>
All Reports
</h2> <div class="h-px bg-gradient-to-r from-foreground/20 to-transparent flex-1 ml-8" data-astro-cid-k5zskagf></div> </div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8" data-astro-cid-k5zskagf> ${reportsData.map((report) => renderTemplate`${renderComponent($$result3, "ReportCard", $$ReportCard, { "id": report.id, "title": report.title, "description": report.description, "category": report.category, "publishDate": report.publishDate, "readTime": report.readTime, "slug": report.slug, "featured": report.featured || false, "tags": report.tags, "data-astro-cid-k5zskagf": true })}`)} </div> ${reportsData.length === 0 && renderTemplate`<div class="text-center py-20" data-astro-cid-k5zskagf> <div class="text-foreground/60 mb-4" data-astro-cid-k5zskagf> <svg class="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-k5zskagf> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-astro-cid-k5zskagf></path> </svg> </div> <h3 class="text-lg font-light text-foreground mb-2" data-astro-cid-k5zskagf>No Reports Available</h3> <p class="text-sm text-foreground/60" data-astro-cid-k5zskagf>
Reports will appear here once they are published.
</p> </div>`} </div> ` })} </div> </section> ` })} `;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/reports.astro", void 0);

const $$file = "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/reports.astro";
const $$url = "/reports";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reports,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
