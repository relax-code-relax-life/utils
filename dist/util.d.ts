export declare const isBrowser: () => false | Document;
export declare const userAgent: () => string;
export declare const platform: () => string;
export declare const tostring: any;
export declare const isArray: (arr: any) => arr is any[];
export declare const isNumber: (val: any) => val is number;
export declare const isFunction: (fn: any) => fn is Function;
export declare const isBoolean: (val: any) => val is boolean;
export declare const assign: {
    <T, U>(target: T, source: U): T & U;
    <T_1, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
export declare const fill: (arr: any[], padding: any) => any[];
