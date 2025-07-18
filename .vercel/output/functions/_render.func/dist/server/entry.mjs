import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_0sXSeP4a.mjs';
import { manifest } from './manifest_fnDZBITs.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/submit-form.astro.mjs');
const _page3 = () => import('./pages/insights/_slug_.astro.mjs');
const _page4 = () => import('./pages/insights.astro.mjs');
const _page5 = () => import('./pages/qualification-form.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/submit-form.ts", _page2],
    ["src/pages/insights/[slug].astro", _page3],
    ["src/pages/insights.astro", _page4],
    ["src/pages/qualification-form.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a54ad9a5-8a49-4b93-be01-4c10491c93cc",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
