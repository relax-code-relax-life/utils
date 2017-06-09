/**
 * Created by wangweilin on 2017/6/9.
 */

describe('check utils exist', function () {
    it('check utils', function () {
        expect(typeof utils).toEqual('object');
    })
});


describe("util_", function () {
    it("resolveUrl", function () {
        var host = 'http://127.0.0.1:8080';

        var param = {
            name: 'wwl',
            sex: 'man'
        };
        var paramStr = 'name=wwl&sex=man';

        var test = [
            {
                input: host,
                output: host + '?' + paramStr
            },
            {
                input: host + '?',
                output: host + '?' + paramStr
            },
            {
                input: host + '?key=val',
                output: host + '?key=val&' + paramStr
            },
            {
                input: host + '?key=val#fragment',
                output: host + '?key=val&' + paramStr + '#fragment'
            },
            {
                input: host + '?key=val&adfasd#fragment',
                output: host + '?key=val&adfasd&' + paramStr + '#fragment'
            }
        ];

        test.forEach(function (data) {
            expect(utils.resolveUrl(data.input, param)).toEqual(data.output);
        });


    });
    it('countStr', function () {
        var str = `汉 字
11`;
        expect(utils.countStr(str)).toEqual(4.5);
        expect(utils.countStr(str,2,1,3)).toEqual(10);
    });
    it('camelCase', function () {
        expect(utils.camelCase('camel-case')).toEqual('camelCase');
        expect(utils.camelCase('I-am','wwl')).toEqual('IAmWwl');
    })
});