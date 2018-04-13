/**
 * Created by wangweilin on 2017/6/9.
 */

describe('check utils exist', function () {
    it('check utils', function () {
        expect(typeof utils).toEqual('object');
    })
});


describe("util_", function () {
    it('paddingLeft', function () {
        expect(utils.isUrl('http://www.163.com')).toEqual(true);
        expect(utils.isUrl('http://www.163.com/?adf#lakdsf')).toEqual(true);
        expect(utils.isUrl('www.163.com/?adf#lakdsf')).toEqual(true);
        expect(utils.isUrl('163.com/?adf#lakdsf')).toEqual(true);
        var url = 'http://wangwl.net/static/projects/visualRegex/#flags=gim&source=%5E((%5B%5E%3A%5C%2F%3F%23%5D%2B)%3A)%3F(%5C%2F%5C%2F(%5B%5E%5C%2F%3F%23%5D*))%3F(%5B%5E%3F%23%5D*)(%5C%3F(%5B%5E%23%5D*))%3F(%23(.*))%3F&match=http%3A%2F%2Fwangwl.net%2Fstatic%2Fprojects%2FvisualRegex%2F%23flags%3Dgim%26source%3D%255E((%255B%255E%253A%252F%253F%2523%255D%252B)%253A)%253F(%252F%252F(%255B%255E%252F%253F%2523%255D*))%253F(%255B%255E%253F%2523%255D*)(%255C%253F(%255B%255E%2523%255D*))%253F(%2523(.*))%253F%26match%3D%250A%25E5%2595%258A';
        expect(utils.isUrl(url)).toEqual(true);
    });
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
                input: host + '?key=val#fragment',
                output: host + '?key=val&' + paramStr + '#fragment'
            },
            {
                input: host + '?key=val#fragment',
                output: host + '?key=val&' + paramStrEncodeEx + '#fragment',
                encodeEx: true
            },
            {
                input: host + '?key=val#fragment',
                output: host + '?key=val&' + paramStrEncodeEx + '#fragment',
                encodeEx: ['+enc']
            },
            {
                input: host + '?key=val&name=123#fragment',
                output: host + '?key=val&' + paramStrEncodeEx + '#fragment',
                encodeEx: true
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
        expect(utils.camelCase('http')).toEqual('http');
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

        expect(utils.dateFormat('')).toEqual('');
        expect(utils.dateFormat()).toEqual('');

        var date = new Date(Date.parse('2017/1/10 3:25:5:666'));
        var test = [
            {
                fmt: 'yyyy;MM;dd;hh;mm;ss;SS',
                result: '2017;01;10;03;25;05;666'
            },
            {
                fmt: 'yy;M;d;h;m;s-S',
                result: '17;1;10;3;25;5-666'
            }
        ];
        test.forEach(function (data) {
            expect(utils.dateFormat(date, data.fmt)).toEqual(data.result);
        });
    });
    it('dateParse', function () {

        var test = [
            [
                '17,1,10 3:25',
                'yy,M,d h:m',
                new Date(2017, 0, 10, 3, 25).getTime()
            ],
            [
                '2000,5',
                'yy,MM',
                new Date(2000, 4).getTime()
            ],
            [
                '1999,13,1/23:23',
                'yyyy,MM,dd/hh:mm',
                new Date(1999, 12, 1, 23, 23).getTime()
            ],
            [
                '30:30',
                'h:m',
                new Date(2018, 0, 1, 30, 30).getTime()
            ],
            [
                '2015-06-07 10:11:11',
                '',
                new Date(2015, 5, 7, 10, 11, 11).getTime()
            ]
        ];
        test.forEach(function (data) {
            expect(utils.dateParse(data[0], data[1]).getTime()).toEqual(data[2]);
        })
    });
    it('firstDateInMonth', function () {
        var test = [];
        for (var i = 0; i < 12; i++) {
            test.push([
                new Date(2017, i, Math.ceil((Math.random() * 28))),
                new Date(2017, i, 1)
            ]);
        }
        test.forEach(function (data) {
            expect(utils.firstDateInMonth(data[0]).getTime()).toEqual(data[1].getTime());
            expect(utils.firstDateInMonth(data[0]).getDate()).toEqual(1);
        });
    });
    it('lastDateInMonth', function () {
        var test = [
            [
                new Date(2017, 0, 20),
                new Date(2017, 0, 31)
            ],
            [
                new Date(2017, 9, 20),
                new Date(2017, 9, 31)
            ]
        ];

        test.forEach(function (data) {
            expect(utils.lastDateInMonth(data[0]).getTime()).toEqual(data[1].getTime());
        });

    });

    it('firstWeekInMonth', function () {
        var test = [];
        for (var i = 0; i < 12; i++) {
            test.push(new Date(2017, i, Math.ceil((Math.random() * 28))),);
        }
        test.forEach(function (date) {
            expect(utils.firstWeekInMonth(date).getDay()).toEqual(1);
        });
    });
    it('lastWeekInMonth', function () {
        var test = [];
        for (var i = 0; i < 12; i++) {
            test.push(new Date(2017, i, Math.ceil((Math.random() * 28))),);
        }
        test.forEach(function (date) {
            expect(utils.lastWeekInMonth(date).getDay()).toEqual(0);
        });
    });
    it('check browser chrome version', function () {
        var str = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36';
        var str2 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';
        expect(utils.isChrome(str)).toEqual('59');
        expect(utils.isChrome(str2)).toEqual('51');
        expect(utils.isChrome('12')).toEqual(null);

    });
    it('check browser firefox version', function () {
        var str1 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:50.0) Gecko/20100101 Firefox/50.0';
        var str2 = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0';
        expect(utils.isFirefox(str1)).toEqual('50');
        expect(utils.isFirefox(str2)).toEqual('53');
    });
    it('check browser safari version', function () {
        var str1 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4';
        //chrome
        var str2 = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';
        //edge
        var str3 = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063';
        expect(utils.isSafari(str1)).toEqual('10.1.1');
        expect(utils.isSafari(str2)).toEqual(null);
        expect(utils.isSafari(str3)).toEqual(null);
    });
    it('check browser ie version', function () {
        var ie10 = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.2)';
        var ie10_2 = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        var ie9 = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)';
        var ie11_1 = 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko';
        var ie11_2 = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.2; rv:11.0) like Gecko';
        var ie11_3 = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        var ie_edge15 = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063';
        expect(utils.isIE(ie10)).toEqual('10');
        expect(utils.isIE(ie10_2)).toEqual('10');
        expect(utils.isIE(ie9)).toEqual('9');
        expect(utils.isIE(ie11_1)).toEqual('11');
        expect(utils.isIE(ie11_2)).toEqual('11');
        expect(utils.isIE(ie11_3)).toEqual('11');
        expect(utils.isIE(ie_edge15)).toEqual('Edge/15');

    });

    it('unique', function () {
        expect(utils.unique([5, 2, 3, 5, 2])).toEqual([5, 2, 3]);
        expect(typeof utils.unique([5, 2, 3, '5', 2])[3]).toBe('string');
        expect(utils.unique([5, 2, 3, '5', 2])).toEqual([5, 2, 3, '5']);

        expect(
            typeof utils.unique([5, 2, 3, '5', 2].sort(), true)[3]
        ).toBe('string');

        expect(
            utils.unique([5, 2, 3, '5', 2].sort(), true)
        ).toEqual([2, 3, 5, '5']);

        expect(
            utils.unique([5, 2, 3, '5', 2].sort(), true, function (val) {
                return parseInt(val)
            })
        ).toEqual([2, 3, 5]);

    });


    it('htmlEncode', function () {
        expect(
            utils.htmlEncode('<script>"?&</script>')
        ).toEqual('&#60;script&#62;&#34;?&#38;&#60;/script&#62;');
    });

    it('htmlDecode', function () {
        expect(
            utils.htmlDecode('&#60;script&#62;&#34;?&#38;&#60;/script&#62;<script>')
        ).toEqual('<script>"?&</script><script>');
    });

    it('template', function () {
        var data = {name: 'wwl', sex: 'man', arr: [1, 2, 3]};
        var tempStr = 'asdfasdf${ "sex"+sex },${name},${arr.join("-")}';
        var expectStr = 'asdfasdfsexman,wwl,1-2-3';
        var result = utils.template(tempStr, data);
        expect(result).toEqual(expectStr);
    });
    it('find', function () {
        var child = {name: 'wwl'};
        var parent = {child: child};

        expect(utils.find(parent, (val, key) => val.name === 'wwl')).toEqual(child);
        expect(utils.find(parent, (val, key) => val.name === '123')).toEqual(undefined);
    });

    it('timeout', function (done) {

        var promise = utils.timeout(() => {
            return 5
        }, 100);


        expect(typeof promise.abort === 'function').toBe(true);
        promise.then(
            (data) => {
                expect(data === 5).toBe(true);
                done();
            }
        );

    });

    it('promisify', function () {
        var resolveFn = function (a, b, cb) {
            cb(null, a + b);
        };
        var rejectFn = function (a, b, cb) {
            cb('err');
        };
        var customFn = function (cb) {
            cb(null, 'original')
        };
        customFn[utils.promisify.custom] = function (a, b) {
            return a + b
        };

        var customFn2 = function (cb, a, b) {
            cb(a + b)
        };
        customFn2[utils.promisify.custom] = function (a, b) {
            return new Promise((resolve, reject) => {
                customFn2(resolve, a, b)
            })
        };

        utils.promisify(resolveFn)(1, 2).then(
            (result) => {
                expect(result).toEqual(3)
            },
            (err) => {
                expect(err).toEqual(null)
            });

        utils.promisify(rejectFn)(1, 2).then(
            (result) => {
                expect(result).toEqual(null)
            },
            (err) => {
                expect(err).toEqual('err')
            });

        utils.promisify(customFn)(1, 2).then(
            (result) => {
                expect(result).toEqual(3)
            },
            (err) => {
                expect(err).toEqual(null)
            }
        );

        utils.promisify(customFn2)(1, 2).then(
            (result) => {
                expect(result).toEqual(3)
            },
            (err) => {
                expect(err).toEqual(null)
            }
        );
    })

});