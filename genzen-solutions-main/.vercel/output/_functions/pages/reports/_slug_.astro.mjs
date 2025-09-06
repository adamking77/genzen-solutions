/* empty css                                    */
import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate, d as addAttribute } from '../../chunks/astro/server_iUh9UfrQ.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BAdFw5dR.mjs';
/* empty css                                     */
import { g as getCollection } from '../../chunks/_astro_content_BRYQNbr4.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://genzen-solutions.com");
const $$ReportTemplate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ReportTemplate;
  const { entry, Content } = Astro2.props;
  const { data } = entry;
  const formatPublishDate = (dateString) => {
    if (!dateString) return "";
    return dateString;
  };
  return renderTemplate`<!-- Report Header -->${maybeRenderHead()}<section class="pt-32 pb-16 lg:pt-40 lg:pb-24" data-astro-cid-byiy2huu> <div class="max-w-6xl mx-auto px-6 lg:px-8" data-astro-cid-byiy2huu> <div class="grid lg:grid-cols-2 gap-12 items-start" data-astro-cid-byiy2huu> <!-- Report Info --> <div class="section-animate" data-astro-cid-byiy2huu> <div class="flex flex-wrap items-center gap-2 text-sm mb-6" data-astro-cid-byiy2huu> ${data.category && renderTemplate`<span class="px-3 py-1 bg-primary/10 text-primary rounded-full" data-astro-cid-byiy2huu> ${data.category} </span>`} ${data.readTime && renderTemplate`<span class="px-3 py-1 bg-muted text-muted-foreground rounded-full" data-astro-cid-byiy2huu> ${data.readTime} </span>`} ${data.featured && renderTemplate`<span class="px-3 py-1 bg-primary/20 text-primary rounded-full" data-astro-cid-byiy2huu>
