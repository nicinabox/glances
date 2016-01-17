var path = require('path')
var sass = require('node-sass-middleware')
var express = require('express')
var requireBlocks = require('./lib/requireBlocks')

var app = express()

var PORT = 4567

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

  requireBlocks(io, function (blocks) {
    socket.emit('blocks', blocks)
  })
})

app.get('/', function (req, res) {
  res.send(200)
})
