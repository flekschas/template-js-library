const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
  entry: {
    index: './demo/index.js'
  },
  output: {
    path: `${__dirname}/demo-build`,
    publicPath: argv.mode === 'production' ? './' : '/'
  },
  devServer: {
    contentBase: './demo'
  },
  module: {
    rules: [
      {
        test: /\.(js|fs|vs)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.fs', '.vs']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
      filename: 'index.html',
      chunks: ['index']
    })
  ]
});
