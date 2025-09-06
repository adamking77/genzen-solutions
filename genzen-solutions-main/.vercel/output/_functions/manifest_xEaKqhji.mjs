import 'kleur/colors';
import { k as decodeKey } from './chunks/astro/server_iUh9UfrQ.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DW-jkeAW.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/","cacheDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/node_modules/.astro/","outDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/dist/","srcDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/","publicDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/public/","buildClientDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/dist/client/","buildServerDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"qualification-form/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/qualification-form","isIndex":false,"type":"page","pattern":"^\\/qualification-form\\/?$","segments":[[{"content":"qualification-form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/qualification-form.astro","pathname":"/qualification-form","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"reports/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/reports","isIndex":false,"type":"page","pattern":"^\\/reports\\/?$","segments":[[{"content":"reports","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/reports.astro","pathname":"/reports","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-form","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-form\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-form.ts","pathname":"/api/submit-form","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://genzen-solutions.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/pages/qualification-form.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/pages/reports.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/reports@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/pages/reports/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/reports/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/submit-form@_@ts":"pages/api/submit-form.astro.mjs","\u0000@astro-page:src/pages/qualification-form@_@astro":"pages/qualification-form.astro.mjs","\u0000@astro-page:src/pages/reports/[slug]@_@astro":"pages/reports/_slug_.astro.mjs","\u0000@astro-page:src/pages/reports@_@astro":"pages/reports.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_xEaKqhji.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_IgSXzE2M.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/.astro/content-modules.mjs":"chunks/content-modules_CELdz4qC.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DpfAgVi2.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/content/reports/2024-strategic-business-intelligence.mdx?astroPropagatedAssets":"chunks/2024-strategic-business-intelligence_bHLBf_pO.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/content/reports/trust-architecture-analysis.mdx?astroPropagatedAssets":"chunks/trust-architecture-analysis_CYSG7rEe.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/content/reports/2024-strategic-business-intelligence.mdx":"chunks/2024-strategic-business-intelligence_BiGWwaa0.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/content/reports/trust-architecture-analysis.mdx":"chunks/trust-architecture-analysis_C5_42qfn.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/ThemeProvider.tsx":"_astro/ThemeProvider.CCchfiwI.js","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/modals/IntakeFormModal.tsx":"_astro/IntakeFormModal.haR6l378.js","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.uqrsV55q.js","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/custom/SolutionSection.astro?astro&type=script&index=0&lang.ts":"_astro/SolutionSection.astro_astro_type_script_index_0_lang.jXAflh3I.js","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/interactive/ScrollAnimator.tsx":"_astro/ScrollAnimator.DMmx2aj4.js","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/interactive/ScrollToTop.tsx":"_astro/ScrollToTop.DMh23H4p.js","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/interactive/ReportsFilter.tsx":"_astro/ReportsFilter.DRjs5Y87.js","@/components/ThemeToggle.tsx":"_astro/ThemeToggle.BLJaQmNX.js","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/ui/toaster.tsx":"_astro/toaster.BugSsxyW.js","@astrojs/react/client.js":"_astro/client.CYfJMTzd.js","/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/interactive/GZSIntakeForm":"_astro/GZSIntakeForm.D9cZZElZ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/Navigation.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const l=document.getElementById(\"main-nav\"),c=document.getElementById(\"nav-content-container\"),n=document.getElementById(\"nav-logo\"),m=document.querySelectorAll(\".nav-link\"),a=document.getElementById(\"theme-toggle-desktop-container\"),L=document.getElementById(\"mobile-menu-button\"),s=document.getElementById(\"menu-icon\"),o=document.getElementById(\"x-icon\"),g=document.getElementById(\"mobile-menu\");let i=!1;const h=()=>{const t=window.scrollY>50;l&&c&&n&&a&&s&&o&&(t?(l.classList.add(\"bg-background/95\",\"backdrop-blur-sm\",\"border-b\",\"border-primary/20\"),l.classList.remove(\"bg-transparent\"),c.classList.remove(\"h-16\",\"sm:h-18\",\"lg:h-20\"),c.classList.add(\"h-12\",\"sm:h-14\",\"lg:h-16\"),n.classList.remove(\"text-lg\"),n.classList.add(\"text-base\"),m.forEach(e=>{e.classList.remove(\"text-sm\"),e.classList.add(\"text-xs\")}),a.classList.remove(\"scale-100\"),a.classList.add(\"scale-90\"),s.classList.replace(\"h-5\",\"h-4\"),s.classList.replace(\"w-5\",\"w-4\"),o.classList.replace(\"h-5\",\"h-4\"),o.classList.replace(\"w-5\",\"w-4\")):(l.classList.remove(\"bg-background/95\",\"backdrop-blur-sm\",\"border-b\",\"border-primary/20\"),l.classList.add(\"bg-transparent\"),c.classList.remove(\"h-12\",\"sm:h-14\",\"lg:h-16\"),c.classList.add(\"h-16\",\"sm:h-18\",\"lg:h-20\"),n.classList.remove(\"text-base\"),n.classList.add(\"text-lg\"),m.forEach(e=>{e.classList.remove(\"text-xs\"),e.classList.add(\"text-sm\")}),a.classList.remove(\"scale-90\"),a.classList.add(\"scale-100\"),s.classList.replace(\"h-4\",\"h-5\"),s.classList.replace(\"w-4\",\"w-5\"),o.classList.replace(\"h-4\",\"h-5\"),o.classList.replace(\"w-4\",\"w-5\")))},u=t=>{const e=document.getElementById(t);e&&(e.scrollIntoView({behavior:\"smooth\"}),i&&r())},r=()=>{i=!i,g&&s&&o&&(g.classList.toggle(\"hidden\"),s.classList.toggle(\"hidden\"),o.classList.toggle(\"hidden\"))};window.addEventListener(\"scroll\",h),h(),L&&L.addEventListener(\"click\",r),document.querySelectorAll(\"button[data-scroll-to]\").forEach(t=>{t.addEventListener(\"click\",e=>{const d=e.currentTarget;d instanceof HTMLElement&&d.dataset.scrollTo&&u(d.dataset.scrollTo)})}),document.querySelectorAll(\"#mobile-menu a.mobile-nav-link\").forEach(t=>{t.addEventListener(\"click\",()=>{if(i){const e=t.getAttribute(\"href\");e&&(e.startsWith(\"/\")||!e.startsWith(\"#\"))&&r()}})})});"],["/Users/adamking/claude-code-projects/genzen_solutions_site/genzen-solutions-main/src/components/custom/SolutionSection.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const p={threshold:.4,rootMargin:\"0px 0px -20% 0px\"},i=new IntersectionObserver(r=>{r.forEach(c=>{if(c.isIntersecting){const s=c.target,t=parseInt(s.dataset.index||\"0\"),o=s.querySelector(\".progress-circle-container\");if(o){const d=o.querySelector(\".progress-svg-mobile .progress-foreground\"),g=o.querySelector(\".progress-svg .progress-foreground\"),n=window.innerWidth>=640?g:d;n&&(n.style.transition=\"stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)\",setTimeout(()=>{let e;const a=window.innerWidth>=640?163.363:113.097;t===0?e=a*(1-.33):t===1?e=a*(1-.67):e=0,n.style.strokeDashoffset=e.toString()},t*300))}i.unobserve(s)}})},p);document.querySelectorAll(\".legacy-feature-wrapper\").forEach(r=>i.observe(r))});"]],"assets":["/_astro/index.CbWdGNBw.css","/_astro/index.BsHk7gbW.css","/apple-touch-icon.png","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/favicon.png","/placeholder.svg","/robots.txt","/site.webmanifest","/test-deployment.txt","/_astro/GZSIntakeForm.BoztfWYi.js","/_astro/GZSIntakeForm.D9cZZElZ.js","/_astro/IntakeFormModal.haR6l378.js","/_astro/ReportsFilter.DRjs5Y87.js","/_astro/ScrollAnimator.DMmx2aj4.js","/_astro/ScrollToTop.DMh23H4p.js","/_astro/ThemeProvider.CCchfiwI.js","/_astro/ThemeToggle.BLJaQmNX.js","/_astro/button.Dd5SVwXw.js","/_astro/client.CYfJMTzd.js","/_astro/createLucideIcon.DvD7MYGU.js","/_astro/index.BM-Wmpka.js","/_astro/index.BsBabjHb.js","/_astro/index.BvNfZMHe.js","/_astro/index.CY-HDqYb.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/toaster.BugSsxyW.js","/_astro/utils.CBfrqCZ4.js","/images/adam_king_2.jpeg","/lovable-uploads/17dfb47c-7f8c-4217-b901-c9be47f59a84.png","/404.html","/qualification-form/index.html","/reports/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"DE006Ie6GGHlDGF2zNdWA5IutqPvSo6Kqo1xETmd3Y8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
