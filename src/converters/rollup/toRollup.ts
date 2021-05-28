import { AliasConfig } from '../../glossary'
import { compose } from '../../utils/compose'
import {
  normalizeWildcardString,
  replaceWildcardWithPositionals,
} from '../../utils/strings'
import { createCustomResolver } from './createCustomResolver'
import { getFallbackAlias } from './getFallbackAlias'

interface PluginAliasDeclaration {
  find: string | RegExp
  replacement: string
}

function toPluginAliasFormat(config: AliasConfig): PluginAliasDeclaration[] {
  return Object.entries(config).map(([moduleName, modulePath]) => {
    const replacement = Array.isArray(modulePath) ? moduleName : modulePath

    return {
      find: moduleName,
      replacement,
    }
  })
}

function normalizeWildcards(
  declarations: PluginAliasDeclaration[]
): PluginAliasDeclaration[] {
  return declarations.map((declaration) => {
    const { find, replacement } = declaration

    if (typeof find === 'string' && find.includes('*')) {
      const transformedModuleName = normalizeWildcardString(find)
      const moduleNameRegExp = new RegExp(transformedModuleName)
      const transformedReplacement =
        typeof replacement === 'function'
          ? replacement
          : replaceWildcardWithPositionals(replacement)

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
  const fallbackAlias = getFallbackAlias(config)

  return Object.assign(
    {},
    {
      entries,
    },
    fallbackAlias.length > 0 && {
      customResolver: createCustomResolver(fallbackAlias),
    }
  )
}
