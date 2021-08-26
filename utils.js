const path = require('path')
const fs = require('fs')

exports.resolve = function (dir) {
  return path.resolve(__dirname, dir)
}

exports.assetsPath = function (_path) {
  return path.posix.join('static', _path)
}

resolveApp = function (dir) {
  return path.resolve(fs.realpathSync(process.cwd()), dir)
}

exports.appPath = resolveApp('.')