Featured
</span>`} </div> <h1 class="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] tracking-tight text-foreground mb-4" data-astro-cid-byiy2huu> ${data.title} </h1> ${data.subtitle && renderTemplate`<p class="text-xl text-foreground/80 font-light mb-6" data-astro-cid-byiy2huu> ${data.subtitle} </p>`} <p class="text-lg text-muted-foreground font-light leading-relaxed mb-8" data-astro-cid-byiy2huu> ${data.description} </p> <!-- Report Metadata --> <div class="grid grid-cols-2 gap-6 pt-6 border-t border-border" data-astro-cid-byiy2huu> ${data.author && renderTemplate`<div data-astro-cid-byiy2huu> <dt class="text-sm font-medium text-muted-foreground mb-1" data-astro-cid-byiy2huu>Author</dt> <dd class="text-foreground font-light" data-astro-cid-byiy2huu>${data.author}</dd> </div>`} ${data.category && renderTemplate`<div data-astro-cid-byiy2huu> <dt class="text-sm font-medium text-muted-foreground mb-1" data-astro-cid-byiy2huu>Category</dt> <dd class="text-foreground font-light" data-astro-cid-byiy2huu>${data.category}</dd> </div>`} ${data.publishDate && renderTemplate`<div data-astro-cid-byiy2huu> <dt class="text-sm font-medium text-muted-foreground mb-1" data-astro-cid-byiy2huu>Published</dt> <dd class="text-foreground font-light" data-astro-cid-byiy2huu>${formatPublishDate(data.publishDate)}</dd> </div>`} ${data.readTime && renderTemplate`<div data-astro-cid-byiy2huu> <dt class="text-sm font-medium text-muted-foreground mb-1" data-astro-cid-byiy2huu>Reading Time</dt> <dd class="text-foreground font-light" data-astro-cid-byiy2huu>${data.readTime}</dd> </div>`} </div> </div> <!-- Featured Image --> <div class="section-animate" data-astro-cid-byiy2huu> ${data.featuredImage && renderTemplate`<div class="aspect-video overflow-hidden rounded-xl bg-accent/10" data-astro-cid-byiy2huu> <img${addAttribute(data.featuredImage, "src")}${addAttribute(data.title, "alt")} class="w-full h-full object-cover" data-astro-cid-byiy2huu> </div>`} </div> </div> </div> </section> <!-- TL;DR Section --> ${data.tldr && renderTemplate`<section class="py-16 lg:py-24" data-astro-cid-byiy2huu> <div class="max-w-4xl mx-auto px-6 lg:px-8" data-astro-cid-byiy2huu> <div class="section-animate" data-astro-cid-byiy2huu> <div class="bg-card rounded-xl p-8 lg:p-12 border border-border" data-astro-cid-byiy2huu> <div class="space-y-6" data-astro-cid-byiy2huu> <div data-astro-cid-byiy2huu> <h2 class="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-2" data-astro-cid-byiy2huu>
Key Insights
</h2> <div class="w-12 h-px bg-foreground/20" data-astro-cid-byiy2huu></div> </div> <p class="text-lg text-foreground/90 font-light leading-relaxed" data-astro-cid-byiy2huu> ${data.tldr} </p> </div> </div> </div> </div> </section>`} <!-- Executive Summary --> ${data.excerpt && renderTemplate`<section class="py-16 lg:py-24" data-astro-cid-byiy2huu> <div class="max-w-4xl mx-auto px-6 lg:px-8" data-astro-cid-byiy2huu> <div class="section-animate" data-astro-cid-byiy2huu> <div class="bg-accent/10 rounded-xl p-8 lg:p-12" data-astro-cid-byiy2huu> <h2 class="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-6" data-astro-cid-byiy2huu>
Executive Summary
</h2> <p class="text-lg text-foreground/90 font-light leading-relaxed" data-astro-cid-byiy2huu> ${data.excerpt} </p> </div> </div> </div> </section>`} <!-- Main Report Content --> <article class="py-16 lg:py-24 bg-background" data-astro-cid-byiy2huu> <div class="max-w-4xl mx-auto px-6 lg:px-8" data-astro-cid-byiy2huu> <div class="section-animate prose prose-lg max-w-none prose-headings:font-light prose-headings:tracking-tight prose-p:font-light prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-headings:text-foreground prose-p:text-foreground/90" data-astro-cid-byiy2huu> ${renderComponent($$result, "Content", Content, { "data-astro-cid-byiy2huu": true })} </div> </div> </article> <!-- Key Metrics Section --> ${(data.technologies || data.services) && renderTemplate`<section class="py-16 lg:py-24" data-astro-cid-byiy2huu> <div class="max-w-4xl mx-auto px-6 lg:px-8" data-astro-cid-byiy2huu> <div class="section-animate" data-astro-cid-byiy2huu> <h2 class="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-12 text-center" data-astro-cid-byiy2huu>
Key Information
</h2> <div class="grid md:grid-cols-2 gap-8" data-astro-cid-byiy2huu> ${data.technologies && data.technologies.length > 0 && renderTemplate`<div class="bg-card rounded-xl p-6 lg:p-8 border border-border" data-astro-cid-byiy2huu> <h3 class="text-xl font-light tracking-tight text-foreground mb-4" data-astro-cid-byiy2huu>
Technologies Covered
</h3> <div class="flex flex-wrap gap-2" data-astro-cid-byiy2huu> ${data.technologies.map((tech) => renderTemplate`<span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-light" data-astro-cid-byiy2huu> ${tech} </span>`)} </div> </div>`} ${data.services && data.services.length > 0 && renderTemplate`<div class="bg-card rounded-xl p-6 lg:p-8 border border-border" data-astro-cid-byiy2huu> <h3 class="text-xl font-light tracking-tight text-foreground mb-4" data-astro-cid-byiy2huu>
Services Analyzed
</h3> <div class="flex flex-wrap gap-2" data-astro-cid-byiy2huu> ${data.services.map((service) => renderTemplate`<span class="px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm font-light" data-astro-cid-byiy2huu> ${service} </span>`)} </div> </div>`} </div> </div> </div> </section>`} <!-- Report Footer --> <section class="py-16 lg:py-24 border-t border-border" data-astro-cid-byiy2huu> <div class="max-w-4xl mx-auto px-6 lg:px-8" data-astro-cid-byiy2huu> <div class="section-animate text-center" data-astro-cid-byiy2huu> <div class="bg-card rounded-xl p-8 lg:p-12" data-astro-cid-byiy2huu> <h2 class="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4" data-astro-cid-byiy2huu>
About This Report
</h2> <p class="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto" data-astro-cid-byiy2huu>
This analysis represents comprehensive research and industry insights. 
          All data and recommendations are based on current market conditions and technological assessments 
          as of the publication date.
