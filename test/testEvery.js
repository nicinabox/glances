var expect = require('unexpected')
var every = require('../utils/every')

describe('every', () => {
  it('accepts interval and callback', (done) => {
    every('1 second', (err) => {
      expect(err, 'to be falsy')
      done()
    })
  })

  it('accepts optional description', (done) => {
    every('1 second', 'tick every second', (err) => {
      expect(err, 'to be falsy')
      done()
    })
  })

  it('accepts function to call each tick', (done) => {
    every('1 second', (err, next) => {
      expect(err, 'to be falsy')
      expect(next, 'to be a function')
      done()
    })
  })

  it('ticks with Promise resolve')
  it('ticks with function call')
})
