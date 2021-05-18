import { AliasConfig } from '../glossary'
import { compose } from '../utils/compose'

const wrapPathsInArray = (config: AliasConfig) => {
  return Object.entries(config).reduce((config, [moduleName, modulePath]) => {
    config[moduleName] = [modulePath]

    return config
  }, {})
}

/**
 * Generates partial TypeScript configuration from the given
 * path aliases.
 */
export function toTypeScript(config: AliasConfig) {
  const paths = compose(wrapPathsInArray)(config)

  return {
    compilerOptions: {
      baseUrl: '.',
      paths,
    },
  }
}
