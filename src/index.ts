import { cosmiconfigSync } from 'cosmiconfig'
import { toJestConfig } from './converters/toJestConfig'
import { toRollup } from './converters/toRollup'
import { toWebpackConfig } from './converters/toWebpackConfig'

const explorer = cosmiconfigSync('alias')
const result = explorer.search()

if (!result) {
  throw new Error(`Failed to configure path alias: configuration not found.`)
}

export const alias = {
  jest: toJestConfig(result.config),
  webpack: toWebpackConfig(result.config),
  rollup: toRollup(result.config),
}
