const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports ={
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: "js/bundle-[name]-[hash:5].js",
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
        { test: /\.css$/, use: [{loader: MiniCssExtractPlugin.loader, options: { publicPath: '../'}}, { loader: "css-loader" }] },
        { test: /\.less$/, use: [{loader: MiniCssExtractPlugin.loader, options: { publicPath: '../'}}, { loader: "css-loader" }, { loader: "less-loader" }] },
        { test: /\.html$/, use: { loader: 'html-loader' }},
        { test: /\.(png|gif|svg)$/, use: [{ loader: 'url-loader', options: { name: "img/[name].[hash:5].[ext]", limit: 1024 ,publicPath: "../" }}] }
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
  devtool: "source-map",
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:5].css',
      chunkFilename: '[name]-[hash:5].css',
    }),
    new HtmlWebpackPlugin({
        title: 'fe-app',
        filename: 'index.html',
        template: './index.ejs'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
        }
      }
    },
    minimizer: [
      new TerserPlugin(),
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions:{
          warnings: false,
          compress: true
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }
}