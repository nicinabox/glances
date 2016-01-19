var moment = require('moment')

var timestamp = function () {
  return moment().format('D MMM YYYY HH:mm:ss')
}

var makeLine = function (prefix, args) {
  return [
    '[' + timestamp() + ']',
    prefix
  ].concat(Array.prototype.slice.call(args))
}

module.exports = {
  log: function () {
    if (process.env.NODE_ENV === 'test') return
    console.log.apply(console, makeLine('=>', arguments))
  },

  error: function () {
    if (process.env.NODE_ENV === 'test') return
    console.warn.apply(console, makeLine('!!', arguments))
  }
}
