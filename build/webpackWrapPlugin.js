'use strict'

const ConcatSource = require('webpack-sources').ConcatSource

function WebpackWrapPlugin(options) {
  const defaultOptions = {}

  this.options = Object.assign(defaultOptions, options)
}

WebpackWrapPlugin.prototype.apply = function(compiler) {
  const options = this.options
  const prefix = options.prefix
  const suffix = options.suffix

  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
      chunks.forEach((chunk) => {
        if (options.entryOnly && !chunk.isInitial()) return

        chunk.files.forEach((file) => {
          return compilation.assets[file] = new ConcatSource(
                   prefix, '\n', compilation.assets[file], '\n', suffix
                 )
        })
      })
      callback()
    })
  })
}

module.exports = WebpackWrapPlugin
