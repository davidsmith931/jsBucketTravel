(()=>{var e={393:(e,t,n)=>{"use strict";e.exports=n.p+"assets/countries.json"}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,n),s.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e+"../"})(),(()=>{const e=document.querySelector(".searchingBar"),t=document.querySelector(".suggestions"),r=document.querySelector(".searching span");let s=[];const a=function(){s=[],t.innerHTML="",e.style.borderRadius="5px"};!async function(){const o=n(393),c=await fetch(o),l=await c.json();e.addEventListener("input",(function(n){for(a(),""!=e.value?r.style.display="block":r.style.display="none",i=0;i<l.Countries.length;i++)l.Countries[i].name.toLowerCase().startsWith(n.target.value.toLowerCase())&&(s.push(l.Countries[i].name),e.style.borderRadius="5px 5px 0 0");s.forEach((function(e){t.innerHTML+=`<li><a class= "singleSuggestion" style="" href = "#">${e}</a></li>`})),""!=n.target.value&&""!=s||a()}))}();window.addEventListener("click",(function(t){t.target.classList.contains("singleSuggestion")?(e.value=t.target.innerHTML,a()):t.target!==e&&a(),""!=e.value?r.style.display="block":r.style.display="none"})),window.addEventListener("keypress",(function(e){"Escape"==e.key&&a()})),window.addEventListener("focus",(function(n){""==n.target.value&&""==s&&(s=["Francja","Włochy","Niemcy","Portugalia","Hiszpania"],s.forEach((function(e){t.innerHTML+=`<li><a class= "singleSuggestion" style="" href = "#">${e}</a></li><hr class = "bar">`})),e.style.borderRadius="5px 5px 0 0")}),!0),r.addEventListener("click",(function(){e.value="",r.style.display="none"})),r.addEventListener("keypress",(function(t){"Enter"==t.key&&(e.value="",r.style.display="none",a())}))})()})();