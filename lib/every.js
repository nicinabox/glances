var toMs = function (str) {
  var units = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
  }

  var matches = str.match(/(\d+)\s(\w+)/)
  var interval = matches[1]
  var unit = matches[2]

  return (units[unit] || units[unit.replace(/s$/, '')]) * +interval
}

module.exports = function (intervalStr, fn) {
  var interval = toMs(intervalStr)
  fn()

  if (interval) {
    return setInterval(fn, interval)
  } else {
    console.log('=>', 'No interval for', intervalStr)
  }
}
