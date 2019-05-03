javascript工具函数。

# 下载
* npm: `npm install --save relax-utils`
* 直接下载: `http://wangwl.net/static/demo/relax-utils/index.js`

# 使用
* es2015: `import utils from "relax-utils"`
* commonjs: `var utils = require("relax-utils")`
* amd: `define( ["/js/relax-utils.js"] , (utils)=>{ /*...*/ } )`
* window.utils: `<script src="http://wangwl.net/static/demo/relax-utils/index.js"></script>`
* self.utils: `importScripts("./utils.js")`


# utils API
## guid
 function guid(preFix?: string): string;
 
 返回一个唯一序号。
 ```javascript
 utils.guid();          //  "1"
 utils.guid('prefix');  //  "prefix2"
 ```

## noop
function noop(): void;

空函数，即: function(){};

## isUrl
function isUrl(str: string): boolean;
判断传入str是否为url格式。

## isArrayLike
function isArrayLike(obj: any): boolean;

检测是否为类数组，如果是，则该对象可以通过Array#slice或Array.from转换为数组类型。

## isAndroid、isIos、isWeiXin
function (ua = navigator.userAgent): boolean;

根据传入的userAgent的值，判断是否是android,ios,微信。

默认使用当前navigator.userAgent。
```javascript
var ua="Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
utils.isIos();      //false
utils.isIos(ua);    //true 
```

## isWindows、isMac
function(): boolean

检查当前操作系统是否为windows或Mac。

## isWifi
function isWifi(): boolean | undefined;

如果正确检测到联网类型，则返回布尔值，true代表当前是wifi环境。

如果未检测到(例如某些api不支持或出错)，则返回undefined


## isIE、isChrome、isFirefox、isSafari
function isIE(ua = navigator.userAgent): null | string;

function isChrome(ua = navigator.userAgent): null | string;

function isFirefox(ua = navigator.userAgent): null | string;

function isSafari(ua = navigator.userAgent): null | string;

如果匹配，返回当前浏览器的版本号，如果不符合，返回null.
```javascript
var ua="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Safari/604.1.38";
utils.isChrome();   //null;
utils.isSafari(ua); //"604"
```

## defer
function defer(): { promise: Promise, resolve: (data: any) => void, reject: (err: any) => void };

创建一个延迟对象。


## each
```typescript
function each(     
    obj: Object | Array<any>, 
    fn: (value: any, index: string | number, obj: object | Array) => void, 
    context?: any) : void;
```

遍历数组或者对象。

当obj是对象时，则借助Object.keys(obj)的返回值进行遍历，即只遍历自有的可枚举属性。

## map
```typescript
function map(
    obj: Object | Array<any>, 
    fn: (value: any, index: string | number, obj: Object|Array) => any, 
    context?: any): any[];
```

映射一个新的数组或对象。

如果obj为对象，则借助Object.keys(obj)进行映射。

## find

```typescript
function find(
    obj: Array | Object, 
    fn: (value: any, index: string | number, obj: Array|Object) => boolean, 
    context: Object): any | undefined;

```
返回fn为true时的值。

如果obj为数组，则调用Array#find() ， 如果obj为对象，则借助Object.keys(obj)#find()进行查找。


## unique、uniq
```typescript
function unique<T>(
    arr: Array<T>, 
    isSort = false, 
    map?: (item: T, index: number, arr: Array<T>) => any, 
    context?: Object): Array<any>;
```

不改变数组顺序的情况下去重，返回一个新的数据。uniq为unique的别名。

isSort:是否已排序，默认false。如果未排序，则借助includes判断是否存在。

map:映射函数，根据map函数的返回值进行比较。会调用arr.length次map函数。

context：map函数的this值。

当未指定map且支持`Set`时： 则忽略isSort，优先借助`Set`进行去重。

```javascript
 utils.uniq([5, 2, 3, '5', 2]);   //[5,2,3,5]
 utils.uniq([5, 2, 3, '5', 2],item=>parseInt(item));    //[5,2,3]
```

## cache

```typescript
function cache(
    fn:Function, 
    context?:Object, 
    predicate?: (...args) => boolean ) : (refresh, ...args) => any;

```
返回一个新的缓存函数。

返回的函数签名为:function(refresh,...args); refresh判断是否强制刷新，剩余参数传给fn。

predicate为可选的，如果传入predicate，在refresh为false时，会根据predicate的返回值判断是否需要刷新。

context为可选的,可以通过context设置返回函数和predicate的this值，
```javascript

var  ori=function(a,b){ return a; };
var  cache=utils.cache(ori,function(a,b){return a>b});

cache(true,1,2);    //1
cache();            //1
cache(false,5,6);   //1
cache(true,5,6);    //5
cache(false,8,7);   //8 

```

