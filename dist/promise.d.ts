interface Defer<T> {
    promise: Promise<T>;
    resolve: (data?: T) => Promise<T>;
    reject: (error?: any) => Promise<T>;
}
interface PromiseWithAbort<T> extends Promise<T> {
    abort(): any;
}
export { Defer, PromiseWithAbort };
export declare const defer: <T>() => Defer<T>;
declare let promisify: (original: Function, context?: object | undefined) => (...args: any[]) => Promise<any>;
export { promisify };
