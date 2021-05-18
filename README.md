<p align="center">
  <img src="logo.png" width="125" />
</p>

<h1 align="center">.alias</h1>

<p align="center">
A single configuration for path aliases to reuse across all your tools (TypeScript, webpack, Jest, etc.)
</p>

## Motivation

Path alias is a powerful way to manage relative paths in your projects by replacing long import paths like this:

```js
import result from '../../../../utils/getResult'
```

with a defined alias like this:

```js
import result from 'utils/getResult'
```

> In this example, the `utils/` portion of the import is an _alias_ that resolves to the same relative directory.

The issue is that different tools have different declaration format and capabilities of path aliases. This means that in order to reuse the same alias across development and testing you are likely to tweak multiple configuration with the setup you cannot directly reuse. This increases the maintenance cost of such setup, making aliasing expensive.

### What does Dotalias do?

Dotalias establishes a single configuration format for path aliases and compiles it to configurations that different tools can understand. Effectively, it abstracts all the hassle of having to configure various tools differently. By doing so, you can finally reuse **one** configuration to all the tools you're using.

## Getting stated

### Install

```bash
$ npm install dotalias
# OR
$ yarn add dotalias
```

### Create configuration

```bash
$ touch alias.config.js
```

```js
// alias.config.js
module.exports = {
  myModule: './module.js',
}
```

### Integrate with your tools

Refer to the [integration examples](#integrations) to use this library with various bundlers or testing frameworks.

## Configuration

You can write the alias configuration in any of the following files:

- `.aliasrc`
- `.aliasrc.json`
- `.aliasrc.yaml`
- `.aliasrc.yml`
- `.aliasrc.js`
- `.aliasrc.cjs`
- `alias.config.js`
- `alias.config.cjs`
- `"alias"` key in your `package.json`

> We are using [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) to resolve the configuration file. Learn more about the way it gets resolved in the mentioned repository.

### Writing configuration

The configuration file consists of keys that represent _module names_ and values that stand for relative paths to resolve those module names.

```js
// alias.config.js
module.exports = {
  myModule: './module.js',
}
```

> Module paths are relative to the current working directory.

In the example above, we've created a module alias for the `myModule` that will resolve to a local file at `./module.js` whenever imported in the code:

```js
// Once you've configured your build tools,
// this will resolve to "./module.js".
import result from 'myModule'
```

In the same fashion, the configuration file can be written in [various formats](#configuration-file). Here's an example of the configuration in YAML:

```yaml
myResult: './module.js'
```

## Features

### Exact module name

```js
// alias.config.js
module.exports = {
  components: './src/components',
}
```

### Dynamic module name

```js
// alias.config.js
module.exports = {
  'utils/*': './src/utils/*',
}
```

## Integrations

All the integration examples below assume you have the [configuration file](#configuration-file) created at the root of your application. Whenever you import the `dotalias` package, it automatically reads the closest [configuration](#configuration) and returns the necessary bindings for the integration with other tools.

### webpack

In order to support dynamic import paths (i.e. wildcards), this library exports a custom webpack plugin instead of the `resolve.alias` configuration object.

```js
// webpack.config.js
const { alias } = require('dotalias')

module.exports = {
  plugins: [new alias.WebpackPlugin()],
}
```

### Rollup

```js
// rollup.config.js
const { alias } = require('dotalias')
const aliasPlugin = require('@rollup/plugin-alias')

module.exports = {
  plugins: [
    aliasPlugin({
      ...alias.rollup,
    }),
  ],
}
```

> Requires you to have the [@rollup/plugin-alias](https://github.com/rollup/plugins/tree/master/packages/alias) package installed.

### Jest

```js
// jest.config.js
const { alias } = require('dotalias')

module.exports = {
  ...alias.jest,
}
```

### TypeScript

Execute the following command in your project's root directory:

```bash
$ npx dotalias ts
```

This command will generate a `tsconfig.alias.json` partial TypeScript configuration file that you can later extend in your `tsconfig.json` to enable path aliases:

```json
{
  "extends": "./tsconfig.alias.json"
}
```

## Research

When deciding on the optimal configuration format, I've researched the path alias configurations for the most common tools I use. Below you can see a table of those tools' capabilities when it comes to path aliases:

| Feature         | TypeScript | webpack         | Rollup          | Jest | .alias |
| --------------- | ---------- | --------------- | --------------- | ---- | ------ |
| Exact matches   | ✅         | ✅              | ✅              | ✅   | ✅     |
| Nested paths    | ✅         | ✅              | ✅              | ✅   | ✅     |
| Fallbacks       | ✅         | ✅              | ❌ <sup>1</sup> | ✅   | TBA    |
| RegExp          | ❌         | ❌ <sup>2</sup> | ✅              | ✅   | TBA    |
| Custom resolver | ❌         | ❌              | ✅              | ❌   | TBA    |

> <sup>1</sup>—possible with a custom resolver;
> <sup>2</sup>—possible with a custom plugin.

### References

- [TypeScript](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) (`paths`)
- [webpack](https://webpack.js.org/configuration/resolve/#resolvealias) (`resolve.alias`)
- [Rollup](https://www.npmjs.com/package/@rollup/plugin-alias) (`@rollup/plugin-alias`)
- [Jest](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring) (`moduleNameMapper`)
