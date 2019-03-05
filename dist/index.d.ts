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
    isAndroid(ua?: string | undefined): boolean;
    isIos(ua?: string | undefined): boolean;
    isWeiXin(ua?: string | undefined): boolean;
    isWifi(): boolean | undefined;
    isWindows(): boolean;
    isMac(): boolean;
    isUrl(str: string): boolean;
    isArrayLike(o: any): boolean;
    isIE(ua?: string | undefined): string | null;
    isChrome(ua?: string | undefined): string | null;
    isFirefox(ua?: string | undefined): string | null;
    isSafari(ua?: string | undefined): string | null;
    defer(): Defer;
    each<T>(arrayOrObject: SomeObject<T> | T[], fn: (value: T, index: number, obj: SomeObject<T> | T[]) => void, context?: any): void;
    map<T>(arrayOrObject: SomeObject<T> | T[], fn: (value: T, index: number, obj: SomeObject<T> | T[]) => any, context?: any): any[];
    find<T>(arrayOrObject: SomeObject<T> | T[], fn: (value: T, index: number, obj: SomeObject<T> | T[]) => boolean, context?: any): T | undefined;
    unique<T>(arr: T[], isSort?: boolean, fn?: ((item: T, index: number, arr: T[]) => any) | undefined, context?: any): T[];
    cache: (fn: Function, context?: Object | undefined, predicate?: Function | undefined) => (refresh: any, ...args: any[]) => any;
    loop(fn: Function, tick: number, immediate: boolean): string;
    clearLoop(key: string): void;
    timeout<T>(fn: () => T, wait?: number): PromiseWithAbort<T>;
    throttle(fn: Function, alwaysFn?: Function | undefined, immediately?: boolean | undefined, wait?: number | undefined, context?: any): () => void;
    debounce(fn: Function, alwaysFn?: Function | undefined, immediately?: boolean | undefined, wait?: number | undefined, context?: any): () => void;
    download(src: string, fileName: string): void;
    param(params: object, encodeEx?: boolean | string[] | undefined): string;
    parseParam(paramStr: string, decodeEx?: boolean | string[] | undefined): {};
    resolveUrl(url: string, param?: object | undefined, encodeEx?: boolean | string[] | undefined): string;
    getQuery: (url?: string | undefined) => {};
    countStr: (txt: string, fullVal?: number, halfVal?: number, enterVal?: number) => number;
    copyTxt(txt: string): boolean;
    htmlEncode(txt: string): string;
    htmlDecode(val: string): string;
    camelCase(...args: string[]): string;
    kebabCase(...args: string[]): string;
    paddingLeft: (target: string | undefined, len: number, paddingChar: string) => any;
    template: (temp: string, data: object) => string;
} & {
    promisify: (original: Function, context?: object | undefined) => (...args: any[]) => Promise<any>;
    getCookie: (refresh?: boolean | undefined) => GetCookieResult;
    setCookie: (key: string, value: string | object, option?: SetCookieOption | undefined) => GetCookieResultItem | undefined;
    deleteCookie: (key: string, option?: SetCookieOption | undefined) => boolean;
    cookie: {
        delete: (key: string, option?: SetCookieOption | undefined) => boolean;
        del: (key: string, option?: SetCookieOption | undefined) => boolean;
        set: (key: string, value: string | object, option?: SetCookieOption | undefined) => GetCookieResultItem | undefined;
        get(name: string, refresh?: boolean | undefined): string | undefined;
    };
} & {
    dateFormat(date: Date, fmt?: string): string;
    dateParse(str: string, fmt?: string | undefined): Date;
    dateAdd: (date: Date, config: number | DateAddConfig) => Date;
    firstDateInMonth: (date: Date) => Date;
    lastDateInMonth: (date: Date) => Date;
    firstWeekInMonth: (date: Date) => Date;
    lastWeekInMonth: (date: Date) => Date;
    weekRange: (startDate: Date, endDate: Date, splitDay?: number | undefined) => {
        start: Date;
        end: Date;
        duration: number;
    }[];
    weekendsCount: (startDate: Date, endDate: Date) => any;
} & {
    uniq: <T>(arr: T[], isSort?: boolean, fn?: ((item: T, index: number, arr: T[]) => any) | undefined, context?: any) => T[];
};
export default result;
