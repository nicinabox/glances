var exec = require('child_process').exec
var logger = require('./logger')

module.exports = function (target) {
  return new Promise(function (resolve, reject) {
    exec(`ping -c 1 ${target}`, function (err, stdout, stderr) {
      var isReceived = (/1 packets received/).test(stdout)

      if (!isReceived) reject(isReceived)
      resolve(isReceived)
    })
  })
}
