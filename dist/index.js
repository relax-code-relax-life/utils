/*! http://wangwl.net/static/pages/utils.html */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.utils=t():e.utils=t()}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r="undefined"!=typeof window&&window.document,o=r?navigator.userAgent:"",i=r?navigator.platform:"",u=/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i,a=/(\?([^#]*))?(#.*)?\s*$/,c=/[\u0020-\u007f\uff61-\uff9f]/g,f=/\n/g,s=/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,l=/&#(\d+);|(<br\s*\/\s*>)/g,d=/&#.+?;/g,p=/-([a-zA-Z])/g,h=/[A-Z]/g,v=/(?:[?&])(.*?)=(.*?)(?=&|$|#)/g,y=/y+|M+|d+|H+|h+|m+|s+|S+|a|(\[.*?])/g,m=/(?:^|&)(.*?)=(.*?)(?=&|$)/g,g=/\$\{\s*(.+?)\s*\}/g,_=/Chrome\/(\d+)/,w=/Firefox\/(\d+)/,M=/Version\/([\d.]+) Safari\/\d+/,b=/MSIE (\d+)/,D=/Trident\/.*; rv:(\d+)/,x=/(Edge\/\d+)/,A=/Android/i,j=/MicroMessenger/,C=/iphone|ipad|ipod|ios/i;function E(e,t){var n=e.exec(t||o);return n&&n[1]}var T=Function.prototype.call,k=(T.bind(Array.prototype.slice),T.bind(Object.prototype.toString)),F=Array.isArray||function(e){return"[object Array]"===k(e)},S=function(e){return"[object Function]"===k(e)},I=function(e){return"boolean"==typeof e},P=function(e){return"number"==typeof e},O=Object.assign||function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.forEach(function(t,n){e[n]=t}),e},W=function(e,t){if(e.fill)return e.fill(t);for(var n=e.length-1;n>-1;n--)e[n]=t;return e},H=function(e,t,n){return function(n){!t&&(t=this);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return e.apply(t,o)}},L=function(e){var t=function(){var e="inner_copy_fake_ele",t=document.getElementById(e);return t||((t=document.createElement("textarea")).style.position="absolute",t.style.left="-999px",t.style.top="0px",t.setAttribute("readonly",""),t.id=e,document.body.appendChild(t),t)}();return t.value=e,t.select(),document.execCommand("copy")},$=0,U={},Y={guid:function(e){return void 0===e&&(e=""),e+$++},noop:function(){},isAndroid:function(e){return A.test(e||o)},isIos:function(e){return C.test(e||o)},isWeiXin:function(e){return j.test(e||o)},isWifi:function(){var e=navigator,t=e.connection||e.mozConnection||e.webkitConnection;return t?"cellular"!==t.type:Y.isWeiXin()?/NetType\/WIFI/.test(navigator.userAgent):void 0},isWindows:function(){return"Win32"===i||"Windows"===i||"Win16"===i||"Win64"===i||"WinCE"===i},isMac:function(){return"MacIntel"===i||"Macintosh"===i||"MacPPC"===i||"Mac68K"===i},isUrl:function(e){return u.test(e)},isArrayLike:function(e){return e&&"object"==typeof e&&isFinite(e.length)&&e.length>=0&&e.length===Math.floor(e.length)&&e.length<4294967296&&!e.nodeType},isIE:function(e){return E(b,e)||E(D,e)||E(x,e)},isChrome:function(e){return E(_,e)},isFirefox:function(e){return E(w,e)},isSafari:function(e){return E(_,e)||E(x,e)?null:E(M,e)},defer:function(){var e={};return e.promise=new Promise(function(t,n){e.resolve=t,e.reject=n}),e},each:function(e,t,n){var r=e;if(F(r))return r.forEach(t,n);Object.keys(r).forEach(function(e){t.call(n,r[e],e,r)})},map:function(e,t,n){var r=e;if(F(r))return r.map(t,n);var o=[];return Y.each(r,function(e,i){o.push(t.call(n,e,i,r))}),o},find:function(e,t,n){var r=e;if(F(r))return r.find(t,n);var o=Object.keys(r).find(function(e){return t.call(n,r[e],e,r)});return r[o]},unique:function(e,t,n,r){if(void 0===t&&(t=!1),"function"==typeof t&&(r=n,n=t,t=!1),"function"==typeof Set&&!n)return Array.from(new Set(e));var o=[],i=n?e.map(n,r):e;if(t){var u;i.forEach(function(t,n){u!==t&&(u=t,o.push(e[n]))})}else{var a=[];i.forEach(function(t,n){a.includes(t)||(a.push(t),o.push(e[n]))})}return o},cache:H,loop:function(e,t,n){var r=Y.guid("loop"),o=function(){U[r]=setTimeout(i,t)},i=function(){Promise.resolve(e()).then(o)};return n?i():o(),r},clearLoop:function(e){var t=U[e];t&&(clearTimeout(t),U[e]=void 0)},timeout:function(e,t){void 0===t&&(t=0);var n=Y.defer(),r=setTimeout(function(){n.resolve(e())},t),o=n.promise;return o.abort=function(){clearTimeout(r)},o},throttle:function(e,t,n,r,o){S(t)||(o=r,r=n,n=t,t=void 0),I(n)||(o=r,r=n,n=!1),null==r&&(r=300);var i,u,a,c=o;return a=n?function(){e.apply(o,u),i=setTimeout(function(){i=void 0},r)}:function(){i=setTimeout(function(){e.apply(o,u),i=void 0},r)},function(){u=arguments,!c&&(o=this),t&&t.apply(o,u),i||a()}},debounce:function(e,t,n,r,o){S(t)||(o=r,r=n,n=t,t=void 0),I(n)||(o=r,r=n,n=!1),null==r&&(r=300);var i,u,a,c=o,f=function(e){clearTimeout(i),i=setTimeout(e,r)};return a=n?function(){i||e.apply(o,u),f(function(){i=void 0})}:function(){f(function(){e.apply(o,u),i=void 0})},function(){u=arguments,!c&&(o=this),a(),t&&t.apply(o,u)}},download:function(e,t){var n=document.createElement("a");n.download=t,n.href=e,n.target="_blank";var r=document.createEvent("MouseEvents");r.initEvent("click",!1,!1),n.dispatchEvent(r)},param:function(e,t){if(null==e||"object"!=typeof e)return e?e+"":"";var n,r=[],o=encodeURIComponent,i={},u=!1;for(var a in F(t)?t.forEach(function(e){i[e]=!0}):u=t,e)null==(n=e[a])?n="":"object"==typeof n&&(n=JSON.stringify(n)),n=u||i[a]?n:o(n),r.push(o(a)+"="+n);return r.join("&")},parseParam:function(e,t){var n,r={},o=decodeURIComponent,i={},u=!1;for(F(t)?t.forEach(function(e){return i[e]=!0}):u=t;n=m.exec(e);)r[n[1]]=u||i[n[1]]?n[2]:o(n[2]);return r},resolveUrl:function(e,t,n){t=O(Y.getQuery(e),t);var r=Y.param(t,n);return e.replace(a,"?"+r+"$3")},getQuery:function(e){for(var t,n={};t=v.exec(e||r&&location.search||"");)n[t[1]]=t[2];return n},countStr:function(e,t,n,r){if(void 0===t&&(t=1),void 0===n&&(n=.5),void 0===r&&(r=1),!e)return 0;t=+t,n=+n,r=+r;var o=(e+="").match(c),i=e.match(f),u=o?o.length:0,a=i?i.length:0;return t*(e.length-u-a)+n*u+r*a},copyTxt:function(e){try{if(!L(e))return!1}catch(e){return!1}return!0},htmlEncode:function(e){var t;return"string"!=typeof e&&(e+=""),e.replace(s,function(e){return 32===(t=e.charCodeAt(0))&&(t=160),10===t?"<br/>":"&#"+t+";"})},htmlDecode:function(e){if(null==e||""===e)return"";var t=e.match(d);if(t){var n=document.createElement("div");n.innerHTML=t.join(","),t=n.innerText.split(","),n=null}else t=[];var r=0;return e.replace(d,function(e,n){return t[r++]})},camelCase:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.join("-").replace(p,function(e,t){return t.toUpperCase()})},kebabCase:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.map(function(e){return e.replace(h,function(e,t){return(0===t?"":"-")+e.toLowerCase()})}).join("-")},paddingLeft:function(e,t,n){var r,o;return void 0===e&&(e=""),(t=~~t)<=(o=((e+="")+"").length)?e:(n=n&&n.charAt(0)||" ",(r=W(new Array(t-o),n)).push(e),r.join(""))},template:function(){var e=!0;try{new Function("``")}catch(t){e=!1}return e?function(e,t){return new Function("__scope__","\n                    var __result__;\n                    try{\n                        with(__scope__){\n                            __result__=`"+e+'`\n                        }\n                    }\n                    catch(e){\n                        __result__="";\n                    }\n                    return __result__;\n                    ')(t)}:function(e,t){var n=!0,r=e.split(g).map(function(e){return(n=!n)?e:"'"+e.replace("'","\\'")+"'"}).join("+");return new Function("__scope__","\n            var __result__;\n            with(__scope__){ \n                __result__="+r+";\n            }\n            return __result__;\n         ")(t)}}()},R="__p$symbol__",q=function(e,t){if(!S(e))throw TypeError("promisify(): argument not a function");return Object.defineProperties(function n(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];var u=e[R];if(u){if(!S(u))throw TypeError(e.name+"[promisify.custom] is not a function");return Promise.resolve(u.apply(t||this,o))}var a=Y.defer();n.length-1-o.length>0&&(o=o.concat(W(new Array(6),void 0)));try{o.push(function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];e?a.reject(e):n.length>1?a.resolve(n):a.resolve(n[0])}),e.apply(t||this,o)}catch(e){a.reject(e)}return a.promise},Object.getOwnPropertyDescriptors(e))};q.custom=R;var z={year:"FullYear",month:"Month",day:"Date",hour:"Hours",min:"Minutes",sec:"Seconds"},N={dateFormat:function(e,t){if(void 0===t&&(t="yyyy-MM-dd hh:mm:ss"),"[object Date]"!==k(e))return"";var n,r,o=e.getHours(),i=o>12?"pm":"am",u={y:e.getFullYear(),M:e.getMonth()+1,d:e.getDate(),H:o,h:o>12?o-12:o,m:e.getMinutes(),s:e.getSeconds(),S:e.getMilliseconds(),a:i};return t.replace(y,function(e){return"["===(r=e.charAt(0))?e.slice(1,-1):"a"===r?u[r]:(n=Y.paddingLeft(u[r],e.length,"0"),"y"===r&&(n=n.slice(-e.length,n.length)),n)})},dateParse:function(e,t){t||(t="yyyy-MM-dd hh:mm:ss");var n,r,o={y:void 0,M:void 0,d:1,H:void 0,h:void 0,m:0,s:0,S:0,a:"am"},i=t.replace(y,function(e){var t,n=e[0],r=e.length;if("y"===n)t=r<4?"\\d{"+r+"}":"\\d{4}";else if("M"===n||"d"===n||"H"===n||"h"===n||"m"===n||"s"===n)t=1===r?"[1-9]\\d|\\d":"\\d{2}";else if("S"===n)t=r<3?"\\d{"+r+"}":"\\d{3}";else if("a"===n)t="(am|Am|AM|pm|Pm|PM)?";else if("["===n)return e.slice(1,-1);return"("+t+")"}),u=new RegExp(i,"g").exec(e),a=1;if(!u)throw new Error('The date format "'+t+'" match the date string "'+e+'" failed.');for(;n=y.exec(t);)"["!==(r=n[0].charAt(0))&&(o[r]="a"===r?u[a++]:~~u[a++]);var c,f=(new Date).getFullYear();return void 0===o.y?o.y=f:(c=o.y+"").length<4&&(c=(f+"").slice(0,4-c.length)+c,o.y=~~c),void 0===o.M?o.M=0:o.M-=1,o.h||(o.a="am",o.h=o.H||0),o.a=o.a.toLowerCase(),"pm"===o.a&&(o.h+=12),new Date(o.y,o.M,o.d,o.h,o.m,o.s,o.S)},dateAdd:function(e,t){var n=z;"number"==typeof t&&(t={day:t}),e=new Date(e);var r="";return Y.each(n,function(o,i){t[i]&&e["set"+(r=n[i])](e["get"+r]()+~~t[i])}),e},firstDateInMonth:function(e){return(e=new Date(e)).setDate(1),e},lastDateInMonth:function(e){return(e=new Date(e)).setMonth(e.getMonth()+1),e.setDate(0),e},firstWeekInMonth:function(e){var t=N.firstDateInMonth(e),n=t.getDay();return 0===n&&(n=7),N.dateAdd(t,1-n)},lastWeekInMonth:function(e){var t=N.lastDateInMonth(e),n=t.getDay();return 0!==n&&(t=N.dateAdd(t,7-n)),t},weekRange:function(e,t,n){var r,o=[];if(!e||!t)return o;e>t&&(r=t,t=e,e=r),"number"!=typeof n&&(n=1);for(var i,u=1,a=new Date(e);a<t;)1===u&&a.getDay()===n?(+a!=+e&&o.push({end:new Date(a.getTime()-864e5)}),o.push({start:new Date(a)}),u=7):7===u&&(o[i=o.length-1].end=new Date(a.getTime()-864e5),o[i].duration=7,o.push({start:new Date(a)})),a.setDate(a.getDate()+u);for(var c=[0,1,2,3,4,5,6],f=0;f<n;f++)c[f]+=7;var s=o.length;return 0===s?o=[{start:e,end:t,duration:c[t.getDay()]-c[e.getDay()]+1}]:(o[0].start||(o[0].start=e,o[0].duration=c[o[0].end.getDay()]-c[e.getDay()]+1),o[i=s-1].end=t,o[i].duration=c[o[i].end.getDay()]-c[o[i].start.getDay()]+1),o},weekendsCount:function(e,t){e=new Date(e.getFullYear(),e.getMonth(),e.getDate());var n,r,o,i,u=((t=new Date(t.getFullYear(),t.getMonth(),t.getDate()))-e)/864e5+1;return n=2*Math.floor(u/7),(r=u%7)&&(i=(o=e.getDay())+r-1,0===o?n++:o<=6&&i>=6&&(n+=Math.min(i-Math.max(o,6)+1,2))),n}},Q=H(function(){for(var e,t,n={},r=/(?:;\s|^)([^;]*?)=([^;]*)/g,o=/([^&]+)=([^&]+)(?:&|$)/g,i=document.cookie;e=r.exec(i);)for(n[e[1]]={value:unescape(e[2]),values:null};t=o.exec(e[2]);)n[e[1]].values=n[e[1]].values||{},n[e[1]].values[t[1]]=unescape(t[2]);return n}),X=function(e,t,n){var r,o,i,u,a="";if(e){if(e+="",null==t&&(t=""),"object"==typeof t){for(o in t)a+=o+"="+escape(t[o])+"&";a=a.slice(0,-1)}else a+=escape(t);return(n=n||{}).expires&&"[object Date]"!==k(n.expires)&&(u=n.expires,(i=new Date).setTime(i.valueOf()+(P(u.day)?86400*u.day:0)+(P(u.hour)?3600*u.hour:0)+(P(u.min)?60*u.min:0)+(P(u.sec)?u.sec:0)),n.expires=i),r=e+"="+a+(n.expires?";expires="+n.expires.toUTCString():"")+(n.path?"; path="+n.path:"")+(n.domain?"; domain="+n.domain:"")+(n.secure?"; secure":""),document.cookie=r,Q(!0)[e]}},Z=function(e,t){return X(e,"",O(t,{expires:{day:-30}})),!(e in Q(!0))},B=O(Y,{promisify:q,getCookie:Q,setCookie:X,deleteCookie:Z,cookie:{delete:Z,del:Z,set:X,get:function(e,t){var n=Q(t)[e];return n&&n.value}}},N,{uniq:Y.unique});r||(["isWifi","download","copyTxt","getCookie","setCookie","deleteCookie"].forEach(function(e){Y[e]=Y.noop}),Y.htmlDecode=function(e){return(e+="").replace(l,function(e,t,n){return n?"\n":("160"===t&&(t=32),String.fromCharCode(t))})}),t.default=B}]).default});