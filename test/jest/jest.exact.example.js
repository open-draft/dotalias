const exact = require('exact-file')
const exactDir = require('exact-dir')

it('supports exact file alias', () => {
  expect(exact).toEqual('exact')
})

it('supports exact directory alias', () => {
  expect(exactDir).toEqual('exact-dir')
})
