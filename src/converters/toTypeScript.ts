import { AliasConfig } from '../glossary'

/**
 * Generates partial TypeScript configuration from the given
 * path aliases.
 */
export function toTypeScript(config: AliasConfig) {
  const paths = Object.entries(config).reduce((paths, [name, modulePath]) => {
    paths[name] = [modulePath]
    return paths
  }, {})

  return {
    compilerOptions: {
      baseUrl: '.',
      paths,
    },
  }
}
