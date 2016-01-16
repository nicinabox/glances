var findIndex = require('lodash/findIndex')
var clone = require('lodash/clone')
var io = require('socket.io-client')
var React = require('react')

var Block = require('./Block')
var socket = io()

module.exports = React.createClass({
  getInitialState() {
    return {
      blocks: []
    }
  },

  componentDidMount() {
    socket.on('blocks', (blocks) => {
      this.setState({ blocks })
    })

    socket.on('block-change', (block) => {
      var index = findIndex(this.state.blocks, { id: block.id })
      if (index > -1) {
        var newBlocks = clone(this.state.blocks)
        newBlocks[index] = block

        this.setState({
          blocks: newBlocks
        })
      }
    })
  },

  render() {
    return (
      <div className="container">
        {this.state.blocks.map((props, i) => <Block key={`block-${i}`} {...props} />)}
      </div>
    )
  }
})
