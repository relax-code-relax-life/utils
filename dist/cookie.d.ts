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
export declare const parseCookie: (cookie: string) => GetCookieResult;
export declare const getCookie: (refresh: any) => GetCookieResult;
export declare const setCookie: (key: string, value: string | object, option?: SetCookieOption) => GetCookieResultItem | undefined;
export declare const deleteCookie: (key: string, option?: SetCookieOption) => boolean;
export declare const cookie: {
    delete: (key: string, option?: SetCookieOption) => boolean;
    del: (key: string, option?: SetCookieOption) => boolean;
    set: (key: string, value: string | object, option?: SetCookieOption) => GetCookieResultItem | undefined;
    get(name: string, refresh?: boolean): undefined | string;
};
export {};
