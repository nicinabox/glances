var path = require('path')
var stack = require('callsite')
var logger = require('./logger')

var units = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
}

var matchIntervalParts = function (str) {
  return str.match(/(\d+)\s?(\w+)/)
}

var toMs = function (str) {
  var matches = matchIntervalParts(str)
  var interval = +matches[1]
  var duration = units[getUnit(str)]

  return duration * interval
}

var getInterval = function (str) {
  var matches = matchIntervalParts(str)
  return +matches[1]
}

var getUnit = function (str) {
  var matches = matchIntervalParts(str)

  return Object.keys(units).filter((u) => {
    var re = new RegExp(`^${matches[2]}?`)
    return re.test(u)
  })[0]
}

var normalizeInterval = function (str) {
  var unit = getUnit(str)
  var interval = getInterval(str)
  var baseStr = `${interval} ${unit}`

  return interval == 1 ? baseStr : `${baseStr}s`
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
    logger.log('Every', normalizeInterval(intervalStr), caller)

    var p = fn(done)
    if (p instanceof Promise) p.then(done)
  }

  callFn()
}
