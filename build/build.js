/**
 * build file
 * @author Henry Yang
 */

import ora from 'ora'
import chalk from 'chalk'
import rm from 'rimraf'
import webpack from 'webpack'
import config from './../config'
import webpackConfig from './webpack.build.conf'

const NODE_ENV = process.env.NODE_ENV
const buildConfig = config[NODE_ENV]
const spinner = ora(`building for ${NODE_ENV} env`)

spinner.start()

rm(buildConfig.assetsRoot, (e) => {
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
