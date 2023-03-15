export declare const isAndroid: (ua?: string) => boolean;
export declare const isIos: (ua?: string) => boolean;
export declare const isWeiXin: (ua?: string) => boolean;
export declare const isWindows: () => boolean;
export declare const isMac: () => boolean;
export declare const isWifi: () => boolean | undefined;
export declare const isIE: (ua?: string) => string | null;
export declare const isEdge: (ua?: string) => string | null;
export declare const isChrome: (ua?: string) => string | null;
export declare const isFirefox: (ua?: string) => string | null;
export declare const isSafari: (ua?: string) => string | null;
export declare const isUrl: (str: string) => boolean;
export declare const isArrayLike: (o: any) => o is ArrayLike<any>;
