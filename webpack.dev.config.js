const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: {
    app: './src/index.tsx'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    open: 'http://127.0.0.1:8080/#/',
    proxy: {
      '/login-api': {
        secure: false,
        target: 'http://127.0.0.1:8082'
      }
    }
  }
})
