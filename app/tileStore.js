var partial = require('lodash/partial')
var findIndex = require('lodash/findIndex')
var find = require('lodash/find')
var merge = require('lodash/merge')
var reject = require('lodash/reject')
var sortBy = require('lodash/sortBy')
var noop = require('lodash/noop')
var every = require('./lib/every')
var logger = require('./lib/logger')
var decorateState = require('./lib/decorateState')

var state = {
  tiles: []
}

var setState = function (nextState) {
  state = nextState
}

var initializeTiles = function (rawTiles, emitChange) {
  var utils = {
    every, emitChange, logger
  }

  var defaults = {
    state: {
      id: '',
      color: '',
      position: null,
      span: 1,
    },
    onRequest: noop,
    schedule: noop,
  }

  var nextTiles = rawTiles.map(function (t) {
    var tile = merge({}, defaults, t)

    tile.state = decorateState(tile.state)
    tile.onRequest = partial(tile.onRequest, utils)
    tile.schedule = partial(tile.schedule, utils, tile.options)

    return tile
  })

  return nextTiles
}

var initializeSchedules = function (tiles) {
  tiles.forEach(function (t) { t.schedule() })
}

var getTileStates = function () {
  var tiles = state.tiles.map(function (t) { return t.state })
  tiles = reject(tiles, function (t) { return t.disabled })
  tiles = sortBy(tiles, 'position')
  return tiles
}

var updateTile = function (nextState) {
  try {
    nextState = decorateState(nextState)
  } catch (e) {
    logger.error(e)
  }

  var tiles = state.tiles

  var index = findIndex(tiles, function (t) {
    return t.state.id === nextState.id
  })

  if (index > -1) {
    Object.assign(tiles[index].state, nextState)
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
    var tiles = initializeTiles(rawTiles, emitChange)

    setState({ tiles })
    initializeSchedules(tiles)

    io.on('connection', function () {
      io.emit('tiles', getTileStates())
    })
  },

  getTiles() {
    return state.tiles
  },

  getTile(id) {
    var tiles = state.tiles
    return find(tiles, function (t) {
      return t.state.id === id
    })
  }
}
