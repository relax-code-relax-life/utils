/**
 * Created by wangweilin on 2017/6/9.
 */

const TerserPlugin = require("terser-webpack-plugin");

const isDev = false;

module.exports = {
    mode: isDev ? 'none' : 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {format: {preamble: '/* http://wangwl.net/static/pages/utils.html */'}}
            })
        ]
    },
    entry: {
        main: './index.ts'
    },
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
        library: 'relaxUtils',
        libraryTarget: 'umd',
        umdNamedDefine: false,
        globalObject: 'this',
        libraryExport: 'default'
    },
    watch: isDev,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [],
    resolve: {
        extensions: ['.ts', '.js']
    },
}
