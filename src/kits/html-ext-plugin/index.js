const HtmlWebpackPlugin = require('html-webpack-plugin')

class HtmlExtPlugin {
  constructor(options) {
    this.options = options || {}
  }

  apply(compiler){
    compiler.hooks.compilation.tap('HtmlExtPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('HtmlExtPlugin', (htmlObj, callback) => {
        const { html } = htmlObj
        const { dllPath } = this.options
        htmlObj.html = appendFiles(dllPath, html )
        callback(null, htmlObj)
      })
    })
  }
}
module.exports = HtmlExtPlugin

function appendFiles (dllPath, html) {
  const bodyRegExp = /(<\/body>)/i
  const scripts = `\n\t<script type="text/javascript" charset="utf-8" src="${dllPath}"></script>\n</body>`

  if (bodyRegExp.test(html)) {
    html = html.replace(bodyRegExp, scripts)
  }
  return html
}
