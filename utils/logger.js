var moment = require('moment')

var timestamp = function () {
  return moment().format('D MMM YYYY HH:MM:SS')
}

module.exports = {
  log: function () {
    var args = Array.prototype.slice.call(arguments)
    var line = ['[' + timestamp() + ']', '=>'].concat(args)
    console.log.apply(console, line)
  },

  error: function () {
    var args = Array.prototype.slice.call(arguments)
    var line = ['[' + timestamp() + ']', '!!'].concat(args)
    console.warn.apply(console, line)
  }
}
