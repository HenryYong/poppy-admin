/**
 * config
 * @author Henry Yang
 */

import path from 'path'
import devEnvVar from './dev.env_var'
import prodEnvVar from './prod.env_var'

export default {
    build: {
        envVar: prodEnvVar,
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        assetsSubDirectory: 'static',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        envVar: devEnvVar,
        assetsPublicPath: '/',
        assetsSubDirectory: 'static',
        autoOpenBrowser: true,
        cssSourceMap: false
    }
}
