var units = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
}

var specialCases = {
  'hour': ['hr']
}

var matchIntervalParts = function (str) {
  var matches = str.match(/(\d+)\s?(\w+)/)
  if (matches) {
    return {
      interval: +matches[1],
      unit: matches[2] && matches[2].length > 1
        ? matches[2].replace(/s$/, '')
        : matches[2]
    }
  }
}

var getNormalizedUnit = function (unit) {
  var u = Object.keys(units).filter((u) => {
    var re = new RegExp(`^${unit}`)
    return re.test(u) || specialCases[u] && specialCases[u].indexOf(unit) > -1
  })

  return u[0]
}

module.exports = function (str) {
  var parts = matchIntervalParts(str)

  if (parts) {
    var unit = getNormalizedUnit(parts.unit)

    var duration = units[unit]
    return duration * parts.interval
  }
}
