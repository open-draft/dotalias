const one = require('nested-dir/one')
const two = require('nested-dir/two')

it('should equal 1 and 2, respectively', () => {
  expect(one).toEqual('dir-one')
  expect(two).toEqual('dir-two')
})
