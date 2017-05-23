const base = require('./base')
const development = Object.assign(require('./dev'), base)
const production = Object.assign(require('./prod'), base)

module.exports = {
  development, production
}[process.env.NODE_ENV || 'development']
