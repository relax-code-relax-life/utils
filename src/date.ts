import {tostring} from "./util";
import {paddingLeft} from "./str";
import {each} from "./collection";

interface DateAddConfig {
    year?: number,
    month?: number,
    day?: number,
    hour?: number,
    min?: number,
    sec?: number,

    [prop: string]: any
}

const dateMethodMap = {
    year: 'FullYear',
    month: 'Month',
    day: 'Date',
    hour: 'Hours',
    min: 'Minutes',
    sec: 'Seconds'
};

const reg_dateFmt = /y+|M+|d+|H+|h+|m+|s+|S+|a|(\[.*?])/g;

const isDate = function (val): val is typeof Date {
    return tostring(val) === '[object Date]';
};

/**
 * 格式化时间。 支持：年y,月M,天d,24小时H,12小时h,分m,秒s,毫秒S,am/pm a
 * 年份根据y的数量截取，其他值，只补齐不截取。
 * @method formatDate
 * @param date {Date} 日期
 * @param fmt{String} 格式化字符串
 * @return {string}
 * */
export const dateFormat = function (date: Date, fmt = 'yyyy-MM-dd HH:mm:ss') {
    if (!isDate(date)) return '';
    // if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss';

    var hour = date.getHours(),
        a = hour > 12 ? 'pm' : 'am';
    var map = {
        y: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: hour,
        h: hour > 12 ? hour - 12 : hour,
        m: date.getMinutes(),
        s: date.getSeconds(),
        S: date.getMilliseconds(),
        a: a
    };
    var tmpResult, type;
    return fmt.replace(reg_dateFmt, function (val) {
        type = val.charAt(0);

        if (type === '[') return val.slice(1, -1);
        else if (type === 'a') return map[type];

        tmpResult = paddingLeft(map[type], val.length, '0');
        if (type === 'y') {
            tmpResult = tmpResult.slice(-val.length, tmpResult.length);
        }
        return tmpResult;
    })
}

export const dateParse = function (str: string, fmt ?: string) {
    if (!fmt) fmt = 'yyyy-MM-dd HH:mm:ss';

    var arg: {
        'y': undefined | number,
        'M': undefined | number,
        'd': number,
        'H': undefined | number,
        'h': undefined | number,
        'm': number,
        's': number,
        'S': number,
        'a': string
    } = {
        'y': undefined,
        'M': undefined,
        'd': 1,
        'H': undefined,
        'h': undefined,
        'm': 0,
        's': 0,
        'S': 0,
        'a': 'am'
    };

    var reg_matcher_source = fmt.replace(reg_dateFmt, function (m) {

        var type = m[0];
        var len = m.length;

        var result;

        if (type === 'y') {
            if (len < 4) {
                result = `\\d{${len}}`;
            } else result = `\\d{4}`;
        } else if (type === 'M' || type === 'd' || type === 'H' || type === 'h' || type === 'm' || type === 's') {
            if (len === 1) {
                result = '[1-9]\\d|\\d'
            } else { //m>=2
                result = `\\d{2}`
            }
        } else if (type === 'S') {
            if (len < 3) {
                result = `\\d{${len}}`
            } else result = `\\d{3}`
        } else if (type === 'a') {
            result = '(am|Am|AM|pm|Pm|PM)?'
        } else if (type === '[') {
            return m.slice(1, -1)
        }

        return `(${result})`;
    });


    var match_tar = new RegExp(reg_matcher_source, 'g').exec(str);
    var match_fmt, index = 1;

    if (!match_tar) throw new Error(`The date format "${fmt}" match the date string "${str}" failed.`);

    var type;
    while (match_fmt = reg_dateFmt.exec(fmt)) {
        type = match_fmt[0].charAt(0);
        if (type === '[') continue;
        arg[type] = type === 'a' ? match_tar[index++] : ~~match_tar[index++];
    }

    var year = (new Date()).getFullYear();
    var argYearStr;
    if (arg.y === undefined) arg.y = year;
    else {
        argYearStr = arg.y + '';
        if (argYearStr.length < 4) {
            argYearStr = (year + '').slice(0, 4 - argYearStr.length) + argYearStr;
            arg.y = ~~argYearStr;
        }
    }

    if (arg['M'] === undefined) arg['M'] = 0;
    else arg['M']! -= 1;

    if (!arg['h']) {
        arg['a'] = 'am';    //跳过下面的+12判断
        arg['h'] = arg['H'] || 0;
    }

    arg['a'] = arg['a'].toLowerCase();
    // if(arg['a']!=='pm') arg['a']='am';

    if (arg['a'] === 'pm') {
        arg['h']! += 12;
    }

    return new Date(arg.y, arg.M!, arg.d, arg.h, arg.m, arg.s, arg.S);

};

