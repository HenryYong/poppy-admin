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

import baseConfig from './webpack.base.conf'
import config from './../config'
import {
    styleLoaders,
    assetsPath
} from './utils'

const webpackConfig = merge(baseConfig, {
    entry: {
        'main': './src/main.js'
        // 'admin': './src/admin.js',
        // 'client': './src/client.js'
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
        new webpack.DefinePlugin(config.build.envVar),
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
            // filename: config.build.assetsRoot + sep + config.build.assetsSubDirectory + '/index.html',
            filename: resolve(config.build.assetsRoot + sep + config.build.assetsSubDirectory, '..') + '/index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            // chunks: ['main', 'admin', 'client'],
            // 如果打开 vendor 和 manifest 那么需要配置 chunksSortMode 保证引入 script 的顺序
            chunksSortMode: 'dependency'
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
            async: 'common-lazy',
            minChunks: ({ resource } = {}) => (
                resource
                && resource.includes('node_modules')
            )
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'twice',
            minChunks: (module, count) => (count >= 2)
        }),
        new CopyWebpackPlugin([
            {
                from: resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
})

// const htmlArray = ['index', 'admin', 'client']
// htmlArray.forEach((element) => {
//     const chunksArray = [element]
//     // if (element === 'index') {
//     //     chunksArray.push('entry')
//     // }
//     const newPlugin = new HTMLWebpackPlugin({
//         filename: config.build.assetsRoot + sep + config.build.assetsSubDirectory + '/index.html',
//         template: element + '.html', // 获取最初的html末班
//         inject: true, // 插入文件的位置
//         hash: true, // 在生成的文件后面增加一个hash，防止缓存
//         minify: {
//             removeComments: true,
//             collapseWhitespace: true,
//             removeAttributeQuotes: true
//         },
//         chunks: chunksArray,
//         chunksSortMode: 'dependency'
//     })
//     webpackConfig.plugins.push(newPlugin)
// })

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
