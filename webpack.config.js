/**
 * Created by wangweilin on 2017/6/9.
 */


module.exports = {
    entry: {
        main: './index.js'
    },
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
        library:'utils',
        libraryTarget:'umd'
    },
    watch:true
};