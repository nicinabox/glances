module.exports = {
  entry: './app/javascripts/main.js',
  output: {
    path: 'public',
    filename: 'main.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ],
  },
}
