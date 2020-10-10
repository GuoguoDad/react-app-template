const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseWebpackConfig,{
  entry: {
    app: "./src/index.tsx"
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'fe-app',
      filename: 'index.html',
      template: './index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: '-',
      cacheGroups: {
        basic: {
          priority: 3, 
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|axios)[\\/]/,
        },
        vendors: {
          priority: -10, 
          test: /[\\/]node_modules[\\/]/
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin(),
      new UglifyJsPlugin({
          parallel: true,
          sourceMap: false,
          uglifyOptions: {
              warnings: false,
              compress: {
                  unused: true,
                  drop_debugger: true,
                  drop_console: true, 
              },
              output: {
                  comments: false
              }
          }
      }),
      new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: { 
              discardComments: { removeAll: true }
          } 
      })
    ]
  }
})