/* empty css                                 */
import { c as createAstro, a as createComponent, m as maybeRenderHead, b as renderComponent, r as renderTemplate, e as addAttribute, u as unescapeHTML, n as renderScript } from '../chunks/astro/server_CFDc-_dA.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B_N8G20q.mjs';
import { S as ScrollAnimator, I as IntakeFormModal, $ as $$ClientInsights, a as $$CTA } from '../chunks/ClientInsights_r5ZiMtOW.mjs';
import { B as Button } from '../chunks/toaster_Ch3OmOK9.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const homePageContent = {
  legacyEcosystemAnalysis: {
    title: "Legacy Ecosystem Analysis",
    description: "Most organizations make critical decisions based on incomplete intelligence about their own ecosystem.\n\nThese intelligence gaps create the exact vulnerabilities that Legacy Hijacking exploits - turning trusted relationships and protective systems into channels for systematic exploitation.\n\nThe Legacy Ecosystem Analysis provides complete intelligence mapping of how your legacy actually operates, revealing the true dynamics affecting your influence and decision-making power.",
    subtitle: "This comprehensive intelligence operation delivers:",
    description2: "This analysis is available by invitation or application only.\n\nDue to the sensitive nature of legacy intelligence operations and the requirement for strategic partnerships with specialized intelligence providers, we carefully evaluate each engagement to ensure optimal results.\n\nApply below for confidential evaluation of your situation and availability for this strategic diagnostic.",
    services: [
      {
        name: "Cultural Intelligence Mapping",
        description: "Understand how cultural dynamics actually affect your decision-making and influence"
      },
      {
        name: "Human Ecosystem Due Diligence",
        description: "Identify who holds real influence in your network and where dependencies create vulnerability"
      },
      {
        name: "Behavioral Pattern Analysis",
        description: "Predict how key stakeholders will respond to critical decisions before you make them"
      },
      {
        name: "Strategic Synthesis",
        description: "Discover hidden leverage points and optimization opportunities others miss"
      },
      {
        name: "Implementation Roadmap",
        description: "Receive clear actions to strengthen your legacy position based on intelligence findings"
      }
    ]
  },
  foundedStory: {
    companyName: "About GenZen Solutions",
    founderName: "Adam King: Founder & Chief Strategist",
    founderImage: "/images/adam_king_2.jpeg"
  }};

const $$Astro$4 = createAstro("https://genzen-solutions.com");
const $$CompanyHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CompanyHero;
  const {
    title,
    subtitle,
    location,
    ctaText,
    ctaLink
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="company-hero-section pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40 bg-background text-foreground"> <div class="max-w-6xl mx-auto px-6 lg:px-8"> <div class="space-y-8 sm:space-y-10 lg:space-y-12"> <div> ${renderComponent($$result, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.2, "duration": 1e3, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <h1 class="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-5xl text-foreground"> ${title} <span class="text-foreground/50">${location}</span> </h1> ` })} </div> ${subtitle && renderTemplate`<div> ${renderComponent($$result, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.2, "duration": 1e3, "delay": 200, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <p class="text-base sm:text-lg md:text-xl font-light text-foreground/70 leading-relaxed max-w-2xl"> ${subtitle} </p> ` })} </div>`} <div> ${renderComponent($$result, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.2, "duration": 1e3, "delay": 400, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "IntakeFormModal", IntakeFormModal, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/modals/IntakeFormModal.tsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "size": "lg", "className": "font-light text-base px-12 py-3 h-auto border-2 border-foreground/20 bg-transparent text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-[border-color,background-color,color,transform] duration-300 ease-in-out rounded-full" }, { "default": ($$result4) => renderTemplate`${ctaText}` })} ` })} ` })} </div> </div> </div> </section>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/layouts/CompanyHero.astro", void 0);

