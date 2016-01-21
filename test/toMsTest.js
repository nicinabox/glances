var expect = require('unexpected')
var toMs = require('../app/lib/toMs')

describe('toMs', () => {
  it('matches second variations', () => {
    ['second', 'sec', 's', 'seconds', 'secs'].forEach((unit) => {
      expect(toMs('1 ' + unit), 'to equal', 1000)
      expect(toMs('10 ' + unit), 'to equal', 1000 * 10)
    })
  })

  it('matches minute variations', () => {
    ['minute', 'min', 'm', 'minutes', 'mins'].forEach((unit) => {
      expect(toMs('1 ' + unit), 'to equal', 1000 * 60)
      expect(toMs('10 ' + unit), 'to equal', 1000 * 60 * 10)
    })
  })

  it('matches hour variations', () => {
    ['hour', 'hr', 'hours', 'hrs'].forEach((unit) => {
      expect(toMs('1 ' + unit), 'to equal', 1000 * 60 * 60)
      expect(toMs('10 ' + unit), 'to equal', 1000 * 60 * 60 * 10)
    })
  })

  it('matches day variations', () => {
    ['day', 'd', 'days'].forEach((unit) => {
      expect(toMs('1 ' + unit), 'to equal', 1000 * 60 * 60 * 24)
      expect(toMs('10 ' + unit), 'to equal', 1000 * 60 * 60 * 24 * 10)
    })
  })

  it('should not match bogus units', () => {
    expect(toMs('1 nope'), 'to equal', NaN)
  })

  it('should not match standalone units', () => {
    expect(toMs('min'), 'to equal', undefined)
  })
})
