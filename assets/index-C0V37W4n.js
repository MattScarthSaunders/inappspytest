var d=Object.defineProperty;var l=(n,e,o)=>e in n?d(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o;var c=(n,e,o)=>l(n,typeof e!="symbol"?e+"":e,o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();class g{constructor(){c(this,"version","v5");c(this,"inAppRegExps",["WebView","(iPhone|iPod|iPad)(?!.*Safari/)","Android.*wv\\)","FB_\\w|FB\\w"]);c(this,"inappRegex",new RegExp(`${this.inAppRegExps.map(e=>`(${e})`).join("|")}`,"ig"))}get isInAppBrowser(){const e=this.getUserAgent();return this.inappRegex.test(e)}redirect(){try{const o=[["utm_source",localStorage.getItem("utm_source")],["utm_medium",localStorage.getItem("utm_medium")],["utm_campaign",localStorage.getItem("utm_campaign")],["utm_content",localStorage.getItem("utm_content")]].filter(i=>i[1]).map(i=>i.join("=")),r=o.length>0?`?${o.join("&")}`:"",t=this.getUserAgent();if(t===""){s(`${this.version} useragent is empty, you shouldn't see this.`);return}this.isiOS(t)?(s(`${this.version} is ios. useragent: ${t}`),window.location.replace(`x-safari-https://nodescript.dev/signup${r}`)):(s(`${this.version} is not ios. useragent: ${t}`),window.location.replace(`intent:https://nodescript.dev/signup${r}#Intent;end`))}catch(e){const o=this.getUserAgent();console.log(e),s(`${this.version} is not ios. useragent: ${o}`,e)}}isiOS(e){const o=["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"],r=window&&window.document&&e.includes("Mac")&&"ontouchend"in window.document;return o.includes(e)||r}getUserAgent(){var e,o;return typeof window<"u"?(((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)||((o=window==null?void 0:window.navigator)==null?void 0:o.vendor)||(window==null?void 0:window.opera))??"":""}}function s(n="",e=", no errors with redirect"){const o=document.getElementById("test");o.innerHTML=n+e}localStorage.setItem("utm_source","test");const a=new g;a.isInAppBrowser?a.redirect():s("No in-app browser detected, you should be able to use google logins!");