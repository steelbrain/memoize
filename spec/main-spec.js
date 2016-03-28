'use babel'

import memoize from '../'
import { it, wait } from './helpers'

describe('memoize', function() {
  it('works', function() {
    let i = 0
    const memoized = memoize(function() {
      i++
      if (i === 1) {
        return 1
      }
      return 2
    })
    expect(memoized()).toBe(1)
    expect(memoized()).toBe(1)
    expect(memoized()).toBe(1)
    expect(memoized()).toBe(1)
    expect(memoized()).toBe(1)
    expect(i).toBe(1)
  })
  it('passes all parameters properly', function() {
    expect(memoize(function(...parameters) {
      expect(parameters).toEqual([1, 2, 3])
      return true
    })(1, 2, 3)).toBe(true)
    expect(memoize(function(...parameters) {
      expect(parameters).toEqual([1, 2, 3, 'asd', { a: 2 }])
      return true
    })(1, 2, 3, 'asd', { a: 2 })).toBe(true)
  })
  it('works even with objects', function() {
    let i = 0
    const memoized = memoize(function() {
      i++
      return i
    })
    expect(memoized({ a: 1 })).toBe(1)
    expect(memoized({ b: 6 })).toBe(2)
    expect(memoized({ c: 4 })).toBe(3)
    expect(memoized({ a: 1 })).toBe(1)
    expect(memoized({ b: 6 })).toBe(2)
    expect(memoized({ c: 4 })).toBe(3)
    expect(memoized({ a: 1 })).toBe(1)
    expect(memoized({ b: 6 })).toBe(2)
    expect(memoized({ c: 4 })).toBe(3)
  })
  it('memoizes even when the function returns false', function() {
    let i = 0
    const memoized = memoize(function() {
      i++
      return false
    })
    expect(memoized()).toBe(false)
    expect(memoized()).toBe(false)
    expect(memoized()).toBe(false)
    expect(memoized()).toBe(false)
    expect(memoized()).toBe(false)
    expect(i).toBe(1)
  })
  it('works even with async functions', async function() {
    let i = 0
    const memoized = memoize(async function() {
      i++
      return i
    }, { async: true })
    expect(await memoized()).toBe(1)
    expect(await memoized()).toBe(1)
    expect(await memoized()).toBe(1)
    expect(await memoized()).toBe(1)
    expect(i).toBe(1)
  })
  it('does not make two calls if the function is lazy, it instead adds to queue', async function() {
    let i = 0
    const memoized = memoize(async function() {
      i++
      await wait(50)
      return i
    }, { async: true })
    const promiseFirst = memoized()
    const promiseSecond = memoized()
    expect(await promiseFirst).toBe(1)
    expect(await promiseSecond).toBe(1)
    expect(i).toBe(1)
    expect(await memoized(5)).toBe(2)
    expect(i).toBe(2)
  })
})