const $$Astro$3 = createAstro("https://genzen-solutions.com");
const $$PerformanceMetrics = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PerformanceMetrics;
  const {
    title = "Performance Metrics",
    subtitle,
    description,
    metrics = []
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-16 sm:py-20 lg:py-24 bg-secondary/30" id="performance-metrics-section"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12"> <div class="lg:col-span-5"> ${renderComponent($$result, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.2, "duration": 1e3, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <div class="space-y-8 sticky top-32"> <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground"> ${title} </h2> <div class="w-12 h-px bg-foreground/20"></div> ${subtitle && renderTemplate`<p class="text-sm sm:text-base font-light text-foreground leading-relaxed"> ${subtitle} </p>`} ${description && renderTemplate`<p class="text-sm sm:text-base font-light text-foreground leading-relaxed"> ${description} </p>`} </div> ` })} </div> <div class="lg:col-span-7"> ${renderComponent($$result, "ScrollAnimator", ScrollAnimator, { "client:load": true, "threshold": 0.2, "duration": 1e3, "delay": 200, "staggerChildren": 150, "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:grid-rows-2 sm:gap-8 lg:gap-12"> ${metrics.map((metric, index) => {
    const gridClasses = index === 0 ? "sm:col-span-2 sm:row-span-1 sm:col-start-1 sm:row-start-1" : index === 1 ? "sm:col-span-3 sm:row-span-1 sm:col-start-1 sm:row-start-2" : "sm:col-span-1 sm:row-span-1 sm:col-start-3 sm:row-start-1";
    return renderTemplate`<div${addAttribute(`group relative cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out transform-gpu ${gridClasses}`, "class")}> <div${addAttribute(`border-l border-foreground/10 pl-8 pr-6 hover:border-foreground/30 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-dark transition-all duration-300 ease-in-out ${index === 1 ? "space-y-4 pt-4 pb-4" : "space-y-6 py-6 h-full"}`, "class")}> <div class="flex items-start justify-between"> <div class="space-y-3"> <div${addAttribute(`font-light text-foreground transition-colors duration-300 ease-in-out ${index === 0 ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl"}`, "class")}> ${metric.value} </div> <div${addAttribute(`font-light text-foreground tracking-wider ${index === 0 ? "text-base" : "text-sm"}`, "class")}> ${(metric.label || metric.metric || "").toUpperCase()} </div> </div> <div class="w-2 h-2 rounded-full bg-primary/60 transition-[transform,box-shadow] duration-300 ease-in-out group-hover:scale-125 group-hover:bg-primary group-hover:neumorphic-hover-subtle group-hover:dark:neumorphic-hover-subtle-dark flex-shrink-0"></div> </div> <p${addAttribute(`font-light text-foreground/60 leading-relaxed ${index === 0 ? "text-sm" : "text-xs"}`, "class")}> ${metric.description || `${metric.label || metric.metric} performance indicator`} </p> </div> </div>`;
  })} </div> ` })} </div> </div> </div> </section>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/PerformanceMetrics.astro", void 0);

const $$Astro$2 = createAstro("https://genzen-solutions.com");
const $$TechnologyStack = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TechnologyStack;
  const {
    title = "Technology Infrastructure",
    description = "Modern technology stack and infrastructure capabilities",
    sections = {},
    technologies = [],
    stats = {}
  } = Astro2.props;
  const techItems = Object.keys(sections).length > 0 ? Object.values(sections) : technologies.map((tech) => ({
    title: tech.category,
    description: tech.description || `Advanced ${tech.category.toLowerCase()} capabilities${tech.tools ? ` including ${tech.tools.join(", ")}` : ""}${tech.adoption ? ` with ${tech.adoption}% adoption rate` : ""}.`
  }));
  return renderTemplate`${maybeRenderHead()}<section class="py-32 lg:py-40"> <div class="max-w-6xl mx-auto px-6 lg:px-20 xl:px-24"> <div class="space-y-12 lg:space-y-20"> <div class="text-left space-y-8"> <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground"> ${title} </h2> <div class="w-12 h-px bg-foreground/20"></div> </div> <div class="grid lg:grid-cols-12 gap-8 lg:gap-20"> <div class="lg:col-span-7"> <div class="space-y-12"> <div class="prose prose-lg max-w-none"> <p class="text-base sm:text-lg font-light text-foreground leading-relaxed mb-6"> ${description} </p> </div> <div class="space-y-8"> ${techItems.map((tech, index) => renderTemplate`<div class="group"> <div class="relative p-8 rounded-xl bg-background border border-foreground/10 hover:border-primary/30 transition-all duration-500 hover:neumorphic-hover-card hover:dark:neumorphic-hover-card-dark hover:scale-[1.02] hover:-translate-y-1">  ${index < techItems.length - 1 && renderTemplate`<div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-px h-4 bg-gradient-to-b from-primary/30 to-transparent"></div>`} <div class="space-y-8"> <div class="flex items-start justify-between"> <div class="space-y-1"> <div class="text-xs font-light text-primary/70 uppercase tracking-wider">
Intelligence Domain
</div> <h3 class="text-xl font-light text-foreground group-hover:text-primary transition-colors duration-300"> ${tech.title} </h3> </div>  <div class="w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary/50 transition-colors duration-300 mt-2"></div> </div> <div class="relative"> <div class="absolute left-0 top-0 w-0.5 h-full bg-primary/20"></div> <p class="text-base font-light text-foreground/70 leading-relaxed pl-4"> ${tech.description} </p> </div> </div> </div> </div>`)} </div> </div> </div> <div class="lg:col-span-5">  </div> </div> </div> </div> </section>`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/reports/TechnologyStack.astro", void 0);

const $$Astro$1 = createAstro("https://genzen-solutions.com");
const $$LegacyFeatureCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LegacyFeatureCard;
  const { title, description, index, isVisible = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative group cursor-pointer hover:scale-105 transition-all duration-300"> <div class="grid grid-cols-[auto_1fr] sm:grid-cols-12 gap-4 sm:gap-6 items-start p-4 sm:p-6 rounded-lg hover:bg-foreground/5 transition-colors duration-300"> <!-- Mobile & Desktop: Left-aligned circle --> <div class="relative flex items-center justify-center sm:col-span-1 sm:h-full sm:mr-4 sm:pt-1"> <div class="progress-circle-container"${addAttribute(index, "data-progress")}${addAttribute(isVisible, "data-animate")}> <!-- Mobile SVG --> <svg class="progress-svg-mobile sm:hidden" viewBox="0 0 40 40" width="40" height="40"> <circle class="progress-background" cx="20" cy="20" r="18" fill="none" stroke="hsl(var(--muted-foreground) / 0.2)" stroke-width="1.5"></circle> <circle class="progress-foreground" cx="20" cy="20" r="18" fill="none" stroke="hsl(var(--primary))" stroke-width="1.5" stroke-linecap="round" transform="rotate(-90 20 20)" style="stroke-dasharray: 113.097; stroke-dashoffset: 113.097;"></circle> </svg> <!-- Desktop SVG --> <svg class="hidden sm:block progress-svg" viewBox="0 0 56 56" width="56" height="56"> <circle class="progress-background" cx="28" cy="28" r="26" fill="none" stroke="hsl(var(--muted-foreground) / 0.2)" stroke-width="2"></circle> <circle class="progress-foreground" cx="28" cy="28" r="26" fill="none" stroke="hsl(var(--primary))" stroke-width="2" stroke-linecap="round" transform="rotate(-90 28 28)" style="stroke-dasharray: 163.363; stroke-dashoffset: 163.363;"></circle> </svg> <div class="progress-number">0${index + 1}</div> </div> </div> <div class="sm:col-span-11"> <div class="space-y-4"> <h3 class="text-xl font-light text-foreground group-hover:text-foreground/90 transition-colors duration-300">${unescapeHTML(title)}</h3> <p class="text-base font-light text-foreground/70 leading-relaxed group-hover:text-foreground transition-colors duration-300">${unescapeHTML(description)}</p> </div> </div> </div> <div class="w-full h-px bg-foreground/10 mt-6 sm:mt-8 transition-all duration-300 group-hover:bg-foreground/20"></div> </div> `;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/custom/LegacyFeatureCard.astro", void 0);

