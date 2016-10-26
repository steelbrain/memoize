/* @flow */

type Memoize$Options = {
  async?: boolean
}

const CACHE_DELETED = Symbol('cache deleted')

function getCacheKey(parameters: Array<any>): string {
  return JSON.stringify(parameters)
}

function memoize(callback: Function, options: Memoize$Options = {}) {
  let cache = {}

  function memoized(...parameters: Array<any>) {
    const cacheKey = getCacheKey(parameters)

    if (cacheKey in cache && cache[cacheKey] !== CACHE_DELETED) {
      const value = cache[cacheKey]
      if (options.async && !(value && value.constructor.name === 'Promise')) {
        return Promise.resolve(value)
      }
      return value
    }

    const value = callback.apply(this, parameters)

    cache[cacheKey] = value
    if (!options.async) {
      return value
    }
    if (!value || value.constructor.name !== 'Promise') {
      throw new Error('Memoization Error, Async function returned non-promise value')
    }
    return value.then(function(realValue) {
      cache[cacheKey] = realValue
      return realValue
    }, function(error) {
      cache[cacheKey] = CACHE_DELETED
      throw error
    })
  }
  memoized.clearCache = function() {
    cache = {}
  }
  memoized.getCache = function(parameters: Array<any>) {
    const cachedValue = cache[getCacheKey(parameters)]
    if (cachedValue === CACHE_DELETED) {
      return undefined
    }
    return cachedValue
  }
  memoized.setCache = function(parameters: Array<any>, value: any) {
    cache[getCacheKey(parameters)] = value
  }
  memoized.deleteCache = function(parameters: Array<any>) {
    cache[getCacheKey(parameters)] = CACHE_DELETED
  }

  return memoized
}

module.exports = memoize
