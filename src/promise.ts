import {fill, isFunction} from "./util";

interface Defer<T> {
    promise: Promise<T>,
    resolve: (data?: T) => Promise<T>,
    reject: (error?: any) => Promise<T>
}

interface PromiseWithAbort<T> extends Promise<T> {
    abort()
}

export {Defer, PromiseWithAbort}

export const defer = function <T>(): Defer<T> {
    var defer = {} as Defer<T>;
    defer.promise = new Promise(function (resolve, reject) {
        defer.resolve = (arg: T) => {
            resolve(arg);
            return defer.promise;
        };
        defer.reject = (reason?: any) => {
            reject(reason);
            return defer.promise;
        };
    });
    return defer;
};
const utilDefer = defer;

//region promisify
var customPromisifiedSymbol = '__p$symbol__';

/**
 * 模仿node.js中的util.promisify()
 * 将一个Node.js回调风格的函数，转换为返回promise的函数。
 * 1. 新函数在内部调用original，在参数后添加callback，然后判断Promise的状态。
 * 2. 如果存在original[utils.promisify.custom]，则直接调用该函数。
 * @param original {function}
 * @param context
 * @returns {function}
 */
let promisify = function (original: Function, context?: object): (...args) => Promise<any> {

    if (!isFunction(original)) throw TypeError('promisify(): argument not a function');

    function fn(...args) {
        var custom = original[customPromisifiedSymbol];
        if (custom) {
            if (!isFunction(custom)) throw TypeError(`${original.name}[promisify.custom] is not a function`);
            return Promise.resolve(custom.apply(context || this, args));
        }

        var defer = utilDefer();

        // 如果传入的参数不足fn定义的参数个数，则补足undefined。
        // 但是如果超出了，则还是默认最后添加cb， 因为fn.length不准确，比如使用 ...args形式或使用arguments。
        var paddingArgsLen = original.length - 1 - args.length;
        if (paddingArgsLen > 0) args = args.concat(fill(new Array(paddingArgsLen), undefined));

        try {
            args.push((err, ...values) => {
                if (err) {
                    defer.reject(err);
                } else if (values.length > 1) {
                    defer.resolve(values);
                } else {
                    defer.resolve(values[0]);
                }
            });
            original.apply(context || this, args);
        } catch (e) {
            defer.reject(e);
        }

        return defer.promise;
    }

    // @ts-ignore
    return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
}
//@ts-ignore
promisify.custom = customPromisifiedSymbol;

export {
    promisify
}
//endregion