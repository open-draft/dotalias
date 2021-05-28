module.exports = {
  'exact-file': './test/fixtures/exact.js',
  'nested-dir/*': './test/fixtures/dir/*',
  'utils/*': [
    './test/fixtures/fallback/utils/*',
    './test/fixtures/fallback/src/utils/*',
  ],
}
