const path = require('path')
const aliasPlugin = require('@rollup/plugin-alias')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { alias } = require('../..')

module.exports = {
  input: path.resolve(__dirname, 'index.js'),
  output: {
    format: 'cjs',
  },
  plugins: [
    aliasPlugin({
      ...alias.rollup,
    }),
    nodeResolve(),
    commonjs(),
  ],
}
