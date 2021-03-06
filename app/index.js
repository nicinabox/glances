var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var tileStore = require('./tileStore')
var requireTiles = require('./lib/requireTiles')
var logger = require('./lib/logger')

var PORT = process.env.PORT || 4567

/**
 * Start the glances server
 * @param  {array} tiles accepts tiles to be initialized. Tiles in tiles/ will be required by automatically.
 */
module.exports = function (tiles) {
  var server, io, app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, '../public')))

  server = app.listen(PORT, function () {
    logger.log('Listening on', PORT)
  })

  io = require('socket.io')(server)

  requireTiles('tiles/*.js')
    .then(function (rawTiles) {
      tileStore.initialize(rawTiles.concat(tiles || []), io)
    })
    .catch(function (err) {
      logger.error(err.stack)
    })

  io.on('connection', function () {
    logger.log('User connected')
  })

  app.get('/', function (req, res) {
    res.sendStatus(200)
  })

  app.post('/tiles/:id', function (req, res) {
    var tile = tileStore.getTile(req.params.id)
    tile && tile.onRequest(req.body)
    res.sendStatus(200)
  })
}
