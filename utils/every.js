var path = require('path')
var stack = require('callsite')
var logger = require('./logger')

var toMs = function (str) {
  var units = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
  }

  var matches = str.match(/(\d+)\s?(\w+)/)
  var interval = +matches[1]

  var unit = Object.keys(units).filter((u) => {
    var re = new RegExp(`^${matches[2]}?`)
    return re.test(u)
  })[0]

  var duration = units[unit]

  return duration * interval
}

module.exports = function (intervalStr, desc, fn) {
  if (typeof desc == 'function') {
    fn = desc
    desc = ''
  }


  var caller = desc || path.basename(stack()[1].getFileName())
  var interval = toMs(intervalStr)
  var done = () => setTimeout(callFn, interval)

  if (!interval) {
    console.log('=>', 'No interval for', intervalStr)
  }

  var callFn = () => {
    logger.log('Every', intervalStr, caller)

    var p = fn(done)
    if (p instanceof Promise) p.then(done)
  }

  callFn()
}
