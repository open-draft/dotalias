import * as path from 'path'
import { AliasConfig } from '../glossary'

/**
 * Generates the configuration for the `@rollup/plugin-alias` plugin
 * with the given path alias.
 */
export function toRollup(alias: AliasConfig) {
  const entries = Object.entries(alias).map(([name, modulePath]) => {
    return {
      find: name,
      replacement: path.resolve(process.cwd(), modulePath),
    }
  })

  return {
    entries,
  }
}
