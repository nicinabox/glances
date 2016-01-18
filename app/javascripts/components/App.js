var findIndex = require('lodash/findIndex')
var clone = require('lodash/clone')
var reject = require('lodash/reject')
var io = require('socket.io-client')
var React = require('react')

var Tile = require('./Tile')
var socket = io()

module.exports = React.createClass({
  getInitialState() {
    return {
      tiles: []
    }
  },

  componentDidMount() {
    socket.on('tiles', (tiles) => {
      tiles = reject(tiles, 'disabled')
      this.setState({ tiles })
    })

    socket.on('tile-change', (tile) => {
      var index = findIndex(this.state.tiles, { id: tile.id })
      if (index > -1) {
        var newTiles = clone(this.state.tiles)
        newTiles[index] = tile

        this.setState({
          tiles: newTiles
        })
      }
    })
  },

  render() {
    return (
      <div className="container">
        {this.state.tiles.map((props, i) => <Tile key={`tile-${i}`} {...props} />)}
      </div>
    )
  }
})
