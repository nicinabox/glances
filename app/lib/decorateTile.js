module.exports = function (tile) {
  return Object.assign({}, tile, {
    id: tile.title.toLowerCase().replace(/\s/g, '-'),
    updatedAt: new Date()
  })
}
