import * as path from 'path'
import { AliasConfig } from '../glossary'

/**
 * Generates a partial webpack configuration to enable given alias.
 * @see https://webpack.js.org/configuration/resolve/#resolvealias
 */
export function toWebpackConfig(alias: AliasConfig) {
  return {
    resolve: {
      alias: Object.entries(alias).reduce((config, [name, modulePath]) => {
        config[name] = path.resolve(process.cwd(), modulePath)
        return config
      }, {}),
    },
  }
}
