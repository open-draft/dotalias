import { AliasConfig } from '../glossary'
import { compose } from '../utils/compose'
import { append, prepend, replace } from '../utils/strings'

interface PluginAliasDeclaration {
  find: string | RegExp
  replacement: string
}

function toPluginAliasFormat(config: AliasConfig): PluginAliasDeclaration[] {
  return Object.entries(config).map(([moduleName, modulePath]) => {
    return {
      find: moduleName,
      replacement: modulePath,
    }
  })
}

function normalizeWildcards(
  declarations: PluginAliasDeclaration[]
): PluginAliasDeclaration[] {
  return declarations.map((declaration) => {
    const { find, replacement } = declaration

    if (typeof find === 'string' && find.includes('*')) {
      let wildcardCount = 0
      const transformedModuleName = compose(
        prepend('^'),
        append('$'),
        replace(/\*/g, () => '(.*)')
      )(find)
      const moduleNameRegExp = new RegExp(transformedModuleName)
      const transformedReplacement = replace(/\*/g, () => {
        wildcardCount++
        return `$${wildcardCount}`
      })(replacement)

      return {
        find: moduleNameRegExp,
        replacement: transformedReplacement,
      }
    }

    return declaration
  })
}

/**
 * Generates the configuration for the `@rollup/plugin-alias` plugin
 * with the given path alias.
 */
export function toRollup(config: AliasConfig) {
  const entries = compose(normalizeWildcards, toPluginAliasFormat)(config)

  return {
    entries,
  }
}
