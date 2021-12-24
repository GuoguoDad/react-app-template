const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const HtmlExtPlugin = require('./src/kits/html-ext-plugin')
const getCSSModuleLocalIdent = require('./getCSSModuleLocalIdent')
const utils = require('./utils')
const path = require('path')

module.exports = {
  output: {
    path: utils.resolve('./dist'),
    filename: utils.assetsPath('js/bundle-[name]-[contenthash:5].js'),
    chunkFilename: utils.assetsPath('js/bundle-[name]-[contenthash:5].js')
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }]
      },
      { test: /\.css$/, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }] },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { modules: { getLocalIdent: getCSSModuleLocalIdent }, importLoaders: 1  } },
          { loader: 'postcss-loader' },
          { loader: 'less-loader', options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true
              }
            }}
        ]
      },
      { test: /\.html$/, use: { loader: 'html-loader' } },
      {
        test: /\.(png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { name: utils.assetsPath('img/[name].[contenthash:5].[ext]'), limit: 1024 },
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@comps': path.resolve(__dirname, './src/components'),
      '@assets':  path.resolve(__dirname, './src/assets'),
      '@img': path.resolve(__dirname, './src/assets/images'),
      '@kits': path.resolve(__dirname, './src/kits'),
      '@store': path.resolve(__dirname, './src/store')
    }
  },
  plugins: [
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve('./public/static'),
          to: 'static',
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name]-[contenthash:5].css'),
      chunkFilename: utils.assetsPath('css/[name]-[contenthash:5].css'),
      ignoreOrder: true
    }),
    new webpack.DllReferencePlugin({
      name: 'vendor',
      context: __dirname,
      manifest: require(path.resolve(__dirname, './public/static/dll/vendor.dll.fa6d70.json'))
    }),
    new HtmlWebpackPlugin({
      title: 'fe-app',
      filename: 'index.html',
      template: './public/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new HtmlExtPlugin({
      dllPath: 'static/dll/vendor.dll.fa6d70.js'
    }),
    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: false
    })
  ]
}
