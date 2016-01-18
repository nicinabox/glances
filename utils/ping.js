var exec = require('child_process').exec
var logger = require('./logger')

module.exports = function (target) {
  return new Promise(function (resolve, reject) {
    exec(`ping -c 1 ${target}`, function (err, stdout, stderr) {
      if (err && err.code) {
        console.log(stdout)
        reject(`Failed ${target}`)
      }

      resolve()
    })
  })
}
