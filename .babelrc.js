module.exports = {
　　"presets": [
      "@babel/react",
      "@babel/preset-env"
    ],
    "plugins": [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-syntax-dynamic-import",
      ["import", { "libraryName": "antd-mobile", "style": "css" }]
    ]
}