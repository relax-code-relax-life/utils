# utils API

string guid(prefix:string)

function noop()

bool isAndroid([ua])
bool isIos([ua])
bool isWeiXin([ua])

isWifi()                //返回bool，则正确检测到联网类型。返回undefined，则代表未检测到

bool isUrl(url:string)

string isIE([ua])       //返回版本号或null
string isChrome([ua])   //返回版本号或null
string isFirefox([ua])  //返回版本号或null
string isSafari([ua])   //返回版本号或null


Object defer()          //返回{promise:object,resolve:function,reject:function}

void each(obj:object|array, fn, context)

array map(obj:object|array, fn, context)

array unique(arr, isSort, fn, context) 
//fn: function(item,index,arr)
//返回新数组

function cache(fn,context) //返回function(refresh,...args);  refresh为强制刷新，剩余参数传递给fn

string loop(fn,tick,immediate)  //根据setTimeout循环执行，支持fn返回一个promise来控制是否继续循环
void clearLoop(key:string)      //key为loop()返回的值

function throttle(fn, [alwaysFn], [immediately], wait, [contex])    //间隔wait执行

function debounce(fn, [alwaysFn], [immediately], wait, [context])   //防抖动

void download(src,fileName)

string param(params:object, encodeEx:bool|array)  
//转换为key=val&key1=value1,
//默认进行转义，encodeEx设置为true，则不进行转义，或者设置为一个数组[key1,key2]指定特定的key不进行转义

string resolveUrl(url, param, encodeEx) //返回拼接后的url

object getQuery([forceRefresh],[url])          //返回query对象  

int countStr(txt, [fullVal] = 1, [halfVal] = 0.5, [enterVal] = 1)   //计算字符串长度

bool copyTxt(txt)   //复制成功返回true, 复制出错返回false 

string htmlEncode(txt)
string htmlDecode(html) //当在node环境下，htmlDecode只能解密由htmlEncode()返回的内容

string camelCase(...args)   //camel-case转换为camelCase，或传入多个参数，组合成camelCas形式

string paddingLeft(target, len, paddingChar)

string dateFormat(date, fmt)
Date dateParse(str, fmt)
Date dateAdd(date, config:number|object)    
//config 形式: {year,month,day,hour,min,sec},如果是number类型，则等效为{day}形式
Date firstDateInMonth(date)
Date lastDateInMonth(date)
Date firstWeekInMonth(date) //返回传入日期月份的第一周的周一
Date lastWeekInMonth(date)  //返回传入日期月份的最后一周的周日。
array weekRange(startDate, endDate, splitDay)   //返回值的每一项 {start:date,end:date,duration:number}
int weekendsCount(startDate, endDate)

object getCookie([refresh]) //cookie.keyName.value,cookie.keyName.values.subKeyName
string setCookie(key, value, option)    //option: {path,domain,secure,expires}
bool deleteCookie(key, option)

string cookie.get(name,refresh)
string cookie.set(key, value, option)
bool delete(key,option)


