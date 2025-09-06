import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderComponent, d as renderTemplate } from './astro/server_Co88VAjz.mjs';
import 'kleur/colors';
import { Calendar, Clock } from 'lucide-react';

const $$Astro = createAstro("https://genzen-solutions.com");
const $$ReportCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ReportCard;
  const { report, sequenceNumber, featured = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/insights/${report.slug}/`, "href")}${addAttribute(`group block transition-transform duration-300 ease-in-out hover:scale-105 ${featured ? "lg:col-span-2" : ""}`, "class")}> <div class="bg-background border border-foreground/10 rounded-lg p-8 h-full hover:border-foreground/30 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-dark transition-[border-color,box-shadow] duration-300 ease-in-out"> <div class="space-y-6"> <div class="flex items-start justify-between"> <div class="space-y-2"> <div class="flex items-center space-x-2"> <span class="px-3 py-1 bg-foreground/10 text-foreground text-xs font-light rounded-full"> ${report.category} </span> ${report.featured && renderTemplate`<span class="px-3 py-1 bg-primary/10 text-primary text-xs font-light rounded-full">
Featured
</span>`} </div> </div> <div class="text-xs font-light text-foreground/40 tracking-wider"> ${sequenceNumber} </div> </div> <div class="space-y-4"> <h3${addAttribute(`font-light leading-tight tracking-tight text-foreground group-hover:text-foreground/80 transition-colors duration-300 ${featured ? "text-2xl lg:text-3xl" : "text-xl"}`, "class")}> ${report.title} </h3> <p class="text-base font-light text-foreground/70 leading-relaxed line-clamp-3"> ${report.description} </p> </div> <div class="flex items-center justify-between pt-4 border-t border-foreground/10"> <div class="flex items-center space-x-4 text-xs font-light text-foreground/50"> <div class="flex items-center space-x-1"> ${renderComponent($$result, "Calendar", Calendar, { "className": "h-3 w-3" })} <span>${report.publishDate}</span> </div> <div class="flex items-center space-x-1"> ${renderComponent($$result, "Clock", Clock, { "className": "h-3 w-3" })} <span>${report.readTime}</span> </div> </div> <div class="text-xs font-light text-foreground group-hover:text-primary transition-colors duration-300">
Read Insight →
</div> </div> </div> </div> </a>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/ReportCard.astro", void 0);

export { $$ReportCard as $ };
