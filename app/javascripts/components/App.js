var findIndex = require('lodash/findIndex')
var clone = require('lodash/clone')
var reject = require('lodash/reject')
var io = require('socket.io-client')
var React = require('react')

var Tile = require('./Tile')
var socket = io()

const CONNECTED = 'connected'
const CONNECTING = 'connecting'
const RECONNECTING = 'reconnecting'
const DISCONNECTED = 'disconnected'

module.exports = React.createClass({
  getInitialState() {
    return {
      tiles: [],
      status: CONNECTING
    }
  },

  componentDidMount() {
    socket.on('reconnect_failed', () => {
      this.setState({ status: DISCONNECTED })
    })

    socket.on('connect', () => {
      this.setState({ status: CONNECTED })
    })

    socket.on('reconnect', () => {
      this.setState({ status: CONNECTED })
    })

    socket.on('reconnecting', () => {
      this.setState({ status: RECONNECTING })
    })

    socket.on('tiles', (tiles) => {
      this.setState({ tiles })
    })
  },

  render() {
    var statusClassNames = ['status', `status-${this.state.status}`].join(' ')

    return (
      <div>
        <div className={statusClassNames}>
          <span className="indicator"></span>
          {this.state.status}
        </div>

        <div className="container">
          {this.state.tiles.map((props, i) => <Tile key={`tile-${i}`} {...props} />)}
        </div>
      </div>
    )
  }
})
