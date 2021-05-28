module.exports = {
  'exact-file': '../fixtures/exact.js',
  'exact-dir': '../fixtures/dir',
  'nested-dir/*': '../fixtures/dir/*',
  'utils/*': [
    '../fixtures/fallback/utils/*',
    '../fixtures/fallback/src/utils/*',
  ],
}
