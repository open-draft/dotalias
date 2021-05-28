import { createFsFromVolume, Volume } from 'memfs'
import { webpack } from 'webpack'

const webpackConfig = require('./webpack.config')

it('supports webpack module alias', async () => {
  const memoryFs = createFsFromVolume(new Volume())
  const compiler = webpack(webpackConfig)
  compiler.outputFileSystem = memoryFs

  return new Promise<void>((resolve) => {
    compiler.compile((error, compilation) => {
      expect(error).toBeNull()
      expect(compilation.errors).toHaveLength(0)
      expect(compilation.warnings).toHaveLength(0)
      resolve()
    })
  })
})
