var webpack = require('webpack')
var path = require('path')
var packages = require('../package.json')
var os = require('os')
var osascript = require('osascript').eval
var WebpackShellPlugin = require('./WebpackShellPlugin')
var plugins = [
  new webpack.DefinePlugin({
    'process.env.VERSION': JSON.stringify(packages.version)
  })
]

var isDev = process.env.NODE_ENV !== 'production'
var targetScript = path.join(__dirname, '../dist/Sp_memory.jsx')
if (isDev) {
  var ae = require('after-effects')
  var isMac = os.platform() === 'darwin'
  if (isMac) {
    var aeFolderName = path.basename(path.join(ae.scriptsDir, '../'))
    let appleScriptContent = `tell application "${aeFolderName}"
  DoScriptFile "${targetScript}"
end tell`
    plugins.push(
      new WebpackShellPlugin({
        onBuildEnd: function() {
          osascript(appleScriptContent, {
            type: 'AppleScript'
          }).pipe(process.stdout)
        }
      })
    )
  } else {
    var afterfx = path.join(ae.scriptsDir, '../afterfx.exe')
    let shell = `"${afterfx}" -r ${targetScript}`

    plugins.push(
      new WebpackShellPlugin({
        onBuildEnd: [shell]
      })
    )
  }
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
