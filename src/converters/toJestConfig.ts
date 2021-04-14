import { AliasConfig } from '../glossary'

/**
 * Generates a partial Jest configuration to enable given alias.
 * @see https://jestjs.io/docs/configuration
 */
export function toJestConfig(alias: AliasConfig) {
  return {
    moduleNameMapper: alias,
  }
}
