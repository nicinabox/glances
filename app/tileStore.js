var partial = require('lodash/partial')
var findIndex = require('lodash/findIndex')
var find = require('lodash/find')
var reject = require('lodash/reject')
var sortBy = require('lodash/sortBy')
var noop = require('lodash/noop')
var every = require('./lib/every')
var decorateState = require('./lib/decorateState')

var state = {
  tiles: []
}

var setState = function (nextState) {
  state = nextState
}

var setupTileMethods = function (rawTiles, emitChange) {
  var utils = {
    every, emitChange
  }

  rawTiles.forEach(function (t) {
    t.state = decorateState(t)
    t.onRequest = partial((t.onRequest || noop), utils)
    t.schedule = partial((t.schedule || noop), utils, t.options)
  })

  return rawTiles
}

var initializeSchedules = function (tiles) {
  tiles.forEach(function (t) {
    t.schedule()
  })
}

var getTileStates = function () {
  var tiles = state.tiles.map(decorateState)
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
    var tiles = setupTileMethods(rawTiles, emitChange)
    initializeSchedules(tiles)

    setState({ tiles })
    io.on('connection', emitChange)
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
