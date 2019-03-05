interface Defer {
    promise: Promise<any>;
    resolve: (data?: any) => void;
    reject: (error?: any) => void;
}
interface PromiseWithAbort<T> extends Promise<T> {
    abort(): any;
}
interface SomeObject<T> {
    [prop: string]: T;
}
interface DateAddConfig {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    min?: number;
    sec?: number;
    [prop: string]: any;
}
interface GetCookieResult {
    [name: string]: GetCookieResultItem;
}
interface GetCookieResultItem {
    value: string;
    values: string | null;
}
interface SetCookieOption {
    path?: string;
    domain?: string;
    secure?: boolean;
    expires?: Date | {
        day?: number;
        hour?: number;
        min?: number;
        sec?: number;
    };
}
declare let result: {
    guid(preFix?: string): string;
    noop(): void;
    isAndroid(ua?: string): boolean;
    isIos(ua?: string): boolean;
    isWeiXin(ua?: string): boolean;
    isWifi(): boolean;
    isWindows(): boolean;
    isMac(): boolean;
    isUrl(str: string): boolean;
    isArrayLike(o: any): boolean;
    isIE(ua?: any): string;
    isChrome(ua?: any): string;
    isFirefox(ua?: any): string;
    isSafari(ua?: any): string;
    defer(): Defer;
    each<T>(arrayOrObject: SomeObject<T> | T[], fn: (value: T, index: number, obj: SomeObject<T> | T[]) => void, context?: any): void;
    map<T>(arrayOrObject: SomeObject<T> | T[], fn: (value: T, index: number, obj: SomeObject<T> | T[]) => any, context?: any): any[];
    find<T>(arrayOrObject: SomeObject<T> | T[], fn: (value: T, index: number, obj: SomeObject<T> | T[]) => boolean, context?: any): T;
    unique<T>(arr: T[], isSort?: boolean, fn?: (item: T, index: number, arr: T[]) => any, context?: any): T[];
    cache: (fn: Function, context?: Object, predicate?: Function) => (refresh: any, ...args: any[]) => any;
    loop(fn: Function, tick: number, immediate: boolean): string;
    clearLoop(key: string): void;
    timeout<T>(fn: () => T, wait?: number): PromiseWithAbort<T>;
    throttle(fn: Function, alwaysFn?: Function, immediately?: boolean, wait?: number, context?: any): () => void;
    debounce(fn: Function, alwaysFn?: Function, immediately?: boolean, wait?: number, context?: any): () => void;
    download(src: string, fileName: string): void;
    param(params: object, encodeEx?: boolean | string[]): string;
    parseParam(paramStr: string, decodeEx?: boolean | string[]): {};
    resolveUrl(url: string, param?: object, encodeEx?: boolean | string[]): string;
    getQuery: (url?: string) => {};
    countStr: (txt: string, fullVal?: number, halfVal?: number, enterVal?: number) => number;
    copyTxt(txt: string): boolean;
    htmlEncode(txt: string): string;
    htmlDecode(val: string): string;
    camelCase(...args: string[]): string;
    kebabCase(...args: string[]): string;
    paddingLeft: (target: string, len: number, paddingChar: string) => any;
    template: (temp: string, data: object) => string;
} & {
    promisify: (original: Function, context?: object) => (...args: any[]) => Promise<any>;
    getCookie: (refresh?: boolean) => GetCookieResult;
    setCookie: (key: string, value: string | object, option?: SetCookieOption) => GetCookieResultItem;
    deleteCookie: (key: string, option?: SetCookieOption) => boolean;
    cookie: {
        delete: (key: string, option?: SetCookieOption) => boolean;
        del: (key: string, option?: SetCookieOption) => boolean;
        set: (key: string, value: string | object, option?: SetCookieOption) => GetCookieResultItem;
        get(name: string, refresh?: boolean): string;
    };
} & {
    dateFormat(date: Date, fmt?: string): string;
    dateParse(str: string, fmt?: string): Date;
    dateAdd: (date: Date, config: number | DateAddConfig) => Date;
    firstDateInMonth: (date: Date) => Date;
    lastDateInMonth: (date: Date) => Date;
    firstWeekInMonth: (date: Date) => Date;
    lastWeekInMonth: (date: Date) => Date;
    weekRange: (startDate: Date, endDate: Date, splitDay?: number) => {
        start: Date;
        end: Date;
        duration: number;
    }[];
    weekendsCount: (startDate: Date, endDate: Date) => any;
} & {
    uniq: <T>(arr: T[], isSort?: boolean, fn?: (item: T, index: number, arr: T[]) => any, context?: any) => T[];
};
export default result;
