module.exports = function (state) {
  if (!(state.id || state.title)) {
    throw new Error(`Tile state must include title (${JSON.stringify(state)})`)
  }

  return Object.assign({}, state, {
    id: state.id || state.title.toLowerCase().replace(/\s/g, '-'),
    updatedAt: new Date()
  })
}
