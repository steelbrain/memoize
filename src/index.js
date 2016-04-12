'use strict'

type Memoize$Options = {
  async?: boolean
}

const CACHE_DELETED = Symbol('cache deleted')

function memoize(callback, options: Memoize$Options = {}) {
  function memoized(...parameters) {
    const cacheKey = JSON.stringify(parameters)
    const parametersLength = parameters.length

    if (cacheKey in memoized.__sb_cache && memoized.__sb_cache[cacheKey] !== CACHE_DELETED) {
      const value = memoized.__sb_cache[cacheKey]
      if (options.async && !(value && value.constructor.name === 'Promise')) {
        return Promise.resolve(value)
      }
      return value
    }

    let value
    if (parametersLength === 1) {
      value = callback.call(this, parameters[0])
    } else if (parametersLength === 2) {
      value = callback.call(this, parameters[0], parameters[1])
    } else if (parametersLength === 3) {
      value = callback.call(this, parameters[0], parameters[1], parameters[2])
    } else if (parametersLength === 4) {
      value = callback.call(this, parameters[0], parameters[1], parameters[2], parameters[3])
    } else {
      value = callback.apply(this, parameters)
    }

    memoized.__sb_cache[cacheKey] = value
    if (options.async) {
      if (!value || value.constructor.name !== 'Promise') {
        throw new Error('Memoization Error, Async function returned non-promise value')
      }
      return value.then(function(realValue) {
        memoized.__sb_cache[cacheKey] = realValue
        return realValue
      }, function(error) {
        memoized.__sb_cache[cacheKey] = CACHE_DELETED
        throw error
      })
    }
    return value
  }
  memoized.__sb_cache = {}

  return memoized
}

module.exports = memoize
