import {isFunction, isBoolean} from "./util";
import {timeout} from "./timeout";

//缓存函数。  将函数结果缓存，函数实际只执行一次。
//predicate 判断在refresh为false时，是否使用缓存
export const cache = function <T extends (...args: unknown[]) => unknown>(fn: T, context?: any, predicate?: (...args: Parameters<T>) => boolean) {
    var result,
        isExecute; //判断是否执行过fn，不能通过result判断，因为fn有可能返回undefined
    return function (refresh, ...args: Parameters<T>): ReturnType<T> { //第一个参数为 是否强制刷新

        !context && (context = this);

        //从未执行过 或 强制刷新 或 predicate要求刷新(返回true)
        if (!isExecute || refresh || (predicate && predicate.apply(context, args))) {
            result = fn.apply(context, args);
        }

        return result;
    }
};

export const retry = function <T extends (...args: any[]) => any>(fn: T, max: number, wait = 0, context: object = this) {

    if (typeof max !== 'number') throw new TypeError('the parameter max is not a number');

    let cnt = 0;

    const exec: (...args: Parameters<T>) => Promise<ReturnType<T>> = function () {
        cnt++;
        return Promise.resolve(fn.apply(context, arguments))
            .then(
                (data) => {
                    cnt = 0;
                    return data;
                },
                function (err) {
                    if (cnt < max) {
                        if (wait > 0) return timeout(wait, (...args) => exec.apply(this, args));
                        return exec.apply(this, arguments);
                    } else {
                        cnt = 0;
                        return Promise.reject(err);
                    }
                }
            )
    };
    return exec;
}

//间隔wait执行, fn阶段性的执行。在wait时间里实际只执行fn一次，多次调用则到下一个wait时间才能执行。
//optional:alwaysFn,immediately,context
function throttle(fn: Function, wait?: number, context?: any)
function throttle(fn: Function, immediately?: boolean, wait?: number, context?: any);
function throttle(fn: Function, alwaysFn?: Function, wait?: number, context?: any);
function throttle(fn: Function, alwaysFn?: Function, immediately?: boolean, wait?: number, context?: any)
function throttle(fn: Function, ...restArgs) {
    let [alwaysFn, immediately, wait, context] = restArgs;
    if (!isFunction(alwaysFn)) {
        context = wait;
        // @ts-ignore
        wait = immediately;
        immediately = alwaysFn;
        alwaysFn = undefined;
    }
    if (!isBoolean(immediately)) {
        context = wait;
        // @ts-ignore
        wait = immediately;
        immediately = false;
    }
    if (wait == null) wait = 300;

    let oriContext = context;
    let timeoutId, args,
        execFn;

    if (immediately) {
        execFn = function () {
            fn.apply(context, args);
            timeoutId = setTimeout(function () {
                timeoutId = undefined;
            }, wait);
        }
    } else {
        execFn = function () {
            timeoutId = setTimeout(function () {
                fn.apply(context, args);
                timeoutId = undefined;
            }, wait);
        }
    }

    return function () {
        args = arguments;
        !oriContext && (context = this);
        alwaysFn && alwaysFn.apply(context, args);
        if (!timeoutId) execFn();
    }
}

// 防抖动
// immediately为false, 则如果在wait时间里一直调用，fn就一直不执行，等最后一次调用的wait时间之后，才执行fn
// immediately为true, 则如果在wait时间里一直调用，第一次调用的时候执行fn，之后的调用都不执行，等最后一次调用的wait时间之后再调用才会执行fn
// optional:alwaysFn,immediately,context
function debounce(fn: Function, wait?: number, context?: any);
function debounce(fn: Function, immediately?: boolean, wait?: number, context?: any);
function debounce(fn: Function, alwaysFn?: Function, wait?: number, context?: any);
function debounce(fn: Function, alwaysFn?: Function, immediately?: boolean, wait?: number, context?: any)
function debounce(fn: Function, ...restArgs) {
    let [alwaysFn, immediately, wait, context] = restArgs;

    if (!isFunction(alwaysFn)) {
        context = wait;
        // @ts-ignore
        wait = immediately;
        immediately = alwaysFn;
        alwaysFn = undefined;
    }
    if (!isBoolean(immediately)) {
        context = wait;
        // @ts-ignore
        wait = immediately;
        immediately = false;
    }

    if (wait == null) wait = 300;

    let oriContext = context;

    let timeoutId, arg;

    let setTimer = function (fn) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fn, wait)
    };

    let execFn;
    if (immediately) {

        execFn = function () {
            if (!timeoutId) fn.apply(context, arg);
            setTimer(function () {
                timeoutId = undefined
            });
        }
    } else {
        execFn = function () {
            setTimer(function () {
                fn.apply(context, arg);
                timeoutId = undefined;
            });
        }
    }

    return function () {
        arg = arguments;

        !oriContext && (context = this);

        execFn();

        alwaysFn && alwaysFn.apply(context, arg);
    }
}

// throttle/debounce 单独使用function声明，而不是放在utils对象里，是因为在ts的对象字面量语法里，不支持overload
export {
    throttle,
    debounce
};
