var path = require('path')

module.exports = {
  entry: {
    app: './index.jsx'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'Sp_memory.jsx'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'src': path.resolve(__dirname, './Sp_memory'),
      'lib': path.resolve(__dirname, './Sp_memory/lib'),
      'helper': path.resolve(__dirname, './Sp_memory/lib/HelperScripts')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}
