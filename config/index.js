/**
 * config
 * @author Henry Yang
 */

import path from 'path'
import devEnvVar from './dev.env_var'
import testEnvVar from './test.env_var'
import prodEnvVar from './prod.env_var'

export default {
    production: {
        envVar: prodEnvVar,
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        assetsSubDirectory: 'admin/static',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    test: {
        envVar: testEnvVar
    },
    dev: {
        port: 8005,
        envVar: devEnvVar,
        assetsPublicPath: '/',
        assetsSubDirectory: 'static',
        autoOpenBrowser: true,
        cssSourceMap: false
    }
}
