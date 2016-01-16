var dns = require('dns')
var externalIp = require('external-ip')()

var getAddress = function (hostname) {
  return new Promise(function (resolve, reject) {
    dns.lookup(hostname, function (err, address) {
      if (err) reject(err)
      resolve(address)
    })
  })
}

var getIP = function () {
  return new Promise(function (resolve, reject) {
    externalIp(function (err, ip) {
      if (err) reject(err)
      resolve(ip)
    })
  })
}

module.exports = function (hostname) {
  return Promise.all([getAddress(hostname), getIP()])
}
