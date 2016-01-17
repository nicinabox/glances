var path = require('path')
var sass = require('node-sass-middleware')
var express = require('express')
var requireTiles = require('./lib/requireTiles')

var app = express()

var PORT = process.env.PORT || 4567

app.use(sass({
  src: 'stylesheets',
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
}))
app.use(express.static(path.join(__dirname, 'public')))

var server = app.listen(PORT, function () {
  console.log('=>', 'Listening on', PORT)
})

var io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log('=>', 'User connected')

  requireTiles(io, function (tiles) {
    socket.emit('tiles', tiles)
  })
})

app.get('/', function (req, res) {
  res.send(200)
})
