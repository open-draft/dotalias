module.exports = {
  'exact-file': './test/fixtures/exact.js',
  'nested-dir/*': './test/fixtures/dir/*',
  'exact-multiple': [
    './test/fixtures/exact.js',
    './test/fixtures/dir/exact.js',
  ],
  'utils/*': [
    './test/fixtures/fallback/utils/*',
    './test/fixtures/fallback/src/utils/*',
  ],
}
