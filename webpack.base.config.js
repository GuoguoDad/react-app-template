const path = require("path");
const utils = require("./utils");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    output: {
      path: utils.resolve("./dist"),
      filename: utils.assetsPath("js/bundle-[name]-[contenthash:5].js"),
      chunkFilename: utils.assetsPath("js/bundle-[name]-[contenthash:5].js"),
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
          { test: /\.(js|jsx)$/, exclude: /node_modules/, use: [{ loader: 'babel-loader', options: { cacheDirectory: true }}] },
          { test: /\.css$/, use: [{loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }] },
          { test: /\.less$/, use: [{loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }, { loader: "less-loader" }] },
          { test: /\.html$/, use: { loader: 'html-loader' }},
          { test: /\.(png|gif|svg)$/, use: [{ loader: 'url-loader', options: { name: utils.assetsPath("img/[name].[contenthash:5].[ext]"), limit: 1024 }}] }
      ]
    },
    resolve: {
      modules: ["node_modules"],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        "@kits": path.resolve(__dirname, "./src/kits"),
        "@assets": path.resolve(__dirname, "./src/assets"),
      }
    },
    plugins:[
      new CopyWebpackPlugin({
        patterns: [
          {
              from: utils.resolve('./public/static'), 
              to: "static"
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name]-[contenthash:5].css'),
        chunkFilename: utils.assetsPath('css/[name]-[contenthash:5].css'),
      })
    ]
}