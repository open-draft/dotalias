import { toJestConfig } from './toJestConfig'

it('appends ^ and $ to exact module name', () => {
  expect(
    toJestConfig({
      exact: './exact/file.js',
    })
  ).toEqual({
    moduleNameMapper: {
      '^exact$': './exact/file.js',
    },
  })
})

it('appends ^ and $ to exact directory name', () => {
  expect(
    toJestConfig({
      dir: './directory',
    })
  ).toEqual({
    moduleNameMapper: {
      '^dir$': './directory',
    },
  })
})

it('transforms wildcards to RegExp groups', () => {
  expect(
    toJestConfig({
      'nested/*': './fixtures/nested/*',
    })
  ).toEqual({
    moduleNameMapper: {
      '^nested/(.*)$': './fixtures/nested/$1',
    },
  })

  expect(
    toJestConfig({
      'users/*/pictures/*': './fixtures/users/*/images/*',
    })
  ).toEqual({
    moduleNameMapper: {
      '^users/(.*)/pictures/(.*)$': './fixtures/users/$1/images/$2',
    },
  })
})
