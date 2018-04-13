//wangweilin

declare namespace utils {

    function guid(prefix = ''): string;

    function noop(): () => void;

    function isUrl(url: string): boolean;

    function isAndroid(ua = navigator.userAgent): boolean;

    function isIos(ua = navigator.userAgent): boolean

    function isWeiXin(ua = navigator.userAgent): boolean

    function isWifi(): boolean | undefined;

    function isIE(ua = navigator.userAgent): null | string;

    function isChrome(ua = navigator.userAgent): null | string;

    function isFirefox(ua = navigator.userAgent): null | string;

    function isSafari(ua = navigator.userAgent): null | string;

    function defer(): { promise: Promise, resolve: (data: any) => void, reject: (data: any) => void };

    function each<T>(obj: T, fn: (value: any, index: number | string, context?: object) => void, obj: T): void;

    function map<T>(obj: T, fn: (value: any, index: number | string, context?: object) => void, obj: T): T;

    function find(obj: Array | object, fn: (value: any, index: number | string, context?: object) => boolean, obj: object): any;

    function unique(arr: Array, isSort = false, map?: (item: any, index: number, arr: Array) => any, context?: object): Array;

    function cache(fn, context?, predicate?: (...args) => boolean): (refresh, ...args) => any;

    function promisify(original: Function): Function

    function loop(fn, tick: number, immediate?: boolean): string;

    function clearLoop(key: string): void;

    function timeout(fn: () => any, wait = 0): Promise

    function throttle(fn, alwaysFn?, immediately?: boolean, wait: number, context?: any)

    function debounce(fn, alwaysFn?, immediately?: boolean, wait: number, context?: any)

    function download(src: string, fileName?: string): void;

    function param(params: object, encodeEx?: boolean | Array<string>): string

    function parseParam(paramStr: string, decodeEx?: boolean | Array<string>): object;

    function resolveUrl(url: string, param: object, encodeEx?: boolean | Array<string>): string;

    function getQuery(url = location.search): object;

    function countStr(txt: string, fullVal = 1, halfVal = 0.5, enterVal = 1): number;

    function copyTxt(txt: string): boolean;

    function htmlEncode(txt: string): string;

    function htmlDecode(val: string): string;

    function camelCase(...args: Array<string>): string

    function paddingLeft(target = '', len, paddingChar = " "): string

    function template(template: string, data: object): string

    function dateFormat(date: Date, fmt?: string): string;

    function dateParse(str: string, fmt?: string): Date;

    function dateAdd(date, config: number | { year?: number, month?: number, day?: number, hour?: number, min?: number, sec?: number }): Date;

    function firstDateInMonth(date: Date): Date;

    function lastDateInMonth(date: Date): Date;

    function firstWeekInMonth(date: Date): Date;

    function lastWeekInMonth(date: Date): Date;

    function weekRange(startDate: Date, endDate: Date, splitDay = 1): Array<{ tart: Date, end: Date, duration: number }>

    function weekendsCount(startDate: Date, endDate: Date): number

    function getCookie(refresh?): object;

    function setCookie(key: string, value: string | object, option?: { path?: string, domain?: string, secure?: boolean, expires?: Date | { day: number, hour: number, min: number, sec: number } }): string

    function deleteCookie(key: string, option): boolean;

    let cookie: {
        del: typeof deleteCookie,
        delete: typeof deleteCookie,
        set: typeof setCookie,
        get(name: string, refresh: boolean): string | undefined
    };

    let uniq: typeof unique;


}


export = utils;

