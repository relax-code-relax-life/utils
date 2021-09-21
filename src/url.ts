import {isBrowser, isArray, assign} from "./util";

function formatExcludeParam(val: boolean | string[]) {
    let excludeMap = {}, excludeAll = false;
    if (isArray(val)) {
        val.forEach(key => excludeMap[key] = true);
    } else {
        excludeAll = val;
    }
    return {
        map: excludeMap,
        isAll: excludeAll
    }
}

function decodeSearchParam(value, key) {
    try {
        return decodeURIComponent(value);
    } catch (e) {
        e.message = `URI malformed (malformed key: ${key})`;
        throw e;
    }
}

const reg_parseParam = /(?:^|&)(.*?)=(.*?)(?=&|$)/g,
    reg_resolveUrl = /(\?([^#]*))?(#.*)?\s*$/,
    reg_query = /(?:[?&])(.*?)(?:=(.*?))?(?=&|$|#)/g;

/**
 * 将对象转换为key=val&key1=value1的参数形式
 * value默认通过encodeURIComponent转义，通过encodeEx不转义。
 * @param params
 * @param encodeEx {Boolean|Array} 不进行转义。数组形式:[key1,key2,...]，指定特定的key不进行转义
 * @returns {*}
 */
export const param = function (params: object, encodeEx: boolean | string[] = false): string {
    if (params == null || typeof params !== 'object') return params ? params + '' : '';
    var result: string[] = [], val, enc = encodeURIComponent;

    //格式化excludeMap: {key1:bool,key2:bool}
    var fmtEncodeEx = formatExcludeParam(encodeEx);
    var excludeMap = fmtEncodeEx.map,
        excludeAll = fmtEncodeEx.isAll;

    for (let key in params) {
        val = params[key];
        if (val == null) val = '';
        else if (typeof val === 'object') val = JSON.stringify(val);

        val = (excludeAll || excludeMap[key]) ? val : enc(val);

        result.push(enc(key) + '=' + val);
    }

    return result.join('&');
};
const utilParam = param;

/**
 * 将key=value&key1=value1形式的字符串转换成对象，相对于param方法。
 * value默认使用decodeURIComponent进行解密，可以通过decodeEx参数不进行解密。
 * @param paramStr {String}
 * @param decodeEx {Boolean|Array}
 * @returns {{}}
 */
export const parseParam = function (paramStr: string, decodeEx: boolean | string[] = false) {
    var data = {},
        match,
        decode = decodeSearchParam;

    var fmtDecodeEx = formatExcludeParam(decodeEx);
    var excludeMap = fmtDecodeEx.map,
        excludeAll = fmtDecodeEx.isAll;

    reg_parseParam.lastIndex = 0;

    let key;
    while (match = reg_parseParam.exec(paramStr)) {
        key = match[1];
        data[key] = excludeAll || excludeMap[key] ? match[2] : decode(match[2], key);
    }

    return data;
};

/**
 * 针对url添加查询字符串。
 * 该方法不是一个绝对安全的方法，可能会改变原url中查询字符串中参数的顺序，以及丢失无法解析的值。
 * 例如: resolveUrl('localhost?name=wwl&abc&=123',{sex:'male'}) 会返回: localhost?sex=male&name=wwl&abc=
 * @param url {String}
 * @param param {Object} 代表查询字符串的参数对象
 * @param encodeEx {Boolean|Array} 为true，代表不进行转义。默认为false,即转义。
 * @returns {string}
 */
export const resolveUrl = function (url: string, param?: object, encodeEx?: boolean | string[]) {
    param = assign(getQuery(url), param);
    let queryStr = utilParam(param, encodeEx);
    return url.replace(reg_resolveUrl, '?' + queryStr + '$3');
}

/**
 *返回代表查询字符串的键值对。默认使用decodeURIComponent进行解密，可以通过decodeEx参数不进行解密。
 *@method getQuery
 *@param [url] 需要解析的字符串，默认为location.search
 *@param [decodeEx]
 *@return {Object.<string,string>} 返回代表当前url中查询字符串的键值对对象。
 * 用例：
 * utils.getQuery().id 或者 utils.getQuery('localhost/indexhtml?id=idinfo').id
 */
export const getQuery = function (url?: string, decodeEx: boolean | string[] = false): { [key: string]: string } {
    var q = {}, match;
    var fmtDecodeEx = formatExcludeParam(decodeEx);
    var decode = decodeSearchParam;

    reg_query.lastIndex = 0;

    var key, val;
    while (match = reg_query.exec(url || (isBrowser() && location.search) || '')) {
        key = match[1];
        val = match[2];
        if (!key) continue;    // ?=123&
        if (!val) val = '';
        q[decode(key, key)] = fmtDecodeEx.isAll || fmtDecodeEx.map[key] ? val : decode(val, key);
    }
    return q;
}

