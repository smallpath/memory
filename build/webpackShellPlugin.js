'use strict'

const exec = require('child_process').exec

function puts(error, stdout, stderr) {
  if (error) {}
  if (stdout) console.log(stdout)
}

function WebpackShellPlugin(options) {
  const defaultOptions = {
    onBuildEnd: []
  }

  this.options = Object.assign(defaultOptions, options)
}

WebpackShellPlugin.prototype.apply = function(compiler) {
  const options = this.options

  compiler.plugin('emit', (compilation, callback) => {
    if (options.onBuildEnd.length) {
      options.onBuildEnd.forEach(script => exec(script, puts))
    } else if (typeof options.onBuildEnd === 'function') {
      options.onBuildEnd()
    }
    callback()
  })
}

module.exports = WebpackShellPlugin