const $$Astro = createAstro("https://genzen-solutions.com");
const $$SolutionSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SolutionSection;
  const { title, description, features } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-32 lg:py-40"> <div class="max-w-6xl mx-auto px-6 lg:px-20 xl:px-24"> <div class="flex flex-col gap-8 lg:gap-16"> <div class="w-full space-y-8"> <div class="w-full md:w-2/3 space-y-8"> <div class="text-left space-y-8 animate-fade-in"> <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground"> ${title} </h2> </div> <div class="space-y-8 animate-fade-in" style="animation-delay: 200ms;"> <div class="prose prose-lg max-w-none"> <p class="text-lg font-light text-foreground leading-relaxed mb-6"> ${description} </p> </div> </div> </div> <div class="w-full md:w-3/4 md:mx-auto space-y-8"> ${features.map((feature, index) => renderTemplate`<div class="legacy-feature-wrapper"${addAttribute(index, "data-index")}> ${renderComponent($$result, "LegacyFeatureCard", $$LegacyFeatureCard, { "title": feature.title, "description": feature.description, "index": index, "isVisible": true })} </div>`)} </div> </div> </div> </div> </section> ${renderScript($$result, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/custom/SolutionSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/custom/SolutionSection.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "GenZen Solutions | Specialized Intelligence Preserving Generational Legacy", "description": "Legacy Intelligence - This age of increased opacity enables systematic exploitation of your legacies - we deliver the clarity that restores authentic control." }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CompanyHero", $$CompanyHero, { "title": "Specialized Intelligence Preserving Generational Legacy", "subtitle": "This age of increased opacity enables systematic exploitation of your legacies - we deliver the clarity that restores authentic control.", "location": "", "ctaText": "Apply for Analysis", "ctaLink": "/qualification-form" })}  ${renderComponent($$result2, "PerformanceMetrics", $$PerformanceMetrics, { "title": "Legacy Hijacking", "subtitle": "Current protection systems detect external threats effectively, but Legacy Hijacking exploits trusted relationships in ways that conventional security approaches cannot monitor.", "metrics": [
    {
      metric: "Unrecovered losses in Singapore (2024)",
      value: "S$930M",
      trend: "critical",
      description: "Despite families having advanced security systems in place."
    },
    {
      metric: "Family offices attacked globally",
      value: "43%",
      trend: "critical",
      description: "A significant percentage facing sophisticated threats."
    },
    {
      metric: "Attack rate for offices >$1B AUM",
      value: "62%",
      trend: "critical",
      description: "Higher wealth concentration attracts more intense threats."
    }
  ] })}  ${renderComponent($$result2, "ClientInsights", $$ClientInsights, { "title": "Legacy Hijacking Patterns", "subtitle": "These patterns operate through legitimate channels using trusted relationships - invisible to traditional security frameworks that cannot distinguish authentic protection from systematic exploitation.", "insights": [
    {
      category: "Government Authority Impersonation",
      feedback: "Singapore scammers achieved S$100,622 average losses per incident by exploiting cultural deference to regulatory authority through sophisticated impersonation that traditional security cannot detect.",
      score: "S$100,622",
      statistic: "average per incident"
    },
    {
      category: "Succession Vulnerability Windows",
      feedback: "67% of legacy undermining occurs within 18 months of leadership transitions when fragmented authority creates systematic exploitation opportunities invisible to conventional protection.",
      score: "67%",
      statistic: "within 18 months"
    },
    {
      category: "Long-Term Staff Cultivation",
      feedback: "Criminal networks deliberately target family office employees with 10+ year tenure, exploiting institutional knowledge and authentication privileges through relationships that appear completely legitimate.",
      score: "10+ years",
      statistic: "tenure targeted"
    }
  ] })}  ${maybeRenderHead()}<section id="intelligence"> ${renderComponent($$result2, "TechnologyStack", $$TechnologyStack, { "title": "Legacy Intelligence: Our Specialized Intelligence Methodology", "description": "Legacy Intelligence is our approach to detecting Legacy Hijacking before it manifests by analyzing three critical domains that traditional security approaches cannot monitor.", "technologies": [
    {
      category: "Cultural Intelligence",
      description: "Understanding how trust networks and cultural authority structures affect principal decision-making."
    },
    {
      category: "Behavioral Intelligence",
      description: "Analyzing how decision-making processes and protective relationships can be influenced through sophisticated methods."
    },
    {
      category: "Human Intelligence",
      description: "Mapping how advisory and operational systems impact principal control and authority."
    }
  ] })} </section>  ${renderComponent($$result2, "SolutionSection", $$SolutionSection, { "title": "How Legacy Intelligence Restores Authentic Control", "description": "Legacy Intelligence provides the specialized capability that traditional approaches cannot deliver:", "features": [
    {
      title: "Pattern Recognition",
      description: "Identifying Legacy Hijacking across cultural, behavioral, and systematic domains before traditional security systems detect symptoms."
    },
    {
      title: "Clarity Architecture",
      description: "Revealing where protective systems have become vulnerability channels and designing transparent alternatives that preserve authentic control."
    },
    {
      title: "Strategic Transformation",
      description: "Converting identified exploitation patterns into strengthened control while maintaining essential protective relationships."
    }
  ] })}  <section id="services" class="bg-secondary/20 py-16 sm:py-20 lg:py-24"> <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"> ${renderComponent($$result2, "ScrollAnimator", ScrollAnimator, { "client:visible": true, "threshold": 0.2, "duration": 1e3, "client:component-hydration": "visible", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="mx-auto max-w-3xl lg:mx-0"> <div class="text-left space-y-8 animate-fade-in"> <h2 class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground">${homePageContent.legacyEcosystemAnalysis.title}</h2> </div> <div class="mt-8 space-y-6 animate-fade-in" style="animation-delay: 200ms;"> ${homePageContent.legacyEcosystemAnalysis.description.split("\n\n").map((paragraph) => renderTemplate`<p class="text-lg font-light leading-relaxed text-foreground/70">${paragraph}</p>`)} </div> <div class="mt-12 space-y-8 animate-fade-in" style="animation-delay: 400ms;"> <h3 class="text-2xl font-light text-foreground tracking-tight"> ${homePageContent.legacyEcosystemAnalysis.subtitle} </h3> <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-1"> ${homePageContent.legacyEcosystemAnalysis.services.map((service, index) => renderTemplate`<div class="group border-l-2 border-primary/20 pl-6 py-4 px-4 -ml-4 rounded-r-lg hover:border-primary hover:bg-foreground/5 transition-all duration-300 cursor-pointer animate-fade-in"${addAttribute(`animation-delay: ${600 + index * 100}ms;`, "style")}> <h4 class="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">${service.name}</h4> <p class="mt-2 text-base font-light text-foreground/70 group-hover:text-foreground transition-colors duration-300 leading-relaxed">${service.description}</p> </div>`)} </div> </div> <div class="mt-12 space-y-4 animate-fade-in" style="animation-delay: 1000ms;"> ${homePageContent.legacyEcosystemAnalysis.description2.split("\n\n").map((paragraph) => renderTemplate`<p class="text-lg font-light leading-relaxed text-foreground/70">${paragraph}</p>`)} </div> </div> ` })} </div> </section>  <section id="about" class="py-16 sm:py-20 lg:py-24 bg-secondary/20" aria-labelledby="about-heading"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="max-w-4xl mx-auto"> <div> ${renderComponent($$result2, "ScrollAnimator", ScrollAnimator, { "client:visible": true, "threshold": 0.2, "duration": 1e3, "client:component-hydration": "visible", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="space-y-12"> <div class="space-y-8"> <h2 id="about-heading" class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground"> ${homePageContent.foundedStory.companyName} </h2> <div class="w-16 h-px bg-foreground/20"></div> </div> <div class="space-y-6"> <p class="text-lg font-light text-foreground/70 leading-relaxed">
