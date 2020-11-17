const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  devServer: {
    open: true,
    hot: true,
    // contentBase: path.join(__dirname, "dist"),
    // publicPath: '/',
    // compress: true,
    // port: 9000
  }
}