var chalk = require('chalk')
var toArray = require('lodash/toArray')

var makeLine = function (prefix, args) {
  return [prefix].concat(args)
}

module.exports = {
  log: function () {
    if (process.env.NODE_ENV === 'test') return

    var args = toArray(arguments)
    console.log.apply(console, makeLine(chalk.green('-->'), args))
  },

  error: function () {
    if (process.env.NODE_ENV === 'test') return
    var args = arguments

    if (args[0] instanceof Error) {
      args = args[0].message
    }

    console.log.apply(console, makeLine(chalk.red('!!!'), chalk.red(args)))
  }
}
