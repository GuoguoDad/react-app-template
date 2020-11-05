const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: {
    app: './src/index.tsx',
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'fe-app',
      filename: 'index.html',
      template: './public/index.ejs',
    }),
  ],
  devServer: {
    port: 8080,
    disableHostCheck: true,
    proxy: {
      '/login-api': {
        secure: false,
        target: 'http://127.0.0.1:8082',
      },
    },
  },
});
