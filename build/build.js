/**
 * build file
 * @author Henry Yang
 */

import ora from 'ora'
import chalk from 'chalk'
import rm from 'rimraf'
import webpack from 'webpack'
import config from './../config'
import webpackConfig from './webpack.prod.conf'

const prodConfig = config.build
const spinner = ora('building for production env')

spinner.start()

rm(prodConfig.assetsRoot, (e) => {
    if (e) {
        throw e
    }
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()

        if (err) {
            throw err
        }

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
    })
})
