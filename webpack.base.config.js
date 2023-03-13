const { DllReferencePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const HtmlExtPlugin = require('./src/kits/html-ext-plugin')
const getCSSModuleLocalIdent = require('./getCSSModuleLocalIdent')
const utils = require('./utils')
const path = require('path')

const isEnvDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  output: {
    path: utils.resolve('./dist'),
    filename: utils.assetsPath('js/bundle-[name]-[contenthash:5].js'),
    chunkFilename: utils.assetsPath('js/bundle-[name]-[contenthash:5].js')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                isEnvDevelopment &&
                require.resolve('react-refresh/babel'),
              ].filter(Boolean)
            }
          }
        ]
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
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          title: 'fe-app',
          filename: 'index.html',
          template: './public/index.ejs',
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }
      )
    ),
    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: false
    })
  ],
  performance: false
}
