/**
 * devConf
 */

import webpack from 'webpack'
import merge from 'webpack-merge'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrorWebpackPlugin from 'friendly-errors-webpack-plugin'

import baseConfig from './webpack.base.conf'
import config from './../config'

// 合并webpack配置
const webpackConfig = merge(baseConfig, {
    entry: {
        'main': ['webpack-hot-middleware/client', './src/main.js']
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin(config.dev.envVar), // 定义全局变量
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new webpack.NoEmitOnErrorsPlugin(), // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new FriendlyErrorWebpackPlugin() // 用于更友好地输出webpack的警告、错误等信息
    ]
})

export default webpackConfig
