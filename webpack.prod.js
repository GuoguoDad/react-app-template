const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports ={
  mode: 'production',
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname + "/dist"), //生成的文件存放目录
    filename: "bundle-[name]-[hash:5].js",
    chunkFilename: "bundle-[name]-[hash:5].js"
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
        { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory=true" },
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }] },
        { test: /\.less$/, use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }, { loader: "less-loader" }] },
        { test: /\.(png|gif|svg)$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:5].css',
      chunkFilename: '[name]-[hash:5].css',
    }),
    new HtmlWebpackPlugin({
        title: 'fe-app',
        filename: 'index.html',
        template: './index.html'
    })
  ]
}