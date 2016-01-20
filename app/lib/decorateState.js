module.exports = function (tile) {
  var state = tile.state

  return Object.assign({}, state, {
    id: state.id || state.title.toLowerCase().replace(/\s/g, '-'),
    updatedAt: new Date()
  })
}
