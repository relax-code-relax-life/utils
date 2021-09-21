import {PromiseWithAbort, defer as utilDefer} from "./promise";

export const tick = function (preFix = '') {
    return preFix + Date.now()
}
const utilTick = tick;

let loopIds = {};
export const loop = function (fn: Function, tick: number, immediate = false): string {
    let key = utilTick('loop');

    var promiseFn = function () {
        return Promise.resolve(fn());
    };

    var delayExec = function () {
        loopIds[key] = setTimeout(wrap, tick);
    };

    var wrap = function () {
        promiseFn().then(delayExec);
    };

    if (immediate) wrap();
    else delayExec();

    return key;
}
export const clearLoop = function (key: string) {
    let timeoutId = loopIds[key];
    if (timeoutId) {
        clearTimeout(timeoutId);
        loopIds[key] = undefined;
    }
};
/**
 * setTimeout的promise形式。通过返回的promise.abort执行clearTimeout
 * @param wait {number}
 * @param [fn] {function}
 * @returns {Promise} 带abort方法的promise
 */
export const timeout = function <T>(wait = 0, fn?: (...args) => T) {
    var defer = utilDefer();
    var id = setTimeout(function () {
        defer.resolve(fn ? fn() : undefined);
    }, wait);

    let promise = defer.promise as PromiseWithAbort<T>;

    promise.abort = function () {
        clearTimeout(id);
    };
    return promise;
};
