import {isArray} from "./util";

export const each = function <T extends object | any[]>(
    arrayOrObject: T,
    fn: (value: any, index: T extends any[] ? number : string, obj: typeof arrayOrObject) => void,
    context?: any
): void {
    let obj = arrayOrObject;
    if (isArray(obj)) {
        // @ts-ignore
        return obj.forEach(fn, context);
    }

    //只遍历自有可枚举属性
    Object.keys(obj).forEach(key => {
        fn.call(context, obj[key], key, obj);
    })
}

export const map = function <T extends any[] | object, N>(
    arrayOrObject: T,
    fn: (value: any, index: T extends object ? string : number, obj: typeof arrayOrObject) => N,
    context?: any
): N[] {
    let obj = arrayOrObject;
    if (isArray(obj)) {
        // @ts-ignore
        return obj.map(fn, context);
    }

    let result: N[] = [];
    each(obj, (val, key) => {
        result.push(fn.call(context, val, key, obj));
    });
    return result;
}

export const find = function <T extends any[] | object>(
    arrayOrObject: T,
    fn: (value: any, index: T extends any[] ? number : string, obj: typeof arrayOrObject) => boolean,
    context?: any
): any | undefined {
    let obj = arrayOrObject;
    if (isArray(obj)) {
        // @ts-ignore
        return obj.find(fn, context);
    }
    let key = Object.keys(obj).find(function (key) {
        return fn.call(context, obj[key], key, obj);
    });

    return key && obj[key];
}

/**
 * 不改变数组顺序的情况下去重,
 * @param arr {Array}
 * @param [isSort] {Boolean} 默认false.
 *          如果已排序，则和前一个值作恒等比较，如果未排序，则通过includes是否存在。
 * @param [fn] {Function} map函数。根据fn返回的值做比较。 fn(item,index,arr);
 * @param [context] {Object} map函数的this值。
 * @return {Array} 返回新数组。
 */
export const unique = function <T>(
    arr: T[],
    isSort = false,
    fn?: (item: T, index: number, arr: T[]) => any,
    context?: any): T[] {

    if (typeof isSort === 'function') {
        context = fn;
        fn = isSort;
        isSort = false;
    }

    if (typeof Set === 'function' && !fn) {
        return Array.from(new Set(arr));
    }

    let result: T[] = [];

    let mapArr = fn ? arr.map(fn, context) : arr;

    if (isSort) {
        let pre;
        mapArr.forEach((item, i) => {
            if (pre !== item) {
                pre = item;
                result.push(arr[i]);
            }
        });
    } else {
        //提前map
        let mapResult: T[] = [];
        mapArr.forEach(function (item, i) {
            if (!mapResult.includes(item)) {
                mapResult.push(item);
                result.push(arr[i]);
            }
        });
    }

    return result;
}