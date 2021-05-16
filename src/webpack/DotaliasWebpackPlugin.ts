import * as path from 'path'
import { Compiler, WebpackPluginInstance } from 'webpack'
import { AliasConfig } from '../glossary'
import { compose } from '../utils/compose'
import { replace } from '../utils/strings'

export class DotaliasWebpackPlugin implements WebpackPluginInstance {
  private config: AliasConfig

  constructor(config: AliasConfig) {
    this.config = this.transformConfig(config)
  }

  apply(compiler: Compiler) {
    compiler.hooks.normalModuleFactory.tap(
      'DotaliasWebpackPlugin',
      (factory) => {
        factory.hooks.beforeResolve.tap('DotaliasWebpackPlugin', (result) => {
          const modulePath = this.findResourceAlias(result.request)

          if (modulePath) {
            result.request = modulePath
          }
        })
      }
    )
  }

  private transformConfig(config: AliasConfig): AliasConfig {
    return Object.entries(config).reduce((config, [moduleName, modulePath]) => {
      config[moduleName] = path.resolve(process.cwd(), modulePath)
      return config
    }, {})
  }

  private findResourceAlias(actualModuleName: string): string | undefined {
    const resource = Object.entries(this.config).reduce<string>(
      (resource, [moduleName, modulePath]) => {
        if (typeof resource !== 'undefined') {
          return resource
        }

        // Alias name is a RegExp-like string.
        if (moduleName.includes('*')) {
          const normalizedModuleName = compose(replace(/\*/g, () => '(.*)'))(
            moduleName
          )
          const moduleNameRegExp = new RegExp(normalizedModuleName)
          const match = actualModuleName.match(moduleNameRegExp)

          if (!match) {
            return
          }

          let wildcardCount = 0
          const transormedModulePath = replace(/\*/g, (groupIndex) => {
            wildcardCount++
            return match[wildcardCount]
          })(modulePath)

          return transormedModulePath
        }

        // Alias name is a regular string.
        if (actualModuleName === moduleName) {
          return modulePath
        }
      },
      undefined
    )

    return resource
  }
}
