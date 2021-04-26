(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["relaxUtils"] = factory();
	else
		root["relaxUtils"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var isBrowser = typeof window !== 'undefined' && window.document;
var userAgent = isBrowser ? navigator.userAgent : '';
var platform = isBrowser ? navigator.platform : '';
var reg_isUrl = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i, reg_resolveUrl = /(\?([^#]*))?(#.*)?\s*$/, reg_singleChar = /[\u0020-\u007f\uff61-\uff9f]/g, reg_enterChar = /\n/g, reg_htmlEncode = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g, reg_htmlDecode = /&#(\d+);|(<br\s*\/\s*>)/g, reg_htmlDecodeBrowser = /&.+?;/g, reg_camelCase = /-([a-zA-Z])/g, reg_upperCase = /[A-Z]/g, reg_query = /(?:[?&])(.*?)(?:=(.*?))?(?=&|$|#)/g, reg_dateFmt = /y+|M+|d+|H+|h+|m+|s+|S+|a|(\[.*?])/g, reg_parseParam = /(?:^|&)(.*?)=(.*?)(?=&|$)/g, reg_template = /\$\{\s*(.+?)\s*\}/g, reg_chrome = /Chrome\/(\d+)/, reg_firefox = /Firefox\/(\d+)/, reg_safari = /Version\/([\d.]+)( Mobile\/.+?)? Safari\/\d+/, reg_ie = /MSIE (\d+)/, reg_ie2 = /Trident\/.*; rv:(\d+)/, reg_ieEdge = /(Edge\/\d+)/, reg_isAndroid = /Android/i, reg_isWeiXin = /MicroMessenger/, reg_isIos = /iphone|ipad|ipod|ios/i;
function browserVersion(reg, ua) {
    var match = reg.exec(ua || userAgent);
    return match && match[1];
}
var call = Function.prototype.call;
var slice = call.bind(Array.prototype.slice);
var tostring = call.bind(Object.prototype.toString);
var isArray = Array.isArray || function (arr) {
    return tostring(arr) === '[object Array]';
};
var isFunction = function (fn) {
    return tostring(fn) === '[object Function]';
};
var isBoolean = function (val) {
    return typeof val === 'boolean';
};
var isNumber = function (val) {
    return typeof val === 'number';
};
var isDate = function (val) {
    return tostring(val) === '[object Date]';
};
var assign = Object.assign
    || function assign(tar) {
        var extend = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extend[_i - 1] = arguments[_i];
        }
        extend.forEach(function (src) {
            for (var name_1 in src) {
                tar[name_1] = src[name_1];
            }
        });
        return tar;
    };
var fill = function (arr, padding) {
    if (arr.fill)
        return arr.fill(padding);
    else {
        for (var i = arr.length - 1; i > -1; i--) {
            arr[i] = padding;
        }
        return arr;
    }
};
var cache = function (fn, context, predicate) {
    var result, isExecute;
    return function (refresh) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        !context && (context = this);
        if (!isExecute || refresh || (predicate && predicate.apply(context, args))) {
            result = fn.apply(context, args);
        }
        return result;
    };
};
var formatExcludeParam = function (val) {
    var excludeMap = {}, excludeAll = false;
    if (isArray(val)) {
        val.forEach(function (key) { return excludeMap[key] = true; });
    }
    else {
        excludeAll = val;
    }
    return {
        map: excludeMap,
        isAll: excludeAll
    };
};
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
    };
})();
function decodeSearchParam(value, key) {
    try {
        return decodeURIComponent(value);
    }
    catch (e) {
        e.message = "URI malformed (malformed key: " + key + ")";
        throw e;
    }
}
var guidCnt = 0;
var loopIds = {};
var utils = {
    guid: function (preFix) {
        if (preFix === void 0) { preFix = ''; }
        return preFix + guidCnt++;
    },
    noop: function () {
    },
    isAndroid: function (ua) {
        return reg_isAndroid.test(ua || userAgent);
    },
    isIos: function (ua) {
        return reg_isIos.test(ua || userAgent);
    },
    isWeiXin: function (ua) {
        return reg_isWeiXin.test(ua || userAgent);
    },
    isWifi: function () {
        var n = navigator;
        var connection = n.connection || n.mozConnection || n.webkitConnection;
        if (connection) {
            return connection.type !== 'cellular';
        }
        else if (utils.isWeiXin()) {
            return /NetType\/WIFI/.test(navigator.userAgent);
        }
        else
            return undefined;
    },
    isWindows: function () {
        return platform === 'Win32' || platform === 'Windows' || platform === 'Win16' || platform === 'Win64' || platform === 'WinCE';
    },
    isMac: function () {
        return platform === 'MacIntel' || platform === 'Macintosh' || platform === 'MacPPC' || platform === 'Mac68K';
    },
    isUrl: function (str) {
        return reg_isUrl.test(str);
    },
    isArrayLike: function (o) {
        return o &&
            typeof o === 'object' &&
            isFinite(o.length) &&
            o.length >= 0 &&
            o.length === Math.floor(o.length) &&
            o.length < 4294967296 &&
            !o.nodeType;
    },
    isIE: function (ua) {
        return browserVersion(reg_ie, ua) || browserVersion(reg_ie2, ua) || browserVersion(reg_ieEdge, ua);
    },
    isChrome: function (ua) {
        return browserVersion(reg_chrome, ua);
    },
    isFirefox: function (ua) {
        return browserVersion(reg_firefox, ua);
    },
    isSafari: function (ua) {
        return (browserVersion(reg_chrome, ua) || browserVersion(reg_ieEdge, ua)) ? null : browserVersion(reg_safari, ua);
    },
    defer: function () {
        var defer = {};
        defer.promise = new Promise(function (resolve, reject) {
            defer.resolve = function (arg) {
                resolve(arg);
                return defer.promise;
            };
            defer.reject = function (reason) {
                reject(reason);
                return defer.promise;
            };
        });
        return defer;
    },
    each: function (arrayOrObject, fn, context) {
        var obj = arrayOrObject;
        if (isArray(obj)) {
            return obj.forEach(fn, context);
        }
        Object.keys(obj).forEach(function (key) {
            fn.call(context, obj[key], key, obj);
        });
    },
    map: function (arrayOrObject, fn, context) {
        var obj = arrayOrObject;
        if (isArray(obj)) {
            return obj.map(fn, context);
        }
        var result = [];
        utils.each(obj, function (val, key) {
            result.push(fn.call(context, val, key, obj));
        });
        return result;
    },
    find: function (arrayOrObject, fn, context) {
        var obj = arrayOrObject;
        if (isArray(obj)) {
            return obj.find(fn, context);
        }
        var key = Object.keys(obj).find(function (key) {
            return fn.call(context, obj[key], key, obj);
        });
        return key && obj[key];
    },
    unique: function (arr, isSort, fn, context) {
        if (isSort === void 0) { isSort = false; }
        if (typeof isSort === 'function') {
            context = fn;
            fn = isSort;
            isSort = false;
        }
        if (typeof Set === 'function' && !fn) {
            return Array.from(new Set(arr));
        }
        var result = [];
        var mapArr = fn ? arr.map(fn, context) : arr;
        if (isSort) {
            var pre_1;
            mapArr.forEach(function (item, i) {
                if (pre_1 !== item) {
                    pre_1 = item;
                    result.push(arr[i]);
                }
            });
        }
        else {
            var mapResult_1 = [];
            mapArr.forEach(function (item, i) {
                if (!mapResult_1.includes(item)) {
                    mapResult_1.push(item);
                    result.push(arr[i]);
                }
            });
        }
        return result;
    },
    cache: cache,
    loop: function (fn, tick, immediate) {
        if (immediate === void 0) { immediate = false; }
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
        if (immediate)
            wrap();
        else
            delayExec();
        return key;
    },
    clearLoop: function (key) {
        var timeoutId = loopIds[key];
        if (timeoutId) {
            clearTimeout(timeoutId);
            loopIds[key] = undefined;
        }
    },
    timeout: function (wait, fn) {
        if (wait === void 0) { wait = 0; }
        var defer = utils.defer();
        var id = setTimeout(function () {
            defer.resolve(fn ? fn() : undefined);
        }, wait);
        var promise = defer.promise;
        promise.abort = function () {
            clearTimeout(id);
        };
        return promise;
    },
    throttle: throttle,
    debounce: debounce,
    download: function (src, fileName) {
        var link = document.createElement('a');
        link.download = fileName;
        link.href = src;
        link.target = '_blank';
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', false, false);
        link.dispatchEvent(event);
    },
    param: function (params, encodeEx) {
        if (encodeEx === void 0) { encodeEx = false; }
        if (params == null || typeof params !== 'object')
            return params ? params + '' : '';
        var result = [], val, enc = encodeURIComponent;
        var fmtEncodeEx = formatExcludeParam(encodeEx);
        var excludeMap = fmtEncodeEx.map, excludeAll = fmtEncodeEx.isAll;
        for (var key in params) {
            val = params[key];
            if (val == null)
                val = '';
            else if (typeof val === 'object')
                val = JSON.stringify(val);
            val = (excludeAll || excludeMap[key]) ? val : enc(val);
            result.push(enc(key) + '=' + val);
        }
        return result.join('&');
    },
    parseParam: function (paramStr, decodeEx) {
        if (decodeEx === void 0) { decodeEx = false; }
        var data = {}, match, decode = decodeSearchParam;
        var fmtDecodeEx = formatExcludeParam(decodeEx);
        var excludeMap = fmtDecodeEx.map, excludeAll = fmtDecodeEx.isAll;
        reg_parseParam.lastIndex = 0;
        var key;
        while (match = reg_parseParam.exec(paramStr)) {
            key = match[1];
            data[key] = excludeAll || excludeMap[key] ? match[2] : decode(match[2], key);
        }
        return data;
    },
    resolveUrl: function (url, param, encodeEx) {
        param = assign(utils.getQuery(url), param);
        var queryStr = utils.param(param, encodeEx);
        return url.replace(reg_resolveUrl, '?' + queryStr + '$3');
    },
    getQuery: function (url, decodeEx) {
        if (decodeEx === void 0) { decodeEx = false; }
        var q = {}, match;
        var fmtDecodeEx = formatExcludeParam(decodeEx);
        var decode = decodeSearchParam;
        reg_query.lastIndex = 0;
        var key, val;
        while (match = reg_query.exec(url || (isBrowser && location.search) || '')) {
            key = match[1];
            val = match[2];
            if (!key)
                continue;
            if (!val)
                val = '';
            q[decode(key, key)] = fmtDecodeEx.isAll || fmtDecodeEx.map[key] ? val : decode(val, key);
        }
        return q;
    },
    countStr: function (txt, fullVal, halfVal, enterVal) {
        if (fullVal === void 0) { fullVal = 1; }
        if (halfVal === void 0) { halfVal = 0.5; }
        if (enterVal === void 0) { enterVal = 1; }
        if (!txt)
            return 0;
        txt = txt + '';
        fullVal = +fullVal;
        halfVal = +halfVal;
        enterVal = +enterVal;
        var match = txt.match(reg_singleChar);
        var matchEnter = txt.match(reg_enterChar);
        var lenSingle = match ? match.length : 0;
        var lenEnter = matchEnter ? matchEnter.length : 0;
        var lenDouble = txt.length - lenSingle - lenEnter;
        return fullVal * lenDouble + halfVal * lenSingle + enterVal * lenEnter;
    },
    copyTxt: function (txt) {
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
    htmlEncode: function (txt) {
        if (typeof txt !== 'string') {
            txt = txt + '';
        }
        var code;
        return txt.replace(reg_htmlEncode, function (match) {
            code = match.charCodeAt(0);
            if (code === 32)
                code = 160;
            if (code === 10)
                return '<br/>';
            return '&#' + code + ';';
        });
    },
    htmlDecode: function (val) {
        if (val == null || val === '')
            return '';
        var match = val.match(reg_htmlDecodeBrowser);
        if (match) {
            var el = document.createElement('div');
            el.innerHTML = match.join(',');
            match = el.innerText.split(',');
            el = null;
        }
        else
            match = [];
        var index = 0;
        return val.replace(reg_htmlDecodeBrowser, function (result, pos) {
            return match[index++];
        });
    },
    camelCase: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.join('-').replace(reg_camelCase, function (match, letter) {
            return letter.toUpperCase();
        });
    },
    kebabCase: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.map(function (name) {
            return name.replace(reg_upperCase, function (match, pos) {
                return (pos === 0 ? '' : '-') + match.toLowerCase();
            });
        }).join('-');
    },
    paddingLeft: function (target, len, paddingChar) {
        if (target === void 0) { target = ''; }
        var result, targetLen;
        target += '';
        len = ~~len;
        targetLen = (target + '').length;
        if (len <= targetLen) {
            return target;
        }
        paddingChar = paddingChar && paddingChar.charAt(0) || ' ';
        result = fill(new Array(len - targetLen), paddingChar);
        result.push(target);
        return result.join('');
    },
    template: (function () {
        var supportTempStr = true;
        try {
            var fn = new Function('``');
        }
        catch (e) {
            supportTempStr = false;
        }
        if (supportTempStr) {
            return function (temp, data) {
                return (new Function('__scope__', "\n                    var __result__;\n                    try{\n                        with(__scope__){\n                            __result__=`" + temp + "`\n                        }\n                    }\n                    catch(e){\n                        __result__=\"\";\n                    }\n                    return __result__;\n                    "))(data);
            };
        }
        else {
            return function (temp, data) {
                var isExpr = true;
                var exprCode = temp.split(reg_template)
                    .map(function (splitCode) {
                    isExpr = !isExpr;
                    if (isExpr) {
                        return splitCode;
                    }
                    else {
                        return "'" + splitCode.replace("'", "\\'") + "'";
                    }
                }).join('+');
                return (new Function('__scope__', "\n            var __result__;\n            with(__scope__){ \n                __result__=" + exprCode + ";\n            }\n            return __result__;\n         "))(data);
            };
        }
    })(),
    pick: function (tar, keys) {
        if (!tar)
            return {};
        var pickKeys = [];
        if (isFunction(keys)) {
            pickKeys = Object.keys(tar).filter(keys);
        }
        else if (Array.isArray(keys)) {
            pickKeys = keys;
        }
        else
            return {};
        return pickKeys.reduce(function (result, key) {
            if (key in tar) {
                result[key] = tar[key];
            }
            return result;
        }, {});
    },
    retry: function (fn, max, wait, context) {
        if (wait === void 0) { wait = 0; }
        if (context === void 0) { context = this; }
        if (typeof max !== 'number')
            throw new TypeError('the parameter max is not a number');
        var cnt = 0;
        var exec = function () {
            cnt++;
            return Promise.resolve(fn.apply(context, arguments))
                .then(function (data) {
                cnt = 0;
                return data;
            }, function (err) {
                var _this = this;
                if (cnt < max) {
                    if (wait > 0)
                        return utils.timeout(wait, function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return exec.apply(_this, args);
                        });
                    return exec.apply(this, arguments);
                }
                else {
                    cnt = 0;
                    return Promise.reject(err);
                }
            });
        };
        return exec;
    }
};
function throttle(fn) {
    var restArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restArgs[_i - 1] = arguments[_i];
    }
    var alwaysFn = restArgs[0], immediately = restArgs[1], wait = restArgs[2], context = restArgs[3];
    if (!isFunction(alwaysFn)) {
        context = wait;
        wait = immediately;
        immediately = alwaysFn;
        alwaysFn = undefined;
    }
    if (!isBoolean(immediately)) {
        context = wait;
        wait = immediately;
        immediately = false;
    }
    if (wait == null)
        wait = 300;
    var oriContext = context;
    var timeoutId, args, execFn;
    if (immediately) {
        execFn = function () {
            fn.apply(context, args);
            timeoutId = setTimeout(function () {
                timeoutId = undefined;
            }, wait);
        };
    }
    else {
        execFn = function () {
            timeoutId = setTimeout(function () {
                fn.apply(context, args);
                timeoutId = undefined;
            }, wait);
        };
    }
    return function () {
        args = arguments;
        !oriContext && (context = this);
        alwaysFn && alwaysFn.apply(context, args);
        if (!timeoutId)
            execFn();
    };
}
function debounce(fn) {
    var restArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restArgs[_i - 1] = arguments[_i];
    }
    var alwaysFn = restArgs[0], immediately = restArgs[1], wait = restArgs[2], context = restArgs[3];
    if (!isFunction(alwaysFn)) {
        context = wait;
        wait = immediately;
        immediately = alwaysFn;
        alwaysFn = undefined;
    }
    if (!isBoolean(immediately)) {
        context = wait;
        wait = immediately;
        immediately = false;
    }
    if (wait == null)
        wait = 300;
    var oriContext = context;
    var timeoutId, arg;
    var setTimer = function (fn) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fn, wait);
    };
    var execFn;
    if (immediately) {
        execFn = function () {
            if (!timeoutId)
                fn.apply(context, arg);
            setTimer(function () {
                timeoutId = undefined;
            });
        };
    }
    else {
        execFn = function () {
            setTimer(function () {
                fn.apply(context, arg);
                timeoutId = undefined;
            });
        };
    }
    return function () {
        arg = arguments;
        !oriContext && (context = this);
        execFn();
        alwaysFn && alwaysFn.apply(context, arg);
    };
}
var customPromisifiedSymbol = '__p$symbol__';
var promisify = function (original, context) {
    if (!isFunction(original))
        throw TypeError('promisify(): argument not a function');
    function fn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var custom = original[customPromisifiedSymbol];
        if (custom) {
            if (!isFunction(custom))
                throw TypeError(original.name + "[promisify.custom] is not a function");
            return Promise.resolve(custom.apply(context || this, args));
        }
        var defer = utils.defer();
        var paddingArgsLen = original.length - 1 - args.length;
        if (paddingArgsLen > 0)
            args = args.concat(fill(new Array(paddingArgsLen), undefined));
        try {
            args.push(function (err) {
                var values = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    values[_i - 1] = arguments[_i];
                }
                if (err) {
                    defer.reject(err);
                }
                else if (values.length > 1) {
                    defer.resolve(values);
                }
                else {
                    defer.resolve(values[0]);
                }
            });
            original.apply(context || this, args);
        }
        catch (e) {
            defer.reject(e);
        }
        return defer.promise;
    }
    return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
};
promisify.custom = customPromisifiedSymbol;
var dateMethodMap = {
    year: 'FullYear',
    month: 'Month',
    day: 'Date',
    hour: 'Hours',
    min: 'Minutes',
    sec: 'Seconds'
};
var dateUtils = {
    dateFormat: function (date, fmt) {
        if (fmt === void 0) { fmt = 'yyyy-MM-dd hh:mm:ss'; }
        if (!isDate(date))
            return '';
        var hour = date.getHours(), a = hour > 12 ? 'pm' : 'am';
        var map = {
            y: date.getFullYear(),
            M: date.getMonth() + 1,
            d: date.getDate(),
            H: hour,
            h: hour > 12 ? hour - 12 : hour,
            m: date.getMinutes(),
            s: date.getSeconds(),
            S: date.getMilliseconds(),
            a: a
        };
        var tmpResult, type;
        return fmt.replace(reg_dateFmt, function (val) {
            type = val.charAt(0);
            if (type === '[')
                return val.slice(1, -1);
            else if (type === 'a')
                return map[type];
            tmpResult = utils.paddingLeft(map[type], val.length, '0');
            if (type === 'y') {
                tmpResult = tmpResult.slice(-val.length, tmpResult.length);
            }
            return tmpResult;
        });
    },
    dateParse: function (str, fmt) {
        if (!fmt)
            fmt = 'yyyy-MM-dd hh:mm:ss';
        var arg = {
            'y': undefined,
            'M': undefined,
            'd': 1,
            'H': undefined,
            'h': undefined,
            'm': 0,
            's': 0,
            'S': 0,
            'a': 'am'
        };
        var reg_matcher_source = fmt.replace(reg_dateFmt, function (m) {
            var type = m[0];
            var len = m.length;
            var result;
            if (type === 'y') {
                if (len < 4) {
                    result = "\\d{" + len + "}";
                }
                else
                    result = "\\d{4}";
            }
            else if (type === 'M' || type === 'd' || type === 'H' || type === 'h' || type === 'm' || type === 's') {
                if (len === 1) {
                    result = '[1-9]\\d|\\d';
                }
                else {
                    result = "\\d{2}";
                }
            }
            else if (type === 'S') {
                if (len < 3) {
                    result = "\\d{" + len + "}";
                }
                else
                    result = "\\d{3}";
            }
            else if (type === 'a') {
                result = '(am|Am|AM|pm|Pm|PM)?';
            }
            else if (type === '[') {
                return m.slice(1, -1);
            }
            return "(" + result + ")";
        });
        var match_tar = new RegExp(reg_matcher_source, 'g').exec(str);
        var match_fmt, index = 1;
        if (!match_tar)
            throw new Error("The date format \"" + fmt + "\" match the date string \"" + str + "\" failed.");
        var type;
        while (match_fmt = reg_dateFmt.exec(fmt)) {
            type = match_fmt[0].charAt(0);
            if (type === '[')
                continue;
            arg[type] = type === 'a' ? match_tar[index++] : ~~match_tar[index++];
        }
        var year = (new Date()).getFullYear();
        var argYearStr;
        if (arg.y === undefined)
            arg.y = year;
        else {
            argYearStr = arg.y + '';
            if (argYearStr.length < 4) {
                argYearStr = (year + '').slice(0, 4 - argYearStr.length) + argYearStr;
                arg.y = ~~argYearStr;
            }
        }
        if (arg['M'] === undefined)
            arg['M'] = 0;
        else
            arg['M'] -= 1;
        if (!arg['h']) {
            arg['a'] = 'am';
            arg['h'] = arg['H'] || 0;
        }
        arg['a'] = arg['a'].toLowerCase();
        if (arg['a'] === 'pm') {
            arg['h'] += 12;
        }
        return new Date(arg.y, arg.M, arg.d, arg.h, arg.m, arg.s, arg.S);
    },
    dateAdd: function (date, config) {
        var methodMap = dateMethodMap;
        if (typeof config === 'number') {
            config = { day: config };
        }
        date = new Date(date);
        var method = '';
        utils.each(methodMap, function (val, name) {
            if (config[name]) {
                method = methodMap[name];
                date['set' + method](date['get' + method]() + ~~config[name]);
            }
        });
        return date;
    },
    firstDateInMonth: function (date) {
        date = new Date(date);
        date.setDate(1);
        return date;
    },
    lastDateInMonth: function (date) {
        date = new Date(date);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date;
    },
    firstWeekInMonth: function (date) {
        var firstDate = dateUtils.firstDateInMonth(date);
        var day = firstDate.getDay();
        if (day === 0)
            day = 7;
        return dateUtils.dateAdd(firstDate, 1 - day);
    },
    lastWeekInMonth: function (date) {
        var lastDate = dateUtils.lastDateInMonth(date);
        var day = lastDate.getDay();
        if (day !== 0) {
            lastDate = dateUtils.dateAdd(lastDate, 7 - day);
        }
        return lastDate;
    },
    weekRange: function (startDate, endDate, splitDay) {
        var dateGroup = [];
        if (!startDate || !endDate)
            return dateGroup;
        var shiftTmp;
        if (startDate > endDate) {
            shiftTmp = endDate;
            endDate = startDate;
            startDate = shiftTmp;
        }
        if (typeof splitDay !== 'number') {
            splitDay = 1;
        }
        var dateGroupLast, delta = 1;
        var currentDate = new Date(startDate);
        while (currentDate < endDate) {
            if (delta === 1 && currentDate.getDay() === splitDay) {
                if (+currentDate !== +startDate) {
                    dateGroup.push({
                        end: new Date(currentDate.getTime() - 86400000)
                    });
                }
                dateGroup.push({
                    start: new Date(currentDate)
                });
                delta = 7;
            }
            else if (delta === 7) {
                dateGroupLast = dateGroup.length - 1;
                dateGroup[dateGroupLast].end = new Date(currentDate.getTime() - 86400000);
                dateGroup[dateGroupLast].duration = 7;
                dateGroup.push({
                    start: new Date(currentDate)
                });
            }
            currentDate.setDate(currentDate.getDate() + delta);
        }
        var weight = [0, 1, 2, 3, 4, 5, 6];
        for (var i = 0; i < splitDay; i++) {
            weight[i] += 7;
        }
        var len = dateGroup.length;
        if (len === 0) {
            dateGroup = [{
                    start: startDate,
                    end: endDate,
                    duration: weight[endDate.getDay()] - weight[startDate.getDay()] + 1
                }];
        }
        else {
            if (!dateGroup[0].start) {
                dateGroup[0].start = startDate;
                dateGroup[0].duration = weight[dateGroup[0].end.getDay()] - weight[startDate.getDay()] + 1;
            }
            dateGroupLast = len - 1;
            dateGroup[dateGroupLast].end = endDate;
            dateGroup[dateGroupLast].duration = weight[dateGroup[dateGroupLast].end.getDay()] -
                weight[dateGroup[dateGroupLast].start.getDay()] + 1;
        }
        return dateGroup;
    },
    weekendsCount: function (startDate, endDate) {
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        var duration = (endDate - startDate) / 86400000 + 1;
        var weekendCounts, mod, firstDay, lastDay;
        weekendCounts = Math.floor(duration / 7) * 2;
        mod = duration % 7;
        if (mod) {
            firstDay = startDate.getDay();
            lastDay = firstDay + mod - 1;
            if (firstDay === 0) {
                weekendCounts++;
            }
            else if (firstDay <= 6 && lastDay >= 6) {
                weekendCounts += Math.min(lastDay - Math.max(firstDay, 6) + 1, 2);
            }
        }
        return weekendCounts;
    },
};
var getCookie = cache(function () {
    var c = {}, reg = /(?:;\s|^)([^;]*?)=([^;]*)/g, subReg = /([^&]+)=([^&]+)(?:&|$)/g, m, subm, cookie = document.cookie;
    while (m = reg.exec(cookie)) {
        c[m[1]] = { value: unescape(m[2]), values: null };
        while (subm = subReg.exec(m[2])) {
            c[m[1]].values = c[m[1]].values || {};
            c[m[1]].values[subm[1]] = unescape(subm[2]);
        }
    }
    return c;
}), setCookie = function (key, value, option) {
    var c, val = '', name, date, expires;
    if (!key)
        return;
    key = key + '';
    if (value == null)
        value = '';
    if (typeof value === 'object') {
        for (name in value) {
            val += name + '=' + escape(value[name]) + '&';
        }
        val = val.slice(0, -1);
    }
    else {
        val += escape(value);
    }
    option = option || {};
    if (option.expires && tostring(option.expires) !== '[object Date]') {
        expires = option.expires;
        date = new Date();
        date.setTime(date.valueOf() +
            (isNumber(expires.day) ? expires.day * 86400 * 1000 : 0) +
            (isNumber(expires.hour) ? expires.hour * 3600 * 1000 : 0) +
            (isNumber(expires.min) ? expires.min * 60 * 1000 : 0) +
            (isNumber(expires.sec) ? expires.sec * 1000 : 0));
        option.expires = date;
    }
    c = key + '=' + val +
        (option.expires ? ';expires=' + option.expires.toUTCString() : '') +
        (option.path ? '; path=' + option.path : '') +
        (option.domain ? '; domain=' + option.domain : '') +
        (option.secure ? '; secure' : '');
    document.cookie = c;
    return getCookie(true)[key];
}, deleteCookie = function (key, option) {
    setCookie(key, '', assign(option, { expires: { day: -30 } }));
    return !(key in getCookie(true));
};
var result = assign(utils, {
    promisify: promisify,
    getCookie: getCookie, setCookie: setCookie, deleteCookie: deleteCookie,
    cookie: {
        delete: deleteCookie,
        del: deleteCookie,
        set: setCookie,
        get: function (name, refresh) {
            var cookie = getCookie(refresh)[name];
            return cookie && cookie.value;
        },
    }
}, dateUtils, {
    uniq: utils.unique
});
if (!isBrowser) {
    ['isWifi', 'download', 'copyTxt',
        'getCookie', 'setCookie', 'deleteCookie'].forEach(function (key) {
        utils[key] = utils.noop;
    });
    utils.htmlDecode = function (txt) {
        txt += '';
        return txt.replace(reg_htmlDecode, function (match, code, br) {
            if (br)
                return '\n';
            else if (code === '160') {
                code = 32;
            }
            return String.fromCharCode(code);
        });
    };
}
exports.default = result;

})();

__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});