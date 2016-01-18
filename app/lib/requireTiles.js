var glob = require('glob')
var path = require('path')
var sortBy = require('lodash/sortBy')
var findIndex = require('lodash/findIndex')
var reject = require('lodash/reject')
var decorateTile = require('./decorateTile')

var tiles = []

var emitter = function (io) {
  return function (data) {
    var tile = decorateTile(data)
    var index = findIndex(tiles, { id: tile.id })

    tiles[index] = tile

    io.emit('tiles', nextTiles(tiles))
  }
}

var nextTiles = function (_tiles) {
  return reject(sortBy(_tiles, 'position'), 'disabled')
}

module.exports = function (io) {
  var emit = emitter(io)

  io.on('connection', function (socket) {
    socket.emit('tiles', nextTiles(tiles))
  })

  var requireFiles = function (files) {
    return nextTiles(files.map(function (f) {
      var tile = require(path.resolve(f))

      if (typeof tile == 'function') {
        return decorateTile(tile(emit))
      } else {
        return decorateTile(tile)
      }
    }))
  }

  return new Promise(function (resolve, reject) {
    if (tiles.length) {
      resolve(tiles)
    } else {
      glob('tiles/*.js', function (err, files) {
        resolve(requireFiles(files))
      })
    }
  })
  .then(function (_tiles) {
    tiles = _tiles

    io.on('connection', function (socket) {
      socket.emit('tiles', tiles)
    })
  })
}