/**
 * 日期计算。 日期加减法，返回新的日期对象，对传入的日期对象无影响。
 * @method dateAdd
 * @param date {Date} 计算的基准日期
 * @param config{Number|Object} 配置参数
 *  {
                    year: 0,
                    month: 0,
                    day: 0,
                    hour: 0,
                    min: 0,
                    sec: 0
                }
 *@return {Date} 返回一个新的日期对象。
 * 用例：
 * var date=Date.parse('2015/12/1 12:00:00');
 * utils.dateAdd(date,{ day:-1,month:1,hour:1 });  //2015/12/31 13:00:00
 * utils.dateAdd(date,31);  //2016/1/1 12:00:00  utils.dateAdd(date,{day:31})的缩写形式
 */
export const dateAdd = function (date: Date, config: number | DateAddConfig) {
    var
        //defaultConfig = {
        //    year: 0,
        //    month: 0,
        //    day: 0,
        //    hour: 0,
        //    min: 0,
        //    sec: 0
        //},
        methodMap = dateMethodMap;

    if (typeof config === 'number') {
        config = {day: config};
    }

    date = new Date(date);

    var method = '';
    each(methodMap, function (val, name) {
        if (config[name]) {
            method = methodMap[name];
            date['set' + method](date['get' + method]() + ~~config[name]);
        }
    });
    return date;

};

/**
 * 返回传入日期月份的第一天
 * @param date {Date}
 * @return {Date} 返回一个新的日期对象
 */
export const firstDateInMonth = function (date: Date) {
    date = new Date(date);
    date.setDate(1);
    return date;
};
/**
 * 返回传入日期月份的最后一天
 * @param date
 * @returns {Date} 返回一个新的日期对象
 */
export const lastDateInMonth = function (date: Date) {
    date = new Date(date);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date;
}
/**
 * 返回传入日期月份的第一周的周一。
 * @param date
 * @returns {Date}
 */
export const firstWeekInMonth = function (date: Date) {
    var firstDate = firstDateInMonth(date);
    var day = firstDate.getDay();
    if (day === 0) day = 7;
    return dateAdd(firstDate, 1 - day);
}
/**
 * 返回传入日期月份的最后一周的周日。
 * @param date
 * @returns {Date}
 */
export const lastWeekInMonth = function (date: Date) {
    var lastDate = lastDateInMonth(date);
    var day = lastDate.getDay();
    if (day !== 0) {
        lastDate = dateAdd(lastDate, 7 - day);
    }
    return lastDate;
}
/**
 * 返回开始日期和结束日期的周。计算时忽略时间，只计算日期。
 * @param startDate ｛Date｝ 开始日期。
 * @param endDate   {Date} 结束日期
 * @param splitDay {number} 分割点。对应date.getDay()取值0~6。 默认为1。例如取周一至周日，则splitDay传入1，取周日至周六，splitDay传入0。
 * @returns {Array} 返回周的数组。 每一项为：{start:date,end:date,duration:number}
 * 用例： 获取该月的所有周。
 * var today=new Date();
 * utils.weekRange(utils.firstWeekInMonth(today),utils.lastWeekInMonth(today));
 */
