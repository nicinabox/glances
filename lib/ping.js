var ping = require ('net-ping')

module.exports = function (target, callback) {
  var session = ping.createSession({
    retries: 10
  })

  session.pingHost(target, callback)

  return setInterval(function () {
    session.pingHost(target, callback)
  }, 5000)
}
