import { toRollup } from './toRollup'

it('handles exact module name mapping', () => {
  expect(
    toRollup({
      library: './src/library',
    })
  ).toEqual({
    entries: [
      {
        find: 'library',
        replacement: './src/library',
      },
    ],
  })
})

it('transforms wildcards to RegExp groups', () => {
  expect(
    toRollup({
      'nested-dir/*': '../fixtures/dir/*',
    })
  ).toEqual({
    entries: [
      {
        find: /^nested-dir\/(.*)$/,
        replacement: '../fixtures/dir/$1',
      },
    ],
  })
})

it('uses custom resolver for fallback module paths', () => {
  const config = toRollup({
    exact: 'src/exact.js',
    'utils/*': ['a/*', 'b/*'] as any as string,
  })

  expect(config).toHaveProperty('entries', [
    {
      find: 'exact',
      replacement: 'src/exact.js',
    },
    {
      find: /^utils\/(.*)$/,
      replacement: 'utils/$1',
    },
  ])
  expect(config).toHaveProperty('customResolver')
  expect(config.customResolver).toBeInstanceOf(Function)
})
