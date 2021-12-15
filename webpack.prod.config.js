const { merge } = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    app: './src/index.tsx'
  },
  devtool: 'source-map',
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        }}
      ),
      new HtmlMinimizerPlugin({ parallel: true }),
      new WebpackManifestPlugin({
        publicPath: './'
      })
    ]
  }
})
