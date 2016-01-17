var glob = require('glob')
var sortBy = require('lodash/sortBy')

var decorateBlock = function (block) {
  return Object.assign({}, block, {
    id: block.title.toLowerCase().replace(' ', '-'),
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
