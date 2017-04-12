var webpack = require('webpack')
var path = require('path')
var packages = require('../package.json')
var plugins = [
  new webpack.DefinePlugin({
    'process.env.VERSION': JSON.stringify(packages.version)
  })
]

var isDev = process.env.NODE_ENV !== 'production'
if (isDev) {
  var ae = require('after-effects')
  var afterfx = path.join(ae.scriptsDir, '../afterfx.exe')
  var WebpackShellPlugin = require('./WebpackShellPlugin')

  var shell = `"${afterfx}" -r ${path.join(__dirname, '../dist/Sp_memory.jsx')}`

  plugins.push(
    new WebpackShellPlugin({
      onBuildEnd: [shell]
    })
  )
}

module.exports = {
  entry: {
    app: path.join(__dirname, '../index.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'Sp_memory.jsx'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'src': path.resolve('__dirname', '../src'),
      'lib': path.resolve(__dirname, '../lib'),
      'helper': path.resolve(__dirname, '../lib/HelperScripts')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins
}
