var exec = require('child_process').exec

module.exports = function (target) {
  return new Promise(function (resolve, reject) {
    console.log('=>', 'Ping', target)

    exec(`ping -c 1 ${target}`, function (err, stdout, stderr) {
      var isReceived = (/packets received/).test(stdout)

      if (stderr) reject(isReceived)
      resolve(isReceived)
    })
  })
}
