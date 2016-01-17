var exec = require('child_process').exec
var logger = require('./logger')

module.exports = function (target) {
  return new Promise(function (resolve, reject) {
    logger.log('Ping', target)

    exec(`ping -c 1 ${target}`, function (err, stdout, stderr) {
      var isReceived = (/packets received/).test(stdout)

      if (stderr) reject(isReceived)
      resolve(isReceived)
    })
  })
}
