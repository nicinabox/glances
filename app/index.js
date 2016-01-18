var path = require('path')
var sass = require('node-sass-middleware')
var express = require('express')
var requireTiles = require('./lib/requireTiles')
var logger = require('../utils/logger')

var PORT = process.env.PORT || 4567

module.exports = function () {
  var server, io, app = express()

  app.use(sass({
    src: path.join(__dirname, '../app/stylesheets'),
    dest: path.join(__dirname, '../public'),
    debug: true,
    outputStyle: 'compressed',
  }))
  app.use(express.static(path.join(__dirname, '../public')))

  server = app.listen(PORT, function () {
    logger.log('Listening on', PORT)
  })

  io = require('socket.io')(server)

  requireTiles(io)

  io.on('connection', function (socket) {
    logger.log('User connected')
  })

  app.get('/', function (req, res) {
    res.sendStatus(200)
  })
}
