/**
 * Created by wangweilin on 2017/6/9.
 */

const TerserPlugin = require("terser-webpack-plugin");
const {merge} = require('webpack-merge');
const packageJson = require('./package.json');

const isDev = false;

const banner = `/* v${packageJson.version} http://wangwl.net/static/pages/utils.html */`

const baseConfig = {
    mode: isDev ? 'none' : 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {format: {preamble: banner}}
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
};

const uncompressedConfig = merge(baseConfig, {
    output: {
        filename: 'index.uncompressed.js'
    },
    optimization: {
        minimize: false
    }
});


module.exports = isDev ? baseConfig : [baseConfig, uncompressedConfig];