## promisify

function promisify(original: Function, context?: object): Function

将node.js回调风格的函数，转换为返回promise的函数。 

模仿node.js中的util.promisify，调用方式一致。

通过可选的context参数设置original执行时的this值。

```javascript
//node.js异步回调风格: 最后一个参数为回调函数，且回调函数的第一个参数为err。
var add = function (a, b, callback) {
    if (typeof a !== 'number') callback('not a number');
    else callback(null, a + b);
}

utils.promisify(add)(1, 2).then(
    (result) => console.log(result === 3),//true
    (err) => console.log(err)           //该回调不会执行
);

utils.promisify(add)('abc', 2).then(
    (result) => console.log(result), //该回调不执行
    (err) => console.log(err)       //"not a number"
)
```

与node.js中util.promisify的区别在于，
1. 该promisify()会判断当传入参数个数小于original时，会补全参数。
2. 支持callback返回多个值的情况。
```javascript
// nodejs环境
const nodeUtil = require('util');
const relaxUtil = require('./dist/index');

const print = function (a, b, cb) {
    cb(null, a, b);
}
const printSingle = function (a, cb) {
    cb(null, a);
}

const nodePromisify = nodeUtil.promisify(print);
const relaxPromisify = relaxUtil.promisify(print);
const relaxPromisifySingle = relaxUtil.promisify(printSingle);

nodePromisify('param1').then(
    (result) => console.log('success:', result),
    (error) => console.log('error:', error)
);
//error: TypeError: cb is not a function

nodePromisify('param1', 'param2').then(
    (result) => console.log('success', result),
);
//success: param1

relaxPromisify('param1').then(
    (result) => console.log('success:', result),
)
//success: ['param1',undefined]

relaxPromisify('param1', 'param2').then(
    (results) => console.log('success:', results),
);
//success: ['param1','param2']

relaxPromisifySingle('param1').then(
    (result) => console.log('success:',result)
);
//success: 'param1'

```

可以通过设置`original[utils.promisify.custom]`来自定义promise的返回值。

当original不是标准的node.js回调风格函数时候，utils.promisify.custom会比较有用。

```javascript
var add=function(cb,a,b){
    return cb(a+b);
};

add[utils.promisify.custom]=function(a,b){
    return new Promise(function(resolve,reject){
        add( resolve,a+1,b );
    })
}

utils.promisify(add)(1,2).then( (result)=>{ console.log(result) } ) //4
```


## loop
function loop(fn: Function, tick: number, immediate = false ): string;

根据setTimeout循环执行fn，支持fn返回一个promise来控制是否继续循环

返回一个key值。在clearLoop()中传入该值来取消循环。

## clearLoop
function clearLoop(key: string): void;

取消循环执行。

key为loop()方法返回的值。

## timeout
function timeout<T>(wait = 0, fn?: (...args) => T): Promise<T>;

setTimeout的promise版本。返回一个Promise对象。
fn是可选的，如果传入fn，则该Promise返回的是fn的返回的值，如果未传入fn，则该Promise返回undefined。

返回的Promise对象带有abort()方法，该方法内部调用clearTimeout，可以通过该方法取消该定时任务。

```javascript

var promise=utils.timeout(() => { return 5 },1000);

promise.then(data=>data===5); //true
typeof promise.abort==='function'; //true

```

## throttle 、 debounce
function throttle(fn: Function, alwaysFn?: Function, immediately?: boolean, wait=300, context?: object)   

function debounce(fn: Function, alwaysFn?: Function, immediately?: boolean, wait=300, context?: object) 

截流和防抖动。

fn: 目标执行方法。

alwaysFn: 每次调用都会执行的方法。

immediately: 是否立即执行。如果为true,则会在第一次调用时立即执行fn,忽略后续的调用。

wait:指定时间，以毫秒为单位。

context: 指定alwaysFn和fn的this值，如果省略，则为结果函数的this值。
```javascript
var obj={};
var fn=function(){ console.log(this===obj) };
obj.fn=utils.debounce(fn,()=>{console.log(1)},1000);
obj.fn();
obj.fn();
//1
//1
//true
```

## download
function download(url: string, fileName: string): void;

触发下载指定的url，而不是打开一个新窗口。

在node环境下，该方法为noop()。

## param
function param(params: object, encodeEx?: boolean | string[] ): string;

将对象转换为key=val&key1=value1的字符串形式。

value默认通过encodeURIComponent转义，

encodeEx设置为true，则不进行转义，或者设置为一个数组[key1,key2]指定特定的key不进行转义。
```javascript
utils.param({name:'+wwl'});         //"name=%2Bwwl"
utils.param({name:'+wwl'},true);    //"name=+wwl"
utils.param({name:'+wwl'},['name']);//"name=+wwl"
```

