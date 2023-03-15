export declare const param: (params: object, encodeEx?: boolean | string[]) => string;
export declare const parseParam: (paramStr: string, decodeEx?: boolean | string[]) => {};
export declare const resolveUrl: (url: string, param?: object, encodeEx?: boolean | string[]) => string;
export declare const getQuery: (url?: string, decodeEx?: boolean | string[]) => {
    [key: string]: string;
};
