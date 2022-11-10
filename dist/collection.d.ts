export declare function each<T extends unknown[]>(arr: T, fn: (value: T[number], index: number, arr: T) => void, context?: any): void;
export declare function each<T extends object>(obj: T, fn: (value: T[keyof T], key: keyof T, obj: T) => void, context?: any): void;
export declare const map: <T extends object | any[], N>(arrayOrObject: T, fn: (value: any, index: T extends object ? string : number, obj: T) => N, context?: any) => N[];
export declare const find: <T extends object | any[]>(arrayOrObject: T, fn: (value: any, index: T extends any[] ? number : string, obj: T) => boolean, context?: any) => any | undefined;
declare type uniqueMapFn<T> = (item: T, index: number, arr: T[]) => any;
export declare function unique<T>(arr: T[], mapFn?: uniqueMapFn<T>, context?: any): T[];
export declare function unique<T>(arr: T[], isSort?: boolean, mapFn?: uniqueMapFn<T>, context?: any): T[];
export {};
