import { exec } from 'child_process'

it('supports exact module name mapping', (done) => {
  exec(
    'jest ./test/jest/jest.exact.example.js',
    { cwd: __dirname },
    (error) => {
      expect(error).toBeNull()
      done()
    }
  )
})
