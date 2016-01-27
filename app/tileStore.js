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

var initializeTiles = function (rawTiles, emitter) {
  var emitChange = (id, state) => {
    return emitter(Object.assign({}, {id}, state))
  }

  var defaults = {
    state: {
      color: '',
      position: null,
      span: 1,
    },
    onRequest: noop,
    schedule: noop,
  }

  var nextTiles = rawTiles.map(function (t) {
    var tile = merge({}, defaults, t)
    var utils = {
      every,
      logger,
      emitChange: partial(emitChange, t.id)
    }

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
  var tiles = state.tiles.map((t) => t.state)
  tiles = reject(tiles, (t) => t.disabled)
  tiles = sortBy(tiles, 'position')
  return tiles
}

var updateTile = function (nextState) {
  var tiles = state.tiles
  nextState = decorateState(nextState)

  var index = findIndex(tiles, function (t) {
    return t.id === nextState.id
  })

  if (index > -1) {
    Object.assign(tiles[index].state, nextState)
    setState({ tiles })
  } else {
    logger.error('Tile not found', JSON.stringify(nextState))
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
    var emitter = createEmitter(io)
    var tiles = initializeTiles(rawTiles, emitter)

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
    return find(state.tiles, (t) => t.id === id)
  }
}
