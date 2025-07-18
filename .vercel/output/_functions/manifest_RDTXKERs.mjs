import 'kleur/colors';
import { g as decodeKey } from './chunks/astro/server_CFDc-_dA.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DqU3tJtZ.mjs';
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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/","cacheDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/node_modules/.astro/","outDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/dist/","srcDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/src/","publicDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/public/","buildClientDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/dist/client/","buildServerDir":"file:///Users/adamking/claude-code-projects/genzen_solutions_site/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CTZHFJfM.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-form","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-form\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-form.ts","pathname":"/api/submit-form","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CTZHFJfM.css"}],"routeData":{"route":"/insights","isIndex":false,"type":"page","pattern":"^\\/insights\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/insights.astro","pathname":"/insights","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CTZHFJfM.css"}],"routeData":{"route":"/qualification-form","isIndex":false,"type":"page","pattern":"^\\/qualification-form\\/?$","segments":[[{"content":"qualification-form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/qualification-form.astro","pathname":"/qualification-form","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CTZHFJfM.css"},{"type":"inline","content":".progress-circle-container{position:relative;display:flex;align-items:center;justify-content:center}.progress-foreground{transition:stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)}.progress-number{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:.75rem;font-weight:300;color:hsl(var(--foreground));line-height:1}@media (min-width: 640px){.progress-number{font-size:.875rem}}.progress-circle-container[data-animate=true][data-progress=\"0\"] .progress-foreground{stroke-dashoffset:75.398}.progress-circle-container[data-animate=true][data-progress=\"1\"] .progress-foreground{stroke-dashoffset:37.699}.progress-circle-container[data-animate=true][data-progress=\"2\"] .progress-foreground{stroke-dashoffset:0}@media (min-width: 640px){.progress-circle-container[data-animate=true][data-progress=\"0\"] .progress-foreground{stroke-dashoffset:108.909}.progress-circle-container[data-animate=true][data-progress=\"1\"] .progress-foreground{stroke-dashoffset:54.454}.progress-circle-container[data-animate=true][data-progress=\"2\"] .progress-foreground{stroke-dashoffset:0}}.group:hover [data-progress=\"0\"] .progress-foreground{stroke-dashoffset:75.398}.group:hover [data-progress=\"1\"] .progress-foreground{stroke-dashoffset:37.699}.group:hover [data-progress=\"2\"] .progress-foreground{stroke-dashoffset:0}@media (min-width: 640px){.group:hover [data-progress=\"0\"] .progress-foreground{stroke-dashoffset:108.909}.group:hover [data-progress=\"1\"] .progress-foreground{stroke-dashoffset:54.454}.group:hover [data-progress=\"2\"] .progress-foreground{stroke-dashoffset:0}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://genzen-solutions.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/qualification-form.astro",{"propagation":"none","containsHead":true}],["/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/insights.astro",{"propagation":"in-tree","containsHead":true}],["/Users/adamking/claude-code-projects/genzen_solutions_site/src/pages/insights/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/insights@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/insights/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/submit-form@_@ts":"pages/api/submit-form.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/insights@_@astro":"pages/insights.astro.mjs","\u0000@astro-page:src/pages/qualification-form@_@astro":"pages/qualification-form.astro.mjs","\u0000@astro-page:src/pages/insights/[slug]@_@astro":"pages/insights/_slug_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BeAM_38q.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_C3h_LyAP.mjs","\u0000@astrojs-manifest":"manifest_RDTXKERs.mjs","/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/ThemeProvider.tsx":"_astro/ThemeProvider.DsZXkkEw.js","/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/modals/IntakeFormModal.tsx":"_astro/IntakeFormModal.BAV-PTXI.js","/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.uqrsV55q.js","/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/custom/SolutionSection.astro?astro&type=script&index=0&lang.ts":"_astro/SolutionSection.astro_astro_type_script_index_0_lang.jXAflh3I.js","/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollAnimator.tsx":"_astro/ScrollAnimator.B2OR0tb0.js","/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ScrollToTop.tsx":"_astro/ScrollToTop.CjQikK7h.js","/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/ReportsFilter.tsx":"_astro/ReportsFilter.DMjPDIkL.js","@/components/ThemeToggle.tsx":"_astro/ThemeToggle.CmM4Kxte.js","/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/ui/toaster.tsx":"_astro/toaster.BLIdUNOa.js","@astrojs/react/client.js":"_astro/client.DxZNQU9M.js","/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/interactive/GZSIntakeForm":"_astro/GZSIntakeForm.BJJrtSm6.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/Navigation.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const l=document.getElementById(\"main-nav\"),c=document.getElementById(\"nav-content-container\"),n=document.getElementById(\"nav-logo\"),m=document.querySelectorAll(\".nav-link\"),a=document.getElementById(\"theme-toggle-desktop-container\"),L=document.getElementById(\"mobile-menu-button\"),s=document.getElementById(\"menu-icon\"),o=document.getElementById(\"x-icon\"),g=document.getElementById(\"mobile-menu\");let i=!1;const h=()=>{const t=window.scrollY>50;l&&c&&n&&a&&s&&o&&(t?(l.classList.add(\"bg-background/95\",\"backdrop-blur-sm\",\"border-b\",\"border-primary/20\"),l.classList.remove(\"bg-transparent\"),c.classList.remove(\"h-16\",\"sm:h-18\",\"lg:h-20\"),c.classList.add(\"h-12\",\"sm:h-14\",\"lg:h-16\"),n.classList.remove(\"text-lg\"),n.classList.add(\"text-base\"),m.forEach(e=>{e.classList.remove(\"text-sm\"),e.classList.add(\"text-xs\")}),a.classList.remove(\"scale-100\"),a.classList.add(\"scale-90\"),s.classList.replace(\"h-5\",\"h-4\"),s.classList.replace(\"w-5\",\"w-4\"),o.classList.replace(\"h-5\",\"h-4\"),o.classList.replace(\"w-5\",\"w-4\")):(l.classList.remove(\"bg-background/95\",\"backdrop-blur-sm\",\"border-b\",\"border-primary/20\"),l.classList.add(\"bg-transparent\"),c.classList.remove(\"h-12\",\"sm:h-14\",\"lg:h-16\"),c.classList.add(\"h-16\",\"sm:h-18\",\"lg:h-20\"),n.classList.remove(\"text-base\"),n.classList.add(\"text-lg\"),m.forEach(e=>{e.classList.remove(\"text-xs\"),e.classList.add(\"text-sm\")}),a.classList.remove(\"scale-90\"),a.classList.add(\"scale-100\"),s.classList.replace(\"h-4\",\"h-5\"),s.classList.replace(\"w-4\",\"w-5\"),o.classList.replace(\"h-4\",\"h-5\"),o.classList.replace(\"w-4\",\"w-5\")))},u=t=>{const e=document.getElementById(t);e&&(e.scrollIntoView({behavior:\"smooth\"}),i&&r())},r=()=>{i=!i,g&&s&&o&&(g.classList.toggle(\"hidden\"),s.classList.toggle(\"hidden\"),o.classList.toggle(\"hidden\"))};window.addEventListener(\"scroll\",h),h(),L&&L.addEventListener(\"click\",r),document.querySelectorAll(\"button[data-scroll-to]\").forEach(t=>{t.addEventListener(\"click\",e=>{const d=e.currentTarget;d instanceof HTMLElement&&d.dataset.scrollTo&&u(d.dataset.scrollTo)})}),document.querySelectorAll(\"#mobile-menu a.mobile-nav-link\").forEach(t=>{t.addEventListener(\"click\",()=>{if(i){const e=t.getAttribute(\"href\");e&&(e.startsWith(\"/\")||!e.startsWith(\"#\"))&&r()}})})});"],["/Users/adamking/claude-code-projects/genzen_solutions_site/src/components/custom/SolutionSection.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const p={threshold:.4,rootMargin:\"0px 0px -20% 0px\"},i=new IntersectionObserver(r=>{r.forEach(c=>{if(c.isIntersecting){const s=c.target,t=parseInt(s.dataset.index||\"0\"),o=s.querySelector(\".progress-circle-container\");if(o){const d=o.querySelector(\".progress-svg-mobile .progress-foreground\"),g=o.querySelector(\".progress-svg .progress-foreground\"),n=window.innerWidth>=640?g:d;n&&(n.style.transition=\"stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)\",setTimeout(()=>{let e;const a=window.innerWidth>=640?163.363:113.097;t===0?e=a*(1-.33):t===1?e=a*(1-.67):e=0,n.style.strokeDashoffset=e.toString()},t*300))}i.unobserve(s)}})},p);document.querySelectorAll(\".legacy-feature-wrapper\").forEach(r=>i.observe(r))});"]],"assets":["/_astro/index.CTZHFJfM.css","/apple-touch-icon.png","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/favicon.png","/placeholder.svg","/robots.txt","/site.webmanifest","/test-deployment.txt","/_astro/GZSIntakeForm.BJJrtSm6.js","/_astro/GZSIntakeForm.DXcrEsbH.js","/_astro/IntakeFormModal.BAV-PTXI.js","/_astro/ReportsFilter.DMjPDIkL.js","/_astro/ScrollAnimator.B2OR0tb0.js","/_astro/ScrollToTop.CjQikK7h.js","/_astro/ThemeProvider.DsZXkkEw.js","/_astro/ThemeToggle.CmM4Kxte.js","/_astro/button.GxJrpkj7.js","/_astro/client.DxZNQU9M.js","/_astro/createLucideIcon.BmsQoi1k.js","/_astro/index.Bz-QvCnq.js","/_astro/index.C4xc1qsN.js","/_astro/index.DatCARk7.js","/_astro/index.gpdyd2Uh.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/toaster.BLIdUNOa.js","/_astro/utils.CBfrqCZ4.js","/images/adam_king_2.jpeg","/lovable-uploads/17dfb47c-7f8c-4217-b901-c9be47f59a84.png"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"/71MtUgsvVzzXfEEOH/LRuLiIqI66DSoIAKCZ102TVY="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
