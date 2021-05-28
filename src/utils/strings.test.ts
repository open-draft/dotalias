import {
  append,
  endsWith,
  prepend,
  startsWith,
  replace,
  normalizeWildcardString,
  replaceWildcardWithPositionals,
  injectPositionals,
} from './strings'

it('prepend()', () => {
  expect(prepend('prefix-')('source')).toEqual('prefix-source')
})

it('append()', () => {
  expect(append('-suffix')('source')).toEqual('source-suffix')
})

it('startsWith()', () => {
  expect(startsWith('app')('apple')).toEqual(true)
  expect(startsWith('app')('appricot')).toEqual(true)
  expect(startsWith('app')('coyote')).toEqual(false)
})

it('endsWith()', () => {
  expect(endsWith('don')('megalodon')).toEqual(true)
  expect(endsWith('don')('magtheridon')).toEqual(true)
  expect(endsWith('don')('coyote')).toEqual(false)
})

it('replace()', () => {
  expect(replace('apple', () => 'banana')('apple coctail')).toEqual(
    'banana coctail'
  )
  expect(replace(/\d/g, (d) => d + '?')('2 apples and 3 bananas')).toEqual(
    '2? apples and 3? bananas'
  )
})

it('normalizeWildcardString', () => {
  expect(normalizeWildcardString('utils/')).toEqual('^utils/$')
  expect(normalizeWildcardString('utils/*')).toEqual('^utils/(.*)$')
})

it('replaceWildcardWithPositionals()', () => {
  expect(replaceWildcardWithPositionals('/src/')).toEqual('/src/')
  expect(replaceWildcardWithPositionals('/src/*')).toEqual('/src/$1')
  expect(replaceWildcardWithPositionals('/src/*/images/*')).toEqual(
    '/src/$1/images/$2'
  )
})

it('injectPositionals', () => {
  expect(injectPositionals('utils/', ['internal'])).toEqual('utils/')
  expect(injectPositionals('utils/$1', ['internal'])).toEqual('utils/internal')
  expect(
    injectPositionals('utils/$1/nested/$2', ['internal', 'addNumbers'])
  ).toEqual('utils/internal/nested/addNumbers')
})
