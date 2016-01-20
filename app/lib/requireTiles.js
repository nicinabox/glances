var glob = require('glob')
var path = require('path')

var requireFilePaths = function (files) {
  return files.map(function (f) {
    return require(path.resolve(f))
  })
}

var requireRawTiles = function (tilesPath) {
  return new Promise(function (resolve, reject) {
    glob(tilesPath, function (err, paths) {
      resolve(requireFilePaths(paths))
    })
  })
}

module.exports = function (tilesPath) {
  return requireRawTiles(tilesPath)
}
