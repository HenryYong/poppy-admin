/**
 * webpack prod config
 * @author Henry Yang
 */

import {
    resolve,
    sep
} from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import UglifyJS from 'uglifyjs-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import OptimizeCSSAssetsPlguin from 'optimize-css-assets-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import bundleAnalyzer from 'webpack-bundle-analyzer'
// import SplitSourceWebpackPlugin from 'split-source-webpack-plugin'
import HTMLWebpackScriptPlugin from './../src/plugins/html-webpack-script-plugin'

import baseConfig from './webpack.base.conf'
import config from './../config'
import {
    // styleLoaders,
    assetsPath
} from './utils'

// const highlightIncludes = [
//     'html',
//     'css',
//     'javascript',
//     'bash',
//     'nginx'
// ]
const webpackConfig = merge(baseConfig, {
    entry: {
        'main': './src/main.js'
    },
    module: {
        // rules: styleLoaders({
        //     sourceMap: config.build.productionSourceMap,
        //     extract: true
        // })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: assetsPath('js/[name].[chunkhash].js')
    },
    plugins: [
        new webpack.DefinePlugin(config[process.env.NODE_ENV].envVar), // 根据当前编译环境引入不同的全局变量
        new UglifyJS({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            parallel: true,
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: assetsPath('css/[name].[contenthash].css')
        }),
        new OptimizeCSSAssetsPlguin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new HTMLWebpackPlugin({
            filename: resolve(config.build.assetsRoot + sep + config.build.assetsSubDirectory, '..') + '/index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            // 如果打开 vendor 和 manifest 那么需要配置 chunksSortMode 保证引入 script 的顺序
            chunksSortMode: 'dependency'
        }),
        new HTMLWebpackScriptPlugin({
            paths: [
                'https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.min.js',
                'https://unpkg.com/vue-router@3.0.1/dist/vue-router.js',
                'https://unpkg.com/vuex@3.0.1/dist/vuex.js',
                'https://unpkg.com/axios/dist/axios.min.js'
            ]
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => (
                resource
                && resource.indexOf('node_modules') >= 0
                && resource.match(/\.js$/)
            )
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'mavon-editor',
            minChunks: ({ resource } = {}) => (
                resource
                && resource.includes('mavon-editor')
            )
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'element-ui',
            minChunks: ({ resource } = {}) => (
                resource
                && resource.includes('element-ui')
            )
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     async: 'highlight',
        //     minChunks: ({ resource } = {}) => (
        //         resource
        //         && highlightIncludes.some(item => {
        //             return resource.includes(`${item}.js`)
        //         })
        //     )
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     async: 'twice',
        //     minChunks: (module, count) => (count >= 2)
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     async: 'common-lazy',
        //     minChunks: ({ resource } = {}) => (
        //         resource
        //         && resource.includes('node_modules')
        //     )
        // }),
        new CopyWebpackPlugin([
            {
                from: resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ],
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios'
    }
})

if (config.build.productionGzip) {
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = bundleAnalyzer.BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default webpackConfig
