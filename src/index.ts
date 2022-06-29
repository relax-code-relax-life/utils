/**
 * Created by wangweilin on 2017/6/9.
 */

import {isBrowser, isFunction} from "./util";

export const noop = function () {
}

export const download = function (src: string, fileName: string) {
    if (!isBrowser()) throw new Error('Method \`download\` can only be invoked in browser environment.');

    var link = document.createElement('a');
    link.download = fileName;
    link.href = src;
    link.target = '_blank';

    var event = document.createEvent('MouseEvents');
    event.initEvent('click', false, false);
    link.dispatchEvent(event);
}

/**
 * 复制文本
 * @param txt
 * @returns {boolean} 复制成功返回true, 复制出错返回false
 */
export const copyTxt = function (txt: string) {
    if (!isBrowser()) throw new Error('Method \`copyTxt\` can only be invoked in browser environment.');
    try {
        if (!_copyTxt(txt)) {
            return false;
        }
    } catch (err) {
        return false;
    }
    return true;
}
const _copyTxt = (function () {
    var getFakeEle = function () {
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
    return function (txt: string): boolean {

        var ele = getFakeEle();
        ele.value = txt;
        ele.select();
        return document.execCommand('copy');
    }
})();

// 返回只包含指定属性的对象
export const pick = function <T extends object, K extends keyof T>(tar: T, keys: string[] | ((key: string) => boolean)): Pick<T, K> | {} {
    if (!tar) return {};
    let pickKeys: string[] = [];
    if (isFunction(keys)) {
        pickKeys = Object.keys(tar).filter(keys);
    } else if (Array.isArray(keys)) {
        pickKeys = keys;
    } else return {}

    return pickKeys.reduce((result, key) => {
        if (key in tar) {
            result[key] = tar[key];
        }
        return result;
    }, {})
};

export {
    PromiseWithAbort,
    Defer,
    defer,
    promisify
} from './promise';

export {each, map, find, unique} from './collection';
export {parseCookie, getCookie, setCookie, deleteCookie, cookie} from './cookie'
export {
    dateFormat,
    dateParse,
    dateAdd,
    firstDateInMonth,
    lastDateInMonth,
    firstWeekInMonth,
    lastWeekInMonth,
    weekRange,
    weekendsCount
} from './date';
export {cache, retry, throttle, debounce} from './function';
export {
    isAndroid,
    isIos,
    isWeiXin,
    isWifi,
    isWindows,
    isMac,
    isIE,
    isEdge,
    isChrome,
    isFirefox,
    isSafari,
    isUrl,
    isArrayLike
} from './is';
export {countStr, camelCase, kebabCase, paddingLeft, htmlEncode, htmlDecode, template} from './str';
export {tick, loop, clearLoop, timeout} from './timeout';
export {param, parseParam, resolveUrl, getQuery} from './url';





