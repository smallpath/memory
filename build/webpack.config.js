var path = require('path')
var RunEstkScriptPlugin = require('./runEstkScriptPlugin')

var shell = `"${process.env.AE}" -r ${path.join(__dirname, '../dist/Sp_memory.jsx')}`

var plugins = process.env.NODE_ENV !== 'production' ? [
  new RunEstkScriptPlugin({
    onBuildEnd: [shell]
  })
] : []

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
