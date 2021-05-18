import { AliasConfig } from '../glossary'
import { compose } from '../utils/compose'
import { given } from '../utils/given'
import { not } from '../utils/not'
import { reduceEntries, Reducer } from '../utils/objects'
import {
  append,
  endsWith,
  prepend,
  replace,
  replaceWildcardWithPositionals,
  startsWith,
} from '../utils/strings'

/**
 * Appends start/end RegExp characters (^/$) at the beginning/end
 * of each module name. Makes otherwise loose string matches exact.
 */
const normalizeExactMatch: Reducer<AliasConfig> = (
  config,
  [moduleName, modulePath]
): AliasConfig => {
  const transformedModuleName = compose(
    given(not(startsWith('^')), prepend('^')),
    given(not(endsWith('*')), append('$'))
  )(moduleName)

  config[transformedModuleName] = modulePath
  return config
}

/**
 * Transforms the wildcard tokens ("*") to a RegExp groups (.*),
 * accounting for their reference in the alias strings.
 */
const transformWildcards: Reducer<AliasConfig> = (
  config,
  [moduleName, modulePath]
) => {
  const transformedModuleName = replace(/\*/g, () => '(.*)')(moduleName)
  const transformedModulePath = replaceWildcardWithPositionals(modulePath)

  config[transformedModuleName] = transformedModulePath
  return config
}

/**
 * Generates a partial Jest configuration to enable given alias.
 * @see https://jestjs.io/docs/configuration
 */
export function toJestConfig(config: AliasConfig) {
  const moduleNameMapper = compose(
    reduceEntries(normalizeExactMatch),
    reduceEntries(transformWildcards)
  )(config)

  return {
    moduleNameMapper,
  }
}
