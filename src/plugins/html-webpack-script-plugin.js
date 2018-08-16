/**
 * @file resolve add custom js file before webpack inject js files
 * @author Henry Yang
 */

function htmlWebpackScriptPlugin (options) {
    this.options = options
}

htmlWebpackScriptPlugin.prototype.apply = function (compiler) {
    var paths = this.options.paths

    if (compiler.hooks) { // webpack 4
        compiler.hooks.compilation.tap('htmlWebpackScriptPlugin', (compilation) => {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('htmlWebpackScriptPlugin', (htmlPluginData, callback) => {
                for (var i = paths.length - 1; i >= 0; i--) {
                    htmlPluginData.assets.js.unshift(paths[i])
                }
                callback(null, htmlPluginData)
            })
        })
    } else {
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
                for (var i = paths.length - 1; i >= 0; i--) {
                    htmlPluginData.assets.js.unshift(paths[i])
                }
                callback(null, htmlPluginData)
            })
        })
    }
}

module.exports = htmlWebpackScriptPlugin