## parseParam
function parseParam(paramStr: string, decodeEx?: boolean | string[] ): {};

将key=value&key1=value1形式的字符串转换成对象，param的反向操作。

value默认会通过decodeURIComponent进行解密。

通过设置decodeEx参数不进行解密。
```javascript
utils.parseParam('name=%2Bwwl')             //{name:"+wwl"}
utils.parseParam('name=%2Bwwl',true)        //{name:"%2Bwwl"}
utils.parseParam('name=%2Bwwl',['name'])    //{name:"%2Bwwl"}

```

## resolveUrl
function resolveUrl(url: string, param?: object , encodeEx?: boolean | string[] ): string;

在指定的url上添加查询字符串。
```javascript
//该方法不是一个绝对安全的方法，可能会改变原url中查询字符串中参数的顺序，以及丢失无法解析的值。
//例如:
resolveUrl('localhost?name=wwl&abc',{sex:'male'});
//可能会返回: localhost?sex=male&name=wwl
```

## getQuery
function getQuery(url = location.search): object;

返回代表查询字符串的键值对。

默认处理当前页面的url。
```javascript
utils.getQuery().id;
utils.getQuery('localhost/indexhtml?id=idinfo').id
```

## countStr
function countStr(txt: string, fullVal = 1, halfVal = 0.5, enterVal = 1): number;

计算字符长度。该方法区分全角字符和半角字符。

fullVal: 全角字符的权重值，默认为1

halfVal: 半角字符的权重值，默认为0.5

enterVal: 回车字符的权重值,默认为1


## copyTxt
function copyTxt(txt: string): boolean;

复制txt到剪切板。

如果操作成功，则返回true。

如果操作失败(浏览器不支持),则返回false。

## htmlEncode 、 htmlDecode
function htmlEncode(txt: string): string;

function htmlDecode(val: string): string;

html转义和解密。

如果是node环境，htmlDecode只能正确解密由htmlEncode()返回的内容

```javascript
utils.htmlEncode('<body>');     //&#60;body&#62;
utils.htmlDecode('&lt;body')    //<body
```


## camelCase
function camelCase(...args: string[]): string;

"camel-case"转换为"camelCase"。

或者传入多个字符串，合并为驼峰式。
```javascript
utils.camelCase('camel-case');  //camelCase
utils.camelCase('I-am', 'wwl'); //IAmWwl
```
## kebabCase

function kebabCase(...args: string[]): string;

将驼峰命名法字符串，转换为小写的短横线分隔形式。
"kebabCase"转换为"kebab-case"。
或传入多个字符串，合并为短横线分隔形式。
```javascript
utils.kebabCase('this','IsTest');   //this-is-test
utils.kebabCase('KebabCase');       //kebab-case

```

## paddingLeft
function paddingLeft(target = '', len: number, paddingChar = " "): string

补齐位数。
```javascript
utils.paddingLeft('1',3,'0');  //001
utils.paddingLeft('12345',3);  //12345
```

## template
function template(template : string, data: object): string

模板函数。计算表达式生成字符串。支持ES6模板字符串语法。
```javascript
utils.template('hello,${firstName+secondName}',{firstName:'wang',secondName:'wl'});
//"hello,wangwl"
```

## pick
function pick(tar: object, keys: string | string[]): object;

创建只包含指定属性的对象。
```javascript
var tar = {
            name: 'wwl',
            sex: 'male',
            birth: '03'
        };
utils.pick(tar, 'name sex'); // {name: 'wwl', sex: 'male'}
utils.pick(tar, ['sex', 'name']) // {name: 'wwl', sex: 'male'}
```

## retry
function retry(fn, max: number, wait=0, context?: object) : function

创建重试函数。

创建的新函数，内部实际执行`fn`，如果`fn`返回了失败的Promise，则会在间隔`wait`时间之后，重新执行`fn`，最多执行`max`次。

其中`wait`默认为0，即立即进行重试。如果`wait`大于0，则使用`setTimeout`在间隔wait之后进行重试。

`context`

```javascript
var cnt = 0;
var fn = function(){
    console.log('retry', ++cnt);
    return Promise.reject();
}
utils.retry(fn,3,300)();
// retry1
// retry2
// retry3
```

## dateFormat
function dateFormat(date: Date, fmt = 'yyyy-MM-dd hh:mm:ss'): string;

格式化时间。 
1. 支持：年y, 月M, 天d, 24小时制H, 12小时制h, 分m, 秒s, 毫秒S, am/pm a。
2. 支持转义: 使用中括号对以上字符进行转义。

