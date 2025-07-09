import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.BrF62rj1.js";import{B as a}from"./button.CEdCnnTz.js";import{c as n}from"./utils.Ch0QPE82.js";import{c}from"./createLucideIcon.Bisz4JL9.js";import"./index.SWVVezDj.js";import"./clsx.B-dksMZM.js";/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],p=c("arrow-up",l),x=()=>{const[i,o]=r.useState(!1),t=()=>{window.pageYOffset>300?o(!0):o(!1)},s=()=>{window.scrollTo({top:0,behavior:"smooth"})};return r.useEffect(()=>(window.addEventListener("scroll",t),()=>{window.removeEventListener("scroll",t)}),[]),e.jsx(a,{variant:"outline",size:"icon",className:n("fixed bottom-4 right-4 z-50 transition-opacity duration-300",i?"opacity-100":"opacity-0 pointer-events-none"),onClick:s,"aria-label":"Scroll to top",children:e.jsx(p,{className:"h-5 w-5"})})};export{x as default};
