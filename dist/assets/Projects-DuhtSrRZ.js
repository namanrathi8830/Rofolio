import{r as a,j as s}from"./main-C43Zwy6u.js";const b=()=>{const[i,p]=a.useState(Date.now()),r=a.useRef(null);a.useEffect(()=>{const o=()=>{var e;console.log("Projects.HTML iframe loaded");try{const t=(e=r.current)==null?void 0:e.contentWindow;if(t&&t.document){const c=()=>{try{t.document.querySelectorAll('[id*="framer-badge"], [class*="framer-badge"], #__framer-badge-container').forEach(n=>{n&&n.parentNode&&(n.parentNode.removeChild(n),console.log("Removed a Framer badge"))});const m=t.document.createElement("style");m.textContent=`
                #__framer-badge-container, 
                [id*="framer-badge"], 
                [class*="framer-badge"],
                [data-framer-badge-container] {
                  display: none !important;
                  opacity: 0 !important;
                  visibility: hidden !important;
                  pointer-events: none !important;
                }
              `,t.document.head.appendChild(m)}catch(l){console.error("Error removing badges:",l)}};c();const d=new MutationObserver(()=>{c()});return d.observe(t.document.body,{childList:!0,subtree:!0}),()=>{d.disconnect()}}}catch(t){console.error("Error accessing iframe content:",t)}};if(r.current)return r.current.addEventListener("load",o),()=>{var e;(e=r.current)==null||e.removeEventListener("load",o)}},[i]);const u=()=>{if(p(Date.now()),r.current){const e=`${new URL(""+new URL("Projects-QzXO34tP.HTML",import.meta.url).href,import.meta.url).href}?t=${Date.now()}`;r.current.src=e,console.log("Refreshed iframe with URL:",e)}},f=`${new URL(""+new URL("Projects-QzXO34tP.HTML",import.meta.url).href,import.meta.url).href}?t=${i}`;return s.jsxs("div",{className:"projects-container",style:{width:"100%",height:"100vh",position:"relative"},children:[s.jsx("iframe",{ref:r,src:f,title:"Projects",style:{width:"100%",height:"100%",border:"none",overflow:"hidden"},allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),s.jsx("button",{onClick:u,style:{position:"absolute",top:"10px",right:"10px",zIndex:1e3,padding:"5px 10px",background:"#007bff",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",opacity:.3,transition:"opacity 0.3s"},onMouseOver:o=>o.currentTarget.style.opacity="1",onMouseOut:o=>o.currentTarget.style.opacity="0.3",children:"Refresh"})]})};export{b as default};
