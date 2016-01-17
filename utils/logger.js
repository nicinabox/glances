var moment = require('moment')

var timestamp = function () {
  return moment().format('D MMM YYYY HH:MM:SS')
}

var makeLine = function (prefix, args) {
  return [
    '[' + timestamp() + ']',
    prefix
  ].concat(Array.prototype.slice.call(args))
}

module.exports = {
  log: function () {
    console.log.apply(console, makeLine('=>', arguments))
  },

  error: function () {
    console.warn.apply(console, makeLine('!!', arguments))
  }
}
