/*! https://github.com/w-wl/ */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.utils=t():e.utils=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=window&&void 0===window,u=o?navigator.userAgent:"",i=/Android/i.test(u),a=/MicroMessenger/.test(u),c=/iphone|ipad|ipod|ios/i.test(u),f=/^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,d=/(\?([^#]*))?(#.*)?\s*$/,s=/[\u0020-\u007f|\uff61-\uff9f]/g,l=/\n/g,F=/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,p=/&#(\d+);|(<br\s*\/\s*>)/g,h=/-([a-zA-Z])/g,v=/(?:[?&])(.*?)=(.*?)(?=&|$|#)/g,y=/y+|M+|d+|h+|m+|s+|S+/g,g=/Chrome\/(\d+)/,D=/Firefox\/(\d+)/,m=/Safari\/(\d+)/,b=/MSIE (\d+)/,x=/Trident\/.*; rv:(\d+)/,A=/(Edge\/\d+)/,C=function(e,t){var n=e.exec(t||u);return n&&n[1]},M=Function.prototype.call,E=(M.bind(Array.prototype.slice),M.bind(Object.prototype.toString)),w=Array.isArray||function(e){return"[object Array]"===E(e)},j=function(e){return"[object Function]"===E(e)},S=function(e){return"boolean"==typeof e},k=function(e){return"number"==typeof e},z=function(e){return"[object Date]"===E(e)},T=Object.assign||function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.forEach(function(t,n){e[n]=t}),e},I=function(e,t){if(e.fill)return e.fill(t);for(var n=e.length-1;n>-1;n--)e[n]=t;return e},_=function(e,t){var n;return function(r){!t&&(t=this);for(var o=arguments.length,u=Array(o>1?o-1:0),i=1;i<o;i++)u[i-1]=arguments[i];return n=e.apply(t,u)}},$=function(){var e=function(){var e="inner_copy_fake_ele",t=document.getElementById(e);return t||(t=document.createElement("textarea"),t.style.position="absolute",t.style.left="-999px",t.style.top="0px",t.setAttribute("readonly",""),t.id=e,document.body.appendChild(t),t)};return function(t){var n=e();return n.value=t,n.select(),document.execCommand("copy")}}(),O={},W={guid:function(e){return e+0},noop:function(){},isAndroid:function(){return i},isIos:function(){return c},isWeiXin:function(){return a},isWifi:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e?"cellular"!==e.type:W.isWeiXin()?/NetType\/WIFI/.test(navigator.userAgent):void 0},isUrl:function(e){return f.test(e)},isIE:function(e){return C(b,e)||C(x,e)||C(A,e)},isChrome:function(e){return C(g,e)},isFirefox:function(e){return C(D,e)},isSafari:function(e){return C(g,e)||C(A,e)?null:C(m,e)},defer:function(){var e={};return e.promise=new Promise(function(t,n){e.resolve=t,e.reject=n}),e},each:function(e,t,n){if(w(e))return e.forEach(t,n);Object.keys(e).forEach(function(r){t.call(n,e[r],r,e)})},map:function(e,t,n){if(w(e))return e.map(t,n);var r=[];return W.each(e,function(o,u){r.push(t.call(n,o,u,e))}),r},cache:_,loop:function(e,t,n){var r=W.guid("loop"),o=function(){return Promise.resolve(e())},u=function(){O[r]=setTimeout(i,t)},i=function(){o().then(u)};return n?i():u(),r},clearLoop:function(e){var t=O[e];t&&(clearTimeout(t),O[e]=void 0)},throttle:function(e,t,n,r,o){j(t)||(o=r,r=n,n=t,t=void 0),S(n)||(o=r,r=n,n=!1);var u,i,a;return a=n?function(){e.apply(o,i),u=setTimeout(function(){u=void 0},r)}:function(){u=setTimeout(function(){e.apply(o,i),u=void 0},r)},function(){i=arguments,!o&&(o=this),t&&t.apply(o,i),u||a()}},debounce:function(e,t,n,r,o){j(t)||(o=r,r=n,n=t,t=void 0),S(n)||(o=r,r=n,n=!1);var u,i,a,c=function e(t){clearTimeout(u),u=e(t,r)};return a=n?function(){u||e.apply(o,i),c(function(){u=void 0})}:function(){c(function(){e.apply(o,i),u=void 0})},function(){i=arguments,!o&&(o=this),a(),t&&t.apply(o,i)}},download:function(e,t){var n=document.createElement("a");n.download=t,n.href=e,n.target="_blank";var r=document.createEvent("MouseEvents");r.initEvent("click",!1,!1),n.dispatchEvent(r)},param:function(e,t){if(null==e||"object"!==(void 0===e?"undefined":r(e)))return e||"";var n,o=[],u=encodeURIComponent,i={},a=!1;w(t)?t.forEach(function(e){i[e]=!0}):a=t;for(var c in e)n=e[c],null==n?n="":"object"===(void 0===n?"undefined":r(n))&&(n=JSON.stringify(n)),n=a||i[c]?n:u(n),o.push(u(c)+"="+n);return o.join("&")},resolveUrl:function(e,t,n){return t=W.param(t,n),e.replace(d,"?$2&"+t+"$3").replace("?&","?")},getQuery:_(function(e){for(var t,n={};t=v.exec(e||o&&location.search||"");)n[t[1]]=t[2];return n}),countStr:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if(!e)return 0;e+="",t=+t,n=+n,r=+r;var o=e.match(s),u=e.match(l),i=o?o.length:0,a=u?u.length:0;return t*(e.length-i-a)+n*i+r*a},copyTxt:function(e){try{if(!$(e))return!1}catch(e){return!1}return!0},htmlEncode:function(e){"string"!=typeof e&&(e+="");var t;return e.replace(F,function(e){return t=e.charCodeAt(0),32===t&&(t=160),10===t?"<br/>":"&#"+t+";"})},htmlDecode:function(e){if(null==e||""===e)return"";var t=document.createElement("div");t.innerHTML=e;var n=t.innerText;return t=null,n},camelCase:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.join("-").replace(h,function(e,t){return t.toUpperCase()})},paddingLeft:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments[1],o=arguments[2];return n+="",r=~~r,t=(n+"").length,r<=t?n:(o=o&&o.charAt(0)||" ",e=I(new Array(r-t),o),e.push(n),e.join(""))}},P={year:"FullYear",month:"Month",day:"Date",hour:"Hours",min:"Minutes",sec:"Seconds"},U={dateFormat:function(e,t){if(!z(e))return"";t||(t="yyyy-MM-dd hh:mm:ss");var n,r,o={y:e.getFullYear(),M:e.getMonth()+1,d:e.getDate(),h:e.getHours(),m:e.getMinutes(),s:e.getSeconds(),S:e.getMilliseconds()},u=y;return t.replace(u,function(e){return r=e.charAt(0),n=W.paddingLeft(o[r],e.length,"0"),"y"===r&&(n=n.slice(-e.length,n.length)),n})},dateParse:function(e,t){for(var n,r=e.split(/\D+/),o=0,u=y,i={y:void 0,M:void 0,d:1,h:0,m:0,s:0,S:0};n=u.exec(t);)i[n[0].charAt(0)]=~~r[o++];var a,c=(new Date).getFullYear();return void 0===i.y?i.y=c:(a=i.y+"",a.length<4&&(a=(c+"").slice(0,4-a.length)+a,i.y=~~a)),void 0===i.M?i.M=0:i.M-=1,new Date(i.y,i.M,i.d,i.h,i.m,i.s,i.S)},dateAdd:function(e,t){var n=P;"number"==typeof t&&(t={day:t}),e=new Date(e);var r="";return W.each(n,function(o,u){t[u]&&(r=n[u],e["set"+r](e["get"+r]()+~~t[u]))}),e},firstDateInMonth:function(e){return e=new Date(e),e.setDate(1),e},lastDateInMonth:function(e){return e=new Date(e),e.setMonth(e.getMonth()+1),e.setDate(0),e},firstWeekInMonth:function(e){var t=W.firstDateInMonth(e),n=t.getDay();return 0===n&&(n=7),W.dateAdd(t,1-n)},lastWeekInMonth:function(e){var t=W.lastDateInMonth(e),n=t.getDay();return 0!==n&&(t=W.dateAdd(t,7-n)),t},weekRange:function(e,t,n){var r=[];if(!e||!t)return r;var o;e>t&&(o=t,t=e,e=o),"number"!=typeof n&&(n=1);for(var u,i=1,a=new Date(e);a<t;)1===i&&a.getDay()===n?(+a!=+e&&r.push({end:new Date(a.getTime()-864e5)}),r.push({start:new Date(a)}),i=7):7===i&&(u=r.length-1,r[u].end=new Date(a.getTime()-864e5),r[u].duration=7,r.push({start:new Date(a)})),a.setDate(a.getDate()+i);for(var c=[0,1,2,3,4,5,6],f=0;f<n;f++)c[f]+=7;var d=r.length;return 0===d?r=[{start:e,end:t,duration:c[t.getDay()]-c[e.getDay()]+1}]:(r[0].start||(r[0].start=e,r[0].duration=c[r[0].end.getDay()]-c[e.getDay()]+1),u=d-1,r[u].end=t,r[u].duration=c[r[u].end.getDay()]-c[r[u].start.getDay()]+1),r},weekendsCount:function(e,t){e=new Date(e.getFullYear(),e.getMonth(),e.getDate()),t=new Date(t.getFullYear(),t.getMonth(),t.getDate());var n,r,o,u,i=(t-e)/864e5+1;return n=2*Math.floor(i/7),r=i%7,r&&(o=e.getDay(),u=o+r-1,0===o?n++:o<=6&&u>=6&&(n+=Math.min(u-Math.max(o,6)+1,2))),n}},Y=_(function(){for(var e,t,n={},r=/(?:;\s|^)([^;]*?)=([^;]*)/g,o=/([^&]+)=([^&]+)(?:&|$)/g,u=document.cookie;e=r.exec(u);)for(n[e[1]]={value:unescape(e[2]),values:null};t=o.exec(e[2]);)n[e[1]].values=n[e[1]].values||{},n[e[1]].values[t[1]]=unescape(t[2]);return n}),L=function(e,t,n){var o,u,i,a,c="";if(e){if(e+="",null==t&&(t=""),"object"===(void 0===t?"undefined":r(t))){for(u in t)c+=u+"="+escape(t[u])+"&";c=c.slice(0,-1)}else c+=escape(t);return n=n||{},n.expires&&"[object Date]"!==E(n.expires)&&(a=n.expires,i=new Date,i.setTime(i.valueOf()+(k(a.day)?86400*a.day:0)+(k(a.hour)?3600*a.hour:0)+(k(a.min)?60*a.min:0)+(k(a.sec)?a.sec:0)),n.expires=i),o=e+"="+c+(n.expires?";expires="+n.expires.toUTCString():"")+(n.path?"; path="+n.path:"")+(n.domain?"; domain="+n.domain:"")+(n.secure?"; secure":""),document.cookie=o,Y(!0)[e]}},H=function(e,t){return L(e,"",this.extend(t,{expires:{day:-30}})),!(e in Y(!0))};T(W,{getCookie:Y,setCookie:L,deleteCookie:H,cookie:{delete:H,set:L,get:function(e,t){var n=Y(t)[e];return n&&n.value}}},U),o||(["isWifi","download","copyTxt","getCookie","setCookie","deleteCookie"].forEach(function(e){W[e]=W.noop}),W.htmlDecode=function(e){return e+="",e.replace(p,function(e,t,n){return n?"\n":("160"===t&&(t=32),String.fromCharCode(t))})}),e.exports=W}])});