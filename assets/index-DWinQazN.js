var l=Object.defineProperty;var g=(r,e,o)=>e in r?l(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var a=(r,e,o)=>g(r,typeof e!="symbol"?e+"":e,o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const c="v6";class p{constructor(){a(this,"inAppRegExps",["WebView","(iPhone|iPod|iPad)(?!.*Safari/)","Android.*wv\\)","FB_\\w|FB\\w"]);a(this,"inappRegex",new RegExp(`${this.inAppRegExps.map(e=>`(${e})`).join("|")}`,"ig"))}get isInAppBrowser(){const e=this.getUserAgent();return this.inappRegex.test(e)}redirect(){try{const o=[["utm_source",localStorage.getItem("utm_source")],["utm_medium",localStorage.getItem("utm_medium")],["utm_campaign",localStorage.getItem("utm_campaign")],["utm_content",localStorage.getItem("utm_content")]].filter(n=>n[1]).map(n=>n.join("=")),i=o.length>0?`?${o.join("&")}`:"",t=this.getUserAgent();if(t===""){s(`${c} useragent is empty, you shouldn't see this.`);return}this.isiOS(t)?(s(`${c} is ios. useragent: ${t}`),window.location.replace(`x-safari-https://nodescript.dev/signup${i}`)):(s(`${c} is not ios. useragent: ${t}`),window.open(`https://nodescript.dev/signup${i}`,"_self"))}catch(e){const o=this.getUserAgent();console.log(e),s(`${c} is not ios. useragent: ${o}`,e)}}isiOS(e){const o=["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"],i=window&&window.document&&e.includes("Mac")&&"ontouchend"in window.document;return o.includes(e)||i}getUserAgent(){var e,o;return typeof window<"u"?(((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)||((o=window==null?void 0:window.navigator)==null?void 0:o.vendor)||(window==null?void 0:window.opera))??"":""}}function s(r="",e=", no errors with redirect"){const o=document.getElementById("test");o.innerHTML=r+e}localStorage.setItem("utm_source","test");const d=new p;d.isInAppBrowser?d.redirect():s("No in-app browser detected, you should be able to use google logins!");
