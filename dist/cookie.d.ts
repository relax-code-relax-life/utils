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
export declare const getCookie: (refresh?: boolean) => GetCookieResult;
export declare const setCookie: (key: string, value: string | object, option?: SetCookieOption | undefined) => GetCookieResultItem | undefined;
export declare const deleteCookie: (key: string, option?: SetCookieOption | undefined) => boolean;
export declare const cookie: {
    delete: (key: string, option?: SetCookieOption | undefined) => boolean;
    del: (key: string, option?: SetCookieOption | undefined) => boolean;
    set: (key: string, value: string | object, option?: SetCookieOption | undefined) => GetCookieResultItem | undefined;
    get(name: string, refresh?: boolean | undefined): undefined | string;
};
export {};
