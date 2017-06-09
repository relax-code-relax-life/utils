(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["utils"] = factory();
	else
		root["utils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Created by wangweilin on 2017/6/9.
 */

var userAgent = window.navigator.userAgent;
var isAndroid = /Android/i.test(userAgent);
var isWeiXin = /MicroMessenger/.test(userAgent);
var isIos = /iphone|ipad|ipod|ios/i.test(userAgent);

var reg = {
    isUrl: /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
    resolveUrl: /(\?([^#]*))?(#.*)?\s*$/,
    singleChar: /[\u0020-\u007f|\uff61-\uff9f]/g,
    enterChar: /\n/g,
    htmlEncode: /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,
    camelCase: /-([a-zA-Z])/g
};

//signature: obj,start,end
var call = Function.prototype.call;
var slice = call.bind(Array.prototype.slice);
var docEle = document.documentElement;
var toString = call.bind(Object.prototype.toString);

var copyTxt = (function () {
    var getFakeEle = function () {
        var id = 'inner_copy_fake_ele';

        var ele = document.getElementById(id);
        if (ele) {
            return ele;
        }

        ele = document.createElement('textarea');
        ele.style.position = "absolute";
        ele.style.left = '-999px';
        ele.style.top = '0px';
        ele.setAttribute('readonly', '');
        ele.id = id;
        document.body.appendChild(ele);
        return ele;
    };
    return function (txt) {
        var ele = getFakeEle();
        ele.value = txt;
        ele.select();
        return document.execCommand('copy');
    }
})();

var guidCnt = 0;
var loopIds = {};

var utils = {
    guid(preFix){
        return preFix + guidCnt
    },
    noop(){
    },
    isAndroid(){
        return isAndroid;
    },
    isIos(){
        return isIos
    },
    isWeiXin(){
        return isWeiXin
    },
    //返回bool，则正确检测到联网类型。返回undefined，则代表未检测到。
    isWifi(){
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            // return connection.type === 'wifi';
            return connection.type !== 'cellular'; //认为不为蜂窝网，则即为wifi
        }
        else if (utils.isWeiXin()) {
            return /NetType\/WIFI/.test(navigator.userAgent);
        }
        else return undefined;
    },
    isUrl(str){
        return reg.isUrl.test(str);
    },
    defer(){
        var defer = {};
        defer.promise = new Promise(function (resolve, reject) {
            defer.resolve = resolve;
            defer.reject = reject;
        });
        return defer;
    },
    each(obj, fn, context){
        if (Array.isArray(obj)) return obj.forEach(fn, context);

        //只遍历自有可枚举属性
        Object.keys(obj).forEach(key => {
            fn.call(context, obj[key], key, obj);
        })
    },
    map(obj, fn, context){
        if (Array.isArray(obj)) return obj.map(fn, context);

        var result = [];
        utils.each(obj, (val, key) => {
            result.push(fn.call(context, val, key, obj));
        });
        return result;
    },
    loop(fn, tick, immediate){
        var key = utils.guid('loop');

        var promiseFn = function () {
            return Promise.resolve(fn());
        };

        var delayExec = function () {
            loopIds[key] = setTimeout(wrap, tick);
        };

        var wrap = function () {
            promiseFn().then(delayExec);
        };

        if (immediate) wrap();
        else delayExec();

        return key;
    },
    clearLoop(key){
        var timeoutId = loopIds[key];
        if (timeoutId) {
            clearTimeout(timeoutId);
            loopIds[key] = undefined;
        }
    },

    debounce(fn, alwaysFn, immediately, wait, context){//optional:alwaysFn,immediately,context

        if (typeof alwaysFn !== 'function') {
            context = wait;
            wait = immediately;
            immediately = alwaysFn;
            alwaysFn = undefined;
        }
        if (typeof immediately !== 'boolean') {
            context = wait;
            wait = immediately;
            immediately = false;
        }

        var timeoutId, arg;

        var execFn;
        if (immediately) {

            var setImmediateTimeoutId = function () {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    timeoutId = undefined
                }, wait);
            };

            execFn = function () {
                if (!timeoutId) fn.apply(context, arg);
                setImmediateTimeoutId();
            }
        }
        else {
            execFn = function () {
                timeoutId && clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    fn.apply(context, arg);
                    timeoutId = undefined;
                }, wait);
            }
        }

        return function () {
            arg = arguments;
            !context && (context = this);

            execFn();

            alwaysFn && alwaysFn.apply(context, arg);
        }
    },

    download(src, fileName){
        var link = document.createElement('a');
        link.download = fileName;
        link.href = src;
        link.target = '_blank';

        var event = document.createEvent('MouseEvents');
        event.initEvent('click', false, false);
        link.dispatchEvent(event);
    },

    queryStr(params){
        if (params == null) return '';
        if (typeof params !== 'object') return params + '';

        var enc = encodeURIComponent;

        return utils.map(params, function (val, key) {
            if (val == null) val = '';
            else if (typeof val === 'object') val = JSON.stringify(val);
            return enc(key) + '=' + enc(val);
        }).join('&')

    },
    resolveUrl(url, param){
        param = utils.queryStr(param);
        return url.replace(reg.resolveUrl, '?$2&' + param + '$3').replace('?&', '?')
    },

    /**
     * 计算字符长度。该方法区分全角字符和半角字符。
     * @param txt {String}
     * @param [fullVal] {Number} 可选的，全角字符的权重值，默认为1
     * @param [halfVal] {Number} 可选的，半角字符的权重值，默认为0.5
     * @param [enterVal] {Number} 可选的, 回车字符的权重值,默认为1
     * @return {Number} 返回字符权重值
     */
    countStr: function (txt, fullVal = 1, halfVal = 0.5, enterVal = 1) {
        if (!txt) return 0;
        txt = txt + '';
        fullVal = +fullVal;
        halfVal = +halfVal;
        enterVal = +enterVal;

        var match = txt.match(reg.singleChar);
        var matchEnter = txt.match(reg.enterChar);

        var lenSingle = match ? match.length : 0;
        var lenEnter = matchEnter ? matchEnter.length : 0;
        var lenDouble = txt.length - lenSingle - lenEnter;

        return fullVal * lenDouble + halfVal * lenSingle + enterVal * lenEnter;

    },

    /**
     * 复制文本
     * @param txt
     * @returns {boolean} 复制成功返回true, 复制出错返回false
     */
    copyTxt(txt){
        try {
            if (!copyTxt(txt)) {
                return false;
            }
        }
        catch (err) {
            return false;
        }
        return true;
    },
    /**
     * 转义为html
     * @param txt
     * @returns {XML|void|*|string}
     */
    htmlEncode(txt){
        if (typeof txt !== 'string') {
            txt = txt + '';
        }
        var code;
        return txt.replace(reg, function (match) {
            code = match.charCodeAt(0);
            if (code == 32) code = 160; //32:英文空格,转换为160:  &nbsp; html中的空格
            if (code == 10) return '<br/>';  //转换\n
            return '&#' + code + ';';
        });
    },

    /**
     * camel-case转换为camelCase,
     * 或传入多个参数，合并为camelCase形式。
     * @param args
     * @returns {string}
     */
    camelCase(...args){
        return args.join('-').replace(reg.camelCase, function (match, letter) {
            return letter.toUpperCase();
        });
    },
    /**
     *返回一个指代当前cookie的对象。兼容.NET中的多值cookie。
     *该方法内部缓存一个cookie对象，当多次调用时，只对document.cookie解析一次;
     *@method getCookie
     *@param [refresh] 默认为false,若cookie对象已缓存则直接返回。refresh等于true时，无论是否存在缓存对象，都重新解析cookie并返回。
     *@return {Object} 返回一个对象，代表当前cookie。该对象有两个属性value和values，当为单值cookie时,values为null。
     *@example
     utils.getCookie().cookieName.value;          //单值cookie，获取键为cookieName的cookie的值。
     if(utils.getCookie().multiCookie.values){    //多值cookie，获取multiCookie中key1的值。
        utils.getCookie().multiCookie.values.key1;
        }
     */
    getCookie: (function () {
        //str:用于测试的模仿cookie的值,包含多种可能的情况
        //var str = "test=cookie\'s value&one=6&two=2; 2=cookie2; empty; ; mu lti=multiValue&name1=value1&name2=values2";

        //将忽略名为空或值为空的cookie
        function _getCookie() {
            var c = {},
                reg = /(?:;\s|^)([^;]*?)=([^;]*)/g,
                subReg = /([^&]+)=([^&]+)(?:&|$)/g,
                m, subm,
                cookie = document.cookie;
            while (m = reg.exec(cookie)) { //解析cookie //key:m[1]  value:m[2]
                c[m[1]] = {value: unescape(m[2]), values: null};
                while (subm = subReg.exec(m[2])) { //存在多值cookie,忽略没有名称的子value
                    c[m[1]].values = c[m[1]].values || {};
                    c[m[1]].values[subm[1]] = unescape(subm[2]);
                }
            }
            return c;
        }

        var c;
        return function (refresh) {
            if (!c || refresh) {
                c = _getCookie();
            }
            return c;
        }

    })(),
    /**
     *设置或添加一个cookie
     *@method setCookie
     *@param key {String} cookie名称
     *@param value {String} cookie的值。如果传入对象，则设置为多值cookie。
     *@param option 设置cookie相关属性:
     option的属性：
     path:字符串，cookie路径，默认为当前路径。
     domain:字符串，cookie的域名，默认为当前域名。
     secure:布尔值，是否加密。默认为false
     expires:日期类型，cookie的过期时间。默认为session-Cookie;
     expires:也可传入一个类似{day:num,hour:num,min:num,sec:num}的对象向后递推时间。例如{expires:{day:1}}代表该cookie有效时间为1天。
     */
    setCookie(key, value, option) {
        var c, val = '', name, date, expires;

        if (!key) return;

        key = key + '';
        if (value == null) value = '';

        if (typeof value === 'object') {//如果传入对象，视为多值cookie
            for (name in value) {
                val += name + '=' + escape(value[name]) + '&';
            }
            val = val.slice(0, -1);  //去除最后一个&
        }
        else {
            val += escape(value);
        }

        option = option || {};

        //如果options.expires不是时间，则按照{day:num,hour:num,min:num,sec:num}向后递推时间。
        if (option.expires && toString(option.expires) !== '[object Date]') {
            expires = option.expires;
            date = new Date();
            date.setTime(date.valueOf() +
                ( (typeof expires.day === 'number') ? expires.day * 86400 : 0) +
                ( (typeof expires.hour === 'number') ? expires.hour * 3600 : 0) +
                ( (typeof expires.min === 'number') ? expires.min * 60 : 0) +
                ( (typeof expires.sec === 'number') ? expires.sec : 0));
            option.expires = date;
        }


        c = key + '=' + val +
            (option.expires ? ';expires=' + option.expires.toUTCString() : '') +
            (option.path ? '; path=' + option.path : '') +
            (option.domain ? '; domain=' + option.domain : '') +
            (option.secure ? '; secure' : '');

        document.cookie = c;
    },
    /**
     *删除一个cookie,并同时更新缓存cookie对象，即调用adai.getCookie(true);
     *@method deleteCookie
     *@param key {String} 要删除的cookie的名称
     *@param option {Object} 需要传入和设置cookie时相同的option,才能正确删除。
     *@return {boolean} 是否成功删除cookie,已删除则返回true,未删除false;
     */
    deleteCookie: function (key, option) {
        utils.setCookie(key, '', this.extend(option, {expires: {day: -30}}));
        return !(key in utils.getCookie(true));
    },
};


module.exports = utils;




/***/ })
/******/ ]);
});