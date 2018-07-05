/*! http://wangwl.net/static/pages/utils.html */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.utils=t():e.utils=t()}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o="undefined"!=typeof window&&window.document,i=o?navigator.userAgent:"",u=o?navigator.platform:"",a=/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i,c=/(\?([^#]*))?(#.*)?\s*$/,f=/[\u0020-\u007f\uff61-\uff9f]/g,s=/\n/g,l=/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,d=/&#(\d+);|(<br\s*\/\s*>)/g,p=/&#.+?;/g,h=/-([a-zA-Z])/g,y=/[A-Z]/g,v=/(?:[?&])(.*?)=(.*?)(?=&|$|#)/g,g=/y+|M+|d+|h+|m+|s+|S+/g,m=/(?:^|&)(.*?)=(.*?)(?=&|$)/g,_=/\$\{\s*(.+?)\s*\}/g,b=/Chrome\/(\d+)/,M=/Firefox\/(\d+)/,D=/Version\/([\d.]+) Safari\/\d+/,x=/MSIE (\d+)/,w=/Trident\/.*; rv:(\d+)/,j=/(Edge\/\d+)/,A=/Android/i,C=/MicroMessenger/,E=/iphone|ipad|ipod|ios/i,k=function(e,t){var n=e.exec(t||i);return n&&n[1]},S=Function.prototype.call,T=(S.bind(Array.prototype.slice),S.bind(Object.prototype.toString)),F=Array.isArray||function(e){return"[object Array]"===T(e)},I=function(e){return"[object Function]"===T(e)},O=function(e){return"boolean"==typeof e},W=function(e){return"number"==typeof e},P=Object.assign||function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.forEach(function(t,n){e[n]=t}),e},$=function(e,t,n){return function(n){!t&&(t=this);for(var r=arguments.length,o=Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return e.apply(t,o)}},L=function(e){var t=function(){var e="inner_copy_fake_ele",t=document.getElementById(e);return t||((t=document.createElement("textarea")).style.position="absolute",t.style.left="-999px",t.style.top="0px",t.setAttribute("readonly",""),t.id=e,document.body.appendChild(t),t)}();return t.value=e,t.select(),document.execCommand("copy")},U=0,Y={},q={guid:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+U++},noop:function(){},isAndroid:function(e){return A.test(e||i)},isIos:function(e){return E.test(e||i)},isWeiXin:function(e){return C.test(e||i)},isWifi:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e?"cellular"!==e.type:q.isWeiXin()?/NetType\/WIFI/.test(navigator.userAgent):void 0},isWindows:function(){return"Win32"===u||"Windows"===u||"Win16"===u||"Win64"===u||"WinCE"===u},isMac:function(){return"MacIntel"===u||"Macintosh"===u||"MacPPC"===u||"Mac68K"===u},isUrl:function(e){return a.test(e)},isArrayLike:function(e){return e&&"object"===(void 0===e?"undefined":r(e))&&isFinite(e.length)&&e.length>=0&&e.length===Math.floor(e.length)&&e.length<4294967296&&!e.nodeType},isIE:function(e){return k(x,e)||k(w,e)||k(j,e)},isChrome:function(e){return k(b,e)},isFirefox:function(e){return k(M,e)},isSafari:function(e){return k(b,e)||k(j,e)?null:k(D,e)},defer:function(){var e={};return e.promise=new Promise(function(t,n){e.resolve=t,e.reject=n}),e},each:function(e,t,n){if(F(e))return e.forEach(t,n);Object.keys(e).forEach(function(r){t.call(n,e[r],r,e)})},map:function(e,t,n){if(F(e))return e.map(t,n);var r=[];return q.each(e,function(o,i){r.push(t.call(n,o,i,e))}),r},find:function(e,t,n){if(F(e))return e.find(t,n);var r=Object.keys(e).find(function(r){return t.call(n,e[r],r,e)});return e[r]},unique:function(e,t,n,r){if("function"==typeof t&&(r=n,n=t,t=!1),"function"==typeof Set&&!n)return Array.from(new Set(e));var o=[],i=n?e.map(n,r):e;if(t){var u;i.forEach(function(t,n){u!==t&&(u=t,o.push(e[n]))})}else{var a=[];i.forEach(function(t,n){a.includes(t)||(a.push(t),o.push(e[n]))})}return o},cache:$,loop:function(e,t,n){var r=q.guid("loop"),o=function(){Y[r]=setTimeout(i,t)},i=function(){Promise.resolve(e()).then(o)};return n?i():o(),r},clearLoop:function(e){var t=Y[e];t&&(clearTimeout(t),Y[e]=void 0)},timeout:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=q.defer(),r=setTimeout(function(){n.resolve(e())},t);return n.promise.abort=function(){clearTimeout(r)},n.promise},throttle:function(e,t,n,r,o){I(t)||(o=r,r=n,n=t,t=void 0),O(n)||(o=r,r=n,n=!1);var i,u,a,c=o;return a=n?function(){e.apply(o,u),i=setTimeout(function(){i=void 0},r)}:function(){i=setTimeout(function(){e.apply(o,u),i=void 0},r)},function(){u=arguments,!c&&(o=this),t&&t.apply(o,u),i||a()}},debounce:function(e,t,n,r,o){I(t)||(o=r,r=n,n=t,t=void 0),O(n)||(o=r,r=n,n=!1);var i,u,a,c=o,f=function(e){clearTimeout(i),i=setTimeout(e,r)};return a=n?function(){i||e.apply(o,u),f(function(){i=void 0})}:function(){f(function(){e.apply(o,u),i=void 0})},function(){u=arguments,!c&&(o=this),a(),t&&t.apply(o,u)}},download:function(e,t){var n=document.createElement("a");n.download=t,n.href=e,n.target="_blank";var r=document.createEvent("MouseEvents");r.initEvent("click",!1,!1),n.dispatchEvent(r)},param:function(e,t){if(null==e||"object"!==(void 0===e?"undefined":r(e)))return e||"";var n,o=[],i=encodeURIComponent,u={},a=!1;for(var c in F(t)?t.forEach(function(e){u[e]=!0}):a=t,e)null==(n=e[c])?n="":"object"===(void 0===n?"undefined":r(n))&&(n=JSON.stringify(n)),n=a||u[c]?n:i(n),o.push(i(c)+"="+n);return o.join("&")},parseParam:function(e,t){var n,r={},o=decodeURIComponent,i={},u=!1;for(F(t)?t.forEach(function(e){return i[e]=!0}):u=t;n=m.exec(e);)r[n[1]]=u||i[n[1]]?n[2]:o(n[2]);return r},resolveUrl:function(e,t,n){return t=P(q.getQuery(e),t),t=q.param(t,n),e.replace(c,"?"+t+"$3")},getQuery:function(e){for(var t,n={};t=v.exec(e||o&&location.search||"");)n[t[1]]=t[2];return n},countStr:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if(!e)return 0;t=+t,n=+n,r=+r;var o=(e+="").match(f),i=e.match(s),u=o?o.length:0,a=i?i.length:0;return t*(e.length-u-a)+n*u+r*a},copyTxt:function(e){try{if(!L(e))return!1}catch(e){return!1}return!0},htmlEncode:function(e){var t;return"string"!=typeof e&&(e+=""),e.replace(l,function(e){return 32===(t=e.charCodeAt(0))&&(t=160),10===t?"<br/>":"&#"+t+";"})},htmlDecode:function(e){if(null==e||""===e)return"";var t=e.match(p);if(t){var n=document.createElement("div");n.innerHTML=t.join(","),t=n.innerText.split(","),n=null}else t=[];var r=0;return e.replace(p,function(e,n){return t[r++]})},camelCase:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.join("-").replace(h,function(e,t){return t.toUpperCase()})},kebabCase:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.map(function(e){return e.replace(y,function(e,t){return(0===t?"":"-")+e.toLowerCase()})}).join("-")},paddingLeft:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments[1],o=arguments[2];return(r=~~r)<=(t=((n+="")+"").length)?n:(o=o&&o.charAt(0)||" ",(e=function(e,t){if(e.fill)return e.fill(t);for(var n=e.length-1;n>-1;n--)e[n]=t;return e}(new Array(r-t),o)).push(n),e.join(""))},template:function(){var e=!0;try{new Function("``")}catch(t){e=!1}return e?function(e,t){return new Function("__scope__","\n                    var __result__;\n                    try{\n                        with(__scope__){\n                            __result__=`"+e+'`\n                        }\n                    }\n                    catch(e){\n                        __result__="";\n                    }\n                    return __result__;\n                    ')(t)}:function(e,t){var n=!0,r=e.split(_).map(function(e){return(n=!n)?e:"'"+e.replace("'","\\'")+"'"}).join("+");return new Function("__scope__","\n            var __result__;\n            with(__scope__){ \n                __result__="+r+";\n            }\n            return __result__;\n         ")(t)}}()},H="__p$symbol__";function R(e,t){if(!I(e))throw TypeError("promisify(): argument not a function");return Object.defineProperties(function(){for(var n=e[H],r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];if(n){if(!I(n))throw TypeError(e.name+"[promisify.custom] is not a function");return Promise.resolve(n.apply(t||this,o))}var u=q.defer();try{o.push(function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];e?u.reject(e):n.length>1?u.resolve(n):u.resolve(n[0])}),e.apply(t||this,o)}catch(e){u.reject(e)}return u.promise},Object.getOwnPropertyDescriptors(e))}R.custom=H;var z={year:"FullYear",month:"Month",day:"Date",hour:"Hours",min:"Minutes",sec:"Seconds"},N={dateFormat:function(e,t){if("[object Date]"!==T(e))return"";t||(t="yyyy-MM-dd hh:mm:ss");var n,r,o={y:e.getFullYear(),M:e.getMonth()+1,d:e.getDate(),h:e.getHours(),m:e.getMinutes(),s:e.getSeconds(),S:e.getMilliseconds()},i=g;return t.replace(i,function(e){return r=e.charAt(0),n=q.paddingLeft(o[r],e.length,"0"),"y"===r&&(n=n.slice(-e.length,n.length)),n})},dateParse:function(e,t){t||(t="yyyy-MM-dd hh:mm:ss");for(var n,r=e.split(/\D+/),o=0,i=g,u={y:void 0,M:void 0,d:1,h:0,m:0,s:0,S:0};n=i.exec(t);)u[n[0].charAt(0)]=~~r[o++];var a,c=(new Date).getFullYear();return void 0===u.y?u.y=c:(a=u.y+"").length<4&&(a=(c+"").slice(0,4-a.length)+a,u.y=~~a),void 0===u.M?u.M=0:u.M-=1,new Date(u.y,u.M,u.d,u.h,u.m,u.s,u.S)},dateAdd:function(e,t){var n=z;"number"==typeof t&&(t={day:t}),e=new Date(e);var r="";return q.each(n,function(o,i){t[i]&&e["set"+(r=n[i])](e["get"+r]()+~~t[i])}),e},firstDateInMonth:function(e){return(e=new Date(e)).setDate(1),e},lastDateInMonth:function(e){return(e=new Date(e)).setMonth(e.getMonth()+1),e.setDate(0),e},firstWeekInMonth:function(e){var t=q.firstDateInMonth(e),n=t.getDay();return 0===n&&(n=7),q.dateAdd(t,1-n)},lastWeekInMonth:function(e){var t=q.lastDateInMonth(e),n=t.getDay();return 0!==n&&(t=q.dateAdd(t,7-n)),t},weekRange:function(e,t,n){var r,o=[];if(!e||!t)return o;e>t&&(r=t,t=e,e=r),"number"!=typeof n&&(n=1);for(var i,u=1,a=new Date(e);a<t;)1===u&&a.getDay()===n?(+a!=+e&&o.push({end:new Date(a.getTime()-864e5)}),o.push({start:new Date(a)}),u=7):7===u&&(o[i=o.length-1].end=new Date(a.getTime()-864e5),o[i].duration=7,o.push({start:new Date(a)})),a.setDate(a.getDate()+u);for(var c=[0,1,2,3,4,5,6],f=0;f<n;f++)c[f]+=7;var s=o.length;return 0===s?o=[{start:e,end:t,duration:c[t.getDay()]-c[e.getDay()]+1}]:(o[0].start||(o[0].start=e,o[0].duration=c[o[0].end.getDay()]-c[e.getDay()]+1),o[i=s-1].end=t,o[i].duration=c[o[i].end.getDay()]-c[o[i].start.getDay()]+1),o},weekendsCount:function(e,t){e=new Date(e.getFullYear(),e.getMonth(),e.getDate());var n,r,o,i,u=((t=new Date(t.getFullYear(),t.getMonth(),t.getDate()))-e)/864e5+1;return n=2*Math.floor(u/7),(r=u%7)&&(i=(o=e.getDay())+r-1,0===o?n++:o<=6&&i>=6&&(n+=Math.min(i-Math.max(o,6)+1,2))),n}},Q=$(function(){for(var e,t,n={},r=/(?:;\s|^)([^;]*?)=([^;]*)/g,o=/([^&]+)=([^&]+)(?:&|$)/g,i=document.cookie;e=r.exec(i);)for(n[e[1]]={value:unescape(e[2]),values:null};t=o.exec(e[2]);)n[e[1]].values=n[e[1]].values||{},n[e[1]].values[t[1]]=unescape(t[2]);return n}),X=function(e,t,n){var o,i,u,a,c="";if(e){if(e+="",null==t&&(t=""),"object"===(void 0===t?"undefined":r(t))){for(i in t)c+=i+"="+escape(t[i])+"&";c=c.slice(0,-1)}else c+=escape(t);return(n=n||{}).expires&&"[object Date]"!==T(n.expires)&&(a=n.expires,(u=new Date).setTime(u.valueOf()+(W(a.day)?86400*a.day:0)+(W(a.hour)?3600*a.hour:0)+(W(a.min)?60*a.min:0)+(W(a.sec)?a.sec:0)),n.expires=u),o=e+"="+c+(n.expires?";expires="+n.expires.toUTCString():"")+(n.path?"; path="+n.path:"")+(n.domain?"; domain="+n.domain:"")+(n.secure?"; secure":""),document.cookie=o,Q(!0)[e]}},Z=function(e,t){return X(e,"",this.extend(t,{expires:{day:-30}})),!(e in Q(!0))};P(q,{promisify:R,getCookie:Q,setCookie:X,deleteCookie:Z,cookie:{delete:Z,del:Z,set:X,get:function(e,t){var n=Q(t)[e];return n&&n.value}}},N),o||(["isWifi","download","copyTxt","getCookie","setCookie","deleteCookie"].forEach(function(e){q[e]=q.noop}),q.htmlDecode=function(e){return(e+="").replace(d,function(e,t,n){return n?"\n":("160"===t&&(t=32),String.fromCharCode(t))})}),q.uniq=q.unique,e.exports=q}])});