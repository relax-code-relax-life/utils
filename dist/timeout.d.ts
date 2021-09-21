import { PromiseWithAbort } from "./promise";
export declare const tick: (preFix?: string) => string;
export declare const loop: (fn: Function, tick: number, immediate?: boolean) => string;
export declare const clearLoop: (key: string) => void;
export declare const timeout: <T>(wait?: number, fn?: ((...args: any[]) => T) | undefined) => PromiseWithAbort<T>;
