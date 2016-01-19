var path = require('path')
var stack = require('callsite')
var logger = require('./logger')
var toMs = require('../app/lib/toMs')

module.exports = function (intervalStr, desc, fn) {
  if (typeof desc == 'function') {
    fn = desc
    desc = ''
  }

  var err
  var caller = desc || path.basename(stack()[1].getFileName())
  var interval = toMs(intervalStr)
  var next = () => setTimeout(callFn, interval)

  var callFn = () => {
    logger.log('Every', intervalStr, caller)

    var p = fn(err, next)

    if (p instanceof Promise) {
      p.then(() => {
        if (err) throw new Error(err)
        return next()
      })
    }
  }

  if (!interval) {
    err = 'No interval for ' + intervalStr
    logger.error(err)
  }

  callFn()
}
