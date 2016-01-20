module.exports = function (state) {
  return Object.assign({}, state, {
    id: state.id || state.title.toLowerCase().replace(/\s/g, '-'),
    updatedAt: new Date()
  })
}
