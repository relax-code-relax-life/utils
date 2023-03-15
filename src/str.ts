import {fill, isBrowser} from "./util";

//十六进制表示:
// \x1abf4: 可以使用任意多的十六进制数字，直至不是十六进制数字为止；
// \uAAAA: 16位的通用字符名,\u后面必须跟4个十六进制数字（不足四位前面用零补齐).
// \UAAAAAAAA:32位的通用字符名，\U后面必须跟8个十六进制数字（不足八位前面用零补齐）
// 一个数字，代表4位， ascii总共1个字节，所以一般都用\u00YY或者\xYY表示。
//0-32  128-255
//ascii: 1字节，包含标准 0-127字符和扩展ascii 128-255字符。 扩展ascii为非标准。
//0-31和127为控制字符,    127是删除
//32-126为可显字符,     32为空格,48~57为0-9,65~90为A-Z,97-122为a-z，其余为符号。
//128-255为扩展字符

const reg_singleChar = /[\u0020-\u007f\uff61-\uff9f]/g,
    reg_enterChar = /\n/g,
    reg_camelCase = /-([a-zA-Z])/g,
    reg_upperCase = /[A-Z]/g,
    reg_htmlEncode = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]/g,
    reg_htmlDecode = /&#(\d+);|(<br\s*\/\s*>)/g,
    reg_htmlDecodeBrowser = /&.+?;/g;

/**
 * 计算字符长度。该方法区分全角字符和半角字符。
 * @param txt {String}
 * @param [fullVal] {Number} 可选的，全角字符的权重值，默认为1
 * @param [halfVal] {Number} 可选的，半角字符的权重值，默认为0.5
 * @param [enterVal] {Number} 可选的, 回车字符的权重值,默认为1
 * @return {Number} 返回字符权重值
 */
export const countStr = function (txt: string, fullVal = 1, halfVal = 0.5, enterVal = 1) {
    if (!txt) return 0;
    txt = txt + '';
    fullVal = +fullVal;
    halfVal = +halfVal;
    enterVal = +enterVal;

    var match = txt.match(reg_singleChar);
    var matchEnter = txt.match(reg_enterChar);

    var lenSingle = match ? match.length : 0;
    var lenEnter = matchEnter ? matchEnter.length : 0;
    var lenDouble = txt.length - lenSingle - lenEnter;

    return fullVal * lenDouble + halfVal * lenSingle + enterVal * lenEnter;

}


/**
 * camel-case转换为camelCase,
 * 或传入多个参数，合并为camelCase形式。
 * @param args
 * @returns {string}
 */
export const camelCase = function (...args: string[]) {
    return args.join('-').replace(reg_camelCase, function (match, letter) {
        return letter.toUpperCase();
    });
}

/**
 * kebabCase转换为kebab-case
 * 或传入多个参数，合并为kebab-case形式。
 * @param args
 */
export const kebabCase = function (...args: string[]) {
    return args.map(function (name) {
        return name.replace(reg_upperCase, function (match, pos) {
            return (pos === 0 ? '' : '-') + match.toLowerCase()
        });
    }).join('-');
};


/**
 * 补齐位数
 * @method formatDate
 * @param target {String} 操作的目标字符串
 * @param len{Number} 要补齐的位数
 * @param paddingChar {String} 填补的字符
 * @return {string} 新字符串
 * 用例：
 * utils.paddingLeft('1',3,'0');  //001
 * utils.paddingLeft('12345',3);  //12345
 */
export const paddingLeft = function (target = '', len: number, paddingChar: string) {
    var result, targetLen;

    target += '';
    len = ~~len;

    targetLen = (target + '').length;
    if (len <= targetLen) {
        return target;
    }

    paddingChar = paddingChar && paddingChar.charAt(0) || ' ';

    result = fill(new Array(len - targetLen), paddingChar);
    result.push(target);

    return result.join('');
}


/**
 * 转义为html
 * @param txt
 * @returns {XML|void|*|string}
 */
export const htmlEncode = function (txt: string) {
    if (typeof txt !== 'string') {
        txt = txt + '';
    }
    var code;
    return txt.replace(reg_htmlEncode, function (match) {
        code = match.charCodeAt(0);
        if (code === 32) code = 160; //32:英文空格,转换为160:  &nbsp; html中的空格
        if (code === 10) return '<br/>';  //转换\n
        return '&#' + code + ';';
    });
}

const htmlDecodeInBrowser = function (val: string) {
    if (val == null || val === '') return '';
    var match = val.match(reg_htmlDecodeBrowser) as string[] | null;
    if (match) {
        var el = document.createElement('div');
        el.innerHTML = match.join(',');
        match = el.innerText.split(',');
        //@ts-ignore
        el = null;
    } else match = [];

    var index = 0;
    return val.replace(reg_htmlDecodeBrowser, (result, pos) => {
        return (match as string[])[index++];
    });
}

//对应utils.htmlEncode,只能解密由utils.htmlEncode返回的加密字符串。
const htmlDecodeInNode = function (txt) {
    txt += '';
    return txt.replace(reg_htmlDecode, function (match, code, br) {
        if (br) return '\n';
        else if (code === '160') {
            code = 32;
        }
        return String.fromCharCode(code);
    })
}

export const htmlDecode = function (val: string) {
    return isBrowser() ? htmlDecodeInBrowser(val) : htmlDecodeInNode(val);
}

const reg_template = /\$\{\s*(.+?)\s*\}/g;
const createTemplateFn: () => (temp: string, data: object) => string = function () {

    let supportTempStr = true;
    try {
        let fn = new Function('``');
    } catch (e) {
        supportTempStr = false;
    }

    if (supportTempStr) {
        return function (temp, data) {
            return (new Function('__scope__',
                `
                    var __result__;
                    try{
                        with(__scope__){
                            __result__=\`${temp}\`
                        }
                    }
                    catch(e){
                        __result__="";
                    }
                    return __result__;
                    `
            ))(data);
        };
    } else {
        //known bug: temp=' hello ${name+"${inner}"} ';
        return function (temp, data) {
            //如果以reg_template开头，则splitCodes[0]为空字符串。
            //如果以reg_template结尾，则splitCodes[len-1]为空字符串。
            var isExpr = true;
            var exprCode = temp.split(reg_template)
                .map(splitCode => {
                    isExpr = !isExpr;
                    if (isExpr) {
                        return splitCode;
                    } else {
                        return `'${splitCode.replace("'", "\\'")}'`;
                    }
                }).join('+');

            return (new Function('__scope__',
                `
            var __result__;
            with(__scope__){ 
                __result__=${exprCode};
            }
            return __result__;
         `
            ))(data);
        };
    }

}

let _cacheTemplateFn;
/**
 * 模板函数，计算表达式生成字符串。支持ES6模板字符串语法。 eg: template('hello,${firstName+secondName}',{firstName:'wang',secondName:'wl'});
 * @param temp
 * @param data
 * @returns {string}
 */
export const template = (temp: string, data: object) => {
    if (!_cacheTemplateFn) _cacheTemplateFn = createTemplateFn();
    return _cacheTemplateFn(temp, data);
}

