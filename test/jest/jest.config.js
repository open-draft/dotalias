const { alias } = require('../../lib')

module.exports = {
  testMatch: ['./**/*.example.js'],
  ...alias.jest,
}
