import { exec } from 'child_process'

it('supports nested module name mapping', (done) => {
  exec('jest jest.nested.example.js', { cwd: __dirname }, (error) => {
    expect(error).toBeNull()
    done()
  })
})
