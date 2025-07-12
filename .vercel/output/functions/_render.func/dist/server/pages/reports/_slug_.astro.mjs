/* empty css                                    */
import { c as createAstro, a as createComponent, m as maybeRenderHead, n as renderScript, r as renderTemplate, e as addAttribute, b as renderComponent } from '../../chunks/astro/server_CFDc-_dA.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DR_rWM_A.mjs';
import { $ as $$ClientInsights, a as $$CTA } from '../../chunks/ClientInsights_CzhgcSH5.mjs';
import { g as getCollection } from '../../chunks/_astro_content_D-PliacX.mjs';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro$5 = createAstro("https://genzen-solutions.com");
const $$ExecutiveSummary = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ExecutiveSummary;
  const {
    keyPoints = [
      "Market expansion opportunities identified in emerging sectors",
      "Operational efficiency improvements yielding 24% cost reduction",
      "Strategic partnerships driving 142% revenue growth",
      "Digital transformation initiatives ahead of industry benchmarks"
    ],
    recommendations = [
      {
        category: "IMMEDIATE",
        description: "Accelerate digital transformation initiatives to maintain competitive positioning"
      },
      {
        category: "SHORT-TERM",
        description: "Expand market presence in high-growth sectors identified in analysis"
      },
      {
        category: "LONG-TERM",
        description: "Develop strategic partnerships to leverage emerging technology trends"
      }
    ],
    nextReview = "Q1 2025",
    projectTimeline = "12 mo"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-32 lg:py-40"> <div class="max-w-4xl mx-auto px-20 lg:px-24"> <div class="grid lg:grid-cols-12 gap-20"> <div class="lg:col-span-6"> <div class="space-y-12 opacity-0 translate-y-10 transition-all duration-1000" data-animate="executive-content"> <div class="space-y-8"> <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground">
Executive Summary
</h2> <div class="w-12 h-px bg-foreground/20"></div> </div> <div class="space-y-8"> <p class="text-lg font-light text-foreground leading-relaxed">
This comprehensive analysis reveals strategic opportunities for sustainable 
              growth and competitive advantage across multiple market segments.
</p> <div class="space-y-6"> ${keyPoints && Array.isArray(keyPoints) && keyPoints.map((point) => renderTemplate`<div class="flex items-start space-x-4"> <div class="w-1 h-1 rounded-full bg-foreground mt-2 flex-shrink-0"></div> <p class="text-sm font-light text-foreground leading-relaxed"> ${point} </p> </div>`)} </div> </div> </div> </div> <div class="lg:col-span-5 lg:col-start-8"> <div class="space-y-16 opacity-0 translate-y-10 transition-all duration-1000 delay-200" data-animate="executive-recommendations"> <div class="space-y-8"> <h3 class="text-xl font-light text-foreground">Key Recommendations</h3> <div class="space-y-6"> ${recommendations && Array.isArray(recommendations) && recommendations.map((rec) => renderTemplate`<div class="border-l-2 border-foreground/10 pl-6"> <div class="text-sm font-light text-foreground tracking-wider mb-2"> ${rec.category} </div> <p class="text-sm font-light text-foreground leading-relaxed"> ${rec.description} </p> ${rec.timeline && renderTemplate`<div class="text-xs font-light text-foreground/50 mt-1">
Timeline: ${rec.timeline} </div>`} </div>`)} </div> </div> <div class="grid grid-cols-2 gap-6"> <div> <div class="text-xl font-light mb-1 text-foreground">${nextReview}</div> <div class="text-xs font-light text-foreground tracking-wider">NEXT REVIEW</div> </div> <div> <div class="text-xl font-light mb-1 text-foreground">${projectTimeline}</div> <div class="text-xs font-light text-foreground tracking-wider">TIMELINE</div> </div> </div> </div> </div> </div> </div> </section> ${renderScript($$result, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/ExecutiveSummary.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/ExecutiveSummary.astro", void 0);

const $$Astro$4 = createAstro("https://genzen-solutions.com");
const $$DataVisualization = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$DataVisualization;
  const { title, description, services = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-32 lg:py-40 bg-background"> <div class="max-w-7xl mx-auto px-6 lg:px-8"> <div class="space-y-20"> <div class="text-center space-y-8"> <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground"> ${title} </h2> <div class="w-12 h-px bg-foreground/20 mx-auto"></div> <p class="text-lg font-light text-foreground/70 leading-relaxed max-w-3xl mx-auto"> ${description} </p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${services && Array.isArray(services) && services.map((service, index) => renderTemplate`<div class="group space-y-4 p-6 border border-foreground/10 rounded-lg hover:border-foreground/30 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-dark transition-all duration-300 cursor-pointer"> <div class="flex items-start space-x-3"> <div class="w-3 h-3 rounded-full mt-2 bg-foreground transition-all duration-300 group-hover:scale-125"${addAttribute(`opacity: ${1 - index * 0.12}`, "style")}></div> <div class="space-y-3 flex-1"> <h3 class="text-base font-light text-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed"> ${service.name} </h3> ${service.description && renderTemplate`<p class="text-sm font-light text-foreground/70 leading-relaxed group-hover:text-foreground/60 transition-colors duration-300"> ${service.description} </p>`} </div> </div> </div>`)} </div> </div> </div> </section>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/DataVisualization.astro", void 0);

const $$Astro$3 = createAstro("https://genzen-solutions.com");
const $$FinancialHighlights = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FinancialHighlights;
  const { title, description, highlights = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-32 lg:py-40 bg-foreground/5"> <div class="max-w-6xl mx-auto px-20 lg:px-24"> <div class="space-y-20"> <div class="text-center space-y-8 opacity-0 translate-y-10 transition-all duration-1000" data-animate="financial-title"> <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground"> ${title} </h2> <div class="w-12 h-px bg-foreground/20 mx-auto"></div> </div> <div class="grid lg:grid-cols-12 gap-16"> <div class="lg:col-span-7"> <div class="space-y-8">  <div class="prose prose-lg max-w-none"> <p class="text-lg font-light text-foreground leading-relaxed mb-6"> ${description} </p> </div> </div> </div> <div class="lg:col-span-5"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6"> ${highlights && Array.isArray(highlights) && highlights.map((item) => (
    // Removed animate-fade-in class and style attribute for animationDelay
    renderTemplate`<div class="group relative cursor-pointer hover:scale-105 transition-all duration-300"> <div class="bg-background/80 backdrop-blur-sm border border-foreground/10 rounded-lg p-6 space-y-4 hover:border-foreground/30 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-dark transition-all duration-300"> <div class="space-y-3"> <div class="text-lg font-light text-foreground group-hover:text-foreground/80 transition-colors duration-300"> ${item.label} </div> <div class="text-sm font-light text-foreground/70 leading-relaxed"> ${item.value} </div> </div> <div class="flex items-center justify-between pt-3 border-t border-foreground/10"> <div${addAttribute([
      "text-xs font-light px-3 py-1 rounded-full transition-all duration-300",
      "bg-red-500/20 text-red-500/80 group-hover:bg-red-500/30"
    ], "class:list")}> ${item.change} </div> <div class="text-xs font-light text-foreground/50"> ${item.period} </div> </div> </div> </div>`
  ))} </div> </div> </div> </div> </div> </section>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/FinancialHighlights.astro", void 0);

const $$Astro$2 = createAstro("https://genzen-solutions.com");
const $$MarketAnalysis = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MarketAnalysis;
  return renderTemplate`${maybeRenderHead()}<section class="py-32 lg:py-40"> <div class="max-w-4xl mx-auto px-20 lg:px-24"> <div class="grid lg:grid-cols-12 gap-16"> <div class="lg:col-span-5 lg:col-start-8"> <div class="space-y-8 opacity-0 translate-y-10 transition-all duration-1000" data-animate="market-content"> <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground">
Market Analysis
</h2> <div class="w-12 h-px bg-foreground/20"></div> <div class="space-y-6"> <p class="text-base font-light text-foreground leading-relaxed">
Comprehensive market research reveals significant growth opportunities across key sectors, 
              with emerging trends indicating a 30% year-over-year expansion.
</p> <div class="grid grid-cols-2 gap-6"> <div class="group cursor-pointer hover:scale-110 transition-all duration-300">  <div class="text-xl font-light mb-1 text-foreground group-hover:text-foreground/80 transition-colors duration-300">+24%</div> <div class="text-xs font-light text-foreground tracking-wider">MARKET GROWTH</div> </div> <div class="group cursor-pointer hover:scale-110 transition-all duration-300">  <div class="text-xl font-light mb-1 text-foreground group-hover:text-foreground/80 transition-colors duration-300">87%</div> <div class="text-xs font-light text-foreground tracking-wider">CONFIDENCE</div> </div> </div> </div> </div> </div> <div class="lg:col-span-6 lg:col-start-1 lg:row-start-1"> <div class="h-80 w-full group cursor-pointer opacity-0 translate-y-10 transition-all duration-1000 delay-200" data-animate="market-chart"> <div class="w-full h-full flex items-center justify-center border border-dashed border-foreground/20 rounded-lg"> <p class="text-foreground/50 text-center">
[Placeholder for Line Chart]<br>
(Originally implemented with Recharts)
</p> </div> </div> </div> </div> </div> </section> ${renderScript($$result, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/MarketAnalysis.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/MarketAnalysis.astro", void 0);

const $$IndustryTrends = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-32 lg:py-40"> <div class="max-w-4xl mx-auto px-20 lg:px-24"> <div class="grid lg:grid-cols-12 gap-20"> <div class="lg:col-span-7"> <div class="space-y-12"> <div class="space-y-8">  <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground">
Industry Trends
</h2> <div class="w-12 h-px bg-foreground/20"></div> </div> <div class="h-64 w-full group cursor-pointer">  <div class="w-full h-full flex items-center justify-center border border-dashed border-foreground/20 rounded-lg"> <p class="text-foreground/50 text-center">
[Placeholder for Bar Chart]<br>
(Originally implemented with Recharts)
</p> </div> </div> </div> </div> <div class="lg:col-span-4 lg:col-start-9"> <div class="space-y-12"> <div class="space-y-6">  <h3 class="text-xl font-light text-foreground hover:scale-105 transition-transform duration-300">Digital Transformation</h3> <p class="text-sm font-light text-foreground leading-relaxed">
Technology sector leads adoption rates with 85% implementation, while traditional 
              industries show significant growth potential.
</p> </div> <div class="space-y-8"> <div>  <div class="flex justify-between items-end mb-2"> <span class="text-sm font-light text-foreground">Current Adoption</span> <span class="text-sm font-light text-foreground">62%</span> </div> <div class="w-full bg-foreground/10 h-1 rounded-full overflow-hidden"> <div class="bg-foreground h-full rounded-full"${addAttribute({ width: "62%"  }, "style")}></div> </div> </div> <div>  <div class="flex justify-between items-end mb-2"> <span class="text-sm font-light text-foreground">Growth Potential</span> <span class="text-sm font-light text-foreground">84%</span> </div> <div class="w-full bg-foreground/10 h-1 rounded-full overflow-hidden"> <div class="bg-foreground/30 h-full rounded-full"${addAttribute({ width: "84%"  }, "style")}></div> </div> </div> </div> </div> </div> </div> </div> </section>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/IndustryTrends.astro", void 0);

const $$Astro$1 = createAstro("https://genzen-solutions.com");
const $$FutureOutlook = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FutureOutlook;
  const {
    title = "Strategic Roadmap & Future Outlook",
    description = "Our strategic vision for the next three years is anchored in sustainable growth, technological innovation, and market expansion.",
    projections = [
      { year: "2025", revenue: "$32M", growth: "+29%", confidence: 92 },
      { year: "2026", revenue: "$41M", growth: "+28%", confidence: 87 },
      { year: "2027", revenue: "$53M", growth: "+29%", confidence: 82 }
    ],
    initiatives = [
      { title: "AI Integration", timeline: "Q2 2025", impact: "High", description: "Implement advanced AI solutions across service delivery" },
      { title: "Global Expansion", timeline: "Q3 2025", impact: "Medium", description: "Enter 5 new international markets" },
      { title: "Platform Modernization", timeline: "Q4 2025", impact: "High", description: "Complete digital transformation initiative" }
    ]
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-32 lg:py-40"> <div class="max-w-6xl mx-auto px-20 lg:px-24"> <div class="space-y-20"> <div class="text-center space-y-8">  <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground"> ${title} </h2> <div class="w-12 h-px bg-foreground/20 mx-auto"></div> </div> <div class="space-y-16"> <div>  <div class="prose prose-lg max-w-none"> <p class="text-lg font-light text-foreground leading-relaxed mb-6"> ${description} </p> <p class="text-base font-light text-foreground/80 leading-relaxed mb-8">
Revenue projections are based on detailed market analysis, existing client pipeline, and conservative growth assumptions across all service verticals. Our confidence intervals reflect thorough risk assessment while accounting for potential market volatility and competitive pressures in the consulting sector.
</p> </div> </div> <div class="grid lg:grid-cols-12 gap-20"> <div class="lg:col-span-7 space-y-12"> <div>  <h3 class="text-2xl font-light text-foreground mb-6">Revenue Growth Trajectory</h3> <div class="prose max-w-none mb-8"> <p class="text-base font-light text-foreground/80 leading-relaxed">
Our three-year financial outlook demonstrates sustained growth momentum driven by strategic market positioning and operational excellence. The projected compound annual growth rate of 28.7% reflects our ability to capitalize on emerging opportunities while maintaining service quality and client satisfaction.
</p> </div> <div class="space-y-6"> ${projections && Array.isArray(projections) && projections.map((projection) => (
    // Removed animate-fade-in class and style attribute for animationDelay
    renderTemplate`<div class="group relative cursor-pointer hover:scale-102 transition-all duration-300 border border-foreground/10 rounded-lg p-6 hover:border-foreground/20 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-dark"> <div class="grid grid-cols-12 gap-4 items-center"> <div class="col-span-2"> <div class="text-2xl font-light text-foreground group-hover:text-foreground/80 transition-colors duration-300"> ${projection.year} </div> </div> <div class="col-span-6"> <div class="space-y-2"> <div class="text-xl font-light text-foreground"> ${projection.revenue} </div> <div class="text-sm font-light text-foreground/70 bg-foreground/10 px-2 py-1 rounded-full inline-block"> ${projection.growth} </div> </div> </div> <div class="col-span-4"> <div class="space-y-2"> <div class="text-sm font-light text-foreground/70">
Confidence: ${projection.confidence}%
</div> <div class="w-full bg-foreground/5 h-1 rounded-full overflow-hidden"> <div class="h-full bg-gradient-to-r from-foreground to-foreground/60 rounded-full"${addAttribute({ width: `${projection.confidence}%` }, "style")}></div> </div> </div> </div> </div> </div>`
  ))} </div> </div> </div> <div class="lg:col-span-5 space-y-12"> <div>  <h3 class="text-2xl font-light text-foreground mb-6">Strategic Initiatives</h3> <div class="prose max-w-none mb-8"> <p class="text-base font-light text-foreground/80 leading-relaxed">
Key strategic initiatives will drive operational transformation and market expansion over the planning horizon. Each initiative has been carefully evaluated for impact potential and resource requirements.
</p> </div> <div class="space-y-6"> ${initiatives && Array.isArray(initiatives) && initiatives.map((initiative) => (
    // Removed animate-fade-in class and style attribute for animationDelay
    renderTemplate`<div class="group cursor-pointer hover:scale-105 transition-all duration-300"> <div class="border-l-2 border-foreground/10 pl-6 hover:border-foreground/30 transition-colors duration-300 py-4"> <div class="space-y-3"> <div class="flex items-center justify-between"> <h4 class="text-lg font-light text-foreground group-hover:text-foreground/80 transition-colors duration-300"> ${initiative.title} </h4> <span${addAttribute([
      "text-xs font-light px-2 py-1 rounded-full transition-all duration-300",
      initiative.impact === "High" ? "bg-foreground/20 text-foreground/80" : "bg-foreground/10 text-foreground/70"
    ], "class:list")}> ${initiative.impact} Impact
</span> </div> <p class="text-sm font-light text-foreground/70 leading-relaxed"> ${initiative.description} </p> <div class="text-xs font-light text-foreground/50">
Target: ${initiative.timeline} </div> </div> </div> </div>`
  ))} </div> </div> </div> </div> <div class="bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-lg p-8">  <div class="prose prose-lg max-w-none"> <h3 class="text-xl font-light text-foreground mb-4">Market Positioning & Competitive Advantage</h3> <p class="text-base font-light text-foreground/80 leading-relaxed mb-4">
Our strategic positioning leverages deep industry expertise, technological innovation, and client-centric service delivery to maintain competitive differentiation. The roadmap prioritizes sustainable growth while preserving the agility and responsiveness that define our market approach.
</p> <p class="text-sm font-light text-foreground/70 leading-relaxed">
Risk mitigation strategies include diversified revenue streams, flexible resource allocation, and continuous investment in emerging technologies and talent development programs.
</p> </div> </div> </div> </div> </div> </section>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/FutureOutlook.astro", void 0);

const $$Astro = createAstro("https://genzen-solutions.com");
async function getStaticPaths() {
  const reports = await getCollection("reports");
  return reports.map((entry) => ({
    params: { slug: entry.data.slug },
    props: { report: entry.data }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { report } = Astro2.props;
  if (!report) {
    return Astro2.redirect("/404");
  }
  const getReportSections = (slug) => {
    switch (slug) {
      case "2024-strategic-business-intelligence":
        return [
          { component: "ExecutiveSummary", key: "executive" },
          { component: "DataVisualization", key: "data-viz" },
          { component: "FinancialHighlights", key: "financial" },
          { component: "ClientInsights", key: "insights" },
          { component: "FutureOutlook", key: "outlook" }
        ];
      case "market-performance-analysis-2024":
        return [
          { component: "ExecutiveSummary", key: "executive" },
          { component: "MarketAnalysis", key: "market" },
          { component: "IndustryTrends", key: "trends" },
          { component: "FinancialHighlights", key: "financial" },
          { component: "FutureOutlook", key: "outlook" }
        ];
      case "regional-performance-global-expansion":
        return [
          { component: "ExecutiveSummary", key: "executive" },
          { component: "MarketAnalysis", key: "market" },
          { component: "DataVisualization", key: "data-viz" },
          { component: "ClientInsights", key: "insights" },
          { component: "FutureOutlook", key: "outlook" }
        ];
      case "technology-infrastructure-report":
        return [
          { component: "ExecutiveSummary", key: "executive" },
          { component: "IndustryTrends", key: "trends" },
          { component: "DataVisualization", key: "data-viz" },
          { component: "FinancialHighlights", key: "financial" },
          { component: "FutureOutlook", key: "outlook" }
        ];
      default:
        return [
          { component: "ExecutiveSummary", key: "executive" }
        ];
    }
  };
  const reportSections = getReportSections(report.slug) || [];
  const allReports = await getCollection("reports");
  const relatedReports = allReports ? allReports.filter((r) => r.data.id !== report.id).slice(0, 2).map((r) => r.data) : [];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": report.title, "description": report.subtitle }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="pt-32 pb-16 lg:pt-40 lg:pb-24"> <div class="max-w-7xl mx-auto px-6 lg:px-8"> <div class="space-y-8"> <a href="/reports" class="inline-flex items-center space-x-2 text-foreground/70 hover:text-foreground transition-colors group"> <svg class="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> <span class="text-sm font-light tracking-wide">Back to Reports</span> </a> <div class="grid lg:grid-cols-3 gap-12"> <div class="lg:col-span-2 space-y-8"> <div class="space-y-4"> <div class="flex items-center space-x-3"> <span class="px-3 py-1 bg-foreground/10 text-foreground text-xs font-light rounded-full"> ${report.category} </span> ${report.featured && renderTemplate`<span class="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-light rounded-full">
Featured
</span>`} </div> <h1 class="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-foreground"> ${report.title} </h1> <p class="text-xl font-light text-foreground/70 leading-relaxed"> ${report.subtitle} </p> </div> <div class="prose prose-lg max-w-none"> <p class="text-lg font-light text-foreground/80 leading-relaxed"> ${report.description} </p> </div> </div> <div class="space-y-8"> <div class="bg-foreground/5 rounded-lg p-6 space-y-6"> <h3 class="text-lg font-light text-foreground">Report Details</h3> <div class="space-y-4"> <div class="flex items-center space-x-3"> <svg class="h-4 w-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path> </svg> <span class="text-sm font-light text-foreground">${report.author}</span> </div> <div class="flex items-center space-x-3"> <svg class="h-4 w-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> <span class="text-sm font-light text-foreground">${report.publishDate}</span> </div> <div class="flex items-center space-x-3"> <svg class="h-4 w-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span class="text-sm font-light text-foreground">${report.readTime}</span> </div> </div> <div class="space-y-3"> <div class="flex items-center space-x-2"> <svg class="h-4 w-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path> </svg> <span class="text-sm font-light text-foreground">Tags</span> </div> <div class="flex flex-wrap gap-2"> ${report.tags && Array.isArray(report.tags) && report.tags.map((tag) => renderTemplate`<span${addAttribute(tag, "key")} class="px-2 py-1 bg-foreground/10 text-foreground text-xs font-light rounded"> ${tag} </span>`)} </div> </div> </div> </div> </div> </div> </div> </section>  ${reportSections && Array.isArray(reportSections) && reportSections.map((section) => renderTemplate`<div${addAttribute(section.key, "key")}> ${section.component === "ExecutiveSummary" && (report.executiveSummary ? renderTemplate`${renderComponent($$result2, "ExecutiveSummary", $$ExecutiveSummary, { "keyPoints": report.executiveSummary.keyPoints || [], "recommendations": report.executiveSummary.recommendations || [], "nextReview": report.executiveSummary.nextReview, "projectTimeline": report.executiveSummary.projectTimeline })}` : renderTemplate`${renderComponent($$result2, "ExecutiveSummary", $$ExecutiveSummary, {})}`)} ${section.component === "DataVisualization" && (report.dataVisualization ? renderTemplate`${renderComponent($$result2, "DataVisualization", $$DataVisualization, { "title": report.dataVisualization.title, "description": report.dataVisualization.description, "services": report.dataVisualization.services || [] })}` : renderTemplate`${renderComponent($$result2, "DataVisualization", $$DataVisualization, {})}`)} ${section.component === "FinancialHighlights" && (report.financialHighlights ? renderTemplate`${renderComponent($$result2, "FinancialHighlights", $$FinancialHighlights, { "title": report.financialHighlights.title, "description": report.financialHighlights.description, "highlights": report.financialHighlights.highlights || [] })}` : renderTemplate`${renderComponent($$result2, "FinancialHighlights", $$FinancialHighlights, {})}`)} ${section.component === "ClientInsights" && (report.clientInsights ? renderTemplate`${renderComponent($$result2, "ClientInsights", $$ClientInsights, { "title": report.clientInsights.title, "subtitle": report.clientInsights.subtitle, "insights": report.clientInsights.insights || [] })}` : renderTemplate`${renderComponent($$result2, "ClientInsights", $$ClientInsights, {})}`)} ${section.component === "MarketAnalysis" && renderTemplate`${renderComponent($$result2, "MarketAnalysis", $$MarketAnalysis, {})}`} ${section.component === "IndustryTrends" && renderTemplate`${renderComponent($$result2, "IndustryTrends", $$IndustryTrends, {})}`} ${section.component === "FutureOutlook" && (report.futureOutlook ? renderTemplate`${renderComponent($$result2, "FutureOutlook", $$FutureOutlook, { "title": report.futureOutlook.title, "description": report.futureOutlook.description, "projections": report.futureOutlook.projections || [], "initiatives": report.futureOutlook.initiatives || [] })}` : renderTemplate`${renderComponent($$result2, "FutureOutlook", $$FutureOutlook, {})}`)} </div>`)} ${relatedReports.length > 0 && renderTemplate`<section class="py-16 lg:py-24 bg-foreground/5"> <div class="max-w-7xl mx-auto px-6 lg:px-8"> <div class="space-y-12"> <h2 class="text-3xl font-light tracking-tight text-foreground">
Related Reports
</h2> <div class="grid md:grid-cols-2 gap-8"> ${relatedReports && Array.isArray(relatedReports) && relatedReports.map((relatedReport) => renderTemplate`<a${addAttribute(relatedReport.id, "key")}${addAttribute(`/reports/${relatedReport.slug}`, "href")} class="group block bg-background border border-foreground/10 rounded-lg p-6 hover:border-foreground/30 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-dark transition-all duration-300"> <div class="space-y-4"> <div class="flex items-center justify-between"> <span class="px-3 py-1 bg-foreground/10 text-foreground text-xs font-light rounded-full"> ${relatedReport.category} </span> <span class="text-xs font-light text-foreground/40"> ${relatedReport.readTime} </span> </div> <h3 class="text-xl font-light text-foreground group-hover:text-foreground/80 transition-colors"> ${relatedReport.title} </h3> <p class="text-sm font-light text-foreground/70 line-clamp-2"> ${relatedReport.description} </p> <div class="text-xs font-light text-foreground group-hover:text-blue-500 transition-colors">
Read Report →
</div> </div> </a>`)} </div> </div> </div> </section>`}${renderComponent($$result2, "CTA", $$CTA, { "headline": "Apply For Your Legacy Ecosystem Analysis", "subtext": "This confidential analysis reveals exactly how relationships and systems affect your legacy - and how to optimize authentic control. During this discreet evaluation, we map how your ecosystem actually functions, identify which relationships strengthen or compromise your position, and provide clear recommendations that enhance rather than disrupt your current operations. The analysis is conducted with complete confidentiality. Most clients discover important dynamics about their ecosystem they never knew existed.", "buttonText": "Apply for Analysis", "buttonLink": "/qualification-form" })} ` })}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/reports/[slug].astro", void 0);

const $$file = "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/reports/[slug].astro";
const $$url = "/reports/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
