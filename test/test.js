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
            sex: 'man',
            '+enc': '+enc'
        };
        var paramStr = 'name=wwl&sex=man&%2Benc=%2Benc';
        var paramStrEncodeEx = 'name=wwl&sex=man&%2Benc=+enc';

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
            },
            {
                input: host + '?key=val&adfasd#fragment',
                output: host + '?key=val&adfasd&' + paramStrEncodeEx + '#fragment',
                encodeEx: true
            },
            {
                input: host + '?key=val&adfasd#fragment',
                output: host + '?key=val&adfasd&' + paramStrEncodeEx + '#fragment',
                encodeEx: ['+enc']
            }
        ];

        test.forEach(function (data) {
            expect(utils.resolveUrl(data.input, param, data.encodeEx)).toEqual(data.output);
        });


    });
    it('countStr', function () {
        var str = `汉 字
11`;
        expect(utils.countStr(str)).toEqual(4.5);
        expect(utils.countStr(str, 2, 1, 3)).toEqual(10);
    });
    it('camelCase', function () {
        expect(utils.camelCase('camel-case')).toEqual('camelCase');
        expect(utils.camelCase('I-am', 'wwl')).toEqual('IAmWwl');
    });
    it('paddingLeft', function () {
        expect(utils.paddingLeft('123', 5, '0')).toEqual('00123');
        expect(utils.paddingLeft('123')).toEqual('123');
        expect(utils.paddingLeft('123', 2)).toEqual('123');
        expect(utils.paddingLeft('123', 3)).toEqual('123');
        expect(utils.paddingLeft('123', 5)).toEqual('  123');
        expect(utils.paddingLeft('')).toEqual('');
        expect(utils.paddingLeft('', 5, '0')).toEqual('00000');
    });
    it('dateFormat', function () {
        var date = new Date(Date.parse('2017/1/10 3:25:5:666'));
        var test = [
            {
                fmt: 'yyyy;MM;dd;hh;mm;ss;SS',
                result: '2017;01;10;03;25;05;666'
            },
            {
                fmt:'yy;M;d;h;m;s-S',
                result:'17;1;10;3;25;5-666'
            }
        ];
        test.forEach(function (data) {
            expect(utils.dateFormat(date, data.fmt)).toEqual(data.result);
        });
    });
    it('dateParse', function () {

        var test=[
            [
                '17,1,10 3:25',
                'yy,M,d h:m',
                new Date(2017,0,10,3,25).getTime()
            ],
            [
                '2000,5',
                'yy,MM',
                new Date(2000,4).getTime()
            ],
            [
                '1999,13,1/23:23',
                'yyyy,MM,dd/hh:mm',
                new Date(1999,12,1,23,23).getTime()
            ],
            [
                '30:30',
                'h:m',
                new Date(2017,0,1,30,30).getTime()
            ]
        ];
        test.forEach(function (data) {
            expect(utils.dateParse(data[0], data[1]).getTime()).toEqual(data[2]);
        })
    })
});