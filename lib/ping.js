var ping = require ('net-ping')
var every = require('../lib/every')

module.exports = function (target, callback) {
  console.log('=>', 'Ping', target)

  var session = ping.createSession({
    retries: 10
  })

  return new Promise(function (resolve, reject) {
    session.pingHost(target, function (err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}
