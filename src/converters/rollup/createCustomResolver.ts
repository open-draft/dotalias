import {
  injectPositionals,
  normalizeWildcardString,
  replaceWildcardWithPositionals,
} from '../../utils/strings'
import { FallbackAlias } from './getFallbackAlias'

export type CustomResolver = (
  importeeId: string,
  importerId: string
) => string | Promise<string>

export function createCustomResolver(alias: FallbackAlias): CustomResolver {
  const normalizedAlias: FallbackAlias = alias.map(
    ([moduleName, modulePaths]) => {
      return [normalizeWildcardString(moduleName), modulePaths]
    }
  )

  return async function customResolver(importeeId, importerId) {
    const matchingAlias = normalizedAlias.find(([moduleName]) => {
      return new RegExp(moduleName).test(importeeId)
    })

    const resolve = (modulePath: string) => {
      return this.resolve(modulePath, importerId, { skipSelf: true })
    }

    // If the imported module doesn't match any of the alias,
    // resolve the path according to its "replacement" value.
    if (!matchingAlias) {
      return resolve(importeeId).then((resolved) => {
        return resolved ? resolved : { id: importeeId }
      })
    }

    const [moduleName, modulePaths] = matchingAlias
    const [, ...positionals] = importeeId.match(moduleName)

    const normalizedPaths = modulePaths
      .map(replaceWildcardWithPositionals)
      .map((modulePath) => {
        return injectPositionals(modulePath, positionals)
      })

    for (const relativeFilePath of normalizedPaths) {
      const result = await this.resolve(relativeFilePath)

      if (result) {
        return result
      }
    }

    return importeeId
  }
}
