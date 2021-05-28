import { exec } from 'child_process'

it('supports fallback module paths', (done) => {
  exec('jest jest.fallback.example.js', { cwd: __dirname }, (error) => {
    expect(error).toBeNull()
    done()
  })
})
