const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports ={
  entry: {
    app: "./src/index.tsx"
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
        { test: /\.(png|gif|svg)$/, use: [{ loader: 'url-loader', options: { name: "img/[name].[hash:5].[ext]", limit: 1024 ,publicPath: "../" }}] }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
    }
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
  ],
  devServer: {
    port: 8080,
    disableHostCheck: true
  }
}