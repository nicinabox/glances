var glob = require('glob')
var path = require('path')
var _reject = require('lodash/reject')

var requireFilePaths = function (files) {
  return files.map(function (f) {
    return require(path.resolve(f))
  })
}

var requireRawTiles = function (tilesPath) {
  return new Promise(function (resolve, reject) {
    glob(tilesPath, function (err, paths) {
      if (err) reject(err)

      var files = _reject(requireFilePaths(paths), function (f) {
        return !f.state
      })

      resolve(files)
    })
  })
}

module.exports = function (tilesPath) {
  return requireRawTiles(tilesPath)
}
