/**
 * dev entry file
 * @author Henry Yang
 */

import Koa from 'koa'
import path from 'path'
import webpack from 'webpack'
import serve from 'koa-static'
import KoaWebpackDevMiddleware from 'koa-webpack-dev-middleware'
import KoaWebpackHotMiddleware from 'koa-webpack-hot-middleware'
import history from 'koa2-connect-history-api-fallback'
import devConf from './webpack.dev.conf'
import config from './../config'

import opn from 'opn'

const webpackConfig = devConf
const autoOpenBrowser = !!config.dev.autoOpenBrowser

const koa = new Koa()
const compiler = webpack(webpackConfig)
const devMiddleware = KoaWebpackDevMiddleware(compiler, {
    publicPath: devConf.output.publicPath,
    quiet: true
})
const hotMiddleware = KoaWebpackHotMiddleware(compiler, {
    heartbeat: 2000
})

koa.use(history())
koa.use(devMiddleware)

// compiler.plugin('compilation', compilation => {
//     compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
//         console.log(hotMiddleware)
//         hotMiddleware.publish({ action: 'reload' })
//         cb()
//     })
// })

koa.use(hotMiddleware)
koa.use(serve(path.join(__dirname, '/dist/'), { extensions: ['html'] }))

let _resolve
const readyPromise = new Promise(resolve => {
    _resolve = resolve
})

devMiddleware.waitUntilValid(() => {
    if (autoOpenBrowser) {
        opn('http://dev.sephenry.cn:8002')
    }
    _resolve()
})

// if (autoOpenBrowser) {
//     opn('http://dev.sephenry.cn:8002')
// }

const server = koa.listen(8002, () => {
    console.log('app listen at 8002')
})

export default {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
