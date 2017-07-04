/*! https://github.com/w-wl/ */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.utils=t():e.utils=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var u=n[r]={i:r,l:!1,exports:{}};return e[r].call(u.exports,u,u.exports,t),u.l=!0,u.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u=window.navigator.userAgent,o=/Android/i.test(u),i=/MicroMessenger/.test(u),a=/iphone|ipad|ipod|ios/i.test(u),c=/^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,f=/(\?([^#]*))?(#.*)?\s*$/,d=/[\u0020-\u007f|\uff61-\uff9f]/g,F=/\n/g,s=/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,l=/-([a-zA-Z])/g,p=/(?:[?&])(.*?)=(.*?)(?=&|$|#)/g,v=/y+|M+|d+|h+|m+|s+|S+/g,y=/Chrome\/(\d+)/,h=/Firefox\/(\d+)/,g=/Safari\/(\d+)/,D=/MSIE (\d+)/,m=/Trident\/.*; rv:(\d+)/,b=/(Edge\/\d+)/,x=function(e,t){var n=e.exec(t||u);return n&&n[1]},A=Function.prototype.call,M=(A.bind(Array.prototype.slice),document.documentElement,A.bind(Object.prototype.toString)),E=Array.isArray||function(e){return"[object Array]"===M(e)},C=function(e){return"[object Function]"===M(e)},w=function(e){return"boolean"==typeof e},j=function(e){return"number"==typeof e},S=function(e){return"[object Date]"===M(e)},k=Object.assign||function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.forEach(function(t,n){e[n]=t}),e},z=function(e,t){if(e.fill)return e.fill(t);for(var n=e.length-1;n>-1;n--)e[n]=t;return e},T=function(e,t){var n;return function(r){!t&&(t=this);for(var u=arguments.length,o=Array(u>1?u-1:0),i=1;i<u;i++)o[i-1]=arguments[i];return n=e.apply(t,o)}},I=function(){var e=function(){var e="inner_copy_fake_ele",t=document.getElementById(e);return t||(t=document.createElement("textarea"),t.style.position="absolute",t.style.left="-999px",t.style.top="0px",t.setAttribute("readonly",""),t.id=e,document.body.appendChild(t),t)};return function(t){var n=e();return n.value=t,n.select(),document.execCommand("copy")}}(),_={},$={guid:function(e){return e+0},noop:function(){},isAndroid:function(){return o},isIos:function(){return a},isWeiXin:function(){return i},isWifi:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e?"cellular"!==e.type:$.isWeiXin()?/NetType\/WIFI/.test(navigator.userAgent):void 0},isUrl:function(e){return c.test(e)},isIE:function(e){return x(D,e)||x(m,e)||x(b,e)},isChrome:function(e){return x(y,e)},isFirefox:function(e){return x(h,e)},isSafari:function(e){return x(y,e)||x(b,e)?null:x(g,e)},defer:function(){var e={};return e.promise=new Promise(function(t,n){e.resolve=t,e.reject=n}),e},each:function(e,t,n){if(E(e))return e.forEach(t,n);Object.keys(e).forEach(function(r){t.call(n,e[r],r,e)})},map:function(e,t,n){if(E(e))return e.map(t,n);var r=[];return $.each(e,function(u,o){r.push(t.call(n,u,o,e))}),r},cache:T,loop:function(e,t,n){var r=$.guid("loop"),u=function(){return Promise.resolve(e())},o=function(){_[r]=setTimeout(i,t)},i=function(){u().then(o)};return n?i():o(),r},clearLoop:function(e){var t=_[e];t&&(clearTimeout(t),_[e]=void 0)},throttle:function(e,t,n,r,u){C(t)||(u=r,r=n,n=t,t=void 0),w(n)||(u=r,r=n,n=!1);var o,i,a;return a=n?function(){e.apply(u,i),o=setTimeout(function(){o=void 0},r)}:function(){o=setTimeout(function(){e.apply(u,i),o=void 0},r)},function(){i=arguments,!u&&(u=this),t&&t.apply(u,i),o||a()}},debounce:function(e,t,n,r,u){C(t)||(u=r,r=n,n=t,t=void 0),w(n)||(u=r,r=n,n=!1);var o,i,a,c=function e(t){clearTimeout(o),o=e(t,r)};return a=n?function(){o||e.apply(u,i),c(function(){o=void 0})}:function(){c(function(){e.apply(u,i),o=void 0})},function(){i=arguments,!u&&(u=this),a(),t&&t.apply(u,i)}},download:function(e,t){var n=document.createElement("a");n.download=t,n.href=e,n.target="_blank";var r=document.createEvent("MouseEvents");r.initEvent("click",!1,!1),n.dispatchEvent(r)},param:function(e,t){if(null==e||"object"!==(void 0===e?"undefined":r(e)))return e||"";var n,u=[],o=encodeURIComponent,i={},a=!1;E(t)?t.forEach(function(e){i[e]=!0}):a=t;for(var c in e)n=e[c],null==n?n="":"object"===(void 0===n?"undefined":r(n))&&(n=JSON.stringify(n)),n=a||i[c]?n:o(n),u.push(o(c)+"="+n);return u.join("&")},resolveUrl:function(e,t,n){return t=$.param(t,n),e.replace(f,"?$2&"+t+"$3").replace("?&","?")},getQuery:T(function(e){for(var t,n={};t=p.exec(e||location.search);)n[t[1]]=t[2];return n}),countStr:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if(!e)return 0;e+="",t=+t,n=+n,r=+r;var u=e.match(d),o=e.match(F),i=u?u.length:0,a=o?o.length:0;return t*(e.length-i-a)+n*i+r*a},copyTxt:function(e){try{if(!I(e))return!1}catch(e){return!1}return!0},htmlEncode:function(e){"string"!=typeof e&&(e+="");var t;return e.replace(s,function(e){return t=e.charCodeAt(0),32===t&&(t=160),10===t?"<br/>":"&#"+t+";"})},htmlDecode:function(e){if(null==e||""===e)return"";var t=document.createElement("div");t.innerHTML=e;var n=t.innerText;return t=null,n},camelCase:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.join("-").replace(l,function(e,t){return t.toUpperCase()})},paddingLeft:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments[1],u=arguments[2];return n+="",r=~~r,t=(n+"").length,r<=t?n:(u=u&&u.charAt(0)||" ",e=z(new Array(r-t),u),e.push(n),e.join(""))}},O={year:"FullYear",month:"Month",day:"Date",hour:"Hours",min:"Minutes",sec:"Seconds"},W={dateFormat:function(e,t){if(!S(e))return"";t||(t="yyyy-MM-dd hh:mm:ss");var n,r,u={y:e.getFullYear(),M:e.getMonth()+1,d:e.getDate(),h:e.getHours(),m:e.getMinutes(),s:e.getSeconds(),S:e.getMilliseconds()},o=v;return t.replace(o,function(e){return r=e.charAt(0),n=$.paddingLeft(u[r],e.length,"0"),"y"===r&&(n=n.slice(-e.length,n.length)),n})},dateParse:function(e,t){for(var n,r=e.split(/\D+/),u=0,o=v,i={y:void 0,M:void 0,d:1,h:0,m:0,s:0,S:0};n=o.exec(t);)i[n[0].charAt(0)]=~~r[u++];var a,c=(new Date).getFullYear();return void 0===i.y?i.y=c:(a=i.y+"",a.length<4&&(a=(c+"").slice(0,4-a.length)+a,i.y=~~a)),void 0===i.M?i.M=0:i.M-=1,new Date(i.y,i.M,i.d,i.h,i.m,i.s,i.S)},dateAdd:function(e,t){var n=O;"number"==typeof t&&(t={day:t}),e=new Date(e);var r="";return $.each(n,function(u,o){t[o]&&(r=n[o],e["set"+r](e["get"+r]()+~~t[o]))}),e},firstDateInMonth:function(e){return e=new Date(e),e.setDate(1),e},lastDateInMonth:function(e){return e=new Date(e),e.setMonth(e.getMonth()+1),e.setDate(0),e},firstWeekInMonth:function(e){var t=$.firstDateInMonth(e),n=t.getDay();return 0===n&&(n=7),$.dateAdd(t,1-n)},lastWeekInMonth:function(e){var t=$.lastDateInMonth(e),n=t.getDay();return 0!==n&&(t=$.dateAdd(t,7-n)),t},weekRange:function(e,t,n){var r=[];if(!e||!t)return r;var u;e>t&&(u=t,t=e,e=u),"number"!=typeof n&&(n=1);for(var o,i=1,a=new Date(e);a<t;)1===i&&a.getDay()===n?(+a!=+e&&r.push({end:new Date(a.getTime()-864e5)}),r.push({start:new Date(a)}),i=7):7===i&&(o=r.length-1,r[o].end=new Date(a.getTime()-864e5),r[o].duration=7,r.push({start:new Date(a)})),a.setDate(a.getDate()+i);for(var c=[0,1,2,3,4,5,6],f=0;f<n;f++)c[f]+=7;var d=r.length;return 0===d?r=[{start:e,end:t,duration:c[t.getDay()]-c[e.getDay()]+1}]:(r[0].start||(r[0].start=e,r[0].duration=c[r[0].end.getDay()]-c[e.getDay()]+1),o=d-1,r[o].end=t,r[o].duration=c[r[o].end.getDay()]-c[r[o].start.getDay()]+1),r},weekendsCount:function(e,t){e=new Date(e.getFullYear(),e.getMonth(),e.getDate()),t=new Date(t.getFullYear(),t.getMonth(),t.getDate());var n,r,u,o,i=(t-e)/864e5+1;return n=2*Math.floor(i/7),r=i%7,r&&(u=e.getDay(),o=u+r-1,0===u?n++:u<=6&&o>=6&&(n+=Math.min(o-Math.max(u,6)+1,2))),n}},P=T(function(){for(var e,t,n={},r=/(?:;\s|^)([^;]*?)=([^;]*)/g,u=/([^&]+)=([^&]+)(?:&|$)/g,o=document.cookie;e=r.exec(o);)for(n[e[1]]={value:unescape(e[2]),values:null};t=u.exec(e[2]);)n[e[1]].values=n[e[1]].values||{},n[e[1]].values[t[1]]=unescape(t[2]);return n}),U=function(e,t,n){var u,o,i,a,c="";if(e){if(e+="",null==t&&(t=""),"object"===(void 0===t?"undefined":r(t))){for(o in t)c+=o+"="+escape(t[o])+"&";c=c.slice(0,-1)}else c+=escape(t);return n=n||{},n.expires&&"[object Date]"!==M(n.expires)&&(a=n.expires,i=new Date,i.setTime(i.valueOf()+(j(a.day)?86400*a.day:0)+(j(a.hour)?3600*a.hour:0)+(j(a.min)?60*a.min:0)+(j(a.sec)?a.sec:0)),n.expires=i),u=e+"="+c+(n.expires?";expires="+n.expires.toUTCString():"")+(n.path?"; path="+n.path:"")+(n.domain?"; domain="+n.domain:"")+(n.secure?"; secure":""),document.cookie=u,P(!0)[e]}},Y=function(e,t){return U(e,"",this.extend(t,{expires:{day:-30}})),!(e in P(!0))};k($,{getCookie:P,setCookie:U,deleteCookie:Y,cookie:{delete:Y,set:U,get:function(e,t){var n=P(t)[e];return n&&n.value}}},W),e.exports=$}])});