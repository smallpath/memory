const webpack = require('webpack')
const path = require('path')
const packages = require('../package.json')
const os = require('os')
const osascript = require('osascript').eval
const WebpackShellPlugin = require('./webpackShellPlugin')
const WebpackWrapPlugin = require('./webpackWrapPlugin')
const plugins = [
  new webpack.DefinePlugin({
    'process.env.VERSION': JSON.stringify(packages.version)
  }),
  new WebpackWrapPlugin({
    prefix: '/****/ (function(memoryGlobal) {',
    suffix: '/****/ })(this)'
  }),
  new webpack.BannerPlugin({
    banner: `  ${packages.name} ${packages.version}

  ${packages.description}

  repository: ${packages.homepage.replace('#readme', '')}
  issues: ${packages.bugs.url}`
  })
]

const isDev = process.env.NODE_ENV !== 'production'
const targetScript = path.join(__dirname, '../dist/Sp_memory.jsx')

if (isDev) {
  const ae = require('after-effects')
  const isMac = os.platform() === 'darwin'
  if (isMac) {
    const aeFolderName = path.basename(path.join(ae.scriptsDir, '../'))
    const appleScriptContent = `tell application "${aeFolderName}"
  DoScriptFile "${targetScript}"
end tell`
    plugins.push(
      new WebpackShellPlugin({
        onBuildEnd: function() {
          osascript(appleScriptContent, {
            type: 'AppleScript'
          }, (err, data) => {
            if (err) console.error(err)
          })
        }
      })
    )
  } else {
    const afterfx = path.join(ae.scriptsDir, '../afterfx.exe')
    const shell = `"${afterfx}" -r ${targetScript}`

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
