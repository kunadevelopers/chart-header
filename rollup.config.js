/* globals process */

import typeScript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import commonJs from 'rollup-plugin-commonjs';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import clean from 'postcss-clean';

var environment = process.env.ENV || 'development';
var isDevelopmentEnv = (environment === 'development');

export default {
    input: './src/index.tsx',
    output: {
        name: 'KunaChartHeader',
        file: './dist/bundle.js',
        sourceMap: false,
        format: 'umd',
    },
    external: [
        'react',
        'react-proptypes',
    ],
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        typeScript({ tsconfig: 'tsconfig.json' }),
        nodeResolve({ jsnext: true, main: true }),
        postcss({
            extract: true,  // extracts to `${basename(dest)}.css`
            plugins: [autoprefixer, clean],
            writeDefinitions: true,
        }),
        commonJs({
            include: /node_modules/,
            ignoreGlobal: true,
            namedExports: {
                'node_modules/react/index.js': getNamedExports([
                    'react',
                    'react-dom',
                ]),
            },
        }),
        sizeSnapshot(),
        !isDevelopmentEnv && terser(),
    ],
};