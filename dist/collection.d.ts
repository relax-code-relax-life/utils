export declare const each: <T extends object | any[]>(arrayOrObject: T, fn: (value: any, index: T extends any[] ? number : string, obj: T) => void, context?: any) => void;
export declare const map: <T extends object | any[], N>(arrayOrObject: T, fn: (value: any, index: T extends object ? string : number, obj: T) => N, context?: any) => N[];
export declare const find: <T extends object | any[]>(arrayOrObject: T, fn: (value: any, index: T extends any[] ? number : string, obj: T) => boolean, context?: any) => any | undefined;
export declare const unique: <T>(arr: T[], isSort?: boolean, fn?: ((item: T, index: number, arr: T[]) => any) | undefined, context?: any) => T[];
