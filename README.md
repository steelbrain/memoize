Memoize
=======
Memoize is a javascript helper utility to fulfill your function memoization needs.

## Installation

```sh
npm install --save sb-memoize
```

## API

```js
function memoize(
  callback: Function,
  options = { async: false }
): Function

module.exports = memoize
```

## Examples

```js
import resolve from 'resolve'
import promisify from 'sb-promisify'
import memoize from 'sb-memoize'

const resolveSync = memoize(resolve.sync)
const resolveAsync = memoize(promisify(resolve), { async: true })

console.log(resolveSync('sb-memoize', { basedir: __dirname }))
resolveAsync('sb-memoize', { basedir: __dirname })
  .then(function(path) {
    console.log(path)
  })
```

## Notes

This package automatically adds these methods on any memoized function

```
clearCache(): void
getCache(parameters: Array<any>): any
setCache(parameters: Array<any>, cacheValue: any): void
deleteCache(parameters: Array<any>): void
```

## License

This project is licensed under the terms of MIT License, see the LICENSE file for more info
