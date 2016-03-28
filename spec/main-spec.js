'use babel'

import memoize from '../'

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
})
