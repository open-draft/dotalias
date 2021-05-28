import { AliasConfig } from '../../glossary'

export type FallbackAlias = [string, string[]][]

export function getFallbackAlias(config: AliasConfig): FallbackAlias {
  // @ts-ignore
  return Object.entries(config).filter(([, modulePath]) => {
    return Array.isArray(modulePath)
  })
}
