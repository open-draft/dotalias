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
$ touch .alias.config.js
```

```js
// .alias.config.js
module.exports = {
  myModule: './module.js',
}
```

## Integrations

### webpack

```js
// webpack.config.js
const { alias } = require('dotalias')

module.exports = {
  ...alias.webpack,
}
```

### Jest

```js
// jest.config.js
const { alias } = require('dotalias')

module.exports = {
  ...alias.jest,
}
```
