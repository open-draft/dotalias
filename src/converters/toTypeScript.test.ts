import { toTypeScript } from './toTypeScript'

it('wraps module path in an array', () => {
  expect(
    toTypeScript({
      utils: './src/utils',
    })
  ).toEqual({
    compilerOptions: {
      baseUrl: '.',
      paths: {
        utils: ['./src/utils'],
      },
    },
  })
})

it('preserves wildcards as-is', () => {
  expect(
    toTypeScript({
      'images/*': './src/images/*',
    })
  ).toEqual({
    compilerOptions: {
      baseUrl: '.',
      paths: {
        'images/*': ['./src/images/*'],
      },
    },
  })

  expect(
    toTypeScript({
      'users/*/images/*': './src/users/*/assest/images/*',
    })
  ).toEqual({
    compilerOptions: {
      baseUrl: '.',
      paths: {
        'users/*/images/*': ['./src/users/*/assest/images/*'],
      },
    },
  })
})