Since 2017, GenZen Solutions has specialized in helping value-centered leaders navigate critical issues that threaten their autonomy and legacy. Through global strategic partnerships, the firm serves those facing systematic erosion of their decision-making authority and generational control.
</p> <p class="text-lg font-light text-foreground/70 leading-relaxed">
This unique combination of strategic intelligence and cultural understanding enables solutions to complex challenges that others cannot provide. GenZen Solutions steps in when traditional sources of protection have compromised independence, when advisory systems have created dependencies, and when autonomous decision-making hangs in the balance.
</p> <p class="text-lg font-light text-foreground/70 leading-relaxed">
Every engagement maintains complete confidentiality, precision, and measurable autonomy restoration.
</p> </div> <div class="grid grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-foreground/10"> <div class="text-center"> <div class="text-2xl font-light mb-2 text-foreground">250M+</div> <div class="text-sm font-light text-foreground/50">Assets Protected</div> </div> <div class="text-center"> <div class="text-2xl font-light mb-2 text-foreground">15+</div> <div class="text-sm font-light text-foreground/50">Years Experience</div> </div> </div> </div> ` })} </div> </div> </div> </section>  <section id="founder" class="py-16 sm:py-20 lg:py-24" aria-labelledby="founder-heading"> <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"> <div> ${renderComponent($$result2, "ScrollAnimator", ScrollAnimator, { "client:visible": true, "threshold": 0.2, "duration": 1e3, "client:component-hydration": "visible", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="flex items-center justify-center h-full"> <div class="relative"> <img${addAttribute(homePageContent.foundedStory.founderImage, "src")}${addAttribute(`Professional portrait of ${homePageContent.foundedStory.founderName}`, "alt")} class="w-80 h-96 object-cover rounded-lg shadow-xl" loading="lazy"> <div class="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary/10 to-transparent"></div> </div> </div> ` })} </div> <div> ${renderComponent($$result2, "ScrollAnimator", ScrollAnimator, { "client:visible": true, "threshold": 0.2, "duration": 1e3, "delay": 200, "client:component-hydration": "visible", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="space-y-12"> <div class="space-y-8"> <h2 id="founder-heading" class="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground">
The Founder
</h2> <div class="w-16 h-px bg-foreground/20"></div> </div> <div class="space-y-6"> <h3 class="text-xl font-light text-foreground">${homePageContent.foundedStory.founderName}</h3> <p class="text-lg font-light text-foreground/70 leading-relaxed">
For fifteen years, I've operated at the convergence of strategic intelligence and crisis transformation. My work focuses on helping leaders recognize when their decision-making authority is being systematically undermined, restoring autonomous control before critical damage occurs.
</p> <p class="text-lg font-light text-foreground/70 leading-relaxed">
Through this approach, I've guided clients to close nine-figure deals, prevent sophisticated fraud schemes, and restore independent authority in situations where traditional methods have failed. Nothing is more meaningful than helping clients reclaim control over their most critical decisions and transform moments of crisis into catalysts for enhanced autonomy.
</p> </div> </div> ` })} </div> </div> </div> </section>  ${renderComponent($$result2, "CTA", $$CTA, { "sectionId": "contact", "headline": "Apply For Your Legacy Ecosystem Analysis", "leftText": "This confidential analysis reveals exactly how relationships and systems affect your legacy - and how to optimize authentic control.", "rightText": [
    "During this discreet evaluation, we map how your ecosystem actually functions, identify which relationships strengthen or compromise your position, and provide clear recommendations that enhance rather than disrupt your current operations.",
    "Most clients discover important dynamics about their ecosystem they never knew existed."
  ], "buttonText": "Apply for Analysis", "buttonLink": "/qualification-form" })} ` })}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/index.astro", void 0);

const $$file = "/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
