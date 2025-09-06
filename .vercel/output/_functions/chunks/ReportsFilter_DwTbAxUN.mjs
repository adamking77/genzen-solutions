import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { Search, Filter, Tag, TrendingUp, Calendar } from 'lucide-react';

function ReportsFilter({ reports, categories }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const allCategories = ["All", ...categories];
  const filteredAndSortedReports = useMemo(() => {
    let filtered = reports.filter((report) => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || report.description.toLowerCase().includes(searchTerm.toLowerCase()) || report.tags && report.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) || report.author && report.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || report.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case "oldest":
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
        case "newest":
        default:
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
    });
    return filtered;
  }, [reports, searchTerm, selectedCategory, sortBy]);
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("newest");
  };
  const hasActiveFilters = searchTerm || selectedCategory !== "All" || sortBy !== "newest";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search reports, topics, or tags...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-foreground placeholder-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsFilterOpen(!isFilterOpen),
            className: "lg:hidden flex items-center gap-2 px-4 py-3 bg-accent/10 text-accent-foreground rounded-xl hover:bg-accent/20 transition-colors",
            children: [
              /* @__PURE__ */ jsx(Filter, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Filters" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: selectedCategory,
                onChange: (e) => setSelectedCategory(e.target.value),
                className: "px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-foreground",
                children: allCategories.map((category) => /* @__PURE__ */ jsx("option", { value: category, children: category }, category))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: sortBy,
                onChange: (e) => setSortBy(e.target.value),
                className: "px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-foreground",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "newest", children: "Newest First" }),
                  /* @__PURE__ */ jsx("option", { value: "oldest", children: "Oldest First" }),
                  /* @__PURE__ */ jsx("option", { value: "featured", children: "Featured First" })
                ]
              }
            )
          ] }),
          hasActiveFilters && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: clearFilters,
              className: "px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors hover:bg-background/50 rounded-lg",
              children: "Clear All"
            }
          )
        ] })
      ] }),
      isFilterOpen && /* @__PURE__ */ jsxs("div", { className: "lg:hidden mt-4 pt-4 border-t border-border space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Category" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: selectedCategory,
              onChange: (e) => setSelectedCategory(e.target.value),
              className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-foreground",
              children: allCategories.map((category) => /* @__PURE__ */ jsx("option", { value: category, children: category }, category))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Sort By" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: sortBy,
              onChange: (e) => setSortBy(e.target.value),
              className: "w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-foreground",
              children: [
                /* @__PURE__ */ jsx("option", { value: "newest", children: "Newest First" }),
                /* @__PURE__ */ jsx("option", { value: "oldest", children: "Oldest First" }),
                /* @__PURE__ */ jsx("option", { value: "featured", children: "Featured First" })
              ]
            }
          )
        ] }),
        hasActiveFilters && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearFilters,
            className: "w-full px-4 py-2 text-sm text-accent hover:text-accent/80 transition-colors hover:bg-accent/10 rounded-lg border border-accent/20",
            children: "Clear All Filters"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "Showing ",
        /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: filteredAndSortedReports.length }),
        " of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: reports.length }),
        " reports",
        hasActiveFilters && /* @__PURE__ */ jsx("span", { className: "ml-2 text-accent", children: "(filtered)" })
      ] }),
      searchTerm && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { children: "Search:" }),
        /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 bg-accent/10 text-accent-foreground rounded text-xs font-medium", children: [
          '"',
          searchTerm,
          '"'
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "filtered-reports-grid", children: filteredAndSortedReports.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8", children: filteredAndSortedReports.map((report) => /* @__PURE__ */ jsx(
      "article",
      {
        className: "group bg-background border border-border rounded-xl overflow-hidden hover-lift-subtle transition-all duration-300",
        children: /* @__PURE__ */ jsx("a", { href: `/reports/${report.slug}`, className: "block p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-xs font-medium", children: report.category }),
            report.featured && /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium", children: "Featured" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-light tracking-tight text-foreground group-hover:text-accent transition-colors leading-tight", children: report.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-light leading-relaxed line-clamp-2", children: report.description }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              report.publishDate && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { children: report.publishDate })
              ] }),
              report.readTime && /* @__PURE__ */ jsx("span", { children: report.readTime })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-accent group-hover:translate-x-1 transition-transform", children: "→" })
          ] }),
          report.tags && report.tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 mt-3", children: [
            report.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxs(
              "span",
              {
                className: "px-2 py-1 bg-muted/50 text-muted-foreground rounded text-xs",
                children: [
                  "#",
                  tag
                ]
              },
              tag
            )),
            report.tags.length > 3 && /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 text-muted-foreground text-xs", children: [
              "+",
              report.tags.length - 3,
              " more"
            ] })
          ] })
        ] }) })
      },
      report.id
    )) }) : (
      /* No Results */
      /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
        /* @__PURE__ */ jsx("div", { className: "text-muted-foreground mb-4", children: /* @__PURE__ */ jsx(Search, { className: "w-16 h-16 mx-auto mb-4 opacity-40" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-light text-foreground mb-2", children: "No Reports Found" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: searchTerm ? `No reports match your search for "${searchTerm}"` : `No reports found in the "${selectedCategory}" category` }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearFilters,
            className: "px-6 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-accent/90 transition-colors",
            children: "Clear Filters"
          }
        )
      ] })
    ) })
  ] });
}

export { ReportsFilter as R };
