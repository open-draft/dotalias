#!/usr/bin/node
import * as fs from 'fs'
import * as path from 'path'
import * as yargs from 'yargs'
import { alias } from '../'

yargs
  .command(
    'ts',
    'Generate a partial TypeScript configuration for the path aliases',
    {},
    () => {
      const tsConfigName = 'tsconfig.alias.json'
      const tsConfigPath = path.resolve(process.cwd(), tsConfigName)
      const tsConfig = {
        ...alias.toTypeScript,
      }

      fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2))

      console.log('"%s" successfully generated!', tsConfigName)
    }
  )
  .help().argv
