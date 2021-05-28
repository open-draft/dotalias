import { execSync } from 'child_process'

beforeAll(() => {
  jest.spyOn(global.console, 'warn')
  jest.spyOn(global.console, 'error')
})

afterAll(() => {
  jest.restoreAllMocks()
})

it('supports rollup module alias with "@rollup/plugin-alias"', () => {
  const data = execSync('../../node_modules/.bin/rollup -c', {
    cwd: __dirname,
    stdio: 'pipe',
  })
  const output = data.toString()

  expect(console.warn).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()

  // Expect Rollup to resolve imported modules in-place.
  expect(output).toContain(`var exact = 'exact'`)
  expect(output).toContain(`var one = 'dir-one'`)
  expect(output).toContain(`var utilOne = 'fallback-utils-one`)
  expect(output).toContain(`var utilTwo = 'fallback-src-utils-two`)
})
