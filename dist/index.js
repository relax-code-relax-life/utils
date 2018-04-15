/*! http://wangwl.net/static/pages/utils.html */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.utils=t():e.utils=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o="undefined"!=typeof window&&window.document,i=o?navigator.userAgent:"",u=/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i,a=/(\?([^#]*))?(#.*)?\s*$/,c=/[\u0020-\u007f\uff61-\uff9f]/g,f=/\n/g,s=/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,l=/&#(\d+);|(<br\s*\/\s*>)/g,d=/&#.+?;/g,p=/-([a-zA-Z])/g,h=/(?:[?&])(.*?)=(.*?)(?=&|$|#)/g,y=/y+|M+|d+|h+|m+|s+|S+/g,v=/(?:^|&)(.*?)=(.*?)(?=&|$)/g,g=/\$\{\s*(.+?)\s*\}/g,m=/Chrome\/(\d+)/,_=/Firefox\/(\d+)/,b=/Version\/([\d.]+) Safari\/\d+/,D=/MSIE (\d+)/,x=/Trident\/.*; rv:(\d+)/,w=/(Edge\/\d+)/,M=/Android/i,j=/MicroMessenger/,A=/iphone|ipad|ipod|ios/i,E=function(e,t){var n=e.exec(t||i);return n&&n[1]},C=Function.prototype.call,S=(C.bind(Array.prototype.slice),C.bind(Object.prototype.toString)),T=Array.isArray||function(e){return"[object Array]"===S(e)},k=function(e){return"[object Function]"===S(e)},F=function(e){return"boolean"==typeof e},I=function(e){return"number"==typeof e},O=Object.assign||function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.forEach(function(t,n){e[n]=t}),e},P=function(e,t,n){return function(n){!t&&(t=this);for(var r=arguments.length,o=Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return e.apply(t,o)}},W=function(e){var t=function(){var e="inner_copy_fake_ele",t=document.getElementById(e);return t||((t=document.createElement("textarea")).style.position="absolute",t.style.left="-999px",t.style.top="0px",t.setAttribute("readonly",""),t.id=e,document.body.appendChild(t),t)}();return t.value=e,t.select(),document.execCommand("copy")},$={},U={guid:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+0},noop:function(){},isAndroid:function(e){return M.test(e||i)},isIos:function(e){return A.test(e||i)},isWeiXin:function(e){return j.test(e||i)},isWifi:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e?"cellular"!==e.type:U.isWeiXin()?/NetType\/WIFI/.test(navigator.userAgent):void 0},isUrl:function(e){return u.test(e)},isArrayLike:function(e){return e&&"object"===(void 0===e?"undefined":r(e))&&isFinite(e.length)&&e.length>=0&&e.length===Math.floor(e.length)&&e.length<4294967296&&!e.nodeType},isIE:function(e){return E(D,e)||E(x,e)||E(w,e)},isChrome:function(e){return E(m,e)},isFirefox:function(e){return E(_,e)},isSafari:function(e){return E(m,e)||E(w,e)?null:E(b,e)},defer:function(){var e={};return e.promise=new Promise(function(t,n){e.resolve=t,e.reject=n}),e},each:function(e,t,n){if(T(e))return e.forEach(t,n);Object.keys(e).forEach(function(r){t.call(n,e[r],r,e)})},map:function(e,t,n){if(T(e))return e.map(t,n);var r=[];return U.each(e,function(o,i){r.push(t.call(n,o,i,e))}),r},find:function(e,t,n){if(T(e))return e.find(t,n);var r=Object.keys(e).find(function(r){return t.call(n,e[r],r,e)});return e[r]},unique:function(e,t,n,r){if("function"==typeof Set&&!n)return Array.from(new Set(e));var o=[],i=n?e.map(n,r):e;if(t){var u;i.forEach(function(t,n){u!==t&&(u=t,o.push(e[n]))})}else{var a=[];i.forEach(function(t,n){a.includes(t)||(a.push(t),o.push(e[n]))})}return o},cache:P,loop:function(e,t,n){var r=U.guid("loop"),o=function(){$[r]=setTimeout(i,t)},i=function(){Promise.resolve(e()).then(o)};return n?i():o(),r},clearLoop:function(e){var t=$[e];t&&(clearTimeout(t),$[e]=void 0)},timeout:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=U.defer(),r=setTimeout(function(){n.resolve(e())},t);return n.promise.abort=function(){clearTimeout(r)},n.promise},throttle:function(e,t,n,r,o){k(t)||(o=r,r=n,n=t,t=void 0),F(n)||(o=r,r=n,n=!1);var i,u,a,c=o;return a=n?function(){e.apply(o,u),i=setTimeout(function(){i=void 0},r)}:function(){i=setTimeout(function(){e.apply(o,u),i=void 0},r)},function(){u=arguments,!c&&(o=this),t&&t.apply(o,u),i||a()}},debounce:function(e,t,n,r,o){k(t)||(o=r,r=n,n=t,t=void 0),F(n)||(o=r,r=n,n=!1);var i,u,a,c=o,f=function(e){clearTimeout(i),i=setTimeout(e,r)};return a=n?function(){i||e.apply(o,u),f(function(){i=void 0})}:function(){f(function(){e.apply(o,u),i=void 0})},function(){u=arguments,!c&&(o=this),a(),t&&t.apply(o,u)}},download:function(e,t){var n=document.createElement("a");n.download=t,n.href=e,n.target="_blank";var r=document.createEvent("MouseEvents");r.initEvent("click",!1,!1),n.dispatchEvent(r)},param:function(e,t){if(null==e||"object"!==(void 0===e?"undefined":r(e)))return e||"";var n,o=[],i=encodeURIComponent,u={},a=!1;for(var c in T(t)?t.forEach(function(e){u[e]=!0}):a=t,e)null==(n=e[c])?n="":"object"===(void 0===n?"undefined":r(n))&&(n=JSON.stringify(n)),n=a||u[c]?n:i(n),o.push(i(c)+"="+n);return o.join("&")},parseParam:function(e,t){var n,r={},o=decodeURIComponent,i={},u=!1;for(T(t)?t.forEach(function(e){return i[e]=!0}):u=t;n=v.exec(e);)r[n[1]]=u||i[n[1]]?n[2]:o(n[2]);return r},resolveUrl:function(e,t,n){return t=O(U.getQuery(e),t),t=U.param(t,n),e.replace(a,"?"+t+"$3")},getQuery:function(e){for(var t,n={};t=h.exec(e||o&&location.search||"");)n[t[1]]=t[2];return n},countStr:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if(!e)return 0;t=+t,n=+n,r=+r;var o=(e+="").match(c),i=e.match(f),u=o?o.length:0,a=i?i.length:0;return t*(e.length-u-a)+n*u+r*a},copyTxt:function(e){try{if(!W(e))return!1}catch(e){return!1}return!0},htmlEncode:function(e){var t;return"string"!=typeof e&&(e+=""),e.replace(s,function(e){return 32===(t=e.charCodeAt(0))&&(t=160),10===t?"<br/>":"&#"+t+";"})},htmlDecode:function(e){if(null==e||""===e)return"";var t=e.match(d);if(t){var n=document.createElement("div");n.innerHTML=t.join(","),t=n.innerText.split(","),n=null}else t=[];var r=0;return e.replace(d,function(e,n){return t[r++]})},camelCase:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.join("-").replace(p,function(e,t){return t.toUpperCase()})},paddingLeft:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments[1],o=arguments[2];return(r=~~r)<=(t=((n+="")+"").length)?n:(o=o&&o.charAt(0)||" ",(e=function(e,t){if(e.fill)return e.fill(t);for(var n=e.length-1;n>-1;n--)e[n]=t;return e}(new Array(r-t),o)).push(n),e.join(""))},template:function(){var e=!0;try{new Function("``")}catch(t){e=!1}return e?function(e,t){return new Function("__scope__","\n                    var __result__;\n                    try{\n                        with(__scope__){\n                            __result__=`"+e+'`\n                        }\n                    }\n                    catch(e){\n                        __result__="";\n                    }\n                    return __result__;\n                    ')(t)}:function(e,t){var n=!0,r=e.split(g).map(function(e){return(n=!n)?e:"'"+e.replace("'","\\'")+"'"}).join("+");return new Function("__scope__","\n            var __result__;\n            with(__scope__){ \n                __result__="+r+";\n            }\n            return __result__;\n         ")(t)}}()},L="__p$symbol__";function Y(e,t){if(!k(e))throw TypeError("promisify(): argument not a function");return Object.defineProperties(function(){for(var n=e[L],r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];if(n){if(!k(n))throw TypeError(e.name+"[promisify.custom] is not a function");return Promise.resolve(n.apply(t||this,o))}var u=U.defer();try{o.push(function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];e?u.reject(e):n.length>1?u.resolve(n):u.resolve(n[0])}),e.apply(t||this,o)}catch(e){u.reject(e)}return u.promise},Object.getOwnPropertyDescriptors(e))}Y.custom=L;var q={year:"FullYear",month:"Month",day:"Date",hour:"Hours",min:"Minutes",sec:"Seconds"},H={dateFormat:function(e,t){if("[object Date]"!==S(e))return"";t||(t="yyyy-MM-dd hh:mm:ss");var n,r,o={y:e.getFullYear(),M:e.getMonth()+1,d:e.getDate(),h:e.getHours(),m:e.getMinutes(),s:e.getSeconds(),S:e.getMilliseconds()},i=y;return t.replace(i,function(e){return r=e.charAt(0),n=U.paddingLeft(o[r],e.length,"0"),"y"===r&&(n=n.slice(-e.length,n.length)),n})},dateParse:function(e,t){t||(t="yyyy-MM-dd hh:mm:ss");for(var n,r=e.split(/\D+/),o=0,i=y,u={y:void 0,M:void 0,d:1,h:0,m:0,s:0,S:0};n=i.exec(t);)u[n[0].charAt(0)]=~~r[o++];var a,c=(new Date).getFullYear();return void 0===u.y?u.y=c:(a=u.y+"").length<4&&(a=(c+"").slice(0,4-a.length)+a,u.y=~~a),void 0===u.M?u.M=0:u.M-=1,new Date(u.y,u.M,u.d,u.h,u.m,u.s,u.S)},dateAdd:function(e,t){var n=q;"number"==typeof t&&(t={day:t}),e=new Date(e);var r="";return U.each(n,function(o,i){t[i]&&e["set"+(r=n[i])](e["get"+r]()+~~t[i])}),e},firstDateInMonth:function(e){return(e=new Date(e)).setDate(1),e},lastDateInMonth:function(e){return(e=new Date(e)).setMonth(e.getMonth()+1),e.setDate(0),e},firstWeekInMonth:function(e){var t=U.firstDateInMonth(e),n=t.getDay();return 0===n&&(n=7),U.dateAdd(t,1-n)},lastWeekInMonth:function(e){var t=U.lastDateInMonth(e),n=t.getDay();return 0!==n&&(t=U.dateAdd(t,7-n)),t},weekRange:function(e,t,n){var r,o=[];if(!e||!t)return o;e>t&&(r=t,t=e,e=r),"number"!=typeof n&&(n=1);for(var i,u=1,a=new Date(e);a<t;)1===u&&a.getDay()===n?(+a!=+e&&o.push({end:new Date(a.getTime()-864e5)}),o.push({start:new Date(a)}),u=7):7===u&&(o[i=o.length-1].end=new Date(a.getTime()-864e5),o[i].duration=7,o.push({start:new Date(a)})),a.setDate(a.getDate()+u);for(var c=[0,1,2,3,4,5,6],f=0;f<n;f++)c[f]+=7;var s=o.length;return 0===s?o=[{start:e,end:t,duration:c[t.getDay()]-c[e.getDay()]+1}]:(o[0].start||(o[0].start=e,o[0].duration=c[o[0].end.getDay()]-c[e.getDay()]+1),o[i=s-1].end=t,o[i].duration=c[o[i].end.getDay()]-c[o[i].start.getDay()]+1),o},weekendsCount:function(e,t){e=new Date(e.getFullYear(),e.getMonth(),e.getDate());var n,r,o,i,u=((t=new Date(t.getFullYear(),t.getMonth(),t.getDate()))-e)/864e5+1;return n=2*Math.floor(u/7),(r=u%7)&&(i=(o=e.getDay())+r-1,0===o?n++:o<=6&&i>=6&&(n+=Math.min(i-Math.max(o,6)+1,2))),n}},R=P(function(){for(var e,t,n={},r=/(?:;\s|^)([^;]*?)=([^;]*)/g,o=/([^&]+)=([^&]+)(?:&|$)/g,i=document.cookie;e=r.exec(i);)for(n[e[1]]={value:unescape(e[2]),values:null};t=o.exec(e[2]);)n[e[1]].values=n[e[1]].values||{},n[e[1]].values[t[1]]=unescape(t[2]);return n}),z=function(e,t,n){var o,i,u,a,c="";if(e){if(e+="",null==t&&(t=""),"object"===(void 0===t?"undefined":r(t))){for(i in t)c+=i+"="+escape(t[i])+"&";c=c.slice(0,-1)}else c+=escape(t);return(n=n||{}).expires&&"[object Date]"!==S(n.expires)&&(a=n.expires,(u=new Date).setTime(u.valueOf()+(I(a.day)?86400*a.day:0)+(I(a.hour)?3600*a.hour:0)+(I(a.min)?60*a.min:0)+(I(a.sec)?a.sec:0)),n.expires=u),o=e+"="+c+(n.expires?";expires="+n.expires.toUTCString():"")+(n.path?"; path="+n.path:"")+(n.domain?"; domain="+n.domain:"")+(n.secure?"; secure":""),document.cookie=o,R(!0)[e]}},N=function(e,t){return z(e,"",this.extend(t,{expires:{day:-30}})),!(e in R(!0))};O(U,{promisify:Y,getCookie:R,setCookie:z,deleteCookie:N,cookie:{delete:N,del:N,set:z,get:function(e,t){var n=R(t)[e];return n&&n.value}}},H),o||(["isWifi","download","copyTxt","getCookie","setCookie","deleteCookie"].forEach(function(e){U[e]=U.noop}),U.htmlDecode=function(e){return(e+="").replace(l,function(e,t,n){return n?"\n":("160"===t&&(t=32),String.fromCharCode(t))})}),U.uniq=U.unique,e.exports=U}])});