var glob = require('glob')
var path = require('path')

var requireFilePaths = function (files) {
  return files.map(function (f) {
    var t = require(path.resolve(f))
    t.id = t.id || path.basename(f, '.js')
    return t
  })
}

var requireRawTiles = function (tilesPath) {
  return new Promise(function (resolve, reject) {
    glob(tilesPath, function (err, paths) {
      if (err) reject(err)
      resolve(requireFilePaths(paths))
    })
  })
}

module.exports = function (tilesPath) {
  return requireRawTiles(tilesPath)
}
