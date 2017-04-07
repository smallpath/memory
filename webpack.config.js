var path = require('path')

module.exports = {
  entry: {
    app: './index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'Sp_memory.jsx'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'lib': path.resolve(__dirname, './lib'),
      'helper': path.resolve(__dirname, './lib/HelperScripts')
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
  }
}
