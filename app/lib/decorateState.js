module.exports = function (state) {
  return Object.assign({}, state, {
    updatedAt: new Date()
  })
}