</p> ${data.publishDate && renderTemplate`<p class="text-sm text-muted-foreground font-light mt-4" data-astro-cid-byiy2huu>
Published: ${formatPublishDate(data.publishDate)} </p>`} </div> </div> </div> </section> `;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/templates/ReportTemplate.astro", void 0);

const $$Astro = createAstro("https://genzen-solutions.com");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const allReports = await getCollection("reports");
  const report = allReports.find((r) => r.slug === slug);
  if (!report || report.data.published === false) {
    return Astro2.redirect("/404");
  }
  const { Content } = await report.render();
  const relatedReports = allReports.filter(
    (r) => r.data.published !== false && r.slug !== report.slug && r.data.category === report.data.category
  ).slice(0, 3);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": report.data.seoTitle || `${report.data.title} - Research Report`, "description": report.data.seoDescription || report.data.description, "image": report.data.featuredImage, "type": "article", "data-astro-cid-6l5vyk3t": true }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "ReportTemplate", $$ReportTemplate, { "entry": report, "Content": Content, "data-astro-cid-6l5vyk3t": true })}  ${relatedReports.length > 0 && renderTemplate`${maybeRenderHead()}<section class="py-16 lg:py-24 bg-background" data-astro-cid-6l5vyk3t> <div class="max-w-6xl mx-auto px-6 lg:px-8" data-astro-cid-6l5vyk3t> <div class="section-animate mb-12" data-astro-cid-6l5vyk3t> <div class="space-y-8" data-astro-cid-6l5vyk3t> <div class="text-sm font-medium tracking-widest text-foreground/60 uppercase" data-astro-cid-6l5vyk3t>
KEEP READING
</div> <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground" data-astro-cid-6l5vyk3t>
Related Reports
</h2> <div class="w-12 h-px bg-foreground/20" data-astro-cid-6l5vyk3t></div> </div> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-6l5vyk3t> ${relatedReports.map((relatedReport, index) => renderTemplate`<article class="section-animate group" data-astro-cid-6l5vyk3t> <a${addAttribute(`/reports/${relatedReport.slug}`, "href")} class="block transition-[transform,border-color,box-shadow] duration-300 ease-in-out hover:scale-105" data-astro-cid-6l5vyk3t> <div class="bg-background border border-border rounded-xl overflow-hidden h-full hover:border-foreground/30 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-enhanced-dark transition-[border-color,box-shadow] duration-300 ease-in-out" data-astro-cid-6l5vyk3t> ${relatedReport.data.featuredImage && renderTemplate`<div class="aspect-video overflow-hidden bg-accent/10" data-astro-cid-6l5vyk3t> <img${addAttribute(relatedReport.data.featuredImage, "src")}${addAttribute(relatedReport.data.title, "alt")} class="w-full h-full object-cover" loading="lazy" data-astro-cid-6l5vyk3t> </div>`} <div class="p-6" data-astro-cid-6l5vyk3t> <div class="flex items-center gap-2 mb-3" data-astro-cid-6l5vyk3t> <span class="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full" data-astro-cid-6l5vyk3t> ${relatedReport.data.category} </span> </div> <h3 class="text-lg font-light tracking-tight text-foreground group-hover:text-foreground/80 transition-colors duration-300 mb-3" data-astro-cid-6l5vyk3t> ${relatedReport.data.title} </h3> <p class="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2" data-astro-cid-6l5vyk3t> ${relatedReport.data.excerpt || relatedReport.data.description} </p> ${(relatedReport.data.publishDate || relatedReport.data.readTime) && renderTemplate`<div class="flex items-center gap-4 mt-4 text-xs text-muted-foreground" data-astro-cid-6l5vyk3t> ${relatedReport.data.publishDate && renderTemplate`<span data-astro-cid-6l5vyk3t>${relatedReport.data.publishDate}</span>`} ${relatedReport.data.readTime && renderTemplate`<span data-astro-cid-6l5vyk3t>${relatedReport.data.readTime}</span>`} </div>`} </div> </div> </a> </article>`)} </div> </div> </section>`} <section class="py-16 lg:py-24" data-astro-cid-6l5vyk3t> <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center" data-astro-cid-6l5vyk3t> <div class="section-animate" data-astro-cid-6l5vyk3t> <h2 class="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4" data-astro-cid-6l5vyk3t>
Want More Research Insights?
</h2> <p class="text-muted-foreground font-light max-w-2xl mx-auto mb-8" data-astro-cid-6l5vyk3t>
Stay updated with our latest research and industry analysis reports.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-6l5vyk3t> <a href="/contact" class="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-light transition-colors" data-astro-cid-6l5vyk3t>
Subscribe to Updates
</a> <a href="/reports" class="inline-flex items-center justify-center px-6 py-3 border border-border hover:bg-accent/5 rounded-full font-light transition-colors" data-astro-cid-6l5vyk3t>
View More Reports
</a> </div> </div> </div> </section> ` })} `;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/pages/reports/[slug].astro", void 0);

const $$file = "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/pages/reports/[slug].astro";
const $$url = "/reports/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
