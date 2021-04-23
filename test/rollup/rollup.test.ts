import { rollup } from 'rollup'

const rollupConfig = require('./rollup.config')

beforeAll(() => {
  jest.spyOn(global.console, 'warn')
  jest.spyOn(global.console, 'error')
})

afterAll(() => {
  jest.restoreAllMocks()
})

it('supports rollup module alias with "@rollup/plugin-alias"', async () => {
  await rollup(rollupConfig)

  expect(console.warn).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
})
