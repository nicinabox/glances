var expect = require('unexpected')
var toMs = require('../app/lib/toMs')

describe('toMs', () => {
  it('matches second variations', () => {
    expect(toMs('1 second'), 'to equal', 1000)
    expect(toMs('1 sec'), 'to equal', 1000)
    expect(toMs('1 s'), 'to equal', 1000)
  })

  it('matches minute variations', () => {
    expect(toMs('1 minute'), 'to equal', 1000 * 60)
    expect(toMs('1 min'), 'to equal', 1000 * 60)
    expect(toMs('1 m'), 'to equal', 1000 * 60)
  })

  it('matches hour variations', () => {
    expect(toMs('1 hour'), 'to equal', 1000 * 60 * 60)
    expect(toMs('1 hr'), 'to equal', 1000 * 60 * 60)
    expect(toMs('1 h'), 'to equal', 1000 * 60 * 60)
  })

  it('matches day variations', () => {
    expect(toMs('1 day'), 'to equal', 1000 * 60 * 60 * 24)
    expect(toMs('1 d'), 'to equal', 1000 * 60 * 60 * 24)
  })

  it('should not match bogus units', () => {
    expect(toMs('1 nope'), 'to equal', NaN)
  })

  it('should not match standalone units', () => {
    expect(toMs('min'), 'to equal', undefined)
  })
})
