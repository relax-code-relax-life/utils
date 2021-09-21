import {terser} from 'rollup-plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import packageJson from './package.json';

const banner = `/* v${packageJson.version} https://wangwl.net/static/pages/utils.html */`
const isdev = process.env.NODE_ENV !== 'production';

const config = {
    input: './src/index.ts',
    output: [
        {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'relaxUtils',
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
        }
    ],
    plugins: [
        typescript2(),
        babel({
            babelHelpers: 'bundled'
        }),
        isdev ? undefined : terser({
            compress: {drop_console: true},
            format: {preamble: banner}
        }),
    ].filter(p => p),
    watch: isdev ? {
        exclude: 'node_modules/**',
        include: 'src/**',
        buildDelay: 300
    } : false
}

export default config;