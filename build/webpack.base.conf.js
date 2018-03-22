/**
 * base config
 * @author HenryYang
 */

import path from 'path'
import webpack from 'webpack'
import ESLintFriendlyFormatter from 'eslint-friendly-formatter'

import config from './../config'
import {
    assetsPath,
    cssLoaders
} from './utils'

const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

export default {
    context: path.resolve(__dirname, '../'), // 配置当前js执行时的上下文位置
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            'src': resolve('src')
        }
    },
    cache: true,
    module: {
        // for es5 files
        // noParse: [],
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                include: [resolve('src')],
                exclude: /node_modules/,
                enforce: 'pre',
                options: {
                    formatter: ESLintFriendlyFormatter
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: './webpack_cache'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                // https://vue-loader.vuejs.org/zh-cn/options.html
                options: {
                    transformToRequire: {
                        video: 'src',
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    },
                    loaders: cssLoaders({
                        extract: isProd,
                        sourceMap: isProd ? config.build.productionSourceMap : config.dev.cssSourceMap
                    })
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