年份根据y的数量截取，其他值，只补齐不截取。
```javascript
utils.dateFormat(new Date(),'yy-MM-dd HH:mm:ss'); //"17-10-30 18:08:08"
utils.dateFormat(new Date(),'yyyy-M-d h:m:s a'); //"2017-10-30 6:8:8 pm"
//转义:
utils.dateFormat(new Date(),'[today] M-d')  //"today 10-30"
```

## dateParse
function dateParse(str: string, fmt = 'yyyy-MM-dd hh:mm:ss'): Date;

根据时间字符串和指定的格式，返回Date对象。

1. 支持：年y, 月M, 天d, 24小时制H, 12小时制h, 分m, 秒s, 毫秒S, am/pm a。
2. 支持转义: 使用中括号对以上字符进行转义。

```javascript
utils.dateFormat(
    utils.dateParse('2017-10-30 18:8:8','yyyy-M-d H:m:s'),
    'yy-MM-dd HH-mm-ss'); //"17-10-30 18-08-08"

utils.dateFormat(
    utils.dateParse('today 6:10 pm','[today] h:m a'),
    'HH:mm'); //"18:10"
    
```

## dateAdd(日期计算)
function dateAdd(date, config: number | { year?: number, month?: number, day?: number, hour?: number, min?: number, sec?: number }): Date;

日期加减法。返回新的Date对象。

```javascript
var today=utils.dateParse('2017,10,10 10:10:10','yyyy,MM,dd hh:mm:ss');
utils.dateAdd(today,-2);        //2017,10,8 10:10:10    等效于utils.dateAdd(today,{day:-2});
utils.dateAdd(today,{hour:2});  //2017,10,10 12:10:10
```

## firstDateInMonth、 lastDateInMonth
function firstDateInMonth(date: Date): Date;

function lastDateInMonth(date: Date): Date;

返回传入date所在月份的第一天、最后一天的Date对象。

## firstWeekInMonth 、 lastWeekInMonth
function firstWeekInMonth(date: Date): Date;

function lastWeekInMonth(date: Date): Date;

返回传入日期所在月份的，第一周的周一、最后一周的周日。

## weekRange
```typescript
function weekRange(
    startDate: Date, 
    endDate: Date, 
    splitDay = 1): Array<{ start: Date, end: Date, duration: number }>
```

返回开始日期和结束日期的周。计算时忽略时间，只计算日期。

splitDay：分割点。对应date.getDay()取值0~6。 例如取周一至周日，则splitDay传入1，取周日至周六，splitDay传入0。

返回周的数组。 每一项为：{start:date,end:date,duration:number}。
```javascript
//获取该月的所有周。
var today=new Date();
utils.weekRange(utils.firstWeekInMonth(today),utils.lastWeekInMonth(today));
```
## weekendsCount
function weekendsCount(startDate: Date, endDate: Date): number

计算开始日期和结束日期共有周六日多少天。计算时忽略时间，只计算日期。

## getCookie
function getCookie(refresh = false): object;

返回一个指代当前cookie的对象。兼容.NET中的多值cookie。

该方法内部缓存一个cookie对象，当多次调用时，只对document.cookie解析一次;

refresh: 传入true，强制重新解析cookie并返回。
```javascript
utils.getCookie().cookieName.value;          //单值cookie，获取键为cookieName的cookie的值。
if(utils.getCookie().multiCookie.values){    //多值cookie，获取multiCookie中key1的值。
    utils.getCookie().multiCookie.values.key1;
}
```

## setCookie
```typescript
function setCookie(
    key: string, 
    value: string | object, 
    option?: { 
            path?: string, 
            domain?: string, 
            secure?: boolean, 
            expires?: Date | { day: number, hour: number, min: number, sec: number } 
            }): string
```

设置或添加一个cookie，返回cookie的值。

key:cookie名称

value:cookie的值。 如果传入一个对象，则认为是多值cookie

option.path: cookie路径，默认为当前路径。

option.domain: cookie的域名，默认为当前域名。

option.secure: 是否加密，默认为false

option.expires: 过期时间，默认为session-Cookie。可以传入对象，或一个类似{day?:num,hour?:num,min?:num,sec?:num}的对象向后递推时间。例如{expires:{day:1}}代表该cookie有效时间为1天。

## deleteCookie
function deleteCookie(key: string, option): boolean;

删除一个cookie

## cookie对象
    let cookie: {
        del: typeof deleteCookie,
        delete: typeof deleteCookie,
        set: typeof setCookie,
        get(name: string, refresh = false): string | undefined
    };

cookie.del 、cookie.delete 为 deleteCookie的别名。

cookie.set 为setCookie的别名。

get(name,refresh)，获取指定名称的cookie值，只支持单值cookie


# 注意
在node环境下,'isWifi', 'download', 'copyTxt','getCookie', 'setCookie', 'deleteCookie'不可用；
