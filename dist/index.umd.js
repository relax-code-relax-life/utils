/* v2.0.2 https://wangwl.net/static/pages/utils.html */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).relaxUtils={})}(this,(function(e){"use strict";var n=function(){return"undefined"!=typeof window&&window.document},t=function(){return n()?navigator.userAgent:""},r=function(){return n()?navigator.platform:""},o=Function.prototype.call.bind(Object.prototype.toString),i=Array.isArray||function(e){return"[object Array]"===o(e)},u=function(e){return"number"==typeof e},a=function(e){return"[object Function]"===o(e)},c=function(e){return"boolean"==typeof e},f=Object.assign||function(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];return n.forEach((function(n){for(var t in n)e[t]=n[t]})),e},s=function(e,n){if(e.fill)return e.fill(n);for(var t=e.length-1;t>-1;t--)e[t]=n;return e},l=function(){var e={};return e.promise=new Promise((function(n,t){e.resolve=function(t){return n(t),e.promise},e.reject=function(n){return t(n),e.promise}})),e},d=l,p="__p$symbol__",v=function(e,n){if(!a(e))throw TypeError("promisify(): argument not a function");return Object.defineProperties((function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var o=e.__p$symbol__;if(o){if(!a(o))throw TypeError(e.name+"[promisify.custom] is not a function");return Promise.resolve(o.apply(n||this,t))}var i=d(),u=e.length-1-t.length;u>0&&(t=t.concat(s(new Array(u),void 0)));try{t.push((function(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];e?i.reject(e):n.length>1?i.resolve(n):i.resolve(n[0])})),e.apply(n||this,t)}catch(e){i.reject(e)}return i.promise}),Object.getOwnPropertyDescriptors(e))};v.custom=p;var h=function(e,n,t){var r=e;if(i(r))return r.forEach(n,t);Object.keys(r).forEach((function(e){n.call(t,r[e],e,r)}))},m=function(e){return void 0===e&&(e=""),e+Date.now()},y=m,g={},_=function(e,n){void 0===e&&(e=0);var t=l(),r=setTimeout((function(){t.resolve(n?n():void 0)}),e),o=t.promise;return o.abort=function(){clearTimeout(r)},o},w=function(e,n,t){return function(t){for(var r=[],o=1;o<arguments.length;o++)r[o-1]=arguments[o];return!n&&(n=this),e.apply(n,r)}};var M=w((function(){if(n()){for(var e,t,r={},o=/(?:;\s|^)([^;]*?)=([^;]*)/g,i=/([^&]+)=([^&]+)(?:&|$)/g,u=document.cookie;e=o.exec(u);)for(r[e[1]]={value:unescape(e[2]),values:null};t=i.exec(e[2]);)r[e[1]].values=r[e[1]].values||{},r[e[1]].values[t[1]]=unescape(t[2]);return r}})),b=function(e,t,r){if(n()){var i,a,c,f,s="";if(e){if(e+="",null==t&&(t=""),"object"==typeof t){for(a in t)s+=a+"="+escape(t[a])+"&";s=s.slice(0,-1)}else s+=escape(t);return(r=r||{}).expires&&"[object Date]"!==o(r.expires)&&(f=r.expires,(c=new Date).setTime(c.valueOf()+(u(f.day)?86400*f.day*1e3:0)+(u(f.hour)?3600*f.hour*1e3:0)+(u(f.min)?60*f.min*1e3:0)+(u(f.sec)?1e3*f.sec:0)),r.expires=c),i=e+"="+s+(r.expires?";expires="+r.expires.toUTCString():"")+(r.path?"; path="+r.path:"")+(r.domain?"; domain="+r.domain:"")+(r.secure?"; secure":""),document.cookie=i,M(!0)[e]}}},D=function(e,t){return!!n()&&(b(e,"",f(t,{expires:{day:-30}})),!(e in M(!0)))},x={delete:D,del:D,set:b,get:function(e,n){var t=M(n)[e];return t&&t.value}},j=/[\u0020-\u007f\uff61-\uff9f]/g,A=/\n/g,E=/-([a-zA-Z])/g,T=/[A-Z]/g,k=/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,C=/&#(\d+);|(<br\s*\/\s*>)/g,F=/&.+?;/g,S=function(e,n,t){var r,o;return void 0===e&&(e=""),(n=~~n)<=(o=((e+="")+"").length)?e:(t=t&&t.charAt(0)||" ",(r=s(new Array(n-o),t)).push(e),r.join(""))},I=/\$\{\s*(.+?)\s*\}/g,P=function(){var e=!0;try{new Function("``")}catch(n){e=!1}return e?function(e,n){return new Function("__scope__","\n                    var __result__;\n                    try{\n                        with(__scope__){\n                            __result__=`"+e+'`\n                        }\n                    }\n                    catch(e){\n                        __result__="";\n                    }\n                    return __result__;\n                    ')(n)}:function(e,n){var t=!0,r=e.split(I).map((function(e){return(t=!t)?e:"'"+e.replace("'","\\'")+"'"})).join("+");return new Function("__scope__","\n            var __result__;\n            with(__scope__){ \n                __result__="+r+";\n            }\n            return __result__;\n         ")(n)}}(),O={year:"FullYear",month:"Month",day:"Date",hour:"Hours",min:"Minutes",sec:"Seconds"},W=/y+|M+|d+|H+|h+|m+|s+|S+|a|(\[.*?])/g,H=function(e,n){var t=O;"number"==typeof n&&(n={day:n}),e=new Date(e);var r="";return h(t,(function(o,i){n[i]&&e["set"+(r=t[i])](e["get"+r]()+~~n[i])})),e},U=function(e){return(e=new Date(e)).setDate(1),e},$=function(e){return(e=new Date(e)).setMonth(e.getMonth()+1),e.setDate(0),e},L=/Android/i,R=/MicroMessenger/,Y=/iphone|ipad|ipod|ios/i,z=function(e){return R.test(e||t())},N=/Chrome\/(\d+)/,Z=/Firefox\/(\d+)/,q=/Version\/([\d.]+)( Mobile\/.+?)? Safari\/\d+/,B=/MSIE (\d+)/,J=/Trident\/.*; rv:(\d+)/,K=/(Edge\/\d+)/;function Q(e,n){var r=e.exec(n||t());return r&&r[1]}var V=/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i;function X(e){var n={},t=!1;return i(e)?e.forEach((function(e){return n[e]=!0})):t=e,{map:n,isAll:t}}function G(e,n){try{return decodeURIComponent(e)}catch(e){throw e.message="URI malformed (malformed key: "+n+")",e}}var ee=/(?:^|&)(.*?)=(.*?)(?=&|$)/g,ne=/(\?([^#]*))?(#.*)?\s*$/,te=/(?:[?&])(.*?)(?:=(.*?))?(?=&|$|#)/g,re=function(e,n){if(void 0===n&&(n=!1),null==e||"object"!=typeof e)return e?e+"":"";var t,r=[],o=encodeURIComponent,i=X(n),u=i.map,a=i.isAll;for(var c in e)null==(t=e[c])?t="":"object"==typeof t&&(t=JSON.stringify(t)),t=a||u[c]?t:o(t),r.push(o(c)+"="+t);return r.join("&")},oe=re,ie=function(e,t){void 0===t&&(t=!1);var r,o,i,u={},a=X(t),c=G;for(te.lastIndex=0;r=te.exec(e||n()&&location.search||"");)o=r[1],i=r[2],o&&(i||(i=""),u[c(o,o)]=a.isAll||a.map[o]?i:c(i,o));return u},ue=function(e){var n=function(){var e="inner_copy_fake_ele",n=document.getElementById(e);return n||((n=document.createElement("textarea")).style.position="absolute",n.style.left="-999px",n.style.top="0px",n.setAttribute("readonly",""),n.id=e,document.body.appendChild(n),n)}();return n.value=e,n.select(),document.execCommand("copy")};e.cache=w,e.camelCase=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e.join("-").replace(E,(function(e,n){return n.toUpperCase()}))},e.clearLoop=function(e){var n=g[e];n&&(clearTimeout(n),g[e]=void 0)},e.cookie=x,e.copyTxt=function(e){if(!n())throw new Error("Method `copyTxt` can only be invoked in browser environment.");try{if(!ue(e))return!1}catch(e){return!1}return!0},e.countStr=function(e,n,t,r){if(void 0===n&&(n=1),void 0===t&&(t=.5),void 0===r&&(r=1),!e)return 0;n=+n,t=+t,r=+r;var o=(e+="").match(j),i=e.match(A),u=o?o.length:0,a=i?i.length:0;return n*(e.length-u-a)+t*u+r*a},e.dateAdd=H,e.dateFormat=function(e,n){if(void 0===n&&(n="yyyy-MM-dd hh:mm:ss"),"[object Date]"!==o(e))return"";var t,r,i=e.getHours(),u=i>12?"pm":"am",a={y:e.getFullYear(),M:e.getMonth()+1,d:e.getDate(),H:i,h:i>12?i-12:i,m:e.getMinutes(),s:e.getSeconds(),S:e.getMilliseconds(),a:u};return n.replace(W,(function(e){return"["===(r=e.charAt(0))?e.slice(1,-1):"a"===r?a[r]:(t=S(a[r],e.length,"0"),"y"===r&&(t=t.slice(-e.length,t.length)),t)}))},e.dateParse=function(e,n){n||(n="yyyy-MM-dd hh:mm:ss");var t,r,o={y:void 0,M:void 0,d:1,H:void 0,h:void 0,m:0,s:0,S:0,a:"am"},i=n.replace(W,(function(e){var n,t=e[0],r=e.length;if("y"===t)n=r<4?"\\d{"+r+"}":"\\d{4}";else if("M"===t||"d"===t||"H"===t||"h"===t||"m"===t||"s"===t)n=1===r?"[1-9]\\d|\\d":"\\d{2}";else if("S"===t)n=r<3?"\\d{"+r+"}":"\\d{3}";else if("a"===t)n="(am|Am|AM|pm|Pm|PM)?";else if("["===t)return e.slice(1,-1);return"("+n+")"})),u=new RegExp(i,"g").exec(e),a=1;if(!u)throw new Error('The date format "'+n+'" match the date string "'+e+'" failed.');for(;t=W.exec(n);)"["!==(r=t[0].charAt(0))&&(o[r]="a"===r?u[a++]:~~u[a++]);var c,f=(new Date).getFullYear();return void 0===o.y?o.y=f:(c=o.y+"").length<4&&(c=(f+"").slice(0,4-c.length)+c,o.y=~~c),void 0===o.M?o.M=0:o.M-=1,o.h||(o.a="am",o.h=o.H||0),o.a=o.a.toLowerCase(),"pm"===o.a&&(o.h+=12),new Date(o.y,o.M,o.d,o.h,o.m,o.s,o.S)},e.debounce=function(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];var r=n[0],o=n[1],i=n[2],u=n[3];a(r)||(u=i,i=o,o=r,r=void 0),c(o)||(u=i,i=o,o=!1),null==i&&(i=300);var f,s,l,d=u,p=function(e){clearTimeout(f),f=setTimeout(e,i)};return l=o?function(){f||e.apply(u,s),p((function(){f=void 0}))}:function(){p((function(){e.apply(u,s),f=void 0}))},function(){s=arguments,!d&&(u=this),l(),r&&r.apply(u,s)}},e.defer=l,e.deleteCookie=D,e.download=function(e,t){if(!n())throw new Error("Method `download` can only be invoked in browser environment.");var r=document.createElement("a");r.download=t,r.href=e,r.target="_blank";var o=document.createEvent("MouseEvents");o.initEvent("click",!1,!1),r.dispatchEvent(o)},e.each=h,e.find=function(e,n,t){var r=e;if(i(r))return r.find(n,t);var o=Object.keys(r).find((function(e){return n.call(t,r[e],e,r)}));return o&&r[o]},e.firstDateInMonth=U,e.firstWeekInMonth=function(e){var n=U(e),t=n.getDay();return 0===t&&(t=7),H(n,1-t)},e.getCookie=M,e.getQuery=ie,e.htmlDecode=function(e){return n()?function(e){if(null==e||""===e)return"";var n=e.match(F);if(n){var t=document.createElement("div");t.innerHTML=n.join(","),n=t.innerText.split(","),t=null}else n=[];var r=0;return e.replace(F,(function(e,t){return n[r++]}))}(e):(t=e,(t+="").replace(C,(function(e,n,t){return t?"\n":("160"===n&&(n=32),String.fromCharCode(n))})));var t},e.htmlEncode=function(e){var n;return"string"!=typeof e&&(e+=""),e.replace(k,(function(e){return 32===(n=e.charCodeAt(0))&&(n=160),10===n?"<br/>":"&#"+n+";"}))},e.isAndroid=function(e){return L.test(e||t())},e.isArrayLike=function(e){return e&&"object"==typeof e&&isFinite(e.length)&&e.length>=0&&e.length===Math.floor(e.length)&&e.length<4294967296&&!e.nodeType},e.isChrome=function(e){return Q(N,e)},e.isFirefox=function(e){return Q(Z,e)},e.isIE=function(e){return Q(B,e)||Q(J,e)||Q(K,e)},e.isIos=function(e){return Y.test(e||t())},e.isMac=function(){var e=r();return"MacIntel"===e||"Macintosh"===e||"MacPPC"===e||"Mac68K"===e},e.isSafari=function(e){return Q(N,e)||Q(K,e)?null:Q(q,e)},e.isUrl=function(e){return V.test(e)},e.isWeiXin=z,e.isWifi=function(){if(n()){var e=navigator,t=e.connection||e.mozConnection||e.webkitConnection;return t?"cellular"!==t.type:z()?/NetType\/WIFI/.test(navigator.userAgent):void 0}},e.isWindows=function(){var e=r();return"Win32"===e||"Windows"===e||"Win16"===e||"Win64"===e||"WinCE"===e},e.kebabCase=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e.map((function(e){return e.replace(T,(function(e,n){return(0===n?"":"-")+e.toLowerCase()}))})).join("-")},e.lastDateInMonth=$,e.lastWeekInMonth=function(e){var n=$(e),t=n.getDay();return 0!==t&&(n=H(n,7-t)),n},e.loop=function(e,n,t){void 0===t&&(t=!1);var r=y("loop"),o=function(){g[r]=setTimeout(i,n)},i=function(){Promise.resolve(e()).then(o)};return t?i():o(),r},e.map=function(e,n,t){var r=e;if(i(r))return r.map(n,t);var o=[];return h(r,(function(e,i){o.push(n.call(t,e,i,r))})),o},e.noop=function(){},e.paddingLeft=S,e.param=re,e.parseParam=function(e,n){void 0===n&&(n=!1);var t,r,o={},i=G,u=X(n),a=u.map,c=u.isAll;for(ee.lastIndex=0;t=ee.exec(e);)o[r=t[1]]=c||a[r]?t[2]:i(t[2],r);return o},e.pick=function(e,n){if(!e)return{};var t=[];if(a(n))t=Object.keys(e).filter(n);else{if(!Array.isArray(n))return{};t=n}return t.reduce((function(n,t){return t in e&&(n[t]=e[t]),n}),{})},e.promisify=v,e.resolveUrl=function(e,n,t){n=f(ie(e),n);var r=oe(n,t);return e.replace(ne,"?"+r+"$3")},e.retry=function(e,n,t,r){if(void 0===t&&(t=0),void 0===r&&(r=this),"number"!=typeof n)throw new TypeError("the parameter max is not a number");var o=0,i=function(){return o++,Promise.resolve(e.apply(r,arguments)).then((function(e){return o=0,e}),(function(e){var r=this;return o<n?t>0?_(t,(function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return i.apply(r,e)})):i.apply(this,arguments):(o=0,Promise.reject(e))}))};return i},e.setCookie=b,e.template=P,e.throttle=function(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];var r=n[0],o=n[1],i=n[2],u=n[3];a(r)||(u=i,i=o,o=r,r=void 0),c(o)||(u=i,i=o,o=!1),null==i&&(i=300);var f,s,l,d=u;return l=o?function(){e.apply(u,s),f=setTimeout((function(){f=void 0}),i)}:function(){f=setTimeout((function(){e.apply(u,s),f=void 0}),i)},function(){s=arguments,!d&&(u=this),r&&r.apply(u,s),f||l()}},e.tick=m,e.timeout=_,e.unique=function(e,n,t,r){if(void 0===n&&(n=!1),"function"==typeof n&&(r=t,t=n,n=!1),"function"==typeof Set&&!t)return Array.from(new Set(e));var o=[],i=t?e.map(t,r):e;if(n){var u;i.forEach((function(n,t){u!==n&&(u=n,o.push(e[t]))}))}else{var a=[];i.forEach((function(n,t){a.includes(n)||(a.push(n),o.push(e[t]))}))}return o},e.weekRange=function(e,n,t){var r,o=[];if(!e||!n)return o;e>n&&(r=n,n=e,e=r),"number"!=typeof t&&(t=1);for(var i,u=1,a=new Date(e);a<n;)1===u&&a.getDay()===t?(+a!=+e&&o.push({end:new Date(a.getTime()-864e5)}),o.push({start:new Date(a)}),u=7):7===u&&(o[i=o.length-1].end=new Date(a.getTime()-864e5),o[i].duration=7,o.push({start:new Date(a)})),a.setDate(a.getDate()+u);for(var c=[0,1,2,3,4,5,6],f=0;f<t;f++)c[f]+=7;var s=o.length;return 0===s?o=[{start:e,end:n,duration:c[n.getDay()]-c[e.getDay()]+1}]:(o[0].start||(o[0].start=e,o[0].duration=c[o[0].end.getDay()]-c[e.getDay()]+1),o[i=s-1].end=n,o[i].duration=c[o[i].end.getDay()]-c[o[i].start.getDay()]+1),o},e.weekendsCount=function(e,n){e=new Date(e.getFullYear(),e.getMonth(),e.getDate());var t,r,o,i,u=((n=new Date(n.getFullYear(),n.getMonth(),n.getDate()))-e)/864e5+1;return t=2*Math.floor(u/7),(r=u%7)&&(i=(o=e.getDay())+r-1,0===o?t++:o<=6&&i>=6&&(t+=Math.min(i-Math.max(o,6)+1,2))),t},Object.defineProperty(e,"__esModule",{value:!0})}));