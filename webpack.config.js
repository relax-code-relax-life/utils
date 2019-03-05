/**
 * Created by wangweilin on 2017/6/9.
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

var isDev = false;

module.exports = {
    mode: isDev ? 'none' : 'production',
    optimization: {
        minimizer: [new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    ascii_only: false,
                    comments: false,
                    beautify: false
                },
                compress: {
                    drop_console: true
                }
            }
        }),
            new webpack.BannerPlugin('http://wangwl.net/static/pages/utils.html')
        ]
    },
    entry: {
        main: './index.ts'
    },
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
        library: 'utils',
        libraryTarget: 'umd',
        umdNamedDefine: false,
        globalObject: 'this',
        libraryExport:'default'
    },
    watch: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/, use: [
                    {
                        loader: 'babel-loader', // 执行顺序 plugins(正序) --> presets(倒序)
                        options: {
                            plugins: [
                                ["@babel/plugin-transform-runtime", {
                                    "corejs": false,
                                    "helpers": true,
                                    "regenerator": false,
                                    "useESModules": false
                                }]
                            ],
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {"ie": "9"},
                                    loose: true,
                                    modules: false,
                                    useBuiltIns: false
                                }]
                            ]
                        }
                    },
                    "awesome-typescript-loader"
                ]
            }
        ]
    },
    plugins: [],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.js']
    },
}
