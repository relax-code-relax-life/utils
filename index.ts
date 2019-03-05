/**
 * Created by wangweilin on 2017/6/9.
 */

interface Defer {
    promise: Promise<any>,
    resolve: (data?: any) => void,
    reject: (error?: any) => void
}

interface PromiseWithAbort<T> extends Promise<T> {
    abort()
}

interface SomeObject<T> {
    [prop: string]: T
}


const isBrowser = typeof window !== 'undefined' && window.document;

const userAgent = isBrowser ? navigator.userAgent : '';
const platform = isBrowser ? navigator.platform : '';

// var reg_isUrl = /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
const reg_isUrl = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i,
    reg_resolveUrl = /(\?([^#]*))?(#.*)?\s*$/,
    reg_singleChar = /[\u0020-\u007f\uff61-\uff9f]/g,
    reg_enterChar = /\n/g,
    reg_htmlEncode = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,
    reg_htmlDecode = /&#(\d+);|(<br\s*\/\s*>)/g,
    reg_htmlDecodeBrowser = /&#.+?;/g,
    //十六进制表示:
    // \x1abf4: 可以使用任意多的十六进制数字，直至不是十六进制数字为止；
    // \uAAAA: 16位的通用字符名,\u后面必须跟4个十六进制数字（不足四位前面用零补齐).
    // \UAAAAAAAA:32位的通用字符名，\U后面必须跟8个十六进制数字（不足八位前面用零补齐）
    // 一个数字，代表4位， ascii总共1个字节，所以一般都用\u00YY或者\xYY表示。
//0-32  128-255
//ascii: 1字节，包含标准 0-127字符和扩展ascii 128-255字符。 扩展ascii为非标准。
//0-31和127为控制字符,    127是删除
//32-126为可显字符,     32为空格,48~57为0-9,65~90为A-Z,97-122为a-z，其余为符号。
//128-255为扩展字符
    reg_camelCase = /-([a-zA-Z])/g,
    reg_upperCase = /[A-Z]/g,
    reg_query = /(?:[?&])(.*?)=(.*?)(?=&|$|#)/g,
    reg_dateFmt = /y+|M+|d+|H+|h+|m+|s+|S+|a|(\[.*?])/g,
    reg_parseParam = /(?:^|&)(.*?)=(.*?)(?=&|$)/g,
    reg_template = /\$\{\s*(.+?)\s*\}/g,

    reg_chrome = /Chrome\/(\d+)/,
    reg_firefox = /Firefox\/(\d+)/,
    reg_safari = /Version\/([\d.]+) Safari\/\d+/,
    reg_ie = /MSIE (\d+)/,
    reg_ie2 = /Trident\/.*; rv:(\d+)/,  //检测ie11+
    reg_ieEdge = /(Edge\/\d+)/,

    reg_isAndroid = /Android/i,
    reg_isWeiXin = /MicroMessenger/,
    reg_isIos = /iphone|ipad|ipod|ios/i;

function browserVersion(reg: RegExp, ua?: string): null | string {
    var match = reg.exec(ua || userAgent);
    return match && match[1];
}

//region userAgent
/*
 chrome:
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36
 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36

 firefox:
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:50.0) Gecko/20100101 Firefox/50.0
 Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0

 safari:
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4

 ie edge:
 Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063

 ie11
 Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko
 Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.2; rv:11.0) like Gecko
 Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko

 ie:
 Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.2)
 Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)
 Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)

 * */
//endregion

//signature: obj,start,end
const call = Function.prototype.call;
const slice = call.bind(Array.prototype.slice);
const tostring = call.bind(Object.prototype.toString);
const isArray = Array.isArray || function (arr) {
    return tostring(arr) === '[object Array]'
};
const isFunction = function (fn) {
    return tostring(fn) === '[object Function]'
};
const isBoolean = function (val) {
    return typeof val === 'boolean';
};
const isNumber = function (val) {
    return typeof val === 'number'
};
const isDate = function (val) {
    return tostring(val) === '[object Date]';
};
const assign: <T, U, V, W>(target: T, source1: U, source2?: V, source3?: W) => T & U & V & W = Object.assign
    || function (tar, ...extend) {
        extend.forEach((val, key) => {
            tar[key] = val;
        });
        return tar;
    };
const fill = function (arr: any[], padding: any) {
    if (arr.fill) return arr.fill(padding);
    else {
        for (var i = arr.length - 1; i > -1; i--) {
            arr[i] = padding;
        }
        return arr;
    }
};

//缓存函数。  将函数结果缓存，函数实际只执行一次。
//predicate 判断在refresh为false时，是否使用缓存
const cache = function (fn: Function, context?: Object, predicate?: Function) {
    var result,
        isExecute; //判断是否执行过fn，不能通过result判断，因为fn有可能返回undefined
    return function (refresh, ...args) { //第一个参数为 是否强制刷新

        !context && (context = this);

        //从未执行过 或 强制刷新 或 predicate要求刷新(返回true)
        if (!isExecute || refresh || (predicate && predicate.apply(context, args))) {
            result = fn.apply(context, args);
        }

        return result;
    }
};

const copyTxt = (function () {
    var getFakeEle = function (): HTMLTextAreaElement {
        var id = 'inner_copy_fake_ele';

        var ele = document.getElementById(id) as HTMLTextAreaElement;
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

let guidCnt = 0;
let loopIds = {};

// @ts-ignore
let utils = {
    guid(preFix = '') {
        return preFix + guidCnt++
    },
    noop() {
    },
    isAndroid(ua?: string) {
        return reg_isAndroid.test(ua || userAgent);
    },
    isIos(ua?: string) {
        return reg_isIos.test(ua || userAgent);
    },
    isWeiXin(ua?: string) {
        return reg_isWeiXin.test(ua || userAgent);
    },
    //返回bool，则正确检测到联网类型。返回undefined，则代表未检测到。
    isWifi(): undefined | boolean {
        interface NetworkInformation {
            type?: string;
        }

        interface Navigator {
            connection?: NetworkInformation,
            mozConnection?: NetworkInformation,
            webkitConnection?: NetworkInformation
        }

        const n = navigator as Navigator;
        var connection = n.connection || n.mozConnection || n.webkitConnection;
        if (connection) {
            // return connection.type === 'wifi';
            return connection.type !== 'cellular'; //认为不为蜂窝网，则即为wifi
        } else if (utils.isWeiXin()) {
            return /NetType\/WIFI/.test(navigator.userAgent);
        } else return undefined;
    },

    isWindows() {
        return platform === 'Win32' || platform === 'Windows' || platform === 'Win16' || platform === 'Win64' || platform === 'WinCE';
    },
    isMac() {
        return platform === 'MacIntel' || platform === 'Macintosh' || platform === 'MacPPC' || platform === 'Mac68K';
    },

    isUrl(str: string) {
        return reg_isUrl.test(str);
    },
    //判断是否为一个类数组对象
    //字符串和函数也存在length属性，通过typeof排除
    //DOM文本节点也有length属性,用额外的o.nodeType!=3将其排除
    //大多方法通过for循环和length属性对数组操作，所以通过length属性判断是否为类数组对象
    /**
     *判断是否为类数组。
     *规则：参数为object类型(Node类型除外)，且具有非负整数的、可用的(不为NaN的有限数字)、小于2^32的length属性；则视为类数组。
     */
    isArrayLike(o: any) {
        return o &&                 //非null undefined
            typeof o === 'object' &&   //o为对象
            isFinite(o.length) &&           //o.length为有限数字，当传入值的valueof()不能转化为数字返回false
            o.length >= 0 &&                //非负数
            o.length === Math.floor(o.length) && //为整数
            o.length < 4294967296 &&         //小于2^32
            !o.nodeType;                //不包含Node节点
    },
    /**
     *
     * @param ua
     * @returns {null|string}
     */
    isIE(ua?): null | string {
        return browserVersion(reg_ie, ua) || browserVersion(reg_ie2, ua) || browserVersion(reg_ieEdge, ua);
    },
    isChrome(ua?): null | string {
        return browserVersion(reg_chrome, ua);
    },
    isFirefox(ua?): null | string {
        return browserVersion(reg_firefox, ua);
    },
    isSafari(ua?): null | string {
        return (browserVersion(reg_chrome, ua) || browserVersion(reg_ieEdge, ua)) ? null : browserVersion(reg_safari, ua);
    },
    defer(): Defer {
        var defer = {} as Defer;
        defer.promise = new Promise(function (resolve, reject) {
            defer.resolve = resolve;
            defer.reject = reject;
        });
        return defer;
    },
    each<T>(
        arrayOrObject: SomeObject<T> | T[],
        fn: (value: T, index: number, obj: typeof arrayOrObject) => void,
        context?: any
    ): void {
        let obj = arrayOrObject;
        if (isArray(obj)) return (obj as T[]).forEach(fn, context);

        //只遍历自有可枚举属性
        Object.keys(obj).forEach(key => {
            fn.call(context, obj[key], key, obj);
        })
    },
    map<T>(
        arrayOrObject: SomeObject<T> | T[],
        fn: (value: T, index: number, obj: typeof arrayOrObject) => any,
        context?: any
    ): any[] {
        let obj = arrayOrObject;
        if (isArray(obj)) return (obj as T[]).map(fn, context);

        var result = [];
        utils.each(obj, (val, key) => {
            result.push(fn.call(context, val, key, obj));
        });
        return result;
    },
    find<T>(
        arrayOrObject: SomeObject<T> | T[],
        fn: (value: T, index: number, obj: typeof arrayOrObject) => boolean,
        context?: any
    ): T {
        let obj = arrayOrObject;
        if (isArray(obj)) return (obj as T[]).find(fn, context);
        var key = Object.keys(obj).find(function (key) {
            return fn.call(context, obj[key], key, obj);
        });
        return obj[key];

    },
    /**
     * 不改变数组顺序的情况下去重,
     * @param arr {Array}
     * @param [isSort] {Boolean} 默认false.
     *          如果已排序，则和前一个值作恒等比较，如果未排序，则通过includes是否存在。
     * @param [fn] {Function} map函数。根据fn返回的值做比较。 fn(item,index,arr);
     * @param [context] {Object} map函数的this值。
     * @return {Array} 返回新数组。
     */
    unique<T>(arr: T[], isSort = false, fn?: (item: T, index: number, arr: T[]) => any, context?: any): T[] {

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
            var pre;
            mapArr.forEach((item, i) => {
                if (pre !== item) {
                    pre = item;
                    result.push(arr[i]);
                }
            });
        } else {
            //提前map
            var mapResult = [];
            mapArr.forEach(function (item, i) {
                if (!mapResult.includes(item)) {
                    mapResult.push(item);
                    result.push(arr[i]);
                }
            });
        }

        return result;
    },
    cache,
    loop(fn: Function, tick: number, immediate: boolean): string {
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
    clearLoop(key: string) {
        var timeoutId = loopIds[key];
        if (timeoutId) {
            clearTimeout(timeoutId);
            loopIds[key] = undefined;
        }
    },
    /**
     * setTimeout的promise形式。缺点是无法对该任务执行clearTimeout。
     * @param fn {function}
     * @param wait {number}
     * @returns {Promise}
     */
    timeout<T>(fn: () => T, wait = 0) {
        var defer = utils.defer();
        var id = setTimeout(function () {
            defer.resolve(fn());
        }, wait);

        let promise = defer.promise as PromiseWithAbort<T>;

        promise.abort = function () {
            clearTimeout(id);
        };
        return promise;
    },

    //间隔wait执行 //optional:alwaysFn,immediately,context
    throttle(fn: Function, alwaysFn?: Function, immediately?: boolean, wait?: number, context?: any) {
        if (!isFunction(alwaysFn)) {
            context = wait;
            // @ts-ignore
            wait = immediately;
            // @ts-ignore
            immediately = alwaysFn as Function;
            alwaysFn = undefined;
        }
        if (!isBoolean(immediately)) {
            context = wait;
            // @ts-ignore
            wait = immediately;
            immediately = false;
        }
        if (wait == null) wait = 300;

        var oriContext = context;
        var timeoutId, args,
            execFn;

        if (immediately) {
            execFn = function () {
                fn.apply(context, args);
                timeoutId = setTimeout(function () {
                    timeoutId = undefined;
                }, wait);
            }
        } else {
            execFn = function () {
                timeoutId = setTimeout(function () {
                    fn.apply(context, args);
                    timeoutId = undefined;
                }, wait);
            }
        }

        return function () {
            args = arguments;
            !oriContext && (context = this);
            alwaysFn && alwaysFn.apply(context, args);
            if (!timeoutId) execFn();
        }
    },
    /**
     * 防抖动
     * @param fn {Function}
     * @param [alwaysFn] {Function}
     * @param [immediately] {Boolean}
     * @param wait {Number}
     * @param [context] {Object}
     * @returns {Function}
     */
    //optional:alwaysFn,immediately,context
    debounce(fn: Function, alwaysFn?: Function, immediately?: boolean, wait?: number, context?: any) {

        if (!isFunction(alwaysFn)) {
            context = wait;
            // @ts-ignore
            wait = immediately;
            // @ts-ignore
            immediately = alwaysFn;
            alwaysFn = undefined;
        }
        if (!isBoolean(immediately)) {
            context = wait;
            // @ts-ignore
            wait = immediately;
            immediately = false;
        }

        if (wait == null) wait = 300;

        var oriContext = context;

        var timeoutId, arg;

        var setTimer = function (fn) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fn, wait)
        };

        var execFn;
        if (immediately) {

            execFn = function () {
                if (!timeoutId) fn.apply(context, arg);
                setTimer(function () {
                    timeoutId = undefined
                });
            }
        } else {
            execFn = function () {
                setTimer(function () {
                    fn.apply(context, arg);
                    timeoutId = undefined;
                });
            }
        }

        return function () {
            arg = arguments;

            !oriContext && (context = this);

            execFn();

            alwaysFn && alwaysFn.apply(context, arg);
        }
    },

    download(src: string, fileName: string) {
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
     * value默认通过encodeURIComponent转义，通过encodeEx不转义。
     * @param params
     * @param encodeEx {Boolean|Array} 不进行转义。数组形式:[key1,key2,...]，指定特定的key不进行转义
     * @returns {*}
     */
    param(params: object, encodeEx?: boolean | string[]): string {
        if (params == null || typeof params !== 'object') return params ? params + '' : '';
        var result = [], val, enc = encodeURIComponent;

        //格式化excludeMap: {key1:bool,key2:bool}
        var excludeMap = {}, excludeAll = false;
        if (isArray(encodeEx)) {
            (encodeEx as string[]).forEach(function (key) {
                excludeMap[key] = true;
            })
        } else {
            excludeAll = encodeEx as boolean;
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

    /**
     * 将key=value&key1=value1形式的字符串转换成对象，相对于param方法。
     * value默认使用decodeURIComponent进行解密，可以通过decodeEx参数不进行解密。
     * @param paramStr {String}
     * @param decodeEx {Boolean|Array}
     * @returns {{}}
     */
    parseParam(paramStr: string, decodeEx?: boolean | string[]) {
        var data = {},
            match,
            decode = decodeURIComponent;

        var excludeMap = {}, excludeAll = false;
        if (isArray(decodeEx)) {
            (decodeEx as string[]).forEach(key => excludeMap[key] = true);
        } else {
            excludeAll = decodeEx as boolean;
        }

        while (match = reg_parseParam.exec(paramStr)) {
            data[match[1]] = excludeAll || excludeMap[match[1]] ? match[2] : decode(match[2]);
        }

        return data;
    },

    /**
     * 针对url添加查询字符串。
     * 该方法不是一个绝对安全的方法，可能会改变原url中查询字符串中参数的顺序，以及丢失无法解析的值。
     * 例如: resolveUrl('localhost?name=wwl&abc',{sex:'male'}) 可能会返回: localhost?sex=male&name=wwl
     * @param url {String}
     * @param param {Object} 代表查询字符串的参数对象
     * @param encodeEx {Boolean|Array} 为true，代表不进行转义。默认为false,即转义。
     * @returns {string}
     */
    resolveUrl(url: string, param?: object, encodeEx?: boolean | string[]) {
        param = assign(utils.getQuery(url), param);
        let queryStr = utils.param(param, encodeEx);
        return url.replace(reg_resolveUrl, '?' + queryStr + '$3');
    },

    /**
     *返回代表查询字符串的键值对。
     *@method getQuery
     *@param [url] 需要解析的字符串，默认为location.search
     *@return {Object} 返回代表当前url中查询字符串的键值对对象。
     * 用例：
     * utils.getQuery().id 或者 utils.getQuery('localhost/indexhtml?id=idinfo').id
     */
    getQuery: function (url?: string) {
        var q = {}, match;
        while (match = reg_query.exec(url || (isBrowser && location.search) || '')) {
            q[match[1]] = match[2];
        }
        return q;
    },

    /**
     * 计算字符长度。该方法区分全角字符和半角字符。
     * @param txt {String}
     * @param [fullVal] {Number} 可选的，全角字符的权重值，默认为1
     * @param [halfVal] {Number} 可选的，半角字符的权重值，默认为0.5
     * @param [enterVal] {Number} 可选的, 回车字符的权重值,默认为1
     * @return {Number} 返回字符权重值
     */
    countStr: function (txt: string, fullVal = 1, halfVal = 0.5, enterVal = 1) {
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
    copyTxt(txt: string) {
        try {
            if (!copyTxt(txt)) {
                return false;
            }
        } catch (err) {
            return false;
        }
        return true;
    },

    /**
     * 转义为html
     * @param txt
     * @returns {XML|void|*|string}
     */
    htmlEncode(txt: string) {
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
    htmlDecode(val: string) {
        if (val == null || val === '') return '';
        var match = val.match(reg_htmlDecodeBrowser);
        if (match) {
            var el = document.createElement('div');
            el.innerHTML = match.join(',');
            match = el.innerText.split(',')
            el = null;
        } else match = [];

        var index = 0;
        return val.replace(reg_htmlDecodeBrowser, (result, pos) => {
            return match[index++];
        });
    },

    /**
     * camel-case转换为camelCase,
     * 或传入多个参数，合并为camelCase形式。
     * @param args
     * @returns {string}
     */
    camelCase(...args: string[]) {
        return args.join('-').replace(reg_camelCase, function (match, letter) {
            return letter.toUpperCase();
        });
    },

    /**
     * kebabCase转换为kebab-case
     * 或传入多个参数，合并为kebab-case形式。
     * @param args
     */
    kebabCase(...args: string[]) {
        return args.map(function (name) {
            return name.replace(reg_upperCase, function (match, pos) {
                return (pos === 0 ? '' : '-') + match.toLowerCase()
            });
        }).join('-');
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
    paddingLeft: function (target = '', len: number, paddingChar: string) {
        var result, i, targetLen;

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


    /**
     * 模板函数，计算表达式生成字符串。支持ES6模板字符串语法。 eg: template('hello,${firstName+secondName}',{firstName:'wang',secondName:'wl'});
     * @param temp
     * @param data
     * @returns {string}
     */
    template: (function (): (temp: string, data: object) => string {

        let supportTempStr = true;
        try {
            let fn = new Function('``');
        } catch (e) {
            supportTempStr = false;
        }

        if (supportTempStr) {
            return function (temp, data) {
                return (new Function('__scope__',
                    `
                    var __result__;
                    try{
                        with(__scope__){
                            __result__=\`${temp}\`
                        }
                    }
                    catch(e){
                        __result__="";
                    }
                    return __result__;
                    `
                ))(data);
            };
        } else {
            //known bug: temp=' hello ${name+"${inner}"} ';
            return function (temp, data) {
                //如果以reg_template开头，则splitCodes[0]为空字符串。
                //如果以reg_template结尾，则splitCodes[len-1]为空字符串。
                var isExpr = true;
                var exprCode = temp.split(reg_template)
                    .map(splitCode => {
                        isExpr = !isExpr;
                        if (isExpr) {
                            return splitCode;
                        } else {
                            return `'${splitCode.replace("'", "\\'")}'`;
                        }
                    }).join('+');

                return (new Function('__scope__',
                    `
            var __result__;
            with(__scope__){ 
                __result__=${exprCode};
            }
            return __result__;
         `
                ))(data);
            };
        }

    })()

};


//region promisify
var customPromisifiedSymbol = '__p$symbol__';

/**
 * 模仿node.js中的util.promisify()
 * 将一个Node.js回调风格的函数，转换为返回promise的函数。
 * 1. 新函数在内部调用original，在参数后添加callback，然后判断Promise的状态。
 * 2. 如果存在original[utils.promisify.custom]，则直接调用该函数。
 * @param original {function}
 * @param context
 * @returns {function}
 */
let promisify = function (original: Function, context?: object): (...args) => Promise<any> {

    if (!isFunction(original)) throw TypeError('promisify(): argument not a function');

    function fn(...args) {
        var custom = original[customPromisifiedSymbol];
        if (custom) {
            if (!isFunction(custom)) throw TypeError(`${original.name}[promisify.custom] is not a function`);
            return Promise.resolve(custom.apply(context || this, args));
        }

        var defer = utils.defer();

        // 如果传入的参数不足fn定义的参数个数，则补足undefined。
        // 但是如果超出了，则还是默认最后添加cb， 因为fn.length不准确，比如使用 ...args形式或使用arguments。
        var paddingArgsLen = fn.length - 1 - args.length;
        if (paddingArgsLen > 0) args = args.concat(fill(new Array(6), undefined));

        try {
            args.push((err, ...values) => {
                if (err) {
                    defer.reject(err);
                } else if (values.length > 1) {
                    defer.resolve(values);
                } else {
                    defer.resolve(values[0]);
                }
            });
            original.apply(context || this, args);
        } catch (e) {
            defer.reject(e);
        }

        return defer.promise;
    }

    // @ts-ignore
    return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
}
//@ts-ignore
promisify.custom = customPromisifiedSymbol;
//endregion

//region date

interface DateAddConfig {
    year?: number,
    month?: number,
    day?: number,
    hour?: number,
    min?: number,
    sec?: number,

    [prop: string]: any
}

const dateMethodMap = {
    year: 'FullYear',
    month: 'Month',
    day: 'Date',
    hour: 'Hours',
    min: 'Minutes',
    sec: 'Seconds'
};

var dateUtils = {
    /**
     * 格式化时间。 支持：年y,月M,天d,24小时H,12小时h,分m,秒s,毫秒S,am/pm a
     * 年份根据y的数量截取，其他值，只补齐不截取。
     * @method formatDate
     * @param date {Date} 日期
     * @param fmt{String} 格式化字符串
     * @return {string}
     * */
    dateFormat(date: Date, fmt = 'yyyy-MM-dd hh:mm:ss') {
        if (!isDate(date)) return '';
        // if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss';

        var hour = date.getHours(),
            a = hour > 12 ? 'pm' : 'am';
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

            if (type === '[') return val.slice(1, -1);
            else if (type === 'a') return map[type];

            tmpResult = utils.paddingLeft(map[type], val.length, '0');
            if (type === 'y') {
                tmpResult = tmpResult.slice(-val.length, tmpResult.length);
            }
            return tmpResult;
        })
    },
    dateParse(str: string, fmt ?: string) {
        if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss';

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
                    result = `\\d{${len}}`;
                } else result = `\\d{4}`;
            } else if (type === 'M' || type === 'd' || type === 'H' || type === 'h' || type === 'm' || type === 's') {
                if (len === 1) {
                    result = '[1-9]\\d|\\d'
                } else { //m>=2
                    result = `\\d{2}`
                }
            } else if (type === 'S') {
                if (len < 3) {
                    result = `\\d{${len}}`
                } else result = `\\d{3}`
            } else if (type === 'a') {
                result = '(am|Am|AM|pm|Pm|PM)?'
            } else if (type === '[') {
                return m.slice(1, -1)
            }

            return `(${result})`;
        });


        var match_tar = new RegExp(reg_matcher_source, 'g').exec(str);
        var match_fmt, index = 1;

        if (!match_tar) throw new Error(`The date format "${fmt}" match the date string "${str}" failed.`);

        var type;
        while (match_fmt = reg_dateFmt.exec(fmt)) {
            type = match_fmt[0].charAt(0);
            if (type === '[') continue;
            arg[type] = type === 'a' ? match_tar[index++] : ~~match_tar[index++];
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

        if (!arg['h']) {
            arg['a'] = 'am';    //跳过下面的+12判断
            arg['h'] = arg['H'] || 0;
        }

        arg['a'] = arg['a'].toLowerCase();
        // if(arg['a']!=='pm') arg['a']='am';

        if (arg['a'] === 'pm') {
            arg['h'] += 12;
        }

        return new Date(arg.y, arg.M, arg.d, arg.h, arg.m, arg.s, arg.S);

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
    dateAdd: function (date: Date, config: number | DateAddConfig) {
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
    firstDateInMonth: function (date: Date) {
        date = new Date(date);
        date.setDate(1);
        return date;
    },
    /**
     * 返回传入日期月份的最后一天
     * @param date
     * @returns {Date} 返回一个新的日期对象
     */
    lastDateInMonth: function (date: Date) {
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
    firstWeekInMonth: function (date: Date) {
        var firstDate = dateUtils.firstDateInMonth(date);
        var day = firstDate.getDay();
        if (day === 0) day = 7;
        return dateUtils.dateAdd(firstDate, 1 - day);
    },
    /**
     * 返回传入日期月份的最后一周的周日。
     * @param date
     * @returns {Date}
     */
    lastWeekInMonth: function (date: Date) {
        var lastDate = dateUtils.lastDateInMonth(date);
        var day = lastDate.getDay();
        if (day !== 0) {
            lastDate = dateUtils.dateAdd(lastDate, 7 - day);
        }
        return lastDate;
    },
    /**
     * 返回开始日期和结束日期的周。计算时忽略时间，只计算日期。
     * @param startDate ｛Date｝ 开始日期。
     * @param endDate   {Date} 结束日期
     * @param splitDay {number} 分割点。对应date.getDay()取值0~6。 默认为1。例如取周一至周日，则splitDay传入1，取周日至周六，splitDay传入0。
     * @returns {Array} 返回周的数组。 每一项为：{start:date,end:date,duration:number}
     * 用例： 获取该月的所有周。
     * var today=new Date();
     * utils.weekRange(utils.firstWeekInMonth(today),utils.lastWeekInMonth(today));
     */
    weekRange: function (startDate: Date, endDate: Date, splitDay?: number): { start: Date, end: Date, duration: number }[] {
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
            } else if (delta === 7) {
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
        } else {
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
    weekendsCount: function (startDate: Date, endDate: Date) {

        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

        //@ts-ignore
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
            } else if (firstDay <= 6 && lastDay >= 6) {
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

//endregion

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

interface GetCookieResult {
    [name: string]: GetCookieResultItem
}

interface GetCookieResultItem {
    value: string,
    values: string | null
}

interface SetCookieOption {
    path?: string,
    domain?: string,
    secure?: boolean,
    expires?: Date | { day?: number, hour?: number, min?: number, sec?: number }
}

var getCookie: (refresh?: boolean) => GetCookieResult = cache(function () {
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
    setCookie = function (key: string, value: string | object, option?: SetCookieOption): GetCookieResultItem {
        var c, val = '', name, date, expires;

        if (!key) return;

        key = key + '';
        if (value == null) value = '';

        if (typeof value === 'object') {//如果传入对象，视为多值cookie
            for (name in value) {
                val += name + '=' + escape(value[name]) + '&';
            }
            val = val.slice(0, -1);  //去除最后一个&
        } else {
            val += escape(value);
        }

        option = option || {};

        //如果options.expires不是时间，则按照{day:num,hour:num,min:num,sec:num}向后递推时间。
        if (option.expires && tostring(option.expires) !== '[object Date]') {
            expires = option.expires;
            date = new Date();
            date.setTime(date.valueOf() +
                (isNumber(expires.day) ? expires.day * 86400 : 0) +
                (isNumber(expires.hour) ? expires.hour * 3600 : 0) +
                (isNumber(expires.min) ? expires.min * 60 : 0) +
                (isNumber(expires.sec) ? expires.sec : 0));
            option.expires = date;
        }


        c = key + '=' + val +
            (option.expires ? ';expires=' + (option.expires as Date).toUTCString() : '') +
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
    deleteCookie = function (key: string, option?: SetCookieOption): boolean {
        setCookie(key, '', assign(option, {expires: {day: -30}}));
        return !(key in getCookie(true));
    };
//endregion


//export result，为了生成完整的ts声明
let result = assign(utils,
    {
        promisify,
        getCookie, setCookie, deleteCookie,
        cookie: {
            delete: deleteCookie,
            del: deleteCookie,
            set: setCookie,
            get(name: string, refresh?: boolean): undefined | string {
                var cookie = getCookie(refresh)[name];
                return cookie && cookie.value;
            },
        }
    },
    dateUtils,
    //alias
    {
        uniq: utils.unique
    }
)

//browser special
if (!isBrowser) {
    ['isWifi', 'download', 'copyTxt',
        'getCookie', 'setCookie', 'deleteCookie'].forEach(key => {
        utils[key] = utils.noop;
    });

    //对应utils.htmlEncode,只能解密由utils.htmlEncode返回的加密字符串。
    utils.htmlDecode = function (txt) {
        txt += '';
        return txt.replace(reg_htmlDecode, function (match, code, br) {
            if (br) return '\n';
            else if (code === '160') {
                code = 32;
            }
            return String.fromCharCode(code);
        })
    }
}

export default result;


