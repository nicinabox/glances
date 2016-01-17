var React = require('react')
var moment = require('moment')
var _ = require('lodash')

module.exports = React.createClass({
  getInitialState() {
    return {
      updatedAgo: ''
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      updatedAgo: moment(nextProps.updatedAt).fromNow()
    })
  },

  componentDidMount() {
    this.tick = setInterval(() => {
      this.setState({
        updatedAgo: moment(this.props.updatedAt).fromNow()
      })
    }, 1000)
  },

  componentWillUnmount() {
    clearInterval(this.tick)
  },

  renderValue(value) {
    if (_.isArray(value)) {
      return (
        <ul>
          {value.map((v, i) => {
            return (
              <li key={`li-${i}`}>
                <span>{v[0]}</span>
                <span>{v[1]}</span>
              </li>
            )
          })}
        </ul>
      )
    } else {
      return <h2>{this.props.value}</h2>
    }
  },

  render() {
    var tileClassNames = ['tile', this.props.color].join(' ')

    return (
      <div id={this.props.id} className={tileClassNames}>
        <h1>{this.props.title}</h1>
        {this.renderValue(this.props.value)}
        <footer>
          <p className="more-info">{this.props.moreInfo}</p>
          <p className="updated-at">Updated {this.state.updatedAgo}</p>
        </footer>
      </div>
    )
  }
})
