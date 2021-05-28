const utilOne = require('utils/utilOne')
const utilTwo = require('utils/utilTwo')

it('resolves the first match in the fallback paths', () => {
  expect(utilOne).toEqual('fallback-utils-one')
})

it('resolves subsequent match in the fallback paths', () => {
  expect(utilTwo).toEqual('fallback-src-utils-two')
})
