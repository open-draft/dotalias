import * as fs from 'fs'
import * as path from 'path'
import { toJestConfig } from './converters/toJestConfig'
import { toWebpackConfig } from './converters/toWebpackConfig'

const aliasConfigPath = path.resolve(process.cwd(), '.alias.config.js')

if (!fs.existsSync(aliasConfigPath)) {
  throw new Error(
    `Failed to configure path alias: configuration not found at "${aliasConfigPath}".`
  )
}

const aliasConfig = require(aliasConfigPath)

export const alias = {
  jest: toJestConfig(aliasConfig),
  webpack: toWebpackConfig(aliasConfig),
}
