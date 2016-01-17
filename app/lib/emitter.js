var decorateTile = require('./decorateTile')

module.exports = function (io) {
  return function (data) {
    io.emit('tile-change', decorateTile(data))
  }
}
