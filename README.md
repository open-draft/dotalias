<p align="center">
  <img src="logo.png" width="125" />
</p>

<h1 align="center">.alias</h1>

<p align="center">
Manage path aliases across multiple configurations.
</p>

## Motivation

_Path alias_ is a powerful technique to leverage relative paths in your projects. It allows to replace long import paths like this:

```js
import result from '../../../../utils/getResult'
```

with a defined alias:

```js
import result from 'utils/getResult'
```

> In this example, the `utils/` portion of the import is an _alias_ that resolves to the same relative directory.

This allows for shorter and more manageable imports, also having its applications during library development.

The issue is, different tools configure path aliases in a different way, often resulting in a repetition of the aliases when you wish to reuse the same rules between multiple tools in a single project (i.e. TypeScript and webpack). This leads to brittle and unmaintainable configurations whenever you need to use more than one tool.

This project establishes a single source of truth for path aliases in your projects and derives configurations for various tools based on it. You defined aliases once, then plug that definition into whichever tool (or tools) you're using to achieve consistency and maintainability.

## Getting stated

### Install

```bash
$ npm install dotalias
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

### Integrate

Refer to the [integration examples](#integrations) to use this library with various bundlers or testing frameworks.

## Configuration

### Configuration file

You can write the alias configuration in any of the following files:

- `.aliasrc`
- `.aliasrc.json`
- `.aliasrc.yaml`
- `.aliasrc.yml`
- `.aliasrc.js`
- `.aliasrc.cjs`
- `alias.config.js`
- `alias.config.cjs`

You can also add the `"alias"` key to your `package.json`:

```json
{
  "alias": {
    "myModule": "./module.js"
  }
}
```

> We are using [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) to resolve the configuration file. Learn more about the way it gets resolved in the mentioned repository.

### Writing configuration

The configuration file consists of keys that represent module names and values that stand for relative paths to resolve that module name.

```js
// alias.config.js
module.exports = {
  myModule: './module.js',
}
```

> Module paths are relative to the current working directory.

In the example above, we've created a module alias for the `myModule` that will resolve to a local file at `./module.js` when imported in the code:

```js
// Once you've configured your build tools,
// this will resolve to "./module.js".
import result from 'myModule'
```

In the same fashion, the configuration file can be written in [various formats](#configuration-file). Here's an example using YAML:

```yaml
myResult: './yours'
```

## Integrations

All the integration examples below assume you have the [configuration file](#configuration-file) created at the root of your application.

### webpack

```js
// webpack.config.js
const { alias } = require('dotalias')

module.exports = {
  ...alias.webpack,
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
