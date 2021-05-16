import { execSync } from 'child_process'

beforeAll(() => {
  jest.spyOn(global.console, 'log').mockImplementation()
  jest.spyOn(global.console, 'warn').mockImplementation()
  jest.spyOn(global.console, 'error').mockImplementation()
})

afterAll(() => {
  jest.restoreAllMocks()
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
