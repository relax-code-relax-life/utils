/**
 * Created by wangweilin on 2017/6/9.
 */

var userAgent = window.navigator.userAgent;
var isAndroid = /Android/i.test(userAgent);
var isWeiXin = /MicroMessenger/.test(userAgent);
var isIos = /iphone|ipad|ipod|ios/i.test(userAgent);


var reg_isUrl = /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
    reg_resolveUrl = /(\?([^#]*))?(#.*)?\s*$/,
    reg_singleChar = /[\u0020-\u007f|\uff61-\uff9f]/g,
    reg_enterChar = /\n/g,
    reg_htmlEncode = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,
    //0-32  128-255
    //ascii: 1字节，包含标准 0-127字符和扩展ascii 128-255字符。 扩展ascii为非标准。
    //0-31和127为控制字符,    127是删除
    //32-126为可显字符,     32为空格,48~57为0-9,65~90为A-Z,97-122为a-z，其余为符号。
    //128-255为扩展字符
    reg_camelCase = /-([a-zA-Z])/g,
    reg_query = /(?:[?&])(.*?)=(.*?)(?=&|$|#)/g,
    reg_dateFmt = /y+|M+|d+|h+|m+|s+|S+/g;


//signature: obj,start,end
var call = Function.prototype.call;
var slice = call.bind(Array.prototype.slice);
var docEle = document.documentElement;
var toString = call.bind(Object.prototype.toString);
var isArray = Array.isArray || function (arr) {
        return toString(arr) === '[object Array]'
    };
var isFunction = function (fn) {
    return toString(fn) === '[object Function]'
};
var isBoolean = function (val) {
    return typeof val === 'boolean';
};
var isNumber = function (val) {
    return typeof val === 'number'
};

//缓存函数。  将函数结果缓存，函数实际只执行一次。
var cache = function (fn, context) {
    var result,
        isExecute; //判断是否执行过fn，不能通过result判断，因为fn有可能返回undefined
    return function (refresh, ...args) { //第一个参数为 是否强制刷新
        if (!isExecute || refresh) {
            !context && (context = this);
            result = fn.apply(context, args);
        }
        return result;
    }
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
        return reg_isUrl.test(str);
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
        if (isArray(obj)) return obj.forEach(fn, context);

        //只遍历自有可枚举属性
        Object.keys(obj).forEach(key => {
            fn.call(context, obj[key], key, obj);
        })
    },
    map(obj, fn, context){
        if (isArray(obj)) return obj.map(fn, context);

        var result = [];
        utils.each(obj, (val, key) => {
            result.push(fn.call(context, val, key, obj));
        });
        return result;
    },
    cache,
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

    //间隔wait执行
    throttle  (fn, alwaysFn, immediately, wait, context) {//optional:alwaysFn,immediately,context
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

        var timeoutId, args,
            execFn;

        if (immediately) {
            execFn = function () {
                fn.apply(context, args);
                timeoutId = setTimeout(function () {
                    timeoutId = undefined;
                }, wait);
            }
        }
        else {
            execFn = function () {
                timeoutId = setTimeout(function () {
                    fn.apply(context, args);
                    timeoutId = undefined;
                }, wait);
            }
        }

        return function () {
            args = arguments;
            !context && (context = this);
            alwaysFn && alwaysFn.apply(context, args);
            if (!timeoutId) execFn();
        }
    },
    //防抖动
    debounce(fn, alwaysFn, immediately, wait, context){//optional:alwaysFn,immediately,context

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

        var timeoutId, arg;

        var setTimeout = function (fn) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fn, wait)
        };

        var execFn;
        if (immediately) {

            execFn = function () {
                if (!timeoutId) fn.apply(context, arg);
                setTimeout(function () {
                    timeoutId = undefined
                });
            }
        }
        else {
            execFn = function () {
                setTimeout(function () {
                    fn.apply(context, arg);
                    timeoutId = undefined;
                });
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

    /**
     * 将对象转换为key=val&key1=value1的参数形式
     * @param params
     * @param encodeEx {Boolean|Array} 不进行转义。数组形式:[key1,key2,...]，指定特定的key不进行转义
     * @returns {*}
     */
    param(params, encodeEx){
        if (params == null || typeof params !== 'object') return params || '';
        var result = [], val, enc = encodeURIComponent;

        //格式化excludeMap: {key1:bool,key2:bool}
        var excludeMap = {}, excludeAll = false;
        if (isArray(encodeEx)) {
            encodeEx.forEach(function (key) {
                excludeMap[key] = true;
            })
        }
        else {
            excludeAll = encodeEx;
        }


        for (var key in params) {
            val = params[key];
            if (val == null) val = '';
            else if (typeof val === 'object') val = JSON.stringify(val);

            val = (excludeAll || excludeMap[key]) ? val : enc(val);

            result.push(enc(key) + '=' + val);
        }

        return result.join('&');
    },
    resolveUrl(url, param, encodeEx){
        param = utils.param(param, encodeEx);
        return url.replace(reg_resolveUrl, '?$2&' + param + '$3').replace('?&', '?')
    },

    /**
     *返回代表查询字符串的键值对。函数内部缓存query对象，多次调用该函数，实际只解析一次查询字符串。
     *@method getQuery
     *@param [refresh=false] 若存在缓存则直接返回。refresh为true时，无论是否存在缓存对象，都强制重新解析查询字符串。
     *@return 返回代表当前url中查询字符串的键值对对象。
     * 用例：
     * utils.getQuery().id 或者 utils.getQuery(false,'localhost/indexhtml?id=idinfo')
     */
    getQuery: cache(function (url) {
        var q = {}, match;
        while (match = reg_query.exec(url || location.search)) {
            q[match[1]] = match[2];
        }
        return q;
    }),

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

        var match = txt.match(reg_singleChar);
        var matchEnter = txt.match(reg_enterChar);

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
        return txt.replace(reg_htmlEncode, function (match) {
            code = match.charCodeAt(0);
            if (code === 32) code = 160; //32:英文空格,转换为160:  &nbsp; html中的空格
            if (code === 10) return '<br/>';  //转换\n
            return '&#' + code + ';';
        });
    },
    htmlDecode(val){
        if (val == null || val === '') return '';
        var el = document.createElement('div');
        el.innerHTML = val;
        var result = el.innerText;
        el = null;
        return result;
    },

    /**
     * camel-case转换为camelCase,
     * 或传入多个参数，合并为camelCase形式。
     * @param args
     * @returns {string}
     */
    camelCase(...args){
        return args.join('-').replace(reg_camelCase, function (match, letter) {
            return letter.toUpperCase();
        });
    },


    /**
     * 补齐位数
     * @method formatDate
     * @param target {String} 操作的目标字符串
     * @param len{Number} 要补齐的位数
     * @param paddingChar {String} 填补的字符
     * @return {string} 新字符串
     * 用例：
     * utils.paddingLeft('1',3,'0');  //001
     * utils.paddingLeft('12345',3);  //12345
     */
    paddingLeft: function (target = '', len, paddingChar) {
        var result, i, targetLen;

        target += '';
        len = ~~len;

        targetLen = (target + '').length;
        if (len <= targetLen) {
            return target;
        }

        paddingChar = paddingChar && paddingChar.charAt(0) || ' ';

        result = new Array(len - targetLen).fill(paddingChar);
        result.push(target);

        return result.join('');
    },

};


//region cookie

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
var getCookie = cache(function () {
        //str:用于测试的模仿cookie的值,包含多种可能的情况
        //var str = "test=cookie\'s value&one=6&two=2; 2=cookie2; empty; ; mu lti=multiValue&name1=value1&name2=values2";

        //将忽略名为空或值为空的cookie
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
    }),
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
    setCookie = function (key, value, option) {
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
                ( isNumber(expires.day) ? expires.day * 86400 : 0) +
                ( isNumber(expires.hour) ? expires.hour * 3600 : 0) +
                ( isNumber(expires.min) ? expires.min * 60 : 0) +
                ( isNumber(expires.sec) ? expires.sec : 0));
            option.expires = date;
        }


        c = key + '=' + val +
            (option.expires ? ';expires=' + option.expires.toUTCString() : '') +
            (option.path ? '; path=' + option.path : '') +
            (option.domain ? '; domain=' + option.domain : '') +
            (option.secure ? '; secure' : '');

        document.cookie = c;

        return getCookie(true)[key];
    },
    /**
     *删除一个cookie,并同时更新缓存cookie对象，即调用adai.getCookie(true);
     *@method deleteCookie
     *@param key {String} 要删除的cookie的名称
     *@param option {Object} 需要传入和设置cookie时相同的option,才能正确删除。
     *@return {boolean} 是否成功删除cookie,已删除则返回true,未删除false;
     */
    deleteCookie = function (key, option) {
        setCookie(key, '', this.extend(option, {expires: {day: -30}}));
        return !(key in getCookie(true));
    };

Object.assign(utils, {
    getCookie, setCookie, deleteCookie,
    cookie: {
        delete: deleteCookie,
        set: setCookie,
        get(name, refresh){
            var cookie = getCookie(refresh)[name];
            return cookie && cookie.value;
        },
    }
});
//endregion


//region date
var dateMethodMap = {
    year: 'FullYear',
    month: 'Month',
    day: 'Date',
    hour: 'Hours',
    min: 'Minutes',
    sec: 'Seconds'
};

var dateUtils = {
    /**
     * 格式化时间。 支持：年y,月M,天d,时h,分m,秒s,毫秒S。
     * 年份根据y的数量截取，其他值，只补齐不截取。
     * @method formatDate
     * @param date {Date} 日期
     * @param fmt{String} 格式化字符串
     * @return {string}
     * */
    dateFormat(date, fmt) {
        if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss';
        var map = {
            y: date.getFullYear(),
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            S: date.getMilliseconds()
        };
        var tmpResult, type, r = reg_dateFmt;
        return fmt.replace(r, function (val) {
            type = val.charAt(0);
            tmpResult = utils.paddingLeft(map[type], val.length, '0');
            if (type === 'y') {
                tmpResult = tmpResult.slice(-val.length, tmpResult.length);
            }
            return tmpResult;
        })
    },
    dateParse(str, fmt) {
        var params = str.split(/\D+/);
        var match, index = 0, r = reg_dateFmt;
        var arg = {
            'y': undefined,
            'M': undefined,
            'd': 1,
            'h': 0,
            'm': 0,
            's': 0,
            'S': 0
        };
        while (match = r.exec(fmt)) {
            arg[match[0].charAt(0)] = ~~params[index++];
        }

        var year = (new Date()).getFullYear();
        var argYearStr;
        if (arg.y === undefined) arg.y = year;
        else {
            argYearStr = arg.y + '';
            if (argYearStr.length < 4) {
                argYearStr = (year + '').slice(0, 4 - argYearStr.length) + argYearStr;
                arg.y = ~~argYearStr;
            }
        }

        if (arg['M'] === undefined) arg['M'] = 0;
        else arg['M'] -= 1;

        return new Date(arg.y, arg['M'], arg.d, arg.h, arg.m, arg.s, arg['S']);

    },
    /**
     * 日期计算。 日期加减法，返回新的日期对象，对传入的日期对象无影响。
     * @method dateAdd
     * @param date {Date} 计算的基准日期
     * @param config{Number|Object} 配置参数
     *  {
                    year: 0,
                    month: 0,
                    day: 0,
                    hour: 0,
                    min: 0,
                    sec: 0
                }
     *@return {Date} 返回一个新的日期对象。
     * 用例：
     * var date=Date.parse('2015/12/1 12:00:00');
     * utils.dateAdd(date,{ day:-1,month:1,hour:1 });  //2015/12/31 13:00:00
     * utils.dateAdd(date,31);  //2016/1/1 12:00:00  utils.dateAdd(date,{day:31})的缩写形式
     */
    dateAdd: function (date, config) {
        var
            //defaultConfig = {
            //    year: 0,
            //    month: 0,
            //    day: 0,
            //    hour: 0,
            //    min: 0,
            //    sec: 0
            //},
            methodMap = dateMethodMap;

        if (typeof config === 'number') {
            config = {day: config};
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
    /**
     * 返回传入日期月份的第一天
     * @param date {Date}
     * @return {Date} 返回一个新的日期对象
     */
    firstDateInMonth: function (date) {
        date = new Date(date);
        date.setDate(1);
        return date;
    },
    /**
     * 返回传入日期月份的最后一天
     * @param date
     * @returns {Date} 返回一个新的日期对象
     */
    lastDateInMonth: function (date) {
        date = new Date(date);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date;
    },
    /**
     * 返回传入日期月份的第一周的周一。
     * @param date
     * @returns {Date}
     */
    firstWeekInMonth: function (date) {
        var firstDate = utils.firstDateInMonth(date);
        var day = firstDate.getDay();
        if (day === 0) day = 7;
        return utils.dateAdd(firstDate, 1 - day);
    },
    /**
     * 返回传入日期月份的最后一周的周日。
     * @param date
     * @returns {Date}
     */
    lastWeekInMonth: function (date) {
        var lastDate = utils.lastDateInMonth(date);
        var day = lastDate.getDay();
        if (day !== 0) {
            lastDate = utils.dateAdd(lastDate, 7 - day);
        }
        return lastDate;
    },
    /**
     * 返回开始日期和结束日期的周。计算时忽略时间，只计算日期。
     * @param startDate ｛Date｝ 开始日期。
     * @param endDate   {Date} 结束日期
     * @param splitDay {number} 分割点。对应date.getDay()取值0~6。 例如取周一至周日，则splitDay传入1，取周日至周六，splitDay传入0。
     * @returns {Array} 返回周的数组。 每一项为：{start:date,end:date,duration:number}
     * 用例： 获取该月的所有周。
     * var today=new Date();
     * utils.weekRange(utils.firstWeekInMonth(today),utils.lastWeekInMonth(today));
     */
    weekRange: function (startDate, endDate, splitDay) {
        var dateGroup = [
            //{start,end,duration} , ...
        ];
        if (!startDate || !endDate) return dateGroup;

        var shiftTmp;
        if (startDate > endDate) {
            shiftTmp = endDate;
            endDate = startDate;
            startDate = shiftTmp;
        }

        if (typeof splitDay !== 'number') {
            //分隔日 1代表周一， 周一至周日为一个weekGroup组合。
            //若要从周日开始 则改为0. 周日至周六
            //取值： 0 ~ 6
            splitDay = 1;
        }


        var dateGroupLast,  //临时变量
            delta = 1; //i的增量

        var currentDate = new Date(startDate);

        //第一个 分隔日
        //1 2 3 4 5 6 7 8 9
        //5为分隔日，4为前一个 dateGroup的end,5为当前dateGroup的start,
        //找到第一个分隔日后，i的增量变为7,一周，7天后为下一个分隔日
        while (currentDate < endDate) {
            if (delta === 1 && currentDate.getDay() === splitDay) {
                if (+currentDate !== +startDate) {
                    //如果 startDate 不为分隔日
                    dateGroup.push({
                        end: new Date(currentDate.getTime() - 86400000) // 86400: 24*60*60*1000 24h
                    })
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
                })
            }
            currentDate.setDate(currentDate.getDate() + delta);
        }


        //权重值，用于计算间隔天数
        var weight = [0, 1, 2, 3, 4, 5, 6]; //初始： 对应 date.getDay();
        for (var i = 0; i < splitDay; i++) {
            weight[i] += 7;
        }


        var len = dateGroup.length;

        if (len === 0) {
            //startDate ~ endDate 中不存在分隔日。
            dateGroup = [{
                start: startDate,
                end: endDate,
                duration: weight[endDate.getDay()] - weight[startDate.getDay()] + 1
            }];
        }
        else {
            //添加dateGroup的首位
            if (!dateGroup[0].start) {
                //说明不是从 分隔日 开始的。
                dateGroup[0].start = startDate;
                dateGroup[0].duration = weight[dateGroup[0].end.getDay()] - weight[startDate.getDay()] + 1;
            }

            //添加dateGroup末位
            dateGroupLast = len - 1;
            dateGroup[dateGroupLast].end = endDate;
            dateGroup[dateGroupLast].duration = weight[dateGroup[dateGroupLast].end.getDay()] -
                weight[dateGroup[dateGroupLast].start.getDay()] + 1;
        }

        return dateGroup;
    },
    /**
     * 计算开始日期和结束日期共有周六日多少天。计算时忽略时间，只计算日期。
     * @param startDate {Date} 开始日期
     * @param endDate {Date} 结束日期
     * @returns {number} 返回周末总数
     * 用例：
     * var start=new Date(2015,8,1);
     * var end=new Date(2015,8,11);
     * utils.weekendsCount(start,end); //返回2. 2015-8-1至2015-8-11共有两天周末。
     */
    weekendsCount: function (startDate, endDate) {

        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

        var duration = (endDate - startDate) / 86400000 + 1;

        //计算工作日。 eg: 2015-8-1 ~ 2015-8-11 有两天为周六日。 实际工作为9-2=7天
        var weekendCounts, mod, firstDay, lastDay;

        weekendCounts = Math.floor(duration / 7) * 2; //每7天两个休息日。 最后余出不满7天。

        mod = duration % 7; //余出的天数
        if (mod) { //如果存在余出的天数
            firstDay = startDate.getDay(); //余出天数第一天的星期数和 duration的第一天星期数相同。
            lastDay = firstDay + mod - 1;         //最后一天星期数。
            if (firstDay === 0) {
                //第一天是周日，则余出天数只有 一个休息日
                weekendCounts++;
            }
            else if (firstDay <= 6 && lastDay >= 6) {
                //第一天在周六或之前,
                // 第二天是周六，1天休息日，
                // 第二天周日或以后，2个休息日。
                // lastDay-6+1 ： 周六到lastDay共几天。 只有1天，则lastDay是周六，超过1天，则有两个休息日。
                weekendCounts += Math.min(lastDay - Math.max(firstDay, 6) + 1, 2);
            }
        }
        return weekendCounts;
    },
};
Object.assign(utils, dateUtils);
//endregion


module.exports = utils;


