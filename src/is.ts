/* region userAgent
 chrome:
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36
 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36
 Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/93.0.4577.78 Mobile/15E148 Safari/604.1
 Mozilla/5.0 (Linux; Android 10; SEA-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.96 Mobile Safari/537.36


 firefox:
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:50.0) Gecko/20100101 Firefox/50.0
 Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0
 Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/37.0  Mobile/15E148 Safari/605.1.15
 Mozilla/5.0 (Android 10; Mobile; rv:92.0) Gecko/92.0 Firefox/92.0

 safari:
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15
 Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1


 ie edge:
 Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063
 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 Edg/93.0.961.52
 Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/93.0.961.57 Version/14.0 Mobile/15E148 Safari/604.1
 Mozilla/5.0 (Linux; Android 10; SEA-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.116 Mobile Safari/537.36 EdgA/45.09.4.5079


 ie11
 Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko
 Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.2; rv:11.0) like Gecko
 Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko

 ie:
 Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.2)
 Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)
 Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)

 微信
 Mozilla/5.0 (Linux; Android 10; SEA-AL10 Build/HUAWEISEA-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045709 Mobile Safari/537.36 MMWEBID/4372 MicroMessenger/8.0.11.1980(0x28000B37) Process/tools WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64"
 Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.13(0x18000d31) NetType/4G Language/zh_CN

安卓 华为默认
Mozilla/5.0 (Linux; Android 10; SEA-AL10; HMSCore 6.1.0.313) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 HuaweiBrowser/11.1.4.301 Mobile Safari/537.36

安卓 qq
Mozilla/5.0 (Linux; U; Android 10; zh-cn; SEA-AL10 Build/HUAWEISEA-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/11.9 Mobile Safari/537.36 COVC/045817

安卓 uc
Mozilla/5.0 (Linux; U; Android 10; zh-CN; SEA-AL10 Build/HUAWEISEA-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 UCBrowser/13.5.7.1137 Mobile Safari/537.36

 * */

import {userAgent, platform, isBrowser} from "./util";

const reg_isAndroid = /Android/i,
    reg_isWeiXin = /MicroMessenger/,
    reg_isIos = /iphone|ipad|ipod|ios/i;

export const isAndroid = function (ua?: string) {
    return reg_isAndroid.test(ua || userAgent());
}
export const isIos = function (ua?: string) {
    return reg_isIos.test(ua || userAgent());
}
export const isWeiXin = function (ua?: string) {
    return reg_isWeiXin.test(ua || userAgent());
}

export const isWindows = function () {
    const p = platform()
    return p === 'Win32' || p === 'Windows' || p === 'Win16' || p === 'Win64' || p === 'WinCE';
}
export const isMac = function () {
    const p = platform();
    return p === 'MacIntel' || p === 'Macintosh' || p === 'MacPPC' || p === 'Mac68K';
}

//返回bool，则正确检测到联网类型。返回undefined，则代表未检测到。
export const isWifi = function (): boolean | undefined {

    if (!isBrowser()) return undefined;

    interface NetworkInformation {
        type?: string;
    }

    type Nav = typeof window.navigator & {
        connection?: NetworkInformation,
        mozConnection?: NetworkInformation,
        webkitConnection?: NetworkInformation
    }

    const n = navigator as Nav;
    var connection = n.connection || n.mozConnection || n.webkitConnection;
    if (connection) {
        // return connection.type === 'wifi';
        return connection.type !== 'cellular'; //认为不为蜂窝网，则即为wifi
    } else if (isWeiXin()) {
        return /NetType\/WIFI/.test(navigator.userAgent);
    } else return undefined;
}


const reg_chrome = /(?:Chrome|CriOS)\/(\d+)/,
    reg_firefox = /(?:Firefox|FxiOS)\/(\d+)/,
    reg_safari = /Version\/([\d.]+)( Mobile\/.+?)? Safari\/\d+/,
    reg_ie = /(?:MSIE |Trident\/.*; rv:)(\d+)/,
    reg_edge = /(?:Edge|Edg|EdgiOS|EdgA)\/(\d+)/; // Edge是历史遗留，Edg是桌面端, EdgIOS、EdgA是ios和android

function browserVersion(reg: RegExp, ua?: string): null | string {
    var match = reg.exec(ua || userAgent());
    return match && match[1];
}

/**
 *
 * @param ua
 * @returns {null|string}
 */
export const isIE = function (ua?: string) {
    return browserVersion(reg_ie, ua);
}
export const isEdge = function (ua?: string) {
    return browserVersion(reg_edge, ua);
}
export const isChrome = function (ua?: string) {
    return browserVersion(reg_chrome, ua);
}
export const isFirefox = function (ua?: string) {
    return browserVersion(reg_firefox, ua);
}
export const isSafari = function (ua?: string) {
    return (browserVersion(reg_chrome, ua) || browserVersion(reg_edge, ua)) ? null : browserVersion(reg_safari, ua);
}


const reg_isUrl = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i;
export const isUrl = function (str: string) {
    return reg_isUrl.test(str);
};

//判断是否为一个类数组对象
//字符串和函数也存在length属性，通过typeof排除
//DOM文本节点也有length属性,用额外的o.nodeType!=3将其排除
//大多方法通过for循环和length属性对数组操作，所以通过length属性判断是否为类数组对象
/**
 *判断是否为类数组。
 *规则：参数为object类型(Node类型除外)，且具有非负整数的、可用的(不为NaN的有限数字)、小于2^32的length属性；则视为类数组。
 */
export const isArrayLike = function (o: any): o is ArrayLike<any> {
    return o &&                 //非null undefined
        typeof o === 'object' &&   //o为对象
        isFinite(o.length) &&           //o.length为有限数字，当传入值的valueof()不能转化为数字返回false
        o.length >= 0 &&                //非负数
        o.length === Math.floor(o.length) && //为整数
        o.length < 4294967296 &&         //小于2^32
        !o.nodeType;                //不包含Node节点
}
