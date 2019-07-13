const os = require('os');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
const isLib = process.env.MODE === 'library';

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : false,

    context: path.resolve(process.cwd(), 'src'),

    entry: {
        'kuna-chart-header': './index.tsx',
    },
    output: {
        path: path.resolve(__dirname, isLib ? 'lib' : 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'KunaChartHeader',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                query: {
                    declaration: false,
                },
            }],
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: isDev,
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
                parallel: os.cpus().length,
            }),

            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { discardComments: { removeAll: true } },
            }),
        ],
    },
};