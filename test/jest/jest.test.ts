import { exec } from 'child_process'

it('supports module name mapping in Jest', (done) => {
  exec('jest --config ./jest.config.js', { cwd: __dirname }, (error) => {
    expect(error).toBeNull()
    done()
  })
})
