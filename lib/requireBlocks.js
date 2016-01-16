var glob = require('glob')
var defaults = require('lodash/defaults')
var sortBy = require('lodash/sortBy')

var decorateBlock = function (block) {
  return defaults(block, {
    id: block.title.toLowerCase().replace(' ', '-'),
    size: '1x1',
    updatedAt: new Date()
  })
}

var emitter = function (io) {
  return function (data) {
    io.emit('block-change', decorateBlock(data))
  }
}

module.exports = function (io, callback) {
  var emit = emitter(io)

  glob('./blocks/*.js', function (err, files) {
    var blocks = files.map(function (f) {
      var block = require('.' + f)

      if (typeof block == 'function') {
        return decorateBlock(block(emit))
      } else {
        return decorateBlock(block)
      }
    })

    blocks = sortBy(blocks, 'position')

    callback(blocks)
  })

}
