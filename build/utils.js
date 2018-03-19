/**
 * utils functions
 * @author Henry Yang
 */

import path from 'path'
import config from './../config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import rider from 'rider'

export function assetsPath (_path) {
    return path.posix.join(config.build.assetsSubDirectory, _path)
}

export function cssLoaders (options = {}) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: (process.env.NODE_ENV || '').split(':')[0] === 'production',
            sourceMap: options.sourceMap
        }
    }

    const generateLoaders = (loader, loaderOptions) => {
        const loaders = [cssLoader]
        if (loader) {
            if (loader === 'sass') {
                loaders.push(
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: loader + '-loader',
                        options: Object.assign({}, loaderOptions, {
                            sourceMap: true
                        })
                    }
                )
            } else {
                loaders.push({
                    loader: loader + '-loader',
                    options: Object.assign({}, loaderOptions, {
                        sourceMap: options.sourceMap
                    })
                })
            }
            // loaders.push({
            //     loader: loader + '-loader',
            //     options: Object.assign({}, loaderOptions, {
            //         sourceMap: (loader === 'sass') ? true : options.sourceMap
            //     })
            // })
        }

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        }
        return ['vue-style-loader'].concat(loaders)
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders('postcss', {
            postcss: autoprefixer({
                browsers: ['iOS >= 7', 'Android >= 4.0']
            })
        }),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        // scss: generateLoaders('sass', {
        //     includePaths: [
        //         './node_modules/@tencent/bkc-ui/src'
        //     ]
        // }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus', {
            use: [rider()]
        }),
        styl: generateLoaders('stylus', {
            use: [rider()]
        })
    }
}

export function styleLoaders (options) {
    const output = []
    const loaders = cssLoaders(options)
    /* eslint-disable fecs-use-for-of */
    for (const extension in loaders) {
        if (loaders.hasOwnProperty(extension)) {
            const loader = loaders[extension]
            
            output.push({
                test: new RegExp('\\.' + extension + '$'),
                use: loader
            })
        }
    }
    console.log(output)
    /* eslint-enable fecs-use-for-of */
    return output
}
