/* v2.1.7 https://wangwl.net/static/pages/utils.html */
var n=function(){return"undefined"!=typeof window&&window.document},e=function(){return n()?navigator.userAgent:""},t=function(){return n()?navigator.platform:""},r=Function.prototype.call.bind(Object.prototype.toString),o=Array.isArray||function(n){return"[object Array]"===r(n)},i=function(n){return"number"==typeof n},u=function(n){return"[object Function]"===r(n)},a=function(n){return"boolean"==typeof n},c=Object.assign||function(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];return e.forEach((function(e){for(var t in e)n[t]=e[t]})),n},f=function(n,e){if(n.fill)return n.fill(e);for(var t=n.length-1;t>-1;t--)n[t]=e;return n},s=function(){var n={};return n.promise=new Promise((function(e,t){n.resolve=function(t){return e(t),n.promise},n.reject=function(e){return t(e),n.promise}})),n},l=s,v=function(n,e){if(!u(n))throw TypeError("promisify(): argument not a function");return Object.defineProperties((function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var o=n.__p$symbol__;if(o){if(!u(o))throw TypeError("".concat(n.name,"[promisify.custom] is not a function"));return Promise.resolve(o.apply(e||this,t))}var i=l(),a=n.length-1-t.length;a>0&&(t=t.concat(f(new Array(a),void 0)));try{t.push((function(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];n?i.reject(n):e.length>1?i.resolve(e):i.resolve(e[0])})),n.apply(e||this,t)}catch(n){i.reject(n)}return i.promise}),Object.getOwnPropertyDescriptors(n))};function d(n,e,t){var r=n;if(o(r))return r.forEach(e,t);Object.keys(r).forEach((function(n){e.call(t,r[n],n,r)}))}v.custom="__p$symbol__";var p=function(n,e,t){var r=n;if(o(r))return r.map(e,t);var i=[];return d(r,(function(n,o){i.push(e.call(t,n,o,r))})),i},h=function(n,e,t){var r=n;if(o(r))return r.find(e,t);var i=Object.keys(r).find((function(n){return e.call(t,r[n],n,r)}));return i&&r[i]};function m(n,e,t,r){var o,i,u;if("function"==typeof e?(i=e,u=t,o=!1):(o=e,i=t,u=r),"function"==typeof Set&&!i)return Array.from(new Set(n));var a=[],c=i?n.map(i,u):n;if(o){var f;c.forEach((function(e,t){f!==e&&(f=e,a.push(n[t]))}))}else{var s=[];c.forEach((function(e,t){s.includes(e)||(s.push(e),a.push(n[t]))}))}return a}var y=function(n){return void 0===n&&(n=""),n+Date.now()},g=y,_={},w=function(n,e,t){void 0===t&&(t=!1);var r=g("loop");_[r]="_init";var o=function(){_[r]&&(_[r]=setTimeout(i,e))},i=function(){Promise.resolve(n()).then(o)};return t?i():o(),r},M=function(n){var e=_[n];e&&(clearTimeout(e),_[n]=void 0)},b=function(n,e){void 0===n&&(n=0);var t=s(),r=setTimeout((function(){t.resolve(e?e():void 0)}),n),o=t.promise;return o.abort=function(){clearTimeout(r)},o},D=function(n,e,t){return function(t){for(var r=[],o=1;o<arguments.length;o++)r[o-1]=arguments[o];return!e&&(e=this),n.apply(e,r)}},x=function(n,e,t,r){if(void 0===t&&(t=0),void 0===r&&(r=this),"number"!=typeof e)throw new TypeError("the parameter max is not a number");var o=0,i=function(){return o++,Promise.resolve(n.apply(r,arguments)).then((function(n){return o=0,n}),(function(n){var r=this;return o<e?t>0?b(t,(function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return i.apply(r,n)})):i.apply(this,arguments):(o=0,Promise.reject(n))}))};return i};function E(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];var r=e[0],o=e[1],i=e[2],c=e[3];u(r)||(c=i,i=o,o=r,r=void 0),a(o)||(c=i,i=o,o=!1),null==i&&(i=300);var f,s,l,v=c;return l=o?function(){n.apply(c,s),f=setTimeout((function(){f=void 0}),i)}:function(){f=setTimeout((function(){n.apply(c,s),f=void 0}),i)},function(){s=arguments,!v&&(c=this),r&&r.apply(c,s),f||l()}}function j(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];var r=e[0],o=e[1],i=e[2],c=e[3];u(r)||(c=i,i=o,o=r,r=void 0),a(o)||(c=i,i=o,o=!1),null==i&&(i=300);var f,s,l,v=c,d=function(n){clearTimeout(f),f=setTimeout(n,i)};return l=o?function(){f||n.apply(c,s),d((function(){f=void 0}))}:function(){d((function(){n.apply(c,s),f=void 0}))},function(){s=arguments,!v&&(c=this),l(),r&&r.apply(c,s)}}var A,T=function(n){for(var e,t,r={},o=/(?:;\s|^)([^;]*?)=([^;]*)/g,i=/([^&]+)=([^&]+)(?:&|$)/g;e=o.exec(n);)for(r[e[1]]={value:unescape(e[2]),values:null};t=i.exec(e[2]);)r[e[1]].values=r[e[1]].values||{},r[e[1]].values[t[1]]=unescape(t[2]);return r},S=D((function(){return n()?T(document.cookie):{}})),C=function(e,t,o){if(n()){var u,a,c,f,s="";if(e){if(e+="",null==t&&(t=""),"object"==typeof t){for(a in t)s+=a+"="+escape(t[a])+"&";s=s.slice(0,-1)}else s+=escape(t);return(o=o||{}).expires&&"[object Date]"!==r(o.expires)&&(f=o.expires,(c=new Date).setTime(c.valueOf()+(i(f.day)?86400*f.day*1e3:0)+(i(f.hour)?3600*f.hour*1e3:0)+(i(f.min)?60*f.min*1e3:0)+(i(f.sec)?1e3*f.sec:0)),o.expires=c),u=e+"="+s+(o.expires?";expires="+o.expires.toUTCString():"")+(o.path?"; path="+o.path:"")+(o.domain?"; domain="+o.domain:"")+(o.secure?"; secure":""),document.cookie=u,S(!0)[e]}}},F=function(e,t){return!!n()&&(C(e,"",c(t||{},{expires:{day:-30}})),!(e in S(!0)))},O={delete:F,del:F,set:C,get:function(n,e){var t=S(e)[n];return t&&t.value}},k=/[\u0020-\u007f\uff61-\uff9f]/g,P=/\n/g,I=/-([a-zA-Z])/g,H=/[A-Z]/g,$=/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,W=/&#(\d+);|(<br\s*\/\s*>)/g,U=/&.+?;/g,Y=function(n,e,t,r){if(void 0===e&&(e=1),void 0===t&&(t=.5),void 0===r&&(r=1),!n)return 0;e=+e,t=+t,r=+r;var o=(n+="").match(k),i=n.match(P),u=o?o.length:0,a=i?i.length:0;return e*(n.length-u-a)+t*u+r*a},R=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return n.join("-").replace(I,(function(n,e){return e.toUpperCase()}))},L=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return n.map((function(n){return n.replace(H,(function(n,e){return(0===e?"":"-")+n.toLowerCase()}))})).join("-")},z=function(n,e,t){var r,o;return void 0===n&&(n=""),(e=~~e)<=(o=((n+="")+"").length)?n:(t=t&&t.charAt(0)||" ",(r=f(new Array(e-o),t)).push(n),r.join(""))},N=function(n){var e;return"string"!=typeof n&&(n+=""),n.replace($,(function(n){return 32===(e=n.charCodeAt(0))&&(e=160),10===e?"<br/>":"&#"+e+";"}))},Z=function(e){return n()?function(n){if(null==n||""===n)return"";var e=n.match(U);if(e){var t=document.createElement("div");t.innerHTML=e.join(","),e=t.innerText.split(","),t=null}else e=[];var r=0;return n.replace(U,(function(n,t){return e[r++]}))}(e):(t=e,(t+="").replace(W,(function(n,e,t){return t?"\n":("160"===e&&(e=32),String.fromCharCode(e))})));var t},B=/\$\{\s*(.+?)\s*\}/g,J=function(n,e){return A||(A=function(){var n=!0;try{new Function("``")}catch(e){n=!1}return n?function(n,e){return new Function("__scope__","\n                    var __result__;\n                    try{\n                        with(__scope__){\n                            __result__=`".concat(n,'`\n                        }\n                    }\n                    catch(e){\n                        __result__="";\n                    }\n                    return __result__;\n                    '))(e)}:function(n,e){var t=!0,r=n.split(B).map((function(n){return(t=!t)?n:"'".concat(n.replace("'","\\'"),"'")})).join("+");return new Function("__scope__","\n            var __result__;\n            with(__scope__){ \n                __result__=".concat(r,";\n            }\n            return __result__;\n         "))(e)}}()),A(n,e)},K={year:"FullYear",month:"Month",day:"Date",hour:"Hours",min:"Minutes",sec:"Seconds"},V=/y+|M+|d+|H+|h+|m+|s+|S+|a|(\[.*?])/g,q=function(n,e){if(void 0===e&&(e="yyyy-MM-dd hh:mm:ss"),"[object Date]"!==r(n))return"";var t,o,i=n.getHours(),u=i>12?"pm":"am",a={y:n.getFullYear(),M:n.getMonth()+1,d:n.getDate(),H:i,h:i>12?i-12:i,m:n.getMinutes(),s:n.getSeconds(),S:n.getMilliseconds(),a:u};return e.replace(V,(function(n){return"["===(o=n.charAt(0))?n.slice(1,-1):"a"===o?a[o]:(t=z(a[o],n.length,"0"),"y"===o&&(t=t.slice(-n.length,t.length)),t)}))},G=function(n,e){e||(e="yyyy-MM-dd hh:mm:ss");var t,r,o={y:void 0,M:void 0,d:1,H:void 0,h:void 0,m:0,s:0,S:0,a:"am"},i=e.replace(V,(function(n){var e,t=n[0],r=n.length;if("y"===t)e=r<4?"\\d{".concat(r,"}"):"\\d{4}";else if("M"===t||"d"===t||"H"===t||"h"===t||"m"===t||"s"===t)e=1===r?"[1-9]\\d|\\d":"\\d{2}";else if("S"===t)e=r<3?"\\d{".concat(r,"}"):"\\d{3}";else if("a"===t)e="(am|Am|AM|pm|Pm|PM)?";else if("["===t)return n.slice(1,-1);return"(".concat(e,")")})),u=new RegExp(i,"g").exec(n),a=1;if(!u)throw new Error('The date format "'.concat(e,'" match the date string "').concat(n,'" failed.'));for(;t=V.exec(e);)"["!==(r=t[0].charAt(0))&&(o[r]="a"===r?u[a++]:~~u[a++]);var c,f=(new Date).getFullYear();return void 0===o.y?o.y=f:(c=o.y+"").length<4&&(c=(f+"").slice(0,4-c.length)+c,o.y=~~c),void 0===o.M?o.M=0:o.M-=1,o.h||(o.a="am",o.h=o.H||0),o.a=o.a.toLowerCase(),"pm"===o.a&&(o.h+=12),new Date(o.y,o.M,o.d,o.h,o.m,o.s,o.S)},Q=function(n,e){var t=K;"number"==typeof e&&(e={day:e}),n=new Date(n);var r="";return d(t,(function(o,i){e[i]&&n["set"+(r=t[i])](n["get"+r]()+~~e[i])})),n},X=function(n){return(n=new Date(n)).setDate(1),n},nn=function(n){return(n=new Date(n)).setMonth(n.getMonth()+1),n.setDate(0),n},en=function(n){var e=X(n),t=e.getDay();return 0===t&&(t=7),Q(e,1-t)},tn=function(n){var e=nn(n),t=e.getDay();return 0!==t&&(e=Q(e,7-t)),e},rn=function(n,e,t){var r,o=[];if(!n||!e)return o;n>e&&(r=e,e=n,n=r),"number"!=typeof t&&(t=1);for(var i,u=1,a=new Date(n);a<e;)1===u&&a.getDay()===t?(+a!=+n&&o.push({end:new Date(a.getTime()-864e5)}),o.push({start:new Date(a)}),u=7):7===u&&(o[i=o.length-1].end=new Date(a.getTime()-864e5),o[i].duration=7,o.push({start:new Date(a)})),a.setDate(a.getDate()+u);for(var c=[0,1,2,3,4,5,6],f=0;f<t;f++)c[f]+=7;var s=o.length;return 0===s?o=[{start:n,end:e,duration:c[e.getDay()]-c[n.getDay()]+1}]:(o[0].start||(o[0].start=n,o[0].duration=c[o[0].end.getDay()]-c[n.getDay()]+1),o[i=s-1].end=e,o[i].duration=c[o[i].end.getDay()]-c[o[i].start.getDay()]+1),o},on=function(n,e){n=new Date(n.getFullYear(),n.getMonth(),n.getDate());var t,r,o,i,u=((e=new Date(e.getFullYear(),e.getMonth(),e.getDate()))-n)/864e5+1;return t=2*Math.floor(u/7),(r=u%7)&&(i=(o=n.getDay())+r-1,0===o?t++:o<=6&&i>=6&&(t+=Math.min(i-Math.max(o,6)+1,2))),t},un=/Android/i,an=/MicroMessenger/,cn=/iphone|ipad|ipod|ios/i,fn=function(n){return un.test(n||e())},sn=function(n){return cn.test(n||e())},ln=function(n){return an.test(n||e())},vn=function(){var n=t();return"Win32"===n||"Windows"===n||"Win16"===n||"Win64"===n||"WinCE"===n},dn=function(){var n=t();return"MacIntel"===n||"Macintosh"===n||"MacPPC"===n||"Mac68K"===n},pn=function(){if(n()){var e=navigator,t=e.connection||e.mozConnection||e.webkitConnection;return t?"cellular"!==t.type:ln()?/NetType\/WIFI/.test(navigator.userAgent):void 0}},hn=/(?:Chrome|CriOS)\/(\d+)/,mn=/(?:Firefox|FxiOS)\/(\d+)/,yn=/Version\/([\d.]+)( Mobile\/.+?)? Safari\/\d+/,gn=/(?:MSIE |Trident\/.*; rv:)(\d+)/,_n=/(?:Edge|Edg|EdgiOS|EdgA)\/(\d+)/;function wn(n,t){var r=n.exec(t||e());return r&&r[1]}var Mn=function(n){return wn(gn,n)},bn=function(n){return wn(_n,n)},Dn=function(n){return wn(hn,n)},xn=function(n){return wn(mn,n)},En=function(n){return wn(hn,n)||wn(_n,n)?null:wn(yn,n)},jn=/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i,An=function(n){return jn.test(n)},Tn=function(n){return n&&"object"==typeof n&&isFinite(n.length)&&n.length>=0&&n.length===Math.floor(n.length)&&n.length<4294967296&&!n.nodeType};function Sn(n){var e={},t=!1;return o(n)?n.forEach((function(n){return e[n]=!0})):t=n,{map:e,isAll:t}}function Cn(n,e){try{return decodeURIComponent(n)}catch(n){throw n.message="URI malformed (malformed key: ".concat(e,")"),n}}var Fn=/(?:^|&)(.*?)=(.*?)(?=&|$)/g,On=/(\?([^#]*))?(#.*)?\s*$/,kn=/(?:[?&])(.*?)(?:=(.*?))?(?=&|$|#)/g,Pn=function(n,e){if(void 0===e&&(e=!1),null==n||"object"!=typeof n)return n?n+"":"";var t,r=[],o=encodeURIComponent,i=Sn(e),u=i.map,a=i.isAll;for(var c in n)null==(t=n[c])?t="":"object"==typeof t&&(t=JSON.stringify(t)),t=a||u[c]?t:o(t),r.push(o(c)+"="+t);return r.join("&")},In=Pn,Hn=function(n,e){void 0===e&&(e=!1);var t,r,o={},i=Cn,u=Sn(e),a=u.map,c=u.isAll;for(Fn.lastIndex=0;t=Fn.exec(n);)o[r=t[1]]=c||a[r]?t[2]:i(t[2],r);return o},$n=function(n,e,t){e=c(Wn(n),e);var r=In(e,t);return n.replace(On,"?"+r+"$3")},Wn=function(e,t){void 0===t&&(t=!1);var r,o,i,u={},a=Sn(t),c=Cn;for(kn.lastIndex=0;r=kn.exec(e||n()&&location.search||"");)o=r[1],i=r[2],o&&(i||(i=""),u[c(o,o)]=a.isAll||a.map[o]?i:c(i,o));return u},Un=function(){},Yn=function(e,t){if(!n())throw new Error("Method `download` can only be invoked in browser environment.");var r=document.createElement("a");r.download=t,r.href=e,r.target="_blank";var o=document.createEvent("MouseEvents");o.initEvent("click",!1,!1),r.dispatchEvent(o)},Rn=function(e){if(!n())throw new Error("Method `copyTxt` can only be invoked in browser environment.");try{if(!Ln(e))return!1}catch(n){return!1}return!0},Ln=function(n){var e=function(){var n="inner_copy_fake_ele",e=document.getElementById(n);return e||((e=document.createElement("textarea")).style.position="absolute",e.style.left="-999px",e.style.top="0px",e.setAttribute("readonly",""),e.id=n,document.body.appendChild(e),e)}();return e.value=n,e.select(),document.execCommand("copy")},zn=function(n,e){if(!n)return{};var t=[];if(u(e))t=Object.keys(n).filter(e);else{if(!Array.isArray(e))return{};t=e}return t.reduce((function(e,t){return t in n&&(e[t]=n[t]),e}),{})};export{D as cache,R as camelCase,M as clearLoop,O as cookie,Rn as copyTxt,Y as countStr,Q as dateAdd,q as dateFormat,G as dateParse,j as debounce,s as defer,F as deleteCookie,Yn as download,d as each,h as find,X as firstDateInMonth,en as firstWeekInMonth,S as getCookie,Wn as getQuery,Z as htmlDecode,N as htmlEncode,fn as isAndroid,Tn as isArrayLike,Dn as isChrome,bn as isEdge,xn as isFirefox,Mn as isIE,sn as isIos,dn as isMac,En as isSafari,An as isUrl,ln as isWeiXin,pn as isWifi,vn as isWindows,L as kebabCase,nn as lastDateInMonth,tn as lastWeekInMonth,w as loop,p as map,Un as noop,z as paddingLeft,Pn as param,T as parseCookie,Hn as parseParam,zn as pick,v as promisify,$n as resolveUrl,x as retry,C as setCookie,J as template,E as throttle,y as tick,b as timeout,m as unique,rn as weekRange,on as weekendsCount};
