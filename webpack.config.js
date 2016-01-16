module.exports = {
  entry: './javascripts/main.js',
  output: {
    path: 'public',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ],
  },
}
