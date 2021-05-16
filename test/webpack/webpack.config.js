const path = require('path')
const { alias } = require('../..')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'build.js',
  },
  plugins: [new alias.WebpackPlugin()],
}
