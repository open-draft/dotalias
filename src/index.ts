import { cosmiconfigSync } from 'cosmiconfig'
import { toJestConfig } from './converters/toJestConfig'
import { toRollup } from './converters/toRollup'
import { toTypeScript } from './converters/toTypeScript'
import { DotaliasWebpackPlugin } from './webpack/DotaliasWebpackPlugin'

const explorer = cosmiconfigSync('alias')
const result = explorer.search()

if (!result) {
  throw new Error(`Failed to configure path alias: configuration not found.`)
}

export const alias = {
  jest: toJestConfig(result.config),
  WebpackPlugin: () => new DotaliasWebpackPlugin(result.config),
  rollup: toRollup(result.config),
  toTypeScript: toTypeScript(result.config),
}
