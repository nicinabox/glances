var partial = require('lodash/partial')
var findIndex = require('lodash/findIndex')
var reject = require('lodash/reject')
var sortBy = require('lodash/sortBy')
var every = require('./lib/every')

var state = {
  tiles: []
}

var setState = function (nextState) {
  state = nextState
}

var setupTileSchedulers = function (rawTiles, emitChange) {
  rawTiles.forEach(function (t) {
    t.schedule = partial(t.schedule, {
      every, emitChange
    }, t.options)
  })

  return rawTiles
}

var initializeSchedules = function (tiles) {
  tiles.forEach(function (t) {
    t.schedule()
  })
}

var getTileStates = function () {
  var tiles = state.tiles.map(function (t) { return t.state })
  tiles = reject(tiles, function (t) { return t.disabled })
  tiles = sortBy(tiles, 'position')
  return tiles
}

var updateTile = function (nextState) {
  var tiles = state.tiles

  var index = findIndex(tiles, function (t) {
    return t.state.id === nextState.id
  })

  if (index > -1) {
    tiles[index].state = nextState
    setState({ tiles })
  }
}

var createEmitter = function (io) {
  return function (nextState) {
    updateTile(nextState)

    io.emit('tiles', getTileStates())
    return Promise.resolve(nextState)
  }
}

module.exports = {
  initialize(rawTiles, io) {
    var emitChange = createEmitter(io)
    var tiles = setupTileSchedulers(rawTiles, emitChange)
    setState({ tiles })

    initializeSchedules(tiles)

    io.on('connection', emitChange)
  },
}
