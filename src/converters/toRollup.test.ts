import * as path from 'path'
import { toRollup } from './toRollup'

function fromProcess(chunk: string) {
  return path.resolve(process.cwd(), chunk)
}

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
