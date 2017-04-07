
module.exports = {
  entry: {
    app: './memory.jsx'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].jsx'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../Sp_memory'),
      'lib': path.resolve(__dirname, '../Sp_memory/lib')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}
