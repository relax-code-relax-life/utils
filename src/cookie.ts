import {cache} from "./function";
import {assign, tostring, isNumber, isBrowser} from "./util";

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

export const parseCookie = (cookie: string): GetCookieResult => {
    //str:用于测试的模仿cookie的值,包含多种可能的情况
    //var str = "test=cookie\'s value&one=6&two=2; 2=cookie2; empty; ; mu lti=multiValue&name1=value1&name2=values2";

    //将忽略名为空或值为空的cookie
    var c = {},
        reg = /(?:;\s|^)([^;]*?)=([^;]*)/g,
        subReg = /([^&]+)=([^&]+)(?:&|$)/g,
        m, subm;
    while (m = reg.exec(cookie)) { //解析cookie //key:m[1]  value:m[2]
        c[m[1]] = {value: unescape(m[2]), values: null};
        while (subm = subReg.exec(m[2])) { //存在多值cookie,忽略没有名称的子value
            c[m[1]].values = c[m[1]].values || {};
            c[m[1]].values[subm[1]] = unescape(subm[2]);
        }
    }
    return c;
}

export const getCookie: (refresh?: boolean) => GetCookieResult = cache(function () {
    if (!isBrowser()) return;
    return parseCookie(document.cookie);
});
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
export const setCookie = function (key: string, value: string | object, option?: SetCookieOption): GetCookieResultItem | undefined {
    if (!isBrowser()) return;

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
            (isNumber(expires.day) ? expires.day * 86400 * 1000 : 0) +
            (isNumber(expires.hour) ? expires.hour * 3600 * 1000 : 0) +
            (isNumber(expires.min) ? expires.min * 60 * 1000 : 0) +
            (isNumber(expires.sec) ? expires.sec * 1000 : 0));
        option.expires = date;
    }


    c = key + '=' + val +
        (option.expires ? ';expires=' + (option.expires as Date).toUTCString() : '') +
        (option.path ? '; path=' + option.path : '') +
        (option.domain ? '; domain=' + option.domain : '') +
        (option.secure ? '; secure' : '');

    document.cookie = c;

    return getCookie(true)[key];
};
/**
 *删除一个cookie,并同时更新缓存cookie对象，即调用adai.getCookie(true);
 *@method deleteCookie
 *@param key {String} 要删除的cookie的名称
 *@param option {Object} 需要传入和设置cookie时相同的option,才能正确删除。
 *@return {boolean} 是否成功删除cookie,已删除则返回true,未删除false;
 */
export const deleteCookie = function (key: string, option?: SetCookieOption): boolean {
    if (!isBrowser()) return false;
    setCookie(key, '', assign(option, {expires: {day: -30}}));
    return !(key in getCookie(true));
};

export const cookie = {
    delete: deleteCookie,
    del: deleteCookie,
    set: setCookie,
    get(name: string, refresh?: boolean): undefined | string {
        var cookie = getCookie(refresh)[name];
        return cookie && cookie.value;
    }
}