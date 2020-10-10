const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode:"development",
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'fe-app',
      filename: 'index.html',
      template: './index.ejs'
    })
  ],
  devServer: {
    port: 8080,
    disableHostCheck: true,
    proxy: {
      "/login-api":{
          secure: false,
          target:"http://127.0.0.1:8082"
      }
    }
  }
})