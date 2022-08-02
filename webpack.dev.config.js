const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const WebpackPluginMock = require('webpack-plugin-mock')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: {
    app: './src/index.tsx'
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin({
      context: utils.appPath,
      cache: false,
      emitWarning: true,
      emitError: true,
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      formatter: require.resolve('eslint-friendly-formatter'),
      eslintPath: require.resolve('eslint'),
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      ignore: true,
      fix: true
    }),
    new StylelintPlugin({
      context: utils.appPath,
      emitWarning: true,
      emitError: true,
      files: ['src/**/*.css', 'src/**/*.less'],
      stylelintPath: require.resolve('stylelint'),
      ignore: true,
      fix: true,
      useEslintrc: true
    }),
    new WebpackPluginMock({
      apiBasePath: './mock',
      watch: true,
      pretty: true,
      port: 8090
    }),
  ],
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
