var React = require('react')

const TICKER_INTERVAL = 4000

module.exports = React.createClass({
  getInitialState() {
    return {
      activeIndex: 0
    }
  },

  getDefaultProps() {
    return {
      value: []
    }
  },

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        activeIndex: this._nextIndex()
      })
    }, TICKER_INTERVAL)
  },

  componentWillUnmount() {
    clearInterval(this.timer)
  },

  _nextIndex() {
    var size = this.props.value.length - 1
    var currentIndex = this.state.activeIndex
    var nextIndex = currentIndex + 1
    return nextIndex > size ? 0 : nextIndex
  },

  render() {
    return (
      <h2 className="ticker">
        {this.props.value[this.state.activeIndex]}
      </h2>
    )
  }
})
