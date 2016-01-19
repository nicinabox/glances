var React = require('react')
var isArray = require('lodash/isArray')
var isPlainObject = require('lodash/isPlainObject')
var toPairs = require('lodash/toPairs')

var renderRow = (value, i) => {
  var item = isArray(value) ? value : [value]

  return (
    <li key={`row-${i}`}>
      {item.map((v, i) => <span key={`item-${i}`}>{v}</span>)}
    </li>
  )
}

var renderRows = (items) => {
  return items.map(renderRow)
}

module.exports = function ({value}) {
  var rows

  if (isPlainObject(value)) {
    rows = renderRows(toPairs(value))
  } else if (isArray(value)) {
    rows = renderRows(value)
  } else {
    rows = value
  }

  return (
    <ul className="list">
      {rows}
    </ul>
  )
}
