module.exports = {
  'exact-file': '../fixtures/exact.js',
  'nested-dir/*': '../fixtures/dir/*',
  'utils/*': [
    '../fixtures/fallback/utils/*',
    '../fixtures/fallback/src/utils/*',
  ],
}
