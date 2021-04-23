<p align="center">
  <img src="logo.png" width="125" />
</p>

<h1 align="center">.alias</h1>

<p align="center">
Manage path alias across multiple configurations.
</p>

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

## Integrations

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
