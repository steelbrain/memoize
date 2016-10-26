## 2.1.0

- Add `getCache(keys)` on every memoized function

## 2.0.0

- Add `clearCache()` on every memoized function
- Add `deleteCache(keys)` on every memoized function
- Add `setCache(keys, value)` on every memoized function
- Remove `__sb_cache` property on cached memoized functions, mainly because this way you cannot share the cache between an async and sync function and you wouldn't ever have to share the memoization between two functions two take the same inputs and return same outputs. You might as well delete either of them :)

## 1.0.2

- Fix a case where rejected promises would be cached

## 1.0.1

- Allow sharing caches between memoized functions, you can do so by doing `a.__sb_cache = b.__sb_cache`

## 1.0.0

- Initial release
