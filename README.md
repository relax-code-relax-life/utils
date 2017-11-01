# 下载
* npm install --save wwl-utils
* <script src="https://gitee.com/w-wl/dist_utils/raw/master/index.js"></script>

# 使用
* import utils from "wwl-utils"
* amd加载方式: define( ["/js/wwl-utils.js"] , (utils)=>{  } );
* 在页面引用script标签的方式，会暴露出window.utils对象。


# utils API
## guid
 function guid(prefix = ''): string;
 
 返回一个唯一序号。
 ```javascript
 utils.guid();          //  "1"
 utils.guid('prefix');  //  "prefix2"
 ```

## noop
noop(): () => void;

## isAndroid
function isUrl(url: string): boolean;

## isAndroid、isIos、isWeiXin
function (ua = navigator.userAgent): boolean;

根据传入的userAgent的值，判断是否是android,ios,微信。

默认使用当前navigator.userAgent。
```javascript
var ua="Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
utils.isIos();      //false
utils.isIos(ua);    //true 
```

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
function defer(): { promise: Promise, resolve: () => void, reject: () => void };

创建一个延迟对象。


## each
function each<T>(obj: T, fn: (value: any, index: number | string, context?: object) => void, obj: T): void;

遍历数组或者对象。

当obj是对象时，则借助Object.keys(obj)的返回值进行遍历，即只遍历自有的可枚举属性。

## map
function map<T>(obj: T, fn: (value: any, index: number | string, context?: object) => void, obj: T): T;

映射一个新的数组或对象。

如果obj为对象，则借助Object.keys(obj)进行映射。

## unique、uniq
function unique(arr: Array, isSort = false, map?: (item: any, index: number, arr: Array) => any, context?: object): Array;

不改变数组顺序的情况下去重，返回一个新的数据。uniq为unique的别名。

isSort:是否已排序，默认false。如果未，则借助includes是否存在。

map:映射函数，根据map函数的返回值进行比较。会调用arr.length次map函数。

context：map函数的this值。

## cache

function cache(fn, context?, predicate?: (...args) => boolean): (refresh, ...args) => any;

返回一个新的缓存函数。

返回的函数签名为:function(refresh,...args); refresh判断是否强制刷新，剩余参数传给fn。

如果传入predicate，在refresh为false时，会根据predicate的返回值判断是否需要刷新。
```javascript

let ori=(a,b) => {console.log(a,b);return a};
let cache=utils.cache(ori,(a,b) =>  a>b);

cache(true,1,2);    //1
cache();            //1
cache(false,5,6);   //1
cache(true,5,6);    //5
cache(false,8,7);   //8 

```

## loop
function loop(fn, tick: number, immediate?: boolean): string;

根据setTimeout循环执行fn，支持fn返回一个promise来控制是否继续循环

返回一个key值。在clearLoop()中传入该值来取消循环。

## clearLoop
function clearLoop(key: string): void;

取消循环执行。

key为loop()方法返回的值。

## throttle 、 debounce
function throttle(fn, alwaysFn?, immediately?, wait, contex?)   

function debounce(fn, alwaysFn?, immediately?, wait, contex?) 

截流和防抖动。

fn: 目标执行方法。

alwaysFn: 每次调用都会执行的方法。

immediately: 是否立即执行。如果为true,则会在第一次调用时立即执行fn,忽略后续的调用。

wait:指定时间，以毫秒为单位。

contex: 指定alwaysFn和fn的this值，如果省略，则为结果函数的this值。
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
function download(url: string, fileName?: string): void;

触发下载指定的url，而不是打开一个新窗口。

在node环境下，该方法为noop()。

## param
function param(params: object, encodeEx?: boolean | Array<string>): string

将对象转换为key=val&key1=value1的字符串形式。

value默认通过encodeURIComponent转义，

encodeEx设置为true，则不进行转义，或者设置为一个数组[key1,key2]指定特定的key不进行转义。
```javascript
utils.param({name:'+wwl'});         //"name=%2Bwwl"
utils.param({name:'+wwl'},true);    //"name=+wwl"
utils.param({name:'+wwl'},['name']);//"name=+wwl"
```

## parseParam
function parseParam(paramStr: string, decodeEx?: boolean | Array<string>): object;

将key=value&key1=value1形式的字符串转换成对象，param的反向操作。

value默认会通过decodeURIComponent进行解密。

通过设置decodeEx参数不进行解密。
```javascript
utils.parseParam('name=%2Bwwl')             //{name:"+wwl"}
utils.parseParam('name=%2Bwwl',true)        //{name:"%2Bwwl"}
utils.parseParam('name=%2Bwwl',['name'])    //{name:"%2Bwwl"}

```

## resolveUrl
function resolveUrl(url: string, param: object, encodeEx?: boolean | Array<string>): string;

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
function camelCase(...args: Array<string>): string

"camel-case"转换为"camelCase"。

或者传入多个字符串，合并为驼峰式。
```javascript
utils.camelCase('camel-case');  //camelCase
utils.camelCase('I-am', 'wwl'); //IAmWwl
```

## paddingLeft
function paddingLeft(target = '', len, paddingChar = " "): string

补齐位数。
```javascript
utils.paddingLeft('1',3,'0');  //001
utils.paddingLeft('12345',3);  //12345
```

## dateFormat
function dateFormat(date: Date, fmt: string): string;

格式化时间。 支持：年y,月M,天d,时h,分m,秒s,毫秒S。

年份根据y的数量截取，其他值，只补齐不截取。
```javascript
utils.dateFormat(new Date(),'yy-MM-dd hh:mm:ss'); //"17-10-30 18:08:08"
utils.dateFormat(new Date(),'yyyy-M-d h:m:s'); //"2017-10-30 18:8:8"
```

## dateParse
function dateParse(str: string, fmt: string): Date;

根据时间字符串和指定的格式，返回Date对象。
```javascript
utils.dateFormat(
    utils.dateParse('2017-10-30 18:8:8','yyyy-M-d h:m:s'),
    'yy-MM-dd hh-mm-ss'); //"17-10-30 18-08-08"
```

## 日期计算
function dateAdd(date, config: number | { year?: number, month?: number, day?: number, hour?: number, min?: number, sec?: number }): Date;

日期加减法。返回新的Date对象。
```javascript
var today=utils.dateParse('2017,10,10 10:10:10','yyyy,MM,dd hh:mm:ss');
utils.dateAdd(today,-2);        //2017,10,8 10:10:10
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
function weekRange(startDate: Date, endDate: Date, splitDay = 1): Array<{ tart: Date, end: Date, duration: number }>

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
function getCookie(refresh?): object;

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
function setCookie(key: string, value: string | object, option?: { path?: string, domain?: string, secure?: boolean, expires?: Date | { day: number, hour: number, min: number, sec: number } }): string

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
        get(name: string, refresh: boolean): string | undefined
    };

cookie.del 、cookie.delete 为 deleteCookie的别名。

cookie.set 为setCookie的别名。

get(name,refresh)，获取指定名称的cookie值，只支持单值cookie


# 注意
在node环境下,'isWifi', 'download', 'copyTxt','getCookie', 'setCookie', 'deleteCookie'不可用；
