export declare const cache: <T extends (...args: unknown[]) => unknown>(fn: T, context?: any, predicate?: ((...args: Parameters<T>) => boolean) | undefined) => (refresh: any, ...args: Parameters<T>) => ReturnType<T>;
export declare const retry: <T extends (...args: any[]) => any>(fn: T, max: number, wait?: number, context?: object) => (...args: Parameters<T>) => Promise<ReturnType<T>>;
declare function throttle(fn: Function, wait?: number, context?: any): any;
declare function throttle(fn: Function, immediately?: boolean, wait?: number, context?: any): any;
declare function throttle(fn: Function, alwaysFn?: Function, wait?: number, context?: any): any;
declare function throttle(fn: Function, alwaysFn?: Function, immediately?: boolean, wait?: number, context?: any): any;
declare function debounce(fn: Function, wait?: number, context?: any): any;
declare function debounce(fn: Function, immediately?: boolean, wait?: number, context?: any): any;
declare function debounce(fn: Function, alwaysFn?: Function, wait?: number, context?: any): any;
declare function debounce(fn: Function, alwaysFn?: Function, immediately?: boolean, wait?: number, context?: any): any;
export { throttle, debounce };
