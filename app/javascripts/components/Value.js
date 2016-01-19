var React = require('react')
var ValueStandard = require('./ValueStandard')
var ValueList = require('./ValueList')
var ValueTicker = require('./ValueTicker')

module.exports = function ({ value, display }) {
  switch (display) {
  case 'list':
    return <ValueList value={value} />
  case 'ticker':
    return <ValueTicker value={value} />
  default:
    return <ValueStandard value={value} />
  }
}
