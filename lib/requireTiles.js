var glob = require('glob')
var sortBy = require('lodash/sortBy')
var emitter = require('./emitter')
var decorateTile = require('./decorateTile')

module.exports = function (io, callback) {
  var emit = emitter(io)

  glob('./tiles/*.js', function (err, files) {
    var tiles = files.map(function (f) {
      var tile = require('.' + f)

      if (typeof tile == 'function') {
        return decorateTile(tile(emit))
      } else {
        return decorateTile(tile)
      }
    })

    tiles = sortBy(tiles, 'position')

    callback(tiles)
  })

}
