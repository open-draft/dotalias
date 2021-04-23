import { execSync } from 'child_process'

beforeAll(() => {
  jest.spyOn(global.console, 'warn')
  jest.spyOn(global.console, 'error')
})

it('generates partial TypeScript configuration', async () => {
  // Generate the alias configuration.
  execSync('node ../../lib/bin ts', {
    cwd: __dirname,
    stdio: 'inherit',
  })

  // Compile the test project.
  execSync('tsc', {
    cwd: __dirname,
    stdio: 'inherit',
  })

  expect(console.warn).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
})
