export const isBrowser = () => typeof window !== 'undefined' && window.document;
export const userAgent = () => isBrowser() ? navigator.userAgent : '';
export const platform = () => isBrowser() ? navigator.platform : '';

//signature: obj,start,end
const call = Function.prototype.call;
export const tostring = call.bind(Object.prototype.toString);

export const isArray: (arr) => arr is any[] = Array.isArray || function (arr) {
    return tostring(arr) === '[object Array]'
};
export const isNumber = function (val): val is number {
    return typeof val === 'number'
};
export const isFunction = function (fn): fn is Function {
    return tostring(fn) === '[object Function]'
};
export const isBoolean = function (val): val is boolean {
    return typeof val === 'boolean';
};

export const assign = Object.assign
    || function assign(tar, ...extend) {
        extend.forEach(src => {
            for (let name in src) {
                tar[name] = src[name];
            }
        });
        return tar;
    };


export const fill = function (arr: any[], padding: any) {
    if (arr.fill) return arr.fill(padding);
    else {
        for (var i = arr.length - 1; i > -1; i--) {
            arr[i] = padding;
        }
        return arr;
    }
};