module.exports = {
　　"presets": [
      "@babel/react",
      "@babel/preset-env"
    ],
    "plugins": [
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-syntax-dynamic-import",
      ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es/components", "style": false}]
    ]
}
