const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'client/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}
