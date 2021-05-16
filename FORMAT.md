# Declaration features

## Overview

| Feature         | TypeScript | webpack | Rollup | Jest |
| --------------- | ---------- | ------- | ------ | ---- |
| Exact matches   | ✅         | ✅      | ✅     | ✅   |
| Nested paths    | ✅         | ✅      | ✅     | ✅   |
| Fallbacks       | ✅         | ✅      | 🟡 \*  | ✅   |
| RegExp          | ❌         | ❌      | ✅     | ✅   |
| Custom resolver | ❌         | ❌      | ✅     | ❌   |

> \*—possible through a custom resolver.

## References

- [TypeScript](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [webpack](https://webpack.js.org/configuration/resolve/#resolvealias)
- [Rollup](https://www.npmjs.com/package/@rollup/plugin-alias)
- [Jest](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring)
