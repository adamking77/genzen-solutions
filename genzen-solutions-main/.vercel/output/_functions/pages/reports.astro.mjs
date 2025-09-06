/* empty css                                 */
import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iUh9UfrQ.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BAdFw5dR.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { g as getCollection } from '../chunks/_astro_content_BRYQNbr4.mjs';
export { renderers } from '../renderers.mjs';

const ReportsFilter = ({
  reports,
  basePath = "/reports",
  showStats = true,
  customCategories,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = customCategories || ["All", ...Array.from(new Set(reports.map((report) => report.category)))];
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || report.description.toLowerCase().includes(searchTerm.toLowerCase()) || report.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || report.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [reports, searchTerm, selectedCategory]);
  const featuredReports = filteredReports.filter((report) => report.featured);
  const regularReports = filteredReports.filter((report) => !report.featured);
  return /* @__PURE__ */ jsxs("div", { className: `space-y-20 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-md", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search reports...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full pl-10 pr-4 py-3 bg-background border border-foreground/10 rounded-lg text-sm font-light text-foreground placeholder:text-foreground/60 focus:outline-none focus:border-foreground/30 transition-colors duration-300"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(Filter, { className: "h-4 w-4 text-foreground/60" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((category) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedCategory(category),
            className: `px-4 py-2 text-xs font-light rounded-full transition-all duration-300 ${selectedCategory === category ? "bg-foreground text-background" : "bg-foreground/10 text-foreground hover:bg-foreground/20"}`,
            children: category
          },
          category
        )) })
      ] })
    ] }),
    featuredReports.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-light tracking-tight text-foreground", children: "Featured Reports" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: featuredReports.map((report) => /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: `${basePath}/${report.slug}/`,
          className: "group block transition-all duration-300 hover:scale-105",
          children: /* @__PURE__ */ jsx("div", { className: "bg-background border border-foreground/10 rounded-lg p-8 h-full hover:border-foreground/30 hover:shadow-xl transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-foreground/10 text-foreground text-xs font-light rounded-full", children: report.category }),
                report.featured && /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-foreground/10 text-foreground text-xs font-light rounded-full", children: "Featured" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "text-xs font-light text-foreground/60 tracking-wider", children: String(report.id).padStart(2, "0") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl lg:text-3xl font-light leading-tight tracking-tight text-foreground group-hover:text-foreground/80 transition-colors duration-300", children: report.title }),
              /* @__PURE__ */ jsx("p", { className: "text-base font-light text-foreground/70 leading-relaxed line-clamp-3", children: report.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-foreground/10", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 text-xs font-light text-foreground/70", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                  /* @__PURE__ */ jsx("span", { children: report.publishDate })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                  /* @__PURE__ */ jsx("span", { children: report.readTime })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs font-light text-foreground group-hover:text-foreground/70 transition-colors duration-300", children: "Read Report →" })
            ] })
          ] }) })
        }
      ) }, report.id)) })
    ] }),
    regularReports.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-light tracking-tight text-foreground", children: featuredReports.length > 0 ? "All Reports" : "Reports" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: regularReports.map((report) => /* @__PURE__ */ jsx(
        "a",
        {
          href: `${basePath}/${report.slug}/`,
          className: "group block transition-all duration-300 hover:scale-105",
          children: /* @__PURE__ */ jsx("div", { className: "bg-background border border-foreground/10 rounded-lg p-8 h-full hover:border-foreground/30 hover:shadow-xl transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-foreground/10 text-foreground text-xs font-light rounded-full", children: report.category }) }) }),
              /* @__PURE__ */ jsx("div", { className: "text-xs font-light text-foreground/60 tracking-wider", children: String(report.id).padStart(2, "0") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-light leading-tight tracking-tight text-foreground group-hover:text-foreground/80 transition-colors duration-300", children: report.title }),
              /* @__PURE__ */ jsx("p", { className: "text-base font-light text-foreground/70 leading-relaxed line-clamp-3", children: report.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-foreground/10", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 text-xs font-light text-foreground/70", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                  /* @__PURE__ */ jsx("span", { children: report.publishDate })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                  /* @__PURE__ */ jsx("span", { children: report.readTime })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs font-light text-foreground group-hover:text-foreground/70 transition-colors duration-300", children: "Read Report →" })
            ] })
          ] }) })
        },
        report.id
      )) })
    ] }),
    filteredReports.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-light text-foreground", children: "No reports found" }),
      /* @__PURE__ */ jsx("p", { className: "text-base font-light text-foreground/70", children: "Try adjusting your search terms or filter criteria." })
    ] }) })
  ] });
};

const $$Reports = createComponent(async ($$result, $$props, $$slots) => {
  const reports = await getCollection("reports");
  const reportsData = reports.map((entry) => ({
    ...entry.data,
    slug: entry.slug
  }));
  reportsData.filter((report) => report.featured);
  reportsData.filter((report) => !report.featured);
  const categories = Array.from(new Set(reportsData.map((report) => report.category)));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Reports Archive | Strategic Intelligence & Market Analysis", "description": "Comprehensive collection of strategic reports, market analysis, and performance insights that drive informed decision-making across global markets." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-24 lg:py-32"> <div class="max-w-7xl mx-auto px-6 lg:px-8"> <!-- Header --> <div class="space-y-12 mb-20"> <div class="space-y-8"> <div class="text-sm font-medium tracking-widest text-foreground/60 uppercase">
REPORTS ARCHIVE
</div> <h1 class="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight max-w-4xl text-foreground">
Strategic Intelligence
<br>
& Market Analysis
</h1> <p class="text-lg font-light text-foreground/70 leading-relaxed max-w-2xl">
Comprehensive collection of strategic reports, market analysis, and performance insights 
            that drive informed decision-making across global markets.
</p> </div> </div> <!-- Interactive Reports with Search/Filter --> ${renderComponent($$result2, "ReportsFilter", ReportsFilter, { "client:load": true, "reports": reportsData, "basePath": "/reports", "client:component-hydration": "load", "client:component-path": "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/interactive/ReportsFilter.tsx", "client:component-export": "default" })} </div> <!-- Stats --> <div class="grid grid-cols-3 gap-8 pt-20 mt-20 border-t border-foreground/10"> <div class="text-center space-y-2"> <div class="text-3xl font-light text-foreground">${reportsData.length}</div> <div class="text-sm font-light text-foreground/60 tracking-wider">TOTAL REPORTS</div> </div> <div class="text-center space-y-2"> <div class="text-3xl font-light text-foreground">${categories.length}</div> <div class="text-sm font-light text-foreground/60 tracking-wider">CATEGORIES</div> </div> <div class="text-center space-y-2"> <div class="text-3xl font-light text-foreground">${(/* @__PURE__ */ new Date()).getFullYear()}</div> <div class="text-sm font-light text-foreground/60 tracking-wider">CURRENT YEAR</div> </div> </div> </section> ` })}`;
}, "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/pages/reports.astro", void 0);

const $$file = "/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/pages/reports.astro";
const $$url = "/reports";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reports,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