export const weekRange = function (startDate: Date, endDate: Date, splitDay?: number): { start: Date, end: Date, duration: number }[] {
    var dateGroup: { start?: Date, end?: Date, duration?: number }[] = [
        //{start,end,duration} , ...
    ];
    if (!startDate || !endDate) return dateGroup as [];

    var shiftTmp;
    if (startDate > endDate) {
        shiftTmp = endDate;
        endDate = startDate;
        startDate = shiftTmp;
    }

    if (typeof splitDay !== 'number') {
        //分隔日 1代表周一， 周一至周日为一个weekGroup组合。
        //若要从周日开始 则改为0. 周日至周六
        //取值： 0 ~ 6
        splitDay = 1;
    }


    var dateGroupLast,  //临时变量
        delta = 1; //i的增量

    var currentDate = new Date(startDate);

    //第一个 分隔日
    //1 2 3 4 5 6 7 8 9
    //5为分隔日，4为前一个 dateGroup的end,5为当前dateGroup的start,
    //找到第一个分隔日后，i的增量变为7,一周，7天后为下一个分隔日
    while (currentDate < endDate) {
        if (delta === 1 && currentDate.getDay() === splitDay) {
            if (+currentDate !== +startDate) {
                //如果 startDate 不为分隔日
                dateGroup.push({
                    end: new Date(currentDate.getTime() - 86400000) // 86400: 24*60*60*1000 24h
                })
            }
            dateGroup.push({
                start: new Date(currentDate)
            });
            delta = 7;
        } else if (delta === 7) {
            dateGroupLast = dateGroup.length - 1;
            dateGroup[dateGroupLast].end = new Date(currentDate.getTime() - 86400000);
            dateGroup[dateGroupLast].duration = 7;
            dateGroup.push({
                start: new Date(currentDate)
            })
        }
        currentDate.setDate(currentDate.getDate() + delta);
    }


    //权重值，用于计算间隔天数
    var weight = [0, 1, 2, 3, 4, 5, 6]; //初始： 对应 date.getDay();
    for (var i = 0; i < splitDay; i++) {
        weight[i] += 7;
    }


    var len = dateGroup.length;

    if (len === 0) {
        //startDate ~ endDate 中不存在分隔日。
        dateGroup = [{
            start: startDate,
            end: endDate,
            duration: weight[endDate.getDay()] - weight[startDate.getDay()] + 1
        }];
    } else {
        //添加dateGroup的首位
        if (!dateGroup[0].start) {
            //说明不是从 分隔日 开始的。
            dateGroup[0].start = startDate;
            dateGroup[0].duration = weight[dateGroup[0].end!.getDay()] - weight[startDate.getDay()] + 1;
        }

        //添加dateGroup末位
        dateGroupLast = len - 1;
        dateGroup[dateGroupLast].end = endDate;
        dateGroup[dateGroupLast].duration = weight[dateGroup[dateGroupLast].end!.getDay()] -
            weight[dateGroup[dateGroupLast].start!.getDay()] + 1;
    }

    //@ts-ignore
    return dateGroup;
}
/**
 * 计算开始日期和结束日期共有周六日多少天。计算时忽略时间，只计算日期。
 * @param startDate {Date} 开始日期
 * @param endDate {Date} 结束日期
 * @returns {number} 返回周末总数
 * 用例：
 * var start=new Date(2015,8,1);
 * var end=new Date(2015,8,11);
 * utils.weekendsCount(start,end); //返回2. 2015-8-1至2015-8-11共有两天周末。
 */
export const weekendsCount = function (startDate: Date, endDate: Date): number {

    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    //@ts-ignore
    var duration = (endDate - startDate) / 86400000 + 1;

    //计算工作日。 eg: 2015-8-1 ~ 2015-8-11 有两天为周六日。 实际工作为9-2=7天
    var weekendCounts, mod, firstDay, lastDay;

    weekendCounts = Math.floor(duration / 7) * 2; //每7天两个休息日。 最后余出不满7天。

    mod = duration % 7; //余出的天数
    if (mod) { //如果存在余出的天数
        firstDay = startDate.getDay(); //余出天数第一天的星期数和 duration的第一天星期数相同。
        lastDay = firstDay + mod - 1;         //最后一天星期数。
        if (firstDay === 0) {
            //第一天是周日，则余出天数只有 一个休息日
            weekendCounts++;
        } else if (firstDay <= 6 && lastDay >= 6) {
            //第一天在周六或之前,
            // 第二天是周六，1天休息日，
            // 第二天周日或以后，2个休息日。
            // lastDay-6+1 ： 周六到lastDay共几天。 只有1天，则lastDay是周六，超过1天，则有两个休息日。
            weekendCounts += Math.min(lastDay - Math.max(firstDay, 6) + 1, 2);
        }
    }
    return weekendCounts;
};
