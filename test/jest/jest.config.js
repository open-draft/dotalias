const { alias } = require('../../lib')

module.exports = {
  testMatch: ['./**/*.e-test.js'],
  ...alias.jest,
}
